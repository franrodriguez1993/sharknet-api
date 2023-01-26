import { Request, Response } from "express";
import logger from "../../utils/logger";
//Interface:
import { RequestExt } from "../../interfaces/userInterface/ReqExt.interface";
//Service:
import repuUserService from "../../services/reputation/RUser.serv";
const service = new repuUserService();

export default class repuUserController {
  /** =============== CREATE REPUTATION SELLER ================= **/
  async createRepuSellerCtrl(req: RequestExt, res: Response) {
    try {
      //Data:
      const data = {
        ur_qualifier: req.body.qualifier,
        ur_receiver: req.body.receiver,
        sale_id: req.body.sale,
        rs_id: req.body.rs_id,
        ur_rol: req.body.rol,
        ur_description: req.body.description,
      };

      //Service:
      const repu = await service.createReputationServ(req.uid, data, "seller");

      //Return:
      if (repu === "SALE_NOT_FOUND" || repu === "USER_NOT_FOUND")
        return res.status(404).json({ status: 404, msg: repu });
      else if (
        repu === "ALREADY_QUALIFIED" ||
        repu === "INCORRECT_ROL" ||
        repu === "INCORRECT_ROL_QUALIFY" ||
        repu === "INVALID_QUALIFIER"
      )
        return res.status(400).json({ status: 400, msg: repu });

      //Ok:
      return res.json({ status: 201, msg: "USER_QUALIFIED" });
    } catch (e: any) {
      logger.error(e.message);
      return res.status(500).json({ status: 500, msg: e.message });
    }
  }

  /** ================ CREATE REPUTATION BUYER ==================== **/
  async createRepuBuyerCtrl(req: RequestExt, res: Response) {
    try {
      //Data:
      const data = {
        ur_qualifier: req.body.qualifier,
        ur_receiver: req.body.receiver,
        sale_id: req.body.sale,
        rs_id: req.body.rs_id,
        ur_rol: req.body.rol,
        ur_description: req.body.description,
      };

      //Service:
      const repu = await service.createReputationServ(req.uid, data, "buyer");

      //Return:
      if (repu === "SALE_NOT_FOUND" || repu === "USER_NOT_FOUND")
        return res.status(404).json({ status: 404, msg: repu });
      else if (
        repu === "ALREADY_QUALIFIED" ||
        repu === "INCORRECT_ROL" ||
        repu === "INCORRECT_ROL_QUALIFY" ||
        repu === "INVALID_QUALIFIER"
      )
        return res.status(400).json({ status: 400, msg: repu });
      else if (repu === "UNAUTHORIZED_ACTION")
        return res.status(400).json({ status: 401, msg: repu });

      //Ok:
      return res.json({ status: 201, msg: "USER_QUALIFIED" });
    } catch (e: any) {
      logger.error(e.message);
      return res.status(500).json({ status: 500, msg: e.message });
    }
  }

  /** ================ DELETE REPUTATION USER ================= **/
  async deleteReputationCtrl(req: Request, res: Response) {
    try {
      //Data:
      const { id } = req.params;

      //Service:
      const del = await service.deleteReputationServ(id);

      //Return:
      return res.json({ status: 200, msg: "OK", data: del });
    } catch (e: any) {
      logger.error(e.message);
      return res.status(500).json({ status: 500, msg: e.message });
    }
  }

  /** =============== GET REPUTATION BUYER ================ **/
  async ListRepuBuyerCtrl(req: Request, res: Response) {
    try {
      //Data:
      const { id } = req.params;
      // query parameters:
      const page: number = parseInt(req.query.page as string);
      const size: number = parseInt(req.query.size as string);
      //Service:
      const list = await service.ListRepuBuyerServ(id, page, size);
      //Return:
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

  /** =============== GET REPUTATION SELLER =============== **/
  async listRepuSellerCtrl(req: Request, res: Response) {
    try {
      //Data:
      const { id } = req.params;
      // query parameters:
      const page: number = parseInt(req.query.page as string);
      const size: number = parseInt(req.query.size as string);
      //Service:
      const list = await service.listRepuSellerServ(id, page, size);

      //Return:
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
}
