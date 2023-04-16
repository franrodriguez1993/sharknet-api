import { Request, Response } from "express";
import logger from "../../utils/logger";
//Interface:
import { RequestExt } from "../../interfaces/userInterface/ReqExt.interface";
//Service:
import productService from "../../services/product/product.serv";
const service = new productService();

export default class productController {
  /**============ CREATE PRODUCT ===============**/

  async createProductCtrl(req: RequestExt, res: Response) {
    try {
      //Data:
      const data = {
        pt_id: req.body.type, //id
        user_id: req.body.seller, //id
        product_name: req.body.name,
        product_brand: req.body.brand,
        product_price: req.body.price,
        product_stock: req.body.stock,
        product_description: req.body.description,
        product_status: req.body.status,
        product_warranty: req.body.warranty,
        address_id: req.body.address, //id
        pc_id: req.body.category, //id
      };
      const tokenData = {
        uid: req.uid,
        rol: req.rol,
      };
      //Service:
      const product = await service.createProductServ(tokenData, data);

      //Return:
      if (!product)
        return res.status(500).json({ status: 500, msg: "SERVER_ERROR" });
      else if (product === "USER_NOT_FOUND" || product === "ADDRESS_NOT_FOUND")
        return res.status(404).json({ status: 404, msg: product });
      else if (product === "UNAUTHORIZED_ACTION")
        return res.status(401).json({ status: 401, msg: product });
      else if (
        product === "INVALID_USER_ADDRESS" ||
        product === "ERROR_CREATING"
      )
        return res.status(400).json({ status: 400, msg: product });
      //Ok:
      return res.status(201).json({ status: 201, msg: "OK", data: product });
    } catch (e: any) {
      logger.error(e.message);
      return res.status(500).json({ status: 500, msg: e.message });
    }
  }
  /**================ LIST PRODUCTS =================**/
  async listProductsCtrl(req: Request, res: Response) {
    try {
      // query parameters:
      const page: number = parseInt(req.query.page as string);
      const size: number = parseInt(req.query.size as string);

      //service:
      const list = await service.listProductsServ(page, size);
      if (!list)
        return res.status(500).json({ status: 500, msg: "SERVER_ERROR" });

      //return:
      return res.json({ status: 200, msg: "OK", data: list });
    } catch (e: any) {
      logger.error(e.message);
      return res.status(500).json({ status: 500, msg: e.message });
    }
  }
  /**================ LIST PRODUCTS BY STATUS ====================**/
  async listPStatusCtrl(req: Request, res: Response) {
    try {
      //data:
      const { status } = req.params;
      // query parameters:
      const page: number = parseInt(req.query.page as string);
      const size: number = parseInt(req.query.size as string);

      //Service:
      const list = await service.listPStatusServ(status, page, size);
      if (!list)
        return res.status(500).json({ status: 500, msg: "SERVER_ERROR" });
      //return:
      return res.json({ status: 200, msg: "OK", data: list });
    } catch (e: any) {
      logger.error(e.message);
      return res.status(500).json({ status: 500, msg: e.message });
    }
  }

  /**================= LIST PRODUCTS BY BRAND ====================**/

  async listPBrandCtrl(req: Request, res: Response) {
    try {
      //data:
      const { brand } = req.params;
      // query parameters:
      const page: number = parseInt(req.query.page as string);
      const size: number = parseInt(req.query.size as string);
      //Service:
      const list = await service.listPBrandServ(brand, page, size);
      if (!list)
        return res.status(500).json({ status: 500, msg: "SERVER_ERROR" });
      //return:
      return res.json({ status: 200, msg: "OK", data: list });
    } catch (e: any) {
      logger.error(e.message);
      return res.status(500).json({ status: 500, msg: e.message });
    }
  }

  /**================== LIST PRODUCTS BY USER ====================**/
  //Difference: seller is for more products in "product section" and user is for user panel administration.

  async listPUserCtrl(req: Request, res: Response) {
    try {
      //data:
      const { id } = req.params;
      // query parameters:
      const page: number = parseInt(req.query.page as string);
      const size: number = parseInt(req.query.size as string);

      //Service:
      const list = await service.listPUserServ(id, page, size);

      //return:
      if (!list)
        return res.status(500).json({ status: 500, msg: "SERVER_ERROR" });
      else if (list === "USER_NOT_FOUND")
        return res.status(404).json({ status: 404, msg: list });
      //Ok:
      return res.json({ status: 200, msg: "OK", data: list });
    } catch (e: any) {
      logger.error(e.message);
      return res.status(500).json({ status: 500, msg: e.message });
    }
  }

