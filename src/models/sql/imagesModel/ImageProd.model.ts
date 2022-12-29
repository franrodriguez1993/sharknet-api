import { DataTypes } from "sequelize";
import { sequelize } from "../../../config/sql/postgres";

const ImageProduct = sequelize.define(
  "image_product",
  {
    ip_id: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    product_id: {
      type: DataTypes.STRING,
    },
    ip_path: {
      type: DataTypes.STRING,
    },
  },
  { timestamps: true, freezeTableName: true }
);
export default ImageProduct;
