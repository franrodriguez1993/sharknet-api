import { Model } from "sequelize";

export interface rolBodyIF {
  rol_id?: string;
  rol_name?: string;
}
export interface rolObjectIF extends rolBodyIF, Model<rolBodyIF> {}
