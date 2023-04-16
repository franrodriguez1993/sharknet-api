import { Request, Response } from "express";
import logger from "../../utils/logger";
//Services:
import typesProductService from "../../services/product/types.serv";

const service = new typesProductService();

export default class typesProductController {
  /**============= CREATE PRODUCT TYPE =================**/
  async createPTypesCtrl(req: Request, res: Response) {
    try {
      //data:
      const { name, category } = req.body;

      //Service:
      const resService = await service.createPTypesServ(name, category);

      //Return:
      if (!resService)
        return res.status(500).json({ status: 500, msg: "SERVER_ERROR" });
      else if (
        resService === "PRODUCT_TYPE_ALREADY_EXISTS" ||
        resService === "CATEGORY_ID_REQUIRED" ||
        resService === "PRODUCT_TYPE_REQUIRED" ||
        resService === "INVALID_PRODUCT_CATEGORY_ID"
      )
        return res.status(400).json({ status: 400, msg: resService });
      else if (resService === "PRODUCT_TYPE_CREATED")
        return res.status(201).json({ status: 201, msg: resService });
    } catch (e: any) {
      logger.error(e.message);
      return res.status(500).json({ status: 500, msg: e.message });
    }
  }

  /**=================== LIST PRODUCT TYPE ===================**/
  async listPTypesCtrl(req: Request, res: Response) {
    try {
      //Service:
      const list = await service.listPTypesServ();

      //Return:
      return res.json({ status: 200, msg: "OK", data: list });
    } catch (e: any) {
      logger.error(e.message);
      return res.status(500).json({ status: 500, msg: e.message });
    }
  }

  /**============== DELETE PRODUCT TYPE ================**/

  async delPTypesCtrl(req: Request, res: Response) {
    try {
      //data:
      const { id } = req.params;

      //Service:
      const resService = await service.delPTypesServ(id);
      if (!resService)
        return res.status(500).json({ status: 500, msg: "SERVER_ERROR" });
      else if (resService === "INVALID_PRODUCT_TYPE_ID") {
        return res.status(400).json({ status: 400, msg: resService });
      } else return res.json({ status: 200, msg: "PRODUCT_TYPE_DELETED" });
    } catch (e: any) {
      logger.error(e.message);
      return res.status(500).json({ status: 500, msg: e.message });
    }
  }
}
