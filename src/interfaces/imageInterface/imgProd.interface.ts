import { Model } from "sequelize";

export interface imgProductBodyIF {
  ip_id?: string;
  product_id?: string;
  ip_path?: string;
}

export interface imgProductObjectIF
  extends imgProductBodyIF,
    Model<imgProductBodyIF> {}
