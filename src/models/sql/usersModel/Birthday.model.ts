import { sequelize } from "../../../config/sql/postgres";
import { birthdayObjectIF } from "../../../interfaces/userInterface/birthday.interface";
import { DataTypes, Model, BuildOptions } from "sequelize";

type birthdayTypeModel = typeof Model & {
  new (values?: object, options?: BuildOptions): birthdayObjectIF;
};

const Birthday = sequelize.define(
  "user_birthday",
  {
    birthday_id: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    user_id: {
      type: DataTypes.STRING,
    },
    birthday_day: {
      type: DataTypes.INTEGER,
    },
    birthday_month: {
      type: DataTypes.INTEGER,
    },
    birthday_year: {
      type: DataTypes.INTEGER,
    },
  },
  { freezeTableName: true, timestamps: false }
) as birthdayTypeModel;

export default Birthday;
