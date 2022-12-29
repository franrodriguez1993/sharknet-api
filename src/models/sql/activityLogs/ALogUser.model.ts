import { sequelize } from "../../../config/sql/postgres";
import { DataTypes } from "sequelize";

const ActivityLogUser = sequelize.define(
  "activity_log_user",
  {
    alu_id: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    user_id: {
      type: DataTypes.STRING,
    },
    alu_action: {
      type: DataTypes.STRING, //"delete""edit""verified""unverified""upgrade""downgrade"
    },
  },
  { timestamps: true, freezeTableName: true }
);
export default ActivityLogUser;
