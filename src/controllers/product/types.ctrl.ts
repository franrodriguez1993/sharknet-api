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
      const newType = await service.createPTypesServ(name, category);

      //Return:
      if (!newType)
        return res.status(500).json({ status: 500, msg: "SERVER_ERROR" });
      else if (
        newType === "PRODUCT_TYPE_ALREADY_EXISTS" ||
        newType === "CATEGORY_ID_REQUIRED" ||
        newType === "PRODUCT_TYPE_REQUIRED"
      )
        return res.status(400).json({ status: 400, msg: newType });
      else if (newType === "PRODUCT_TYPE_CREATED")
        return res.status(201).json({ status: 201, msg: newType });
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
      const deleteRes = await service.delPTypesServ(id);
      if (!deleteRes)
        return res.status(500).json({ status: 500, msg: "SERVER_ERROR" });
      else return res.json({ status: 200, msg: "PRODUCT_TYPE_DELETED" });
    } catch (e: any) {
      logger.error(e.message);
      return res.status(500).json({ status: 500, msg: e.message });
    }
  }
}
