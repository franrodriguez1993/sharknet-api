import { Model } from "sequelize";

export interface birthdayBodyIF {
  birthday_id?: string;
  user_id?: string;
  birthday_day?: number;
  birthday_month?: number;
  birthday_year?: number;
}

export interface birthdayObjectIF
  extends birthdayBodyIF,
    Model<birthdayBodyIF> {}
