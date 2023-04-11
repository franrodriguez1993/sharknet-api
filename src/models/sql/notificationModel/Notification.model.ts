import { sequelize } from "../../../config/sql/postgres";
import { DataTypes, Model, BuildOptions } from "sequelize";

import { NotificationObjectIF } from "../../../interfaces/notificationInterface/notification.interface";

type NotificationTypeModel = typeof Model & {
  new (values?: object, options?: BuildOptions): NotificationObjectIF;
};

const NotificationUser = sequelize.define(
  "notification_user",
  {
    notification_id: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    user_id: {
      type: DataTypes.STRING,
    },
    notification_type: {
      type: DataTypes.STRING,
    },
    notification_seen: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    product_id: {
      type: DataTypes.STRING,
    },
  },
  { timestamps: true, freezeTableName: true }
) as NotificationTypeModel;

export default NotificationUser;
