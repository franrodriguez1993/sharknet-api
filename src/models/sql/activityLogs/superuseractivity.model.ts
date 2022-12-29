import { sequelize } from "../../../config/sql/postgres";
import { DataTypes } from "sequelize";

/** --------- Association models --------- **/
import ActivityLogUser from "./ALogUser.model";

/** ---------------------------------------**/
const SuperuserActivity = sequelize.define(
  "superuser_activity",
  {
    sa_id: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    su_rol: {
      type: DataTypes.STRING,
    },
    user_id: {
      type: DataTypes.STRING,
    },
    activity_event: {
      type: DataTypes.STRING,
    },
  },
  { timestamps: true, freezeTableName: true }
);

/** --------------- assosiations --------------- **/
//Actions with users:
ActivityLogUser.hasOne(SuperuserActivity, {
  foreignKey: "activity_event",
  as: "action",
});
SuperuserActivity.belongsTo(ActivityLogUser, {
  foreignKey: "activity_event",
  as: "action",
});

export default SuperuserActivity;
