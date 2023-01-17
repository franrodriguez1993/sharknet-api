import { Request, Response } from "express";
import { RequestExt } from "../../interfaces/userInterface/ReqExt.interface";
import reputationProductService from "../../services/reputation/RProduct.serv";

const service = new reputationProductService();

export default class reputationProductController {
  /** ===================== CREATE REPUTATION  ==================== **/

  async createReputationCtrl(req: RequestExt, res: Response) {
    try {
      //Data:
      const data = {
        pr_qualifier: req.body.qualifier,
        product_id: req.body.product,
        sale_id: req.body.sale,
        rs_id: req.body.rs_id,
        pr_description: req.body.description,
      };
      const tokenID = { uid: req.uid, rol: req.rol };

      //Service:
      const repu = await service.createRepuServ(tokenID, data);

      //Return:
      if (
        repu === "SALE_NOT_FOUND" ||
        repu === "USER_NOT_FOUND" ||
        repu === "PRODUCT_NOT_FOUND"
      )
        return res.status(404).json({ status: 404, msg: repu });
      else if (repu === "ALREADY_QUALIFIED" || repu === "UNAUTHORIZED_ACTION")
        return res.status(400).json({ status: 400, msg: repu });

      //ok:
      return res.json({ status: 201, msg: "PRODUCT_QUALIFIED" });
    } catch (e: any) {
      return res.status(500).json({ status: 500, msg: e.message });
    }
  }

  /** ==================== DELETE REPUTATION  =================== **/
  async delRepuProductCtrl(req: Request, res: Response) {
    try {
      //Data:
      const { id } = req.params;

      //Service:
      const del = await service.delRepuProductServ(id);

      //Return:
      return res.json({ status: 200, msg: "OK", data: del });
    } catch (e: any) {
      return res.status(500).json({ status: 500, msg: e.message });
    }
  }

  /** ================== LIST REPUTATION  ================== **/

  async listRepuProductCtrl(req: Request, res: Response) {
    try {
      //Data:
      const { id } = req.params;

      // query parameters:
      const page: number = parseInt(req.query.page as string);
      const size: number = parseInt(req.query.size as string);
      //Service:
      const list = await service.listRepuProductServ(id, page, size);

      //Return:
      if (!list)
        return res.status(500).json({ status: 500, msg: "SERVER_ERROR" });
      else if (list === "PRODUCT_NOT_FOUND")
        return res.status(404).json({ status: 404, msg: list });
      //Ok:
      return res.json({ status: 200, msg: "OK", data: list });
    } catch (e: any) {
      return res.status(500).json({ status: 500, msg: e.message });
    }
  }
}
