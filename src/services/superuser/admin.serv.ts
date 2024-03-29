import { daoAdmin, daoLogActivity, daoUser } from "../../containers";
import { validate as isValidUUID } from "uuid";
import { ReqTokenDataInterface } from "../../interfaces/userInterface/reqTokenData.interface";

export default class adminService {
  /** ===============  STAFF UPGRADE  =============== **/
  async staffUpgradeServ(tokenData: ReqTokenDataInterface, user_id: string) {
    //valid uuid:
    if (!isValidUUID(user_id)) {
      return "INVALID_USER_ID";
    }
    //dao:
    const resData = await daoAdmin.staffUpgrade(user_id);

    //Create log Activity:
    if (resData === "USER_STAFF_UPGRADED") {
      await daoLogActivity.createUserLog(
        tokenData.uid,
        user_id,
        "STAFF_UPGRADE",
        tokenData.rol
      );
    }
    return resData;
  }

  /** =================  STAFF DOWNGRADE  ================= **/
  async staffDowngradeServ(tokenData: ReqTokenDataInterface, user_id: string) {
    //valid uuid:
    if (!isValidUUID(user_id)) {
      return "INVALID_USER_ID";
    }
    //dao:
    const resData = await daoAdmin.staffDowngrade(user_id);

    //Create log Activity:
    if (resData === "USER_STAFF_DOWNGRADED") {
      await daoLogActivity.createUserLog(
        tokenData.uid,
        user_id,
        "STAFF_DOWNGRADE",
        tokenData.rol
      );
    }
    return resData;
  }

  /** ===============  ADMIN UPGRADE  =============== **/
  async adminUpgradeServ(tokenData: ReqTokenDataInterface, user_id: string) {
    //valid uuid:
    if (!isValidUUID(user_id)) {
      return "INVALID_USER_ID";
    }
    // check user:
    const check = await daoUser.getUser("id", user_id, true);
    if (!check) return "USER_NOT_FOUND";
    //dao:
    const resData = await daoAdmin.adminUpgrade(user_id);

    //Create log Activity:
    if (resData === "USER_ADMIN_UPGRADED") {
      await daoLogActivity.createUserLog(
        tokenData.uid,
        user_id,
        "ADMIN_UPGRADE",
        tokenData.rol
      );
    }
    return resData;
  }

  /** ===============  ADMIN DOWNGRADE  ================ **/
  async adminDowngradeServ(tokenData: ReqTokenDataInterface, user_id: string) {
    //valid uuid:
    if (!isValidUUID(user_id)) {
      return "INVALID_USER_ID";
    }
    // check user:
    const check = await daoUser.getUser("id", user_id, true);
    if (!check) return "USER_NOT_FOUND";
    //dao:
    const resData = await daoAdmin.admindowngrade(user_id);

    //Create log Activity:
    if (resData === "USER_ADMIN_DOWNGRADED") {
      await daoLogActivity.createUserLog(
        tokenData.uid,
        user_id,
        "ADMIN_DOWNGRADE",
        tokenData.rol
      );
    }
    return resData;
  }

  /** ============= DELETE USER  ============== **/
  async adminDeleteUserServ(tokenData: ReqTokenDataInterface, user_id: string) {
    //valid uuid:
    if (!isValidUUID(user_id)) {
      return "INVALID_USER_ID";
    }
    // check user:
    const check = await daoUser.getUser("id", user_id, true);
    if (!check) return "USER_NOT_FOUND";

    const resDelete = await daoAdmin.deleteUserAdmin(user_id);

    //Create log Activity:
    if (resDelete) {
      await daoLogActivity.createUserLog(
        tokenData.uid,
        user_id,
        "DELETE",
        tokenData.rol
      );
    }

    return "USER_DELETED";
  }

  /** =============== SUSPEND USER  =============== **/
  async adminSuspendUserServ(
    tokenData: ReqTokenDataInterface,
    user_id: string
  ) {
    //valid uuid:
    if (!isValidUUID(user_id)) {
      return "INVALID_USER_ID";
    }
    // check user:
    const check = await daoUser.getUser("id", user_id, true);
    if (!check) return "USER_NOT_FOUND";

    const resSuspend = await daoAdmin.suspendUserAdmin(user_id);

    //Create log Activity:
    if (resSuspend) {
      await daoLogActivity.createUserLog(
        tokenData.uid,
        user_id,
        "SUSPEND",
        tokenData.rol
      );
    }

    return "USER_SUSPENDED";
  }

  /** ============ REACTIVE USER  ============ **/
  async adminReactiveUserServ(
    tokenData: ReqTokenDataInterface,
    user_id: string
  ) {
    //valid uuid:
    if (!isValidUUID(user_id)) {
      return "INVALID_USER_ID";
    }
    // check user:
    const check = await daoUser.getUser("id", user_id, true);
    if (!check) return "USER_NOT_FOUND";

    //Reactive user:
    const reactiveUser = await daoAdmin.reactivateUserAdmin(user_id);

    //Log:
    if (reactiveUser) {
      await daoLogActivity.createUserLog(
        tokenData.uid,
        user_id,
        "REACTIVE",
        tokenData.rol
      );
    }
    return "USER_REACTIVATED";
  }

  /**  =====================  LIST LOGS ACTIVITY ====================  **/
  async listLogActivityServ(user_id: string, page: number, size: number) {
    //valid uuid:
    if (!isValidUUID(user_id)) {
      return "INVALID_USER_ID";
    }
    // check user:
    const check = await daoUser.getUser("id", user_id, true);
    if (!check) return "USER_NOT_FOUND";
    return await daoLogActivity.listLogActivity(user_id, page, size);
  }

  /**  =====================  LIST ALL SUPERUSER ACTIVITY ====================  **/
  async listSuperuserServ(page: number, size: number) {
    return await daoAdmin.listSuperusers(page, size);
  }
}
