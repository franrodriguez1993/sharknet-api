import { UserInterface } from "../userInterface/user.interface";

export interface productInterface {
  product_id?: string;
  pt_id?: string;
  user_id?: string;
  product_name?: string;
  product_brand?: string;
  product_price?: number;
  product_stock?: number;
  product_offer?: number;
  product_views?: number;
  product_description?: string;
  product_thumbnail?: string;
  product_status?: string;
  product_warranty?: string;
  address_id?: string;
  pc_id?: string;
  product_condition?: string;
  User?: UserInterface;
}