  /**================== LIST PRODUCTS BY SELLER ====================**/
  //Difference: seller is for more products in "product section" and user is for user panel administration.
  async listPSellerCtrl(req: Request, res: Response) {
    try {
      //data:
      const { id } = req.params;
      // query parameters:
      const page: number = parseInt(req.query.page as string);
      const size: number = parseInt(req.query.size as string);

      //Service:
      const list = await service.listPSellerServ(id, page, size);

      //return:
      if (!list)
        return res.status(500).json({ status: 500, msg: "SERVER_ERROR" });
      else if (list === "USER_NOT_FOUND")
        return res.status(404).json({ status: 404, msg: list });
      //Ok:
      return res.json({ status: 200, msg: "OK", data: list });
    } catch (e: any) {
      logger.error(e.message);
      return res.status(500).json({ status: 500, msg: e.message });
    }
  }

  /**=============== LIST PRODUCTS BY CATEGORY ===================**/
  async listPCategoryCtrl(req: Request, res: Response) {
    try {
      //data:
      const { id } = req.params;
      // query parameters:
      const page: number = parseInt(req.query.page as string);
      const size: number = parseInt(req.query.size as string);

      //service:
      const list = await service.listPCategoryServ(id, page, size);
      if (!list)
        return res.status(500).json({ status: 500, msg: "SERVER_ERROR" });
      //return:
      return res.json({ status: 200, msg: "OK", data: list });
    } catch (e: any) {
      logger.error(e.message);
      return res.status(500).json({ status: 500, msg: e.message });
    }
  }

  /**================= LIST PRODUCTS BY TYPE  =================**/
  async listPTypeCtrl(req: Request, res: Response) {
    try {
      //data:
      const { id } = req.params;
      // query parameters:
      const page: number = parseInt(req.query.page as string);
      const size: number = parseInt(req.query.size as string);
      //Service:
      const list = await service.listPTypeServ(id, page, size);
      if (!list)
        return res.status(500).json({ status: 500, msg: "SERVER_ERROR" });
      //return:
      return res.json({ status: 200, msg: "OK", data: list });
    } catch (e: any) {
      logger.error(e.message);
      return res.status(500).json({ status: 500, msg: e.message });
    }
  }

  /**================ LIST PRODUCTS BY OFFER  ================**/

  async listProductOfferCtrl(req: Request, res: Response) {
    try {
      // query parameters:
      const page: number = parseInt(req.query.page as string);
      const size: number = parseInt(req.query.size as string);

      //Service:
      const list = await service.listProductOfferServ(page, size);

      //Return:
      if (!list)
        return res.status(500).json({ status: 500, msg: "SERVER_ERROR" });
      return res.json({ status: 200, msg: "OK", data: list });
    } catch (e: any) {
      logger.error(e.message);
      return res.status(500).json({ status: 500, msg: e.message });
    }
  }

  /**============= GET PRODUCT BY ID ================**/
  async getProductCtrl(req: Request, res: Response) {
    try {
      //data:
      const { id } = req.params;

      //Service:
      const resService = await service.getProductServ(id);

      //return:
      if (!resService)
        return res.status(404).json({ status: 404, msg: "PRODUCT_NOT_FOUND" });
      else if (resService === "INVALID_PRODUCT_ID") {
        return res.status(400).json({ status: 400, msg: resService });
      }
      return res.json({ status: 200, msg: "OK", data: resService });
    } catch (e: any) {
      logger.error(e.message);
      return res.status(500).json({ status: 500, msg: e.message });
    }
  }

