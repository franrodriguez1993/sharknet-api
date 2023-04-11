import { Model } from "sequelize";

export interface addressBodyIF {
  address_id?: string;
  address_street?: string;
  address_number?: string;
  address_floor?: string;
  address_apartment?: string;
  address_city?: string;
  address_state?: string;
  user_id?: string;
}

export interface addressObjectIF extends addressBodyIF, Model<addressBodyIF> {}
