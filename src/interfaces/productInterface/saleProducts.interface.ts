export interface productSale {
  pid: string;
  uid: string;
  quantity: number;
}

export interface saleProductsInterface {
  sale_id?: string;
  sale_seller?: string;
  sale_product?: Array<productSale>;
  sale_quantity?: number;
  sale_buyer?: string;
  sale_amount?: number;
  sale_instalments?: number;
  cc_id?: string;
}
