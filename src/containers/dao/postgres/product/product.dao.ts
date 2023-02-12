import basecontainer from "../../../base/base.container";
import sequelize from "sequelize";
const Op = sequelize.Op;

//Interfaces:
import { productInterface } from "../../../../interfaces/productInterface/product.interface";

//Models:
import Product from "../../../../models/sql/productsModel/product.model";
import ProductTypes from "../../../../models/sql/productsModel/PType.models";
import User from "../../../../models/sql/usersModel/User.model";
import Address from "../../../../models/sql/usersModel/Address.model";
import ProductCategory from "../../../../models/sql/productsModel/PCategory.models";
import ProductFavorite from "../../../../models/sql/productsModel/PFavorite.models";
import ImageProduct from "../../../../models/sql/imagesModel/ImageProd.model";
import Rol from "../../../../models/sql/usersModel/Rol.model";

//Utils:
import {
  getPagination,
  getPaginationData,
} from "../../../../utils/paginationfunction";

/**------------------------------------------------------------------------**/

export class daoProductSQL extends basecontainer {
  constructor() {
    super(Product);
  }

  /**~~~~~~~~~~~~~~~~~ CREATE PRODUCT ~~~~~~~~~~~~~~~~~~~**/
  async createProduct(product: productInterface) {
    try {
      return await Product.create({
        product_id: product.product_id,
        pt_id: product.pt_id,
        user_id: product.user_id, //Seller
        product_name: product.product_name.toLowerCase(),
        product_brand: product.product_brand,
        product_price: product.product_price,
        product_stock: product.product_stock,
        product_description: product.product_description,
        product_status: product.product_status,
        product_warranty: product.product_warranty,
        address_id: product.address_id,
        pc_id: product.pc_id,
      });
    } catch (e: any) {
      throw new Error(e.message);
    }
  }

  /**~~~~~~~~~~~~~~~~~ LIST PRODUCTS ~~~~~~~~~~~~~~~~~~~**/
  async listProducts(
    filter: string = null,
    attribute: string = null,
    page: number = 0,
    size: number = 0
  ) {
    //Paginatión:
    const { limit, offset } = getPagination(page, size);

    //Search options:
    const option = { where: {}, limit, offset };
    try {
      switch (filter) {
        case "search": {
          option.where = {
            [Op.or]: {
              product_name: { [Op.substring]: attribute },
              product_brand: { [Op.substring]: attribute },
            },
            product_condition: "active",
          };
          break;
        }
        case "type": {
          option.where = { pt_id: attribute, product_condition: "active" };
          break;
        }
        case "seller": {
          option.where = { user_id: attribute, product_condition: "active" };
          break;
        }
        case "user": {
          option.where = {
            user_id: attribute,
            product_condition: { [Op.ne]: "deleted" },
          };
          break;
        }
        case "brand": {
          option.where = {
            product_brand: attribute,
            product_condition: "active",
          };
          break;
        }
        case "offer": {
          option.where = {
            product_offer: { [Op.ne]: 0 },
          };
          break;
        }
        case "status": {
          option.where = {
            product_status: attribute,
            product_condition: "active",
          };
          break;
        }
        case "category": {
          option.where = { pc_id: attribute, product_condition: "active" };
        }
        default:
          option.where = { product_condition: "active" };
      }
      //Return:
      const data = await Product.findAndCountAll({
        ...option,
        attributes: { exclude: ["address_id", "user_id", "pt_id", "pc_id"] },
        order: [["createdAt", "DESC"]],
        include: [
          { model: ProductTypes },
          { model: User, attributes: ["user_username", "user_id"] },
          { model: Address },
          { model: ImageProduct, attributes: ["ip_id", "ip_path"] },
          { model: ProductCategory },
        ],
      });
      return getPaginationData(data, page, limit);
    } catch (e: any) {
      throw new Error(e.message);
    }
  }

