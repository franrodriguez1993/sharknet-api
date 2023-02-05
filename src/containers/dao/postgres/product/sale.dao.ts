import { daoProduct } from "../../..";
import { productInterface } from "../../../../interfaces/productInterface/product.interface";
import { saleInterface } from "../../../../interfaces/productInterface/sale.interface";
import Sale from "../../../../models/sql/productsModel/Sale.model";
import SaleProducts from "../../../../models/sql/productsModel/SaleProduct.models";
import basecontainer from "../../../base/base.container";
import { v4 as uuidv4 } from "uuid";
import Product from "../../../../models/sql/productsModel/product.model";
import User from "../../../../models/sql/usersModel/User.model";
import {
  getPagination,
  getPaginationSales,
} from "../../../../utils/paginationfunction";
import UserReputation from "../../../../models/sql/reputationModel/repuUser.model";
export class daoSaleSQL extends basecontainer {
  constructor() {
    super(Sale);
  }

  /** ---------------------------------- BUY PRODUCT  ----------------------------- **/
  async Buy(data: saleInterface) {
    try {
      //Check product:
      const product: productInterface | any = await daoProduct.getProduct(
        data.sale_product
      );
      if (!product) return "PRODUCT_NOT_FOUND";
      if (product.product_stock < data.sale_quantity) return "NO_STOCK";

      //Calculating price:
      let sale_price: number;
      if (product.product_offer !== 0) {
        sale_price =
          (product.product_price * data.sale_quantity * product.product_offer) /
          100;
      } else {
        sale_price = product.product_price * data.sale_quantity;
      }

      //Creating sale:
      const sale = await Sale.create({
        sale_id: data.sale_id,
        sale_seller: data.sale_seller,
        sale_buyer: data.sale_buyer,
        sale_amount: sale_price,
        sale_instalments: data.sale_instalments,
        cc_id: data.cc_id,
      });
      if (!sale) return "ERROR_CREATING";
      //create sale product:
      const sp_id = uuidv4();
      const sale_product = await SaleProducts.create({
        sp_id,
        sp_quantity: data.sale_quantity,
        product_id: data.sale_product,
        sale_id: data.sale_id,
      });
      //Checking sale product:
      if (!sale_product) {
        await this.deleteSale(data.sale_id);

        return "ERROR_CREATING";
      }
      //update product stock:
      product.product_stock = product.product_stock - data.sale_quantity;
      await product.save();

      //everything ok:
      return { sale_product, sale };
    } catch (e: any) {
      throw new Error(e.message);
    }
  }

  /** ---------------------------------- GET SALE  ----------------------------- **/
  async getSale(sale_id: string) {
    try {
      return await Sale.findOne({
        where: { sale_id },
        attributes: { exclude: ["sale_buyer", "sale_seller"] },
        include: [
          {
            model: SaleProducts,
            attributes: ["sp_id", "sp_quantity"],
            include: [
              {
                model: Product,
                attributes: [
                  "product_id",
                  "product_name",
                  "product_brand",
                  "product_price",
                ],
              },
            ],
          },
          {
            model: User,
            as: "buyer",
            attributes: ["user_username", "user_mail", "user_id"],
          },
          {
            model: User,
            as: "seller",
            attributes: ["user_username", "user_mail", "user_id"],
          },
        ],
      });
    } catch (e: any) {
      throw new Error(e.message);
    }
  }
  /** ---------------------------------- LIST USER SALES ----------------------------- **/
  //type: "sale" or "buy"
  async listSales(
    user_id: string,
    type: string,
    page: number = 0,
    size: number = 0
  ) {
    try {
      //Paginatión:
      const { limit, offset } = getPagination(page, size);
      if (type === "sale") {
        const data = await Sale.findAndCountAll({
          where: { sale_seller: user_id },
          limit,
          offset,
          order: [["createdAt", "DESC"]],
          attributes: { exclude: ["sale_buyer", "sale_seller"] },
          include: [
            {
              model: SaleProducts,
              attributes: ["sp_id", "sp_quantity"],
              include: [
                {
                  model: Product,
                  attributes: [
                    "product_id",
                    "product_name",
                    "product_brand",
                    "product_price",
                  ],
                },
              ],
            },
            {
              model: User,
              as: "buyer",
              attributes: ["user_username", "user_mail", "user_id"],
            },
            { model: UserReputation },
          ],
        });
        //return:
        return getPaginationSales(data, page, limit);
      } else {
        const data = await Sale.findAndCountAll({
          where: { sale_buyer: user_id },
          limit,
          offset,
          order: [["createdAt", "DESC"]],
          attributes: { exclude: ["sale_buyer", "sale_seller"] },
          include: [
            {
              model: SaleProducts,
              attributes: ["sp_id", "sp_quantity"],
              include: [
                {
                  model: Product,
                  attributes: [
                    "product_id",
                    "product_name",
                    "product_brand",
                    "product_price",
                  ],
                },
              ],
            },
            {
              model: User,
              as: "seller",
              attributes: ["user_username", "user_mail", "user_id"],
            },
          ],
        });
        return getPaginationSales(data, page, limit);
      }
    } catch (e: any) {
      throw new Error(e.message);
    }
  }
  /** ---------------------------------- DELETE SALE  ----------------------------- **/
  async deleteSale(sale_id: string) {
    try {
      return await Sale.destroy({ where: { sale_id } });
    } catch (e: any) {
      throw new Error(e.message);
    }
  }

  /** ---------------------------------- CREATE SALE PRODUCT  ----------------------------- **/
  async addSaleProduct(
    sp_id: string,
    sp_quantity: number,
    product_id: string,
    sale_id: string
  ) {
    try {
      //Check product:
      const product: productInterface | any = await daoProduct.getProduct(
        product_id
      );
      if (!product) return "PRODUCT_NOT_FOUND";
      if (product.product_stock < sp_quantity) return "NO_STOCK";

      //create sp:
      const sale_product = await SaleProducts.create({
        sp_id,
        sp_quantity,
        product_id,
        sale_id,
      });

      //update product stock:
      product.product_stock = product.product_stock - sp_quantity;
      await product.save();

      //Calculating price and return:
      if (product.product_offer !== 0) {
        let sale_price =
          (product.product_price * sp_quantity * product.product_offer) / 100;
        return { sale_product, sale_price };
      } else {
        let sale_price = product.product_price * sp_quantity;
        return { sale_product, sale_price };
      }
    } catch (e: any) {
      throw new Error(e.message);
    }
  }
}
