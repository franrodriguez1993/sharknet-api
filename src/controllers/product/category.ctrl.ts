import { Request, Response } from "express";

//Service:
import categoryProductService from "../../services/product/category.serv";

const service = new categoryProductService();

export default class categoryProductController {
  /** ============== CREATE CATEGORY ================= **/
  async createCategoryCtrl(req: Request, res: Response) {
    try {
      //data:
      const { name } = req.body;

      //Service:
      const category = await service.createCategoryServ(name);

      if (!category)
        return res.status(500).json({ status: 500, msg: "SERVER_ERROR" });
      else if (
        category === "CATEGORY_ALREADY_EXISTS" ||
        category === "CATEGORY_NAME_REQUIRED"
      )
        return res.status(400).json({ status: 400, msg: category });
      else if (category === "CATEGORY_CREATED")
        return res.status(201).json({ status: 201, msg: category });
    } catch (e: any) {
      return res.status(500).json({ status: 500, msg: e.message });
    }
  }
  /** ============= LIST CATEGORY ============== **/
  async listCategoryCtrl(req: Request, res: Response) {
    try {
      //Service:
      const list = await service.listCategoryServ();

      //return:
      return res.json({ status: 200, msg: "OK", data: list });
    } catch (e: any) {
      return res.status(500).json({ status: 500, msg: e.message });
    }
  }

  /** ========== DELETE CATEGORY =============== **/
  async deleteCategoryCtrl(req: Request, res: Response) {
    try {
      //Data:
      const { id } = req.params;

      //Service:
      const deleted = await service.deleteCategoryServ(id);

      //return:
      if (!deleted)
        return res.status(500).json({ status: 500, msg: "SERVER_ERROR" });
      else if (deleted)
        return res.json({ status: 200, msg: "CATEGORY_DELETED" });
    } catch (e: any) {
      return res.status(500).json({ status: 500, msg: e.message });
    }
  }
}
