import { DataTypes } from "sequelize";
import { sequelize } from "../../../config/sql/postgres";

/** ~~~~~~~~~~~~~~~~ Association Models ~~~~~~~~~~~~~~~~~~~**/
import UserReputation from "./repuUser.model";
import ProductReputation from "./repuProduct.model";
/**~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~**/

const ReputationScore = sequelize.define(
  "reputation_score",
  {
    rs_id: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    rs_name: {
      type: DataTypes.STRING,
    },
  },
  { timestamps: false, freezeTableName: true }
);

/** ~~~~~~~~~~~~~~~~ Associations ~~~~~~~~~~~~~~~~ **/
//User:
ReputationScore.hasMany(UserReputation, {
  foreignKey: "rs_id",
});
UserReputation.belongsTo(ReputationScore, {
  foreignKey: "rs_id",
});
//Product:
ReputationScore.hasMany(ProductReputation, {
  foreignKey: "rs_id",
});
ProductReputation.belongsTo(ReputationScore, {
  foreignKey: "rs_id",
});
export default ReputationScore;
