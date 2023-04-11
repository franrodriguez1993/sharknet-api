import { Model } from "sequelize";

export interface creditCardBodyIF {
  cc_id?: string;
  user_id?: string;
  cc_name?: string;
  cc_number?: string;
  cc_date?: string;
  cc_code?: string;
  cc_bank?: string;
}

export interface creditCardObjectIF
  extends creditCardBodyIF,
    Model<creditCardBodyIF> {}
