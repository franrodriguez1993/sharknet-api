import { v4 as uuidv4 } from "uuid";

import imageKitClass from "../../utils/imageKitClass";

const uploaderManager = new imageKitClass();
//Dao:
import { daoNotification, daoProduct, daoSale } from "../../containers";
import { daoUser } from "../../containers";

//Interfaces:
import {
  productBodyIF,
  productObjectIF,
} from "../../interfaces/productInterface/product.interface";
import { saleObjectIF } from "../../interfaces/productInterface/sale.interface";
import { addressObjectIF } from "../../interfaces/userInterface/address.Interface";
import { creditCardObjectIF } from "../../interfaces/userInterface/creditCard.interface";
import { ReqTokenDataInterface } from "../../interfaces/userInterface/reqTokenData.interface";
import { saleProductsInterface } from "../../interfaces/productInterface/saleProducts.interface";

export default class productService {
  /**============== CREATE PRODUCT =============**/
  async createProductServ(
    tokenData: ReqTokenDataInterface,
    product: productBodyIF
  ) {
    //Compare token ID with the seller ID:
    if (
      tokenData.uid.toString() !== product.user_id.toString() ||
      tokenData.rol.toString() === "staff" ||
      tokenData.rol === "admin"
    )
      return "UNAUTHORIZED_ACTION";

    //CheckUser:
    const isUser = await daoUser.getUser("id", product.user_id, true);
    if (!isUser) return "USER_NOT_FOUND";

    //Check address:
    const isAddress: addressObjectIF = await daoUser.getAddress(
      product.address_id
    );
    if (!isAddress) return "ADDRESS_NOT_FOUND";
    if (isAddress.user_id.toString() !== product.user_id.toString())
      return "INVALID_USER_ADDRESS";

    //Normalize data:
    product.product_brand = product.product_brand.toString().toLowerCase();
    product.product_status = product.product_status.toString().toLowerCase();

    //Create:
    product.product_id = uuidv4();
    const newProduct: productObjectIF = await daoProduct.createProduct(product);
    if (newProduct) {
      return newProduct.product_id;
    } else {
      return "ERROR_CREATING";
    }
  }

  /**=============== LIST ALL PRODUCTS ================**/
  async listProductsServ(page: number, size: number) {
    return await daoProduct.listProducts(null, null, page, size);
  }

  /**================ LIST PRODUCTS BY STATUS =================**/
  async listPStatusServ(status: string, page: number, size: number) {
    return await daoProduct.listProducts("status", status, page, size);
  }

  /**============= LIST PRODUCTS BY BRAND ===============**/

  async listPBrandServ(brand: string, page: number, size: number) {
    //Normalize brand name:
    const search = brand.split("_").join(" ");
    return await daoProduct.listProducts("brand", search, page, size);
  }

  /**============ LIST PRODUCTS BY SELLER =================**/
  async listPSellerServ(id: string, page: number, size: number) {
    //check User:
    const user = await daoUser.getUser("id", id, true);
    if (!user) return "USER_NOT_FOUND";
    return await daoProduct.listProducts("seller", id, page, size);
  }

  /**============ LIST PRODUCTS BY SELLER =================**/
  async listPUserServ(id: string, page: number, size: number) {
    //check User:
    const user = await daoUser.getUser("id", id, true);
    if (!user) return "USER_NOT_FOUND";
    return await daoProduct.listProducts("user", id, page, size);
  }

  /**============== LIST PRODUCTS BY CATEGORY =================**/
  async listPCategoryServ(pc_id: string, page: number, size: number) {
    return await daoProduct.listProducts("category", pc_id, page, size);
  }

  /**================= LIST PRODUCTS BY TYPE  ===================**/
  //Use type id
  async listPTypeServ(tid: string, page: number, size: number) {
    return await daoProduct.listProducts("type", tid, page, size);
  }

  /**============== LIST PRODUCTS BY OFFER  ==================**/
  async listProductOfferServ(page: number, size: number) {
    return await daoProduct.listProducts("offer", "", page, size);
  }

  /**=============== GET PRODUCT BY ID ===================**/
  // use product id
  async getProductServ(id: string) {
    return await daoProduct.getProduct(id);
  }

