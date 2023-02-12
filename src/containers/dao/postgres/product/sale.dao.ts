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
import ProductReputation from "../../../../models/sql/reputationModel/repuProduct.model";
import {
  productSale,
  saleProductsInterface,
} from "../../../../interfaces/productInterface/saleProducts.interface";
export class daoSaleSQL extends basecontainer {
  constructor() {
    super(Sale);
  }

  /** ---------------------------------- BUY PRODUCT  ----------------------------- **/
  async Buy(data: saleProductsInterface) {
    try {
      //Function to get quantity in the map function:
      function getQuantity(id: string) {
        let p = data.sale_product.find((p) => p.pid === id);
        return p.quantity;
      }
      //Check products:
      async function checkProducts(products: Array<productSale>) {
        const productList = await Promise.all(
          products.map(async (p) => {
            return await daoProduct.getProduct(p.pid, true);
          })
        );
        //Return an array of booleans
        const checkValues = productList.map((p: any) =>
          p !== null
            ? p.product_condition === "active" &&
              p.product_stock > getQuantity(p.product_id) &&
              p.user_id !== data.sale_buyer
            : false
        );

        //We return an array with the products and an array with the booleans:
        return { productList, checkValues };
      }

      const { productList, checkValues } = await checkProducts(
        data.sale_product
      );

      if (checkValues.some((i) => i === false)) {
        return "INVALID_PRODUCTS";
      }

      //Calculating price:
      const prices = productList.map((p: any) =>
        p.product_offer !== 0
          ? (p.product_price *
              getQuantity(p.product_id) *
              (100 - p.product_offer)) /
            100
          : p.product_price * getQuantity(p.product_id)
      );
      const sale_price = prices.reduce((a, b) => a + b);

      //Creating sale:
      const sale = await Sale.create({
        sale_id: data.sale_id,
        sale_buyer: data.sale_buyer,
        sale_amount: sale_price,
        sale_instalments: data.sale_instalments,
        cc_id: data.cc_id,
      });
      if (!sale) return "ERROR_CREATING";

      //create sale products:

      const productsSale = await Promise.all(
        data.sale_product.map(async (p) => {
          return await SaleProducts.create({
            sp_id: `${uuidv4()}`,
            sp_quantity: p.quantity,
            product_id: p.pid,
            user_id: p.uid,
            sale_id: data.sale_id,
          });
        })
      );

      Promise.all(
        productList.map(async (p: any) => {
          p.product_stock = p.product_stock - getQuantity(p.product_id);
          await p.save();
        })
      );

      //everything ok:
      return { sale, productsSale };
    } catch (e: any) {
      throw new Error(e.message);
    }
  }

  /** ---------------------------------- GET SALE  ----------------------------- **/
  async getSale(sale_id: string) {
    try {
      return await Sale.findOne({
        where: { sale_id },
        attributes: { exclude: ["sale_buyer"] },
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
        ],
      });
    } catch (e: any) {
      throw new Error(e.message);
    }
  }
  /** ---------------------------------- LIST USER SALES ----------------------------- **/

  async listSales(user_id: string, page: number = 0, size: number = 0) {
    try {
      //Paginatión:
      const { limit, offset } = getPagination(page, size);
      const data = await Sale.findAndCountAll({
        where: { sale_buyer: user_id },
        limit,
        offset,
        order: [["createdAt", "DESC"]],
        attributes: { exclude: ["sale_buyer"] },
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
                  "product_thumbnail",
                  "user_id",
                ],
              },
            ],
          },
          { model: UserReputation },
          { model: ProductReputation },
        ],
      });
      return getPaginationSales(data, page, limit);
    } catch (e: any) {
      throw new Error(e.message);
    }
  }

  /**  GET PRODUCTS SOLD  **/
  async getProductSold(user_id: string, page: number = 0, size: number = 0) {
    try {
      //Paginatión:
      const { limit, offset } = getPagination(page, size);
      const data = await SaleProducts.findAndCountAll({
        where: { user_id },
        attributes: { exclude: ["product_id", "user_id", "updatedAt"] },
        limit,
        offset,
        order: [["createdAt", "DESC"]],
        include: [
          { model: Product },
          {
            model: Sale,
            attributes: ["sale_id", "sale_buyer"],
            include: [{ model: UserReputation }],
          },
        ],
      });

      //return:
      return getPaginationSales(data, page, limit);
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
