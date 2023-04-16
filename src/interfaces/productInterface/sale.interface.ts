import { Model } from "sequelize";

export interface saleProductBodyIF {
  sp_id?: string;
  sp_quantity?: number;
  product_id?: string;
  user_id?: string;
  sale_id?: string;
}

export interface saleProductObjectIF
  extends saleProductBodyIF,
    Model<saleProductBodyIF> {}

export interface saleBodyIF {
  sale_id?: string;
  sale_seller?: string;
  sale_product?: string;
  sale_quantity?: number;
  sale_buyer?: string;
  sale_amount?: number;
  sale_instalments?: number;
  productsSale?: Array<saleProductObjectIF>;
}

export interface saleObjectIF extends saleBodyIF, Model<saleBodyIF> {}
