import { DataTypes } from "sequelize";
import { sequelize } from "../../../config/sql/postgres";

const ImageUser = sequelize.define(
  "image_user",
  {
    iu_id: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    user_id: {
      type: DataTypes.STRING,
    },
    iu_path: {
      type: DataTypes.STRING,
    },
  },
  { timestamps: true, freezeTableName: true }
);
export default ImageUser;
