import { daoAdmin, daoLogActivity, daoUser } from "../../containers";

import { ReqTokenDataInterface } from "../../interfaces/userInterface/reqTokenData.interface";

/** =====================  STAFF UPGRADE  ===================== **/
export async function staffUpgradeServ(
  tokenData: ReqTokenDataInterface,
  user_id: string
) {
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

/** =====================  STAFF DOWNGRADE  ===================== **/
export async function staffDowngradeServ(
  tokenData: ReqTokenDataInterface,
  user_id: string
) {
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
/** =====================  ADMIN UPGRADE  ===================== **/
export async function adminUpgradeServ(
  tokenData: ReqTokenDataInterface,
  user_id: string
) {
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
/** =====================  ADMIN DOWNGRADE  ===================== **/
export async function adminDowngradeServ(
  tokenData: ReqTokenDataInterface,
  user_id: string
) {
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

/** =============== DELETE USER  =============== **/
export async function adminDeleteUserServ(
  tokenData: ReqTokenDataInterface,
  user_id: string
) {
  // check user:
  const check = await daoUser.getUser("id", user_id, true);
  if (!check) return "USER_NOT_FOUND";

  const resDelete = await daoAdmin.deleteUser(user_id);

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
export async function adminSuspendUserServ(
  tokenData: ReqTokenDataInterface,
  user_id: string
) {
  // check user:
  const check = await daoUser.getUser("id", user_id, true);
  if (!check) return "USER_NOT_FOUND";

  const resSuspend = await daoAdmin.suspendUser(user_id);

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
/** =============== REACTIVE USER  =============== **/
export async function adminReactiveUserServ(
  tokenData: ReqTokenDataInterface,
  user_id: string
) {
  // check user:
  const check = await daoUser.getUser("id", user_id, true);
  if (!check) return "USER_NOT_FOUND";

  //Reactive user:
  const reactiveUser = await daoAdmin.reactivateUser(user_id);

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
export async function listLogActivityServ(
  user_id: string,
  page: number,
  size: number
) {
  // check user:
  const check = await daoUser.getUser("id", user_id, true);
  if (!check) return "USER_NOT_FOUND";
  return await daoLogActivity.listLogActivity(user_id, page, size);
}

/**  =====================  LIST LOGS ACTIVITY ====================  **/
export async function listSuperuserServ(page: number, size: number) {
  return await daoAdmin.listSuperusers(page, size);
}
