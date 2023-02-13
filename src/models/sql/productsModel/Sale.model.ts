import { DataTypes } from "sequelize";
import { sequelize } from "../../../config/sql/postgres";

/** ~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Association Models ~~~~~~~~~~~~~~~~~~~~~~~~~~~~  **/
import SaleProducts from "./SaleProduct.models";

/**~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ **/
const Sale = sequelize.define(
  "sale_receipt",
  {
    sale_id: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    sale_buyer: {
      type: DataTypes.STRING,
    },
    sale_amount: {
      type: DataTypes.INTEGER,
    },
    sale_instalments: {
      type: DataTypes.INTEGER,
    },
    cc_id: {
      type: DataTypes.STRING,
    },
  },
  { freezeTableName: true, timestamps: true }
);

/** =========================  ASSOCIATIONS  ==========================  **/
//Sale products:
Sale.hasMany(SaleProducts, {
  foreignKey: "sale_id",
});
SaleProducts.belongsTo(Sale, {
  foreignKey: "sale_id",
});

/**=====================================================================**/
export default Sale;
