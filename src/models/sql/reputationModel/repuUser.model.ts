import { DataTypes } from "sequelize";
import { sequelize } from "../../../config/sql/postgres";

const UserReputation = sequelize.define(
  "user_reputation",
  {
    ur_id: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    ur_qualifier: {
      type: DataTypes.STRING,
    },
    ur_receiver: {
      type: DataTypes.STRING,
    },
    sale_id: {
      type: DataTypes.STRING,
    },
    rs_id: {
      type: DataTypes.STRING,
    },
    ur_rol: {
      type: DataTypes.STRING,
    },
    ur_description: {
      type: DataTypes.STRING,
    },
  },
  { timestamps: true, freezeTableName: true }
);

export default UserReputation;
