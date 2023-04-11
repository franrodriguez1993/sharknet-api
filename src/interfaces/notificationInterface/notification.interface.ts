import { Model } from "sequelize";

export interface NotificationBodyIF {
  notification_id?: string;
  user_id?: string;
  notification_type?: string; //"NEW_COMMENT" "RESPONSE_RECEIVED""PRODUCT_SOLD"
  product_id?: string;
  notification_seen?: boolean;
}

export interface NotificationObjectIF
  extends NotificationBodyIF,
    Model<NotificationBodyIF> {}
