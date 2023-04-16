import { daoNotification, daoUser } from "../../containers";
import { ReqTokenDataInterface } from "../../interfaces/userInterface/reqTokenData.interface";
import { validate as isValidUUID } from "uuid";

export default class notificationService {
  /** ===========  CHECK SEEN NOTIFICATION  ============== **/
  async checkSeenServ(notification_id: string) {
    //valid uuid:
    if (!isValidUUID(notification_id)) {
      return "INVALID_NOTIFICATION_ID";
    }

    return await daoNotification.checkSeen(notification_id);
  }

  /** ================  GET NOTIFICATIONS LIST  =============== **/
  async getNotificationServ(
    tokenID: ReqTokenDataInterface,
    user_id: string,
    page: number,
    size: number,
    seen: string
  ) {
    //valid uuid:
    if (!isValidUUID(user_id)) {
      return "INVALID_USER_ID";
    }
    //Check Authorization:
    if (tokenID.uid.toString() !== user_id.toString())
      return "UNAUTHORIZED_ACTION";

    //Check user:
    const user = await daoUser.getUser("id", user_id, true);
    if (!user) return "USER_NOT_FOUND";

    return await daoNotification.getNotifications(user_id, page, size, seen);
  }
}
