import { sequelize } from "../../../config/sql/postgres";
import { DataTypes } from "sequelize";

const ProductCategory = sequelize.define(
  "product_category",
  {
    pc_id: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    pc_name: {
      type: DataTypes.STRING,
    },
  },
  { freezeTableName: true, timestamps: false }
);

export default ProductCategory;