  /**================= EDIT PRODUCT ==================**/
  async editProductCtrl(req: RequestExt, res: Response) {
    try {
      //data:
      const data = {
        user_id: req.uid,
        product_id: req.params.id,
        pt_id: req.body.type,
        product_name: req.body.name,
        product_brand: req.body.brand,
        product_price: req.body.price,
        product_stock: req.body.stock,
        product_offer: req.body.offer,
        product_description: req.body.description,
        product_status: req.body.status,
        product_warranty: req.body.warranty,
        address_id: req.body.address,
      };
      const tokenData = { uid: req.uid, rol: req.rol };

      //service:
      const resService = await service.editProductServ(tokenData, data);

      //Return:
      if (!resService)
        return res.status(500).json({ status: 500, msg: "SERVER_ERROR" });
      else if (
        resService === "PRODUCT_NOT_FOUND" ||
        resService === "ADDRESS_NOT_FOUND"
      )
        return res.status(404).json({ status: 404, msg: resService });
      else if (resService === "UNAUTHORIZED_ACTION")
        return res.status(401).json({ status: 401, msg: resService });
      else if (
        resService === "INVALID_PRODUCT_OFFER" ||
        resService === "INVALID_USER_ADDRESS" ||
        resService === "INVALID_PRODUCT_ID"
      )
        return res.status(400).json({ status: 400, msg: resService });
      //Ok:
      return res.json({ status: 200, msg: "OK", data: resService });
    } catch (e: any) {
      logger.error(e.message);
      return res.status(500).json({ status: 500, msg: e.message });
    }
  }
  /**============= UPDATE VIEWS =================**/
  async updateViewsCtrl(req: Request, res: Response) {
    try {
      //data:
      const { id } = req.params;

      //Service:
      const resService = await service.updateViewsServ(id);

      //return:
      if (!resService)
        return res.status(500).json({ status: 500, msg: "SERVER_ERROR" });
      else if (resService === "PRODUCT_NOT_FOUND")
        return res.status(404).json({ status: 404, msg: resService });
      else if (resService === "INVALID_PRODUCT_ID") {
        return res.status(400).json({ status: 400, msg: resService });
      } else if (resService === "VIEWS_UPDATED")
        return res.json({ status: 200, msg: "OK", data: resService });
    } catch (e: any) {
      logger.error(e.message);
      return res.status(500).json({ status: 500, msg: e.message });
    }
  }
  /** ===================== ADD FAVORITE PRODUCT ====================== **/

  async addPFavoriteCtrl(req: RequestExt, res: Response) {
    try {
      //Data:
      const { user, product } = req.body;
      const tokenID = { uid: req.uid, rol: req.rol };

      //Service:
      const resService = await service.addPFavoriteServ(tokenID, user, product);

      //return:
      if (resService === "USER_NOT_FOUND" || resService === "PRODUCT_NOT_FOUND")
        return res.status(404).json({ status: 404, msg: resService });
      else if (
        resService === "IS_YOUR_PRODUCT" ||
        resService === "UNAUTHORIZED_ACTION" ||
        resService === "INVALID_PRODUCT_ID"
      )
        return res.status(400).json({ status: 400, msg: resService });
      //ok:
      else if (resService === "FAVORITE_ADDED")
        return res.json({ status: 201, msg: resService });
      else if (resService === "FAVORITE_ELIMINATED")
        return res.json({ status: 200, msg: resService });
    } catch (e: any) {
      logger.error(e.message);
      return res.status(500).json({ status: 500, msg: e.message });
    }
  }

  /** ===================== LIST FAVORITE PRODUCT ======================= **/
  async listPFavoriteCtrl(req: Request, res: Response) {
    try {
      //Data:
      const { id } = req.params;
      // query parameters:
      const page: number = parseInt(req.query.page as string);
      const size: number = parseInt(req.query.size as string);
      //Service:
      const resService = await service.listPFavoriteServ(id, page, size);

      //Return:
      if (!resService)
        return res.status(500).json({ status: 500, msg: "SERVER_ERROR" });
      else if (resService === "INVALID_USER_ID") {
        return res.status(400).json({ status: 400, msg: resService });
      } else if (resService === "USER_NOT_FOUND")
        return res.status(404).json({ status: 404, msg: resService });

      //ok:
      return res.json({ status: 200, msg: "OK", data: resService });
    } catch (e: any) {
      logger.error(e.message);
      return res.status(500).json({ status: 500, msg: e.message });
    }
  }

  /** ======================= BUY PRODUCT ========================= **/
  async buyProductCtrl(req: RequestExt, res: Response) {
    try {
      //Data:
      const bodySale = {
        sale_buyer: req.body.buyer,
        sale_product: req.body.products,
        sale_instalments: req.body.instalments,
      };
      const tokenData = {
        uid: req.uid,
        rol: req.rol,
      };

      //Service:
      const sale = await service.buyProductServ(tokenData, bodySale);

      //Return:
      if (!sale)
        return res.status(500).json({ status: 500, msg: "SERVER_ERROR" });
      else if (sale === "USER_NOT_FOUND" || sale === "PRODUCT_NOT_FOUND")
        return res.status(404).json({ status: 404, msg: sale });
      else if (
        sale === "ERROR_CREATING" ||
        sale === "INVALID_PRODUCTS" ||
        sale === "INVALID_USER_ID"
      )
        return res.status(400).json({ status: 400, msg: sale });
      else if (sale === "UNAUTHORIZED_ACTION")
        return res.status(401).json({ status: 401, msg: sale });
      //Ok:
      return res.json({ status: 200, msg: "OK", data: sale });
    } catch (e: any) {
      logger.error(e.message);
      return res.status(500).json({ status: 500, msg: e.message });
    }
  }

