import { sequelize } from "../../../config/sql/postgres";
import { DataTypes, Model, BuildOptions } from "sequelize";
import { rolObjectIF } from "../../../interfaces/userInterface/rol.interface";

type rolTypeModel = typeof Model & {
  new (values?: object, options?: BuildOptions): rolObjectIF;
};

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
) as rolTypeModel;

export default Rol;
