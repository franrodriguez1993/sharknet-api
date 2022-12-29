import { sequelize } from "../../../config/sql/postgres";
import { DataTypes } from "sequelize";

/** ~~~~~~~~~~~ Associations Models ~~~~~~~~~~~~  **/
import ProductCategory from "./PCategory.models";

const ProductTypes = sequelize.define(
  "product_type",
  {
    pt_id: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    pt_name: {
      type: DataTypes.STRING,
    },
    pc_id: {
      type: DataTypes.STRING,
    },
  },
  { freezeTableName: true, timestamps: false }
);

/** ~~~~~~~~~~~ Associations ~~~~~~~~~~~~ **/

ProductCategory.hasMany(ProductTypes, {
  foreignKey: "pc_id",
});
ProductTypes.belongsTo(ProductCategory, {
  foreignKey: "pc_id",
});
export default ProductTypes;
