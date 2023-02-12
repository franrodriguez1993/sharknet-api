import { sequelize } from "../../../config/sql/postgres";
import { DataTypes } from "sequelize";

const SaleProducts = sequelize.define(
  "sale_product",
  {
    sp_id: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    user_id: {
      type: DataTypes.STRING,
    },
    sp_quantity: {
      type: DataTypes.INTEGER,
    },
    product_id: {
      type: DataTypes.STRING,
    },
    sale_id: {
      type: DataTypes.STRING,
    },
  },
  { freezeTableName: true, timestamps: true }
);

export default SaleProducts;