  /**============== EDIT PRODUCT ================**/
  async editProductServ(tokenData: ReqTokenDataInterface, data: productBodyIF) {
    //Check Product:
    const product: productObjectIF = await daoProduct.getProduct(
      data.product_id,
      true
    );
    if (!product) return "PRODUCT_NOT_FOUND";

    //Check Authorization:
    if (
      product.user_id.toString() !== tokenData.uid.toString() ||
      tokenData.rol === "staff" ||
      tokenData.rol === "admin"
    )
      return "UNAUTHORIZED_ACTION";

    //Check address:
    if (data.address_id !== "") {
      const checkAddress: addressObjectIF = await daoUser.getAddress(
        data.address_id
      );
      if (!checkAddress) return "ADDRESS_NOT_FOUND";
      if (checkAddress.user_id.toString() !== product.user_id.toString())
        return "INVALID_USER_ADDRESS";
    }
    //check Offer:
    if (data.product_offer) {
      if (data.product_offer > 99 || data.product_offer < 1)
        return "INVALID_PRODUCT_OFFER";
    }

    //Edit:
    const updatedProduct = await daoProduct.editProduct(data);

    return updatedProduct;
  }

  /**=============== UPDATE VIEWS =================**/
  async updateViewsServ(id: string) {
    return await daoProduct.updateViews(id);
  }

  /** =================== ADD FAVORITE PRODUCT =================== **/
  async addPFavoriteServ(
    tokenID: ReqTokenDataInterface,
    uid: string,
    pid: string
  ) {
    //Check ids:
    const isUser = await daoUser.getUser("id", uid, true);
    if (!isUser) return "USER_NOT_FOUND";
    const isProduct: productObjectIF = await daoProduct.getProduct(pid, true);
    if (!isProduct) return "PRODUCT_NOT_FOUND";
    if (isProduct.user_id.toString() === uid.toString())
      return "IS_YOUR_PRODUCT";

    //Check authorization:
    if (
      tokenID.uid.toString() !== uid.toString() ||
      tokenID.rol.toString() === "admin" ||
      tokenID.rol.toString() === "staff" ||
      tokenID.rol.toString() === "store"
    )
      return "UNAUTHORIZED_ACTION";

    //add favorite:
    const pf_id = uuidv4();
    return await daoProduct.addFavoriteProduct(pf_id, uid, pid);
  }

  /** ================ LIST FAVORITE PRODUCT =============== **/
  async listPFavoriteServ(uid: string, page: number, size: number) {
    //check User:
    const isUser = await daoUser.getUser("id", uid, true);
    if (!isUser) return "USER_NOT_FOUND";

    //list:
    return await daoProduct.listFavorite(uid, page, size);
  }

  /** ================= BUY PRODUCT  =================== **/
  async buyProductServ(
    tokenData: ReqTokenDataInterface,
    data: saleProductsInterface
  ) {
    try {
      //Check Authorization:
      if (
        tokenData.uid.toString() !== data.sale_buyer.toString() ||
        tokenData.rol.toString() !== "user"
      )
        return "UNAUTHORIZED_ACTION";
      //check users:
      const buyer = await daoUser.getUser("id", data.sale_buyer);
      if (!buyer) return "USER_NOT_FOUND";

      //check creditCard:
      const creditCard: creditCardObjectIF = await daoUser.getCreditCard(
        data.cc_id
      );
      if (!creditCard) return "CREDITCARD_NOT_FOUND";
      if (creditCard.user_id.toString() !== data.sale_buyer.toString())
        return "INVALID_CREDITCARD";

      //Create sale:
      const sale_id = uuidv4();
      const sale: any = await daoSale.Buy({ ...data, sale_id });

      if (sale) {
        await Promise.all(
          sale.productsSale.map(async (p: any) => {
            await daoNotification.createNotification({
              user_id: p.user_id,
              notification_type: "PRODUCT_SOLD",
              product_id: p.product_id,
            });
          })
        );
      }
      return sale;
    } catch (e: any) {
      throw new Error(e.message);
    }
  }

  /** ====================== GET SALE  ===================== **/
  async getSaleServ(sale_id: string) {
    return await daoSale.getSale(sale_id);
  }

