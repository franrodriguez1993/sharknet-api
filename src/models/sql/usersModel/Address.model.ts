import { sequelize } from "../../../config/sql/postgres";

import { DataTypes } from "sequelize";

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
);
export default Address;
