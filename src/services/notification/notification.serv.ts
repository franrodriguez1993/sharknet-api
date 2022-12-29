import { daoNotification, daoUser } from "../../containers";
import { ReqTokenDataInterface } from "../../interfaces/userInterface/reqTokenData.interface";

/** ======================  CHECK SEEN NOTIFICATION  ====================== **/
export async function checkSeenServ(notification_id: string) {
  return await daoNotification.checkSeen(notification_id);
}

/** ======================  GET NOTIFICATIONS LIST  ====================== **/
export async function getNotificationServ(
  tokenID: ReqTokenDataInterface,
  user_id: string,
  page: number,
  size: number
) {
  //Check Authorization:
  if (tokenID.uid.toString() !== user_id.toString())
    return "UNAUTHORIZED_ACTION";

  //Check user:
  const user = await daoUser.getUser("id", user_id, true);
  if (!user) return "USER_NOT_FOUND";

  return await daoNotification.getNotifications(user_id, page, size);
}
