//DAOs:
import { daoStaff, daoLogActivity, daoUser } from "../../containers";
import { ReqTokenDataInterface } from "../../interfaces/userInterface/reqTokenData.interface";

export default class staffService {
  /** ============== VERIFY USER  ============== **/
  async verifyUserServ(tokenData: ReqTokenDataInterface, user_id: string) {
    //verify:
    const verified = await daoStaff.verifyUser(user_id);

    //create log:
    if (verified === "USER_VERIFIED") {
      await daoLogActivity.createUserLog(
        tokenData.uid,
        user_id,
        "VERIFIED",
        tokenData.rol
      );
    }
    return verified;
  }

  /** =============== UNVERIFY USER  =============== **/
  async unverifyUserServ(tokenData: ReqTokenDataInterface, user_id: string) {
    //unverify:
    const unverified = await daoStaff.unverifyUser(user_id);

    //create log:
    if (unverified === "USER_UNVERIFIED") {
      await daoLogActivity.createUserLog(
        tokenData.uid,
        user_id,
        "UNVERIFIED",
        tokenData.rol
      );
    }
    return unverified;
  }

  /** =============== DELETE USER  =============== **/
  async deleteUserServ(tokenData: ReqTokenDataInterface, user_id: string) {
    //Check user
    const check = await daoUser.getUser("id", user_id, true);
    if (!check) return "USER_NOT_FOUND";
    const resDelete = await daoStaff.deleteUser(user_id);

    //Create log Activity:
    if (resDelete === "USER_DELETED") {
      await daoLogActivity.createUserLog(
        tokenData.uid,
        user_id,
        "DELETE",
        tokenData.rol
      );
    }

    return resDelete;
  }

  /** =============== SUSPEND USER  =============== **/

  async suspendUserServ(tokenData: ReqTokenDataInterface, user_id: string) {
    //Check user
    const check = await daoUser.getUser("id", user_id, true);
    if (!check) return "USER_NOT_FOUND";

    const resSuspend = await daoStaff.suspendUser(user_id);

    //Create log Activity:
    if (resSuspend === "USER_SUSPENDED") {
      await daoLogActivity.createUserLog(
        tokenData.uid,
        user_id,
        "SUSPEND",
        tokenData.rol
      );
    }

    return resSuspend;
  }

  /** =============== REACTIVE USER  =============== **/
  async reactiveUserServ(tokenData: ReqTokenDataInterface, user_id: string) {
    //Check user
    const check = await daoUser.getUser("id", user_id, true);
    if (!check) return "USER_NOT_FOUND";
    //reactive:
    const reactiveUser = await daoStaff.reactivateUser(user_id);

    //Create log Activity:
    if (reactiveUser === "USER_REACTIVATED") {
      await daoLogActivity.createUserLog(
        tokenData.uid,
        user_id,
        "REACTIVE",
        tokenData.rol
      );
    }

    return reactiveUser;
  }
}
