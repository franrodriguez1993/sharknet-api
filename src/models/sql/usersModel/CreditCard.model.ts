import { sequelize } from "../../../config/sql/postgres";
import { DataTypes } from "sequelize";

/** ~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Association Models ~~~~~~~~~~~~~~~~~~~~~~~~~~~~  **/
import Sale from "../productsModel/Sale.model";

/**~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ **/

const CreditCard = sequelize.define(
  "user_creditCard",
  {
    cc_id: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    user_id: {
      type: DataTypes.STRING,
    },
    cc_name: {
      type: DataTypes.STRING,
    },
    cc_number: {
      type: DataTypes.STRING,
    },
    cc_date: {
      type: DataTypes.STRING,
    },
    cc_code: {
      type: DataTypes.STRING,
    },
    cc_bank: {
      type: DataTypes.STRING,
    },
  },
  { freezeTableName: true, timestamps: true }
);

/** =========================  ASSOCIATIONS  ==========================  **/
CreditCard.hasMany(Sale, {
  foreignKey: "cc_id",
});
Sale.belongsTo(CreditCard, {
  foreignKey: "cc_id",
});
/**=====================================================================**/
export default CreditCard;
