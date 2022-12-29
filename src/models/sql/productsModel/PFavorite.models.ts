import { sequelize } from "../../../config/sql/postgres";
import { DataTypes } from "sequelize";


const ProductFavorite = sequelize.define(
  "product_favorite",
  {
    pf_id: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    user_id: {
      type: DataTypes.STRING,
    },
    product_id: {
      type: DataTypes.STRING,
    },
  },
  { freezeTableName: true, timestamps: true }
);


export default ProductFavorite;
