import { Model } from "sequelize";

export interface LogUserBodyIF {
  alu_id?: string;
  user_id?: string;
  alu_action?: string;
}

export interface LogUserObjectIF extends LogUserBodyIF, Model<LogUserBodyIF> {}
