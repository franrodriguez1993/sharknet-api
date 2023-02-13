//uuid:
import { v4 as uuidv4 } from "uuid";

//Model:
import NotificationUser from "../../../../models/sql/notificationModel/Notification.model";

//Interface:
import { NotificationInterface } from "../../../../interfaces/notificationInterface/notification.interface";

//pagination:
import {
  getPagination,
  getPaginationNotification,
} from "../../../../utils/paginationfunction";
import Product from "../../../../models/sql/productsModel/product.model";
export class daoNotificationSQL {
  constructor() {}

  /** -------------- CREATE NOTIFICATION -------------- **/
  async createNotification(data: NotificationInterface) {
    try {
      const notification_id = uuidv4();
      return await NotificationUser.create({
        notification_id,
        user_id: data.user_id,
        notification_type: data.notification_type,
        product_id: data.product_id,
      });
    } catch (e: any) {
      throw new Error(e.message);
    }
  }
  /** -------------- SEEN NOTIFICATION -------------- **/
  async checkSeen(notification_id: string) {
    try {
      const notification: NotificationInterface | any =
        await NotificationUser.findOne({ where: { notification_id } });
      if (!notification) return "NOTIFICATION_NOT_FOUND";
      notification.set({ notification_seen: true });
      await notification.save();
      return "NOTIFICATION_SEEN";
    } catch (e: any) {
      throw new Error(e.message);
    }
  }

  /** -------------- GET NOTIFICATIONS -------------- **/
  async getNotifications(
    user_id: string,
    page: number = 0,
    size: number = 0,
    seen: string = ""
  ) {
    try {
      const { limit, offset } = getPagination(page, size);
      const options = {
        where: {},
      };
      if (seen === "check") {
        options.where = { user_id, notification_seen: false };
      } else {
        options.where = { user_id };
      }
      const data = await NotificationUser.findAndCountAll({
        ...options,
        limit,
        offset,
        order: [["createdAt", "DESC"]],
        include: [
          { model: Product, attributes: ["product_name", "product_thumbnail"] },
        ],
      });
      return getPaginationNotification(data, page, limit);
    } catch (e: any) {
      throw new Error(e.message);
    }
  }
}
