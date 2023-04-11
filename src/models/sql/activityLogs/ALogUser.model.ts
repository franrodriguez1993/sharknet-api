import { sequelize } from "../../../config/sql/postgres";

import { DataTypes, Model, BuildOptions } from "sequelize";
import { LogUserObjectIF } from "../../../interfaces/logsInterface/LogUser.interface";

type LogUserTypeModel = typeof Model & {
  new (values?: object, options?: BuildOptions): LogUserObjectIF;
};

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
) as LogUserTypeModel;
export default ActivityLogUser;
