import { DataTypes } from "sequelize";
import { sequelize } from "../../../config/sql/postgres";

const Rol = sequelize.define(
  "Rol",
  {
    rol_id: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    rol_name: {
      type: DataTypes.STRING(40),
    },
  },
  { freezeTableName: true, timestamps: false }
);

export default Rol;
