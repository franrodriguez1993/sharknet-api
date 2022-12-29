import { sequelize } from "../../../config/sql/postgres";
import { DataTypes } from "sequelize";

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
);

export default NotificationUser;