  /** ===================== GET SALE  ====================== **/
  async getSaleCtrl(req: Request, res: Response) {
    try {
      //Data:
      const { id } = req.params;
      //Service:
      const resService = await service.getSaleServ(id);

      //Return:
      if (!resService)
        return res.status(404).json({ status: 404, msg: "SALE_NOT_FOUND" });
      else if (resService === "INVALID_SALE_ID") {
        return res.status(400).json({ status: 400, msg: resService });
      }
      //Ok:
      return res.json({ status: 200, msg: "OK", data: resService });
    } catch (e: any) {
      logger.error(e.message);
      return res.status(500).json({ status: 500, msg: e.message });
    }
  }

  /** ==================== LIST USER SALES  ======================= **/
  async getUserSalesCtrl(req: RequestExt, res: Response) {
    try {
      //Data:
      const { id } = req.params;
      const tokenID = { uid: req.uid, rol: req.rol };
      // query parameters:
      const page: number = parseInt(req.query.page as string);
      const size: number = parseInt(req.query.size as string);

      //Service:
      const resService = await service.getUserSalesServ(
        tokenID,
        id,
        page,
        size
      );

      //Return:
      if (!resService)
        return res.status(500).json({ status: 500, msg: "SERVER_ERROR" });
      else if (resService === "UNAUTHORIZED_ACTION")
        return res.status(401).json({ status: 401, msg: resService });
      else if (resService === "INVALID_SALE_ID") {
        return res.status(400).json({ status: 400, msg: resService });
      } else if (resService === "USER_NOT_FOUND")
        return res.status(404).json({ status: 404, msg: resService });

      //Ok:
      return res.json({ status: 200, msg: "OK", data: resService });
    } catch (e: any) {
      logger.error(e.message);
      return res.status(500).json({ status: 500, msg: e.message });
    }
  }

  /** ======================= LIST USER BUYS  ======================= **/
  async getUserBuysCtrl(req: RequestExt, res: Response) {
    try {
      //Data:
      const { id } = req.params;
      const tokenID = { uid: req.uid, rol: req.rol };
      // query parameters:
      const page: number = parseInt(req.query.page as string);
      const size: number = parseInt(req.query.size as string);

      //Service:
      const resService = await service.getUserBuysServ(tokenID, id, page, size);

      //Return:
      if (!resService)
        return res.status(500).json({ status: 500, msg: "SERVER_ERROR" });
      else if (resService === "UNAUTHORIZED_ACTION")
        return res.status(401).json({ status: 401, msg: resService });
      else if (resService === "INVALID_SALE_ID") {
        return res.status(400).json({ status: 400, msg: resService });
      } else if (resService === "USER_NOT_FOUND")
        return res.status(404).json({ status: 404, msg: resService });

      //Ok:
      return res.json({ status: 200, msg: "OK", data: resService });
    } catch (e: any) {
      logger.error(e.message);
      return res.status(500).json({ status: 500, msg: e.message });
    }
  }

  /** ====================== PAUSE PRODUCT  ========================== **/
  async pauseProductCtrl(req: RequestExt, res: Response) {
    try {
      //Data:
      const { id } = req.params;
      const tokenID = { uid: req.uid, rol: req.rol };

      //Service:
      const resService = await service.pauseProductServ(tokenID, id);

      //Return:
      if (!resService)
        return res.status(500).json({ status: 500, msg: "SERVER_ERROR" });
      else if (resService === "PRODUCT_NOT_FOUND")
        return res.status(404).json({ status: 404, msg: resService });
      else if (resService === "INVALID_PRODUCT_ID") {
        return res.status(400).json({ status: 400, msg: resService });
      } else if (resService === "UNAUTHORIZED_ACTION")
        return res.status(401).json({ status: 401, msg: resService });
      //Ok:
      return res.json({ status: 200, msg: "PRODUCT_PAUSED" });
    } catch (e: any) {
      logger.error(e.message);
      return res.status(500).json({ status: 500, msg: e.message });
    }
  }