  /** ~~~~~~~~~~~~~~~~~ SEARCHQUERYPRODUCTS ~~~~~~~~~~~~~~~~~~~**/
  async searchQueryProducts(
    attribute: string = null,
    page: number = 0,
    size: number = 0,
    status: string,
    category: string,
    type: string,
    pmin: number,
    pmax: number
  ) {
    try {
      //Paginatión:
      const { limit, offset } = getPagination(page, size);
      let options = { where: {} };

      if (status) {
        options.where = { ...options.where, product_status: status };
      }
      if (category) {
        options.where = { ...options.where, pc_id: category };
      }
      if (type) {
        options.where = { ...options.where, pt_id: type };
      }

      options.where = {
        ...options.where,
        [Op.or]: {
          product_name: { [Op.substring]: attribute },
          product_brand: { [Op.substring]: attribute },
        },
        product_condition: "active",
        product_price: { [Op.between]: [pmin, pmax] },
      };

      const data = await Product.findAndCountAll({
        ...options,
        limit,
        offset,
        order: [["createdAt", "DESC"]],
        attributes: { exclude: ["address_id", "user_id", "pt_id", "pc_id"] },
        include: [
          { model: ProductTypes },
          { model: User, attributes: ["user_username", "user_id"] },
          { model: Address },
          { model: ImageProduct, attributes: ["ip_id", "ip_path"] },
          { model: ProductCategory },
        ],
      });
      return getPaginationData(data, page, limit);
    } catch (e: any) {
      throw new Error(e.message);
    }
  }
  /**~~~~~~~~~~~~~~~~~ GET PRODUCT ~~~~~~~~~~~~~~~~~~~**/
  // "simple" is for light search just to check the product in db.
  async getProduct(id: string, simple: boolean = false) {
    try {
      //search options:
      const option = { parameters: {} };
      if (!simple) {
        option.parameters = {
          where: { product_id: id },
          attributes: { exclude: ["address_id", "user_id", "pt_id"] },
          include: [
            { model: ProductTypes, include: [{ model: ProductCategory }] },
            {
              model: User,
              attributes: ["user_username", "user_id", "user_image"],
              include: [{ model: Rol }],
            },
            { model: Address },
            { model: ImageProduct, attributes: ["ip_id", "ip_path"] },
          ],
        };
      } else {
        option.parameters = {
          where: { product_id: id },
        };
      }
      return await Product.findOne(option.parameters);
    } catch (e: any) {
      throw new Error(e.message);
    }
  }

  /**~~~~~~~~~~~~~~~~~ EDIT PRODUCT ~~~~~~~~~~~~~~~~~~~**/
  async editProduct(data: productInterface) {
    try {
      //Find Product:
      const editProduct = await Product.findOne({
        where: { product_id: data.product_id },
      });
      if (!editProduct) return "PRODUCT_NOT_FOUND";

      //dinamic fields:
      let fields = {};
      if (data.product_name) {
        fields = { ...fields, product_name: data.product_name };
      }
      if (data.product_brand) {
        fields = {
          ...fields,
          product_brand: data.product_brand.toString().toLowerCase(),
        };
      }
      if (data.product_price) {
        fields = { ...fields, product_price: data.product_price };
      }
      if (data.product_stock) {
        fields = { ...fields, product_stock: data.product_stock };
      }
      if (data.product_offer) {
        fields = { ...fields, product_offer: data.product_offer };
      }
      if (data.product_description) {
        fields = {
          ...fields,
          product_description: data.product_description,
        };
      }
      if (data.product_status) {
        fields = {
          ...fields,
          product_status: data.product_status.toString().toLowerCase(),
        };
      }
      if (data.product_warranty) {
        fields = { ...fields, product_warranty: data.product_warranty };
      }
      if (data.address_id) {
        fields = { ...fields, address_id: data.address_id };
      }
      //Edit fields:
      editProduct.set(fields);

      //return:
      return await editProduct.save();
    } catch (e: any) {
      throw new Error(e.message);
    }
  }
  /**~~~~~~~~~~~~~~~~~ UPDATE VIEWS ~~~~~~~~~~~~~~~~~~~**/
  //use product id
  async updateViews(product_id: string) {
    try {
      //check Product:
      const product: productInterface | any = await Product.findOne({
        where: { product_id },
      });
      if (!product) return "PRODUCT_NOT_FOUND";

      //Update views:
      product.set({ product_views: (product.product_views += 1) });
      await product.save();
      return "VIEWS_UPDATED";
    } catch (e: any) {
      throw new Error(e.message);
    }
  }

