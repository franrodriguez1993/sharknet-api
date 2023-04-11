import { sequelize } from "../../../config/sql/postgres";
import { addressObjectIF } from "../../../interfaces/userInterface/address.Interface";
import { DataTypes, Model, BuildOptions } from "sequelize";

type addressTypeModel = typeof Model & {
  new (values?: object, options?: BuildOptions): addressObjectIF;
};

const Address = sequelize.define(
  "user_address",
  {
    address_id: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    user_id: {
      type: DataTypes.STRING,
    },
    address_street: {
      type: DataTypes.STRING,
    },
    address_number: {
      type: DataTypes.STRING,
    },
    address_floor: {
      type: DataTypes.STRING,
    },
    address_apartment: {
      type: DataTypes.STRING,
    },
    address_city: {
      type: DataTypes.STRING,
    },
    address_state: {
      type: DataTypes.STRING,
    },
  },
  { freezeTableName: true, timestamps: true }
) as addressTypeModel;

export default Address;
