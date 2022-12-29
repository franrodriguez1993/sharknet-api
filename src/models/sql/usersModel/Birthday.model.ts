import { sequelize } from "../../../config/sql/postgres";

import { DataTypes } from "sequelize";

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
);

export default Birthday;
