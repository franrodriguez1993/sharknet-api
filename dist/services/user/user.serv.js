"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//uuid:
const uuid_1 = require("uuid");
// BcryptJS:
const bcryptHandler_1 = require("../../utils/bcryptHandler");
//Json Web Token:
const jwtHandler_1 = require("../../utils/jwtHandler");
// DAOs:
const containers_1 = require("../../containers");
//Image Manager:
const UploadImages_1 = __importDefault(require("../../utils/UploadImages"));
const uploaderManager = new UploadImages_1.default();
class userService {
    /**====================== REGISTER USER ======================**/
    registerUserServ(data) {
        return __awaiter(this, void 0, void 0, function* () {
            //Check email:
            const isEmail = yield containers_1.daoUser.getUser("mail", data.user_mail, true);
            if (isEmail)
                return "MAIL_IN_USE";
            //Check username:
            const isUsername = yield containers_1.daoUser.getUser("username", data.user_username, true);
            if (isUsername)
                return "USERNAME_IN_USE";
            //Register data:
            const user_id = (0, uuid_1.v4)();
            const hashpass = yield (0, bcryptHandler_1.encrypt)(data.user_password);
            const user = yield containers_1.daoUser.registerUser(Object.assign(Object.assign({}, data), { user_password: hashpass, user_id }));
            return user;
        });
    }
    /**====================== LOGIN USER =========================**/
    loginUserServ(mail, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield containers_1.daoUser.getUser("mail", mail);
            //User not found:
            if (!user)
                return "USER_NOT_FOUND";
            //Check user status:
            if (user.user_status === "suspended")
                return "USER_SUSPENDED";
            if (user.user_status === "deleted")
                return "USER_DELETED";
            //Verify pass:
            const comparePass = yield (0, bcryptHandler_1.verified)(password, user.user_password);
            if (!comparePass)
                return "INVALID_CREDENTIALS";
            //Return tokens:
            const token = (0, jwtHandler_1.generateToken)(user.user_id);
            const refreshToken = (0, jwtHandler_1.generateRefreshToken)(user.user_id);
            return { token, refreshToken, uid: user.user_id };
        });
    }
    /**======================= REFRESH SESSION ========================**/
    refreshSessionServ(uid) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield containers_1.daoUser.getUser("id", uid, true);
            if (!user)
                return "USER_NOT_FOUND";
            else if (user.user_status === "suspended")
                return "USER_SUSPENDED";
            else if (user.user_status === "deleted")
                return "USER_DELETED";
            const token = (0, jwtHandler_1.generateToken)(uid);
            return { token, uid };
        });
    }
    /**====================== GET USER BY ID ==========================**/
    getUserIdServ(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield containers_1.daoUser.getUser("id", id);
            if (!user)
                return "USER_NOT_FOUND";
            return user;
        });
    }
    /**==================== GET USER BY MAIL =====================**/
    /*
   METHOD: "POST" its more secure to send a mail.
   */
    getUserMailServ(mail) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield containers_1.daoUser.getUser("mail", mail);
            if (!user)
                return "USER_NOT_FOUND";
            return user;
        });
    }
    /**==================== EDIT PROFILE USER ====================**/
    editProfileServ(data) {
        return __awaiter(this, void 0, void 0, function* () {
            if (data.user_username) {
                const check = yield containers_1.daoUser.getUser("username", data.user_username, true);
                if (check)
                    return "USERNAME_IN_USE";
            }
            const user = yield containers_1.daoUser.updateProfile(data);
            return user;
        });
    }
    /**====================== CHANGE EMAIL ========================**/
    changeEmailServ(uid, mail) {
        return __awaiter(this, void 0, void 0, function* () {
            //Find user:
            const user = yield containers_1.daoUser.getUser("id", uid, true);
            if (!user)
                return "USER_NOT_FOUND";
            //Checking mail:
            if (user.user_mail.toString() === mail.toString())
                return "CHANGE_MAIL";
            const isMail = yield containers_1.daoUser.getUser("mail", mail, true);
            if (isMail)
                return "MAIL_IN_USE";
            //Update mail:
            const updatedUser = yield containers_1.daoUser.changeFields(uid, "mail", mail);
            return updatedUser;
        });
    }
    /**======================== CHANGE PASSWORD ========================**/
    changePassServ(uid, pass) {
        return __awaiter(this, void 0, void 0, function* () {
            //Find user:
            const user = yield containers_1.daoUser.getUser("id", uid, true);
            if (!user)
                return "USER_NOT_FOUND";
            //Hash pass:
            const hashpass = yield (0, bcryptHandler_1.encrypt)(pass);
            //Update pass:
            const updatedUser = yield containers_1.daoUser.changeFields(uid, "password", hashpass);
            return updatedUser;
        });
    }
    /** =================== ADD BIRTHDAY ====================== **/
    addBirthdayServ(data) {
        return __awaiter(this, void 0, void 0, function* () {
            //Check User:
            const isUser = yield containers_1.daoUser.getUser("id", data.user_id, true);
            if (!isUser)
                return "USER_NOT_FOUND";
            //Create birthday:
            const birthday_id = (0, uuid_1.v4)();
            const birthday = yield containers_1.daoUser.addBirthday(Object.assign(Object.assign({}, data), { birthday_id }));
            //return data:
            return birthday;
        });
    }
    /** ===================== ADD ADDRESS ========================= **/
    addAddressServ(data) {
        return __awaiter(this, void 0, void 0, function* () {
            //Check user:
            const isUser = yield containers_1.daoUser.getUser("id", data.user_id, true);
            if (!isUser)
                return "USER_NOT_FOUND";
            //Create address:
            const address_id = (0, uuid_1.v4)();
            const address = yield containers_1.daoUser.addAddress(Object.assign(Object.assign({}, data), { address_id }));
            //Return data:
            return address;
        });
    }
    /** ======================= DELETE ADDRESS ========================== **/
    deleteAddressServ(aid) {
        return __awaiter(this, void 0, void 0, function* () {
            //Delete:
            const resDelete = yield containers_1.daoUser.deleteAddress(aid);
            //Return:
            return resDelete;
        });
    }
    /** ======================= ADD CREDITCARD ========================= **/
    addCreditCardServ(data) {
        return __awaiter(this, void 0, void 0, function* () {
            //checkUser:
            const isUser = yield containers_1.daoUser.getUser("id", data.user_id, true);
            if (!isUser)
                return "USER_NOT_FOUND";
            //Create:
            const cc_id = (0, uuid_1.v4)();
            const newCreditCard = yield containers_1.daoUser.addCreditCard(Object.assign(Object.assign({}, data), { cc_id }));
            //Return:
            return newCreditCard;
        });
    }
    /** ========================= DELETE CREDITCARD =========================== **/
    deleteCreditCardServ(ccid) {
        return __awaiter(this, void 0, void 0, function* () {
            //delete:
            const deleted = yield containers_1.daoUser.deleteCreditCard(ccid);
            //return:
            return deleted;
        });
    }
    /**==================== PROFILE IMAGE =========================**/
    uploadImageProfile(uid, img) {
        return __awaiter(this, void 0, void 0, function* () {
            const folderId = process.env.GD_FOLDER_USERS;
            //Upload image:
            const imgProfile = yield uploaderManager.uploadFile(uid, img, folderId);
            if (!imgProfile)
                return "ERROR_UPLOADING_IMAGE";
            //Update user data:
            const imgId = `https://drive.google.com/uc?id=${imgProfile.imageId}`;
            return yield containers_1.daoUser.uploadProfileImage(uid, imgId);
        });
    }
}
exports.default = userService;
