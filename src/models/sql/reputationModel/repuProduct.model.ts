import { DataTypes } from "sequelize";
import { sequelize } from "../../../config/sql/postgres";

const ProductReputation = sequelize.define(
  "product_reputation",
  {
    pr_id: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    pr_qualifier: {
      type: DataTypes.STRING,
    },
    product_id: {
      type: DataTypes.STRING,
    },
    sale_id: {
      type: DataTypes.STRING,
    },
    rs_id: {
      type: DataTypes.STRING,
    },
    pr_description: {
      type: DataTypes.STRING,
    },
  },
  { timestamps: true, freezeTableName: true }
);

export default ProductReputation;
