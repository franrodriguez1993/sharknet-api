import { DataTypes, Model, BuildOptions } from "sequelize";
import { sequelize } from "../../../config/sql/postgres";
import { imgProductObjectIF } from "../../../interfaces/imageInterface/imgProd.interface";

type imgProductTypeModel = typeof Model & {
  new (values?: object, options?: BuildOptions): imgProductObjectIF;
};
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
) as imgProductTypeModel;

export default ImageProduct;
