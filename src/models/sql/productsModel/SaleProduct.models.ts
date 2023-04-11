import { sequelize } from "../../../config/sql/postgres";
import { DataTypes, Model, BuildOptions } from "sequelize";

import { saleProductObjectIF } from "../../../interfaces/productInterface/sale.interface";

type saleProductTypeModel = typeof Model & {
  new (values?: object, options?: BuildOptions): saleProductObjectIF;
};

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
) as saleProductTypeModel;

export default SaleProducts;