  /** ===================== REACTIVATE PRODUCT  ============== **/

  async reactivateProductCtrl(req: RequestExt, res: Response) {
    try {
      //Data:
      const { id } = req.params;
      const tokenID = { uid: req.uid, rol: req.rol };

      //Service:
      const resService = await service.reactivateProductServ(tokenID, id);

      //Return:
      if (!resService)
        return res.status(500).json({ status: 500, msg: "SERVER_ERROR" });
      else if (resService === "PRODUCT_NOT_FOUND")
        return res.status(404).json({ status: 404, msg: resService });
      else if (resService === "UNAUTHORIZED_ACTION")
        return res.status(401).json({ status: 401, msg: resService });
      else if (resService === "INVALID_PRODUCT_ID")
        return res.status(400).json({ status: 400, msg: resService });
      else if (resService === "PRODUCT_IS_DELETED")
        return res.status(400).json({ status: 400, msg: resService });
      //Ok:
      return res.json({ status: 200, msg: "PRODUCT_REACTIVATED" });
    } catch (e: any) {
      logger.error(e.message);
      return res.status(500).json({ status: 500, msg: e.message });
    }
  }

  /** ====================== DELETE PRODUCT  ======================= **/
  async deleteProductCtrl(req: RequestExt, res: Response) {
    try {
      //Data:
      const { id } = req.params;
      const tokenID = { uid: req.uid, rol: req.rol };

      //Service:
      const resService = await service.deleteProductServ(tokenID, id);

      //Return:
      if (!resService)
        return res.status(500).json({ status: 500, msg: "SERVER_ERROR" });
      else if (resService === "PRODUCT_NOT_FOUND")
        return res.status(404).json({ status: 404, msg: resService });
      else if (resService === "INVALID_PRODUCT_ID")
        return res.status(400).json({ status: 400, msg: resService });
      else if (resService === "UNAUTHORIZED_ACTION")
        return res.status(401).json({ status: 401, msg: resService });
      //Ok:
      return res.json({ status: 200, msg: "PRODUCT_DELETED" });
    } catch (e: any) {
      logger.error(e.message);
      return res.status(500).json({ status: 500, msg: e.message });
    }
  }

  /** ==================== SEARCH QUERY PRODUCT  ===================== **/
  async listQueryProductCtrl(req: Request, res: Response) {
    try {
      //data:
      const { search } = req.params;
      // query parameters:
      const page: number = parseInt(req.query.page as string);
      const size: number = parseInt(req.query.size as string);
      const category: string = req.query.category as string;
      const status: string = req.query.status as string;
      const type: string = req.query.type as string;
      const pmin: number = parseInt(req.query.pmin as string);
      const pmax: number = parseInt(req.query.pmax as string);

      //Service:
      const list = await service.listQueryProductServ(
        search,
        page,
        size,
        status,
        category,
        type,
        pmin,
        pmax
      );

      //Return:
      if (!list)
        return res.status(500).json({ status: 500, msg: "SERVER_ERROR" });
      return res.json({ status: 200, msg: "OK", data: list });
    } catch (e: any) {
      logger.error(e.message);
      return res.status(500).json({ status: 500, msg: e.message });
    }
  }

  /**~~~~~~~~~~~~~~~~~  IMAGE THUMBNAIL PRODUCT  ~~~~~~~~~~~~~~~~~~~**/
  async updateThumbnailCtrl(req: RequestExt, res: Response) {
    try {
      //Data:
      const { id } = req.params;
      const { file, uid } = req;

      //Service:
      const resUpdate = await service.updateThumbnailServ(uid, id, file.buffer);

      //Return:
      if (resUpdate === "PRODUCT_NOT_FOUND") {
        return res.status(404).json({ status: 404, msg: resUpdate });
      } else if (resUpdate === "INVALID_SELLER" || "INVALID_PRODUCT_ID") {
        return res.status(400).json({ status: 400, msg: resUpdate });
      } else if (resUpdate === "ERROR_UPLOADING_PHOTO") {
        return res.status(500).json({ status: 500, msg: resUpdate });
      } else if (resUpdate === "THUMBNAIL_UPDATED") {
        return res.status(201).json({ status: 201, msg: resUpdate });
      }
    } catch (e: any) {
      logger.error(e.message);
      return res.status(500).json({ status: 500, msg: e.message });
    }
  }
}