  /** =================== LIST USER SALES  ================== **/

  async getUserSalesServ(
    tokenID: ReqTokenDataInterface,
    user_id: string,
    page: number,
    size: number
  ) {
    //Check user:
    const user = await daoUser.getUser("id", user_id, true);
    if (!user) return "USER_NOT_FOUND";

    //Chech Authorization:
    if (tokenID.uid.toString() !== user_id.toString())
      return "UNAUTHORIZED_ACTION";

    return await daoSale.getProductSold(user_id, page, size);
  }

  /** ================== LIST USER BUYS  ================== **/

  async getUserBuysServ(
    tokenID: ReqTokenDataInterface,
    user_id: string,
    page: number,
    size: number
  ) {
    //Check user:
    const user = await daoUser.getUser("id", user_id, true);
    if (!user) return "USER_NOT_FOUND";

    //Chech Authorization:
    if (tokenID.uid.toString() !== user_id.toString())
      return "UNAUTHORIZED_ACTION";

    return await daoSale.listSales(user_id, page, size);
  }

  /** ================ PAUSE PRODUCT  ================== **/
  async pauseProductServ(tokenID: ReqTokenDataInterface, product_id: string) {
    //Check product:
    const product: productObjectIF = await daoProduct.getProduct(
      product_id,
      true
    );
    if (!product) return "PRODUCT_NOT_FOUND";
    if (product.user_id.toString() !== tokenID.uid.toString())
      return "UNAUTHORIZED_ACTION";

    //Pause:
    return await daoProduct.pauseProduct(product_id);
  }

  /** =================== PAUSE PRODUCT  ================== **/
  async reactivateProductServ(
    tokenID: ReqTokenDataInterface,
    product_id: string
  ) {
    //Check product:
    const product: productObjectIF = await daoProduct.getProduct(
      product_id,
      true
    );
    if (!product) return "PRODUCT_NOT_FOUND";
    if (product.user_id.toString() !== tokenID.uid.toString())
      return "UNAUTHORIZED_ACTION";

    //Pause:
    return await daoProduct.reactivateProduct(product_id);
  }

  /** ================== DELETE PRODUCT  =================== **/
  async deleteProductServ(tokenID: ReqTokenDataInterface, product_id: string) {
    //Check product:
    const product: productObjectIF = await daoProduct.getProduct(
      product_id,
      true
    );
    if (!product) return "PRODUCT_NOT_FOUND";
    if (product.user_id.toString() !== tokenID.uid.toString())
      return "UNAUTHORIZED_ACTION";

    //Pause:
    return await daoProduct.deleteProduct(product_id);
  }

  /** =============== SEARCH QUERY PRODUCT  ================ **/

  async listQueryProductServ(
    search: string,
    page: number,
    size: number,
    status: string,
    category: string,
    type: string,
    pmin: number,
    pmax: number
  ) {
    //Normalize brand name:
    const newSearch = search.split("_").join(" ").toLowerCase();
    //Price params:
    if (Number.isNaN(pmin)) pmin = 0;
    if (Number.isNaN(pmax)) pmax = 10000000;
    return await daoProduct.searchQueryProducts(
      newSearch,
      page,
      size,
      status,
      category,
      type,
      pmin,
      pmax
    );
  }

  /**~~~~~~~~~~~~~~~~~  IMAGE THUMBNAIL PRODUCT  ~~~~~~~~~~~~~~~~~~~**/
  async updateThumbnailServ(
    tokenUID: string,
    product_id: string,
    image: Buffer
  ) {
    //Check Product:
    const product: productObjectIF = await daoProduct.getProduct(
      product_id,
      true
    );
    if (!product) return "PRODUCT_NOT_FOUND";
    if (product.user_id.toString() !== tokenUID.toString())
      return "INVALID_SELLER";

    //Upload image to google:
    const imageData = await uploaderManager.uploadImage(image);

    //Check path:
    if (!imageData) return "ERROR_UPLOADING_PHOTO";
    //Create path:
    const urlImg = imageData.url;
    return await daoProduct.updateThumbnail(product_id, urlImg);
  }
}
