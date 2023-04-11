import { Model } from "sequelize";

export interface commentBodyIF {
  comment_id?: string;
  product_id?: string;
  user_id?: string;
  comment_body?: string;
  comment_reply?: string;
  comment_parent?: boolean;
}

export interface commentObjectIF extends commentBodyIF, Model<commentBodyIF> {}