  /** ---------------------------------- ADD FAVORITE PRODUCT   ----------------------------- **/
  async addFavoriteProduct(pf_id: string, user_id: string, product_id: string) {
    try {
      //check if already exists:
      const isFavorite = await ProductFavorite.findOne({
        where: { user_id, product_id },
      });
      //Delete if exists, create if not.
      if (isFavorite) {
        await isFavorite.destroy();
        return "FAVORITE_ELIMINATED";
      } else {
        const added = await ProductFavorite.create({
          pf_id,
          user_id,
          product_id,
        });
        if (added) return "FAVORITE_ADDED";
      }
    } catch (e: any) {
      throw new Error(e.message);
    }
  }
  /** ---------------------------------- USER FAVORITE LIST   ----------------------------- **/
  async listFavorite(uid: string, page: number = 0, size: number = 0) {
    try {
      //Paginatión:
      const { limit, offset } = getPagination(page, size);
      const data = await ProductFavorite.findAndCountAll({
        where: { user_id: uid },
        limit,
        offset,
        order: [["createdAt", "DESC"]],
        include: [
          {
            model: Product,
            attributes: { exclude: ["user_id", "pt_id", "address_id"] },
            include: [{ model: ProductTypes }],
          },
        ],
      });
      return getPaginationData(data, page, limit);
    } catch (e: any) {
      throw new Error(e.message);
    }
  }
  /**~~~~~~~~~~~~~~~~~  PAUSE PRODUCT  ~~~~~~~~~~~~~~~~~~~**/
  async pauseProduct(product_id: string) {
    try {
      const product: productInterface | any = await Product.findOne({
        where: { product_id },
      });
      if (!product) return "PRODUCT_NOT_FOUND";
      product.set({ product_condition: "paused" });
      return await product.save();
    } catch (e: any) {
      throw new Error(e.message);
    }
  }
  /**~~~~~~~~~~~~~~~~~  REACTIVATE PRODUCT  ~~~~~~~~~~~~~~~~~~~**/
  async reactivateProduct(product_id: string) {
    try {
      const product: productInterface | any = await Product.findOne({
        where: { product_id },
      });
      if (!product) return "PRODUCT_NOT_FOUND";
      if (product.product_condition.toString() === "deleted")
        return "PRODUCT_IS_DELETED";
      product.set({ product_condition: "active" });
      return await product.save();
    } catch (e: any) {
      throw new Error(e.message);
    }
  }
  /**~~~~~~~~~~~~~~~~~  DELETE PRODUCT  ~~~~~~~~~~~~~~~~~~~**/
  async deleteProduct(product_id: string) {
    try {
      const product: productInterface | any = await Product.findOne({
        where: { product_id },
      });
      if (!product) return "PRODUCT_NOT_FOUND";
      product.set({ product_condition: "deleted" });
      return await product.save();
    } catch (e: any) {
      throw new Error(e.message);
    }
  }

  /**~~~~~~~~~~~~~~~~~  IMAGE THUMBNAIL PRODUCT  ~~~~~~~~~~~~~~~~~~~**/
  async updateThumbnail(product_id: string, path: string) {
    try {
      const product: productInterface | any = await Product.findOne({
        where: { product_id },
      });
      if (!product) return "PRODUCT_NOT_FOUND";
      product.set({ product_thumbnail: path });
      await product.save();
      return "THUMBNAIL_UPDATED";
    } catch (e: any) {
      throw new Error(e.message);
    }
  }
}
