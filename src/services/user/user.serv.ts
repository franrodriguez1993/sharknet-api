import serverConfigurations from "../../config/configServer";
import { v4 as uuidv4 } from "uuid";
// BcryptJS:
import { encrypt, verified } from "../../utils/bcryptHandler";

//Json Web Token:
import { generateToken, generateRefreshToken } from "../../utils/jwtHandler";

// DAOs:
import { daoUser } from "../../containers";

//Interfaces:
import { UserInterface } from "../../interfaces/userInterface/user.interface";
import { birthdayInterface } from "../../interfaces/userInterface/birthday.interface";
import { addressInterface } from "../../interfaces/userInterface/address.Interface";
import { creditCardInterface } from "../../interfaces/userInterface/creditCard.interface";

//Image Manager:
import UploadImages from "../../utils/UploadImages";
const uploaderManager = new UploadImages();

export default class userService {
  /**====================== REGISTER USER ======================**/
  async registerUserServ(data: UserInterface) {
    //Check email:
    const isEmail = await daoUser.getUser("mail", data.user_mail, true);
    if (isEmail) return "MAIL_IN_USE";

    //Check username:
    const isUsername = await daoUser.getUser(
      "username",
      data.user_username,
      true
    );
    if (isUsername) return "USERNAME_IN_USE";

    //Register data:
    const user_id = uuidv4();
    const hashpass = await encrypt(data.user_password);

    const user = await daoUser.registerUser({
      ...data,
      user_password: hashpass,
      user_id,
    });
    return user;
  }

  /**====================== LOGIN USER =========================**/
  async loginUserServ(mail: string, password: string) {
    const user: UserInterface | any = await daoUser.getUser("mail", mail);

    //User not found:
    if (!user) return "USER_NOT_FOUND";

    //Check user status:
    if (user.user_status === "suspended") return "USER_SUSPENDED";
    if (user.user_status === "deleted") return "USER_DELETED";

    //Verify pass:
    const comparePass = await verified(password, user.user_password);
    if (!comparePass) return "INVALID_CREDENTIALS";

    //Return tokens:
    const token = generateToken(user.user_id);
    const refreshToken = generateRefreshToken(user.user_id);
    return { token, refreshToken, uid: user.user_id };
  }

  /**======================= REFRESH SESSION ========================**/
  async refreshSessionServ(uid: string) {
    const user: UserInterface | any = await daoUser.getUser("id", uid, true);
    if (!user) return "USER_NOT_FOUND";
    else if (user.user_status === "suspended") return "USER_SUSPENDED";
    else if (user.user_status === "deleted") return "USER_DELETED";

    const token = generateToken(uid);
    return { token, uid };
  }

  /**====================== GET USER BY ID ==========================**/
  async getUserIdServ(id: string) {
    const user = await daoUser.getUser("id", id);
    if (!user) return "USER_NOT_FOUND";
    return user;
  }

  /**==================== GET USER BY MAIL =====================**/
  /*
 METHOD: "POST" its more secure to send a mail.
 */
  async getUserMailServ(mail: string) {
    const user = await daoUser.getUser("mail", mail);
    if (!user) return "USER_NOT_FOUND";
    return user;
  }

  /**==================== EDIT PROFILE USER ====================**/
  async editProfileServ(data: UserInterface) {
    if (data.user_username) {
      const check = await daoUser.getUser("username", data.user_username, true);
      if (check) return "USERNAME_IN_USE";
    }
    const user = await daoUser.updateProfile(data);

    return user;
  }

  /**====================== CHANGE EMAIL ========================**/
  async changeEmailServ(uid: string, mail: string) {
    //Find user:
    const user = await daoUser.getUser("id", uid, true);
    if (!user) return "USER_NOT_FOUND";

    //Checking mail:
    if (user.user_mail.toString() === mail.toString()) return "CHANGE_MAIL";
    const isMail = await daoUser.getUser("mail", mail, true);
    if (isMail) return "MAIL_IN_USE";

    //Update mail:
    const updatedUser = await daoUser.changeFields(uid, "mail", mail);
    return updatedUser;
  }

  /**======================== CHANGE PASSWORD ========================**/
  async changePassServ(uid: string, pass: string) {
    //Find user:
    const user = await daoUser.getUser("id", uid, true);
    if (!user) return "USER_NOT_FOUND";

    //Hash pass:
    const hashpass = await encrypt(pass);

    //Update pass:
    const updatedUser = await daoUser.changeFields(uid, "password", hashpass);
    return updatedUser;
  }

  /** =================== ADD BIRTHDAY ====================== **/
  async addBirthdayServ(data: birthdayInterface) {
    //Check User:
    const isUser = await daoUser.getUser("id", data.user_id, true);
    if (!isUser) return "USER_NOT_FOUND";

    //Create birthday:
    const birthday_id = uuidv4();
    const birthday = await daoUser.addBirthday({ ...data, birthday_id });

    //return data:
    return birthday;
  }

  /** ===================== ADD ADDRESS ========================= **/
  async addAddressServ(data: addressInterface) {
    //Check user:
    const isUser = await daoUser.getUser("id", data.user_id, true);
    if (!isUser) return "USER_NOT_FOUND";

    //Create address:
    const address_id = uuidv4();

    const address = await daoUser.addAddress({ ...data, address_id });

    //Return data:
    return address;
  }

  /** ======================= DELETE ADDRESS ========================== **/

  async deleteAddressServ(aid: string) {
    //Delete:
    const resDelete = await daoUser.deleteAddress(aid);

    //Return:
    return resDelete;
  }

  /** ======================= ADD CREDITCARD ========================= **/
  async addCreditCardServ(data: creditCardInterface) {
    //checkUser:
    const isUser = await daoUser.getUser("id", data.user_id, true);
    if (!isUser) return "USER_NOT_FOUND";

    //Create:
    const cc_id = uuidv4();
    const newCreditCard = await daoUser.addCreditCard({ ...data, cc_id });

    //Return:
    return newCreditCard;
  }

  /** ========================= DELETE CREDITCARD =========================== **/

  async deleteCreditCardServ(ccid: string) {
    //delete:
    const deleted = await daoUser.deleteCreditCard(ccid);

    //return:
    return deleted;
  }

  /**==================== PROFILE IMAGE =========================**/
  async uploadImageProfile(uid: string, img: Buffer) {
    const folderId = serverConfigurations.google.folders.users;
    //Upload image:
    const imgProfile = await uploaderManager.uploadFile(uid, img, folderId);
    if (!imgProfile) return "ERROR_UPLOADING_IMAGE";

    //Update user data:
    const imgId = `https://drive.google.com/uc?id=${imgProfile.imageId}`;
    return await daoUser.uploadProfileImage(uid, imgId);
  }
}
