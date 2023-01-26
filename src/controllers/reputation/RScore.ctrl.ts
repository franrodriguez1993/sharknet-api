import { Request, Response } from "express";
import logger from "../../utils/logger";
//Services:
import repuScoreService from "../../services/reputation/RScore.serv";
const service = new repuScoreService();

export default class repuScoreController {
  /** ================= CREATE SCORE ================= **/
  async createScoreCtrl(req: Request, res: Response) {
    try {
      //Data:
      const { name } = req.body;

      //Service:
      const score = await service.createScoreServ(name);

      //return:
      if (!score)
        return res.status(500).json({ status: 500, msg: "SERVER_ERROR" });
      else if (score === "SCORE_ALREADY_CREATED" || score === "NAME_REQUIRED")
        return res.status(400).json({ status: 400, msg: score });

      //Ok:
      return res.json({ status: 201, msg: "SCORE_CREATED" });
    } catch (e: any) {
      logger.error(e.message);
      return res.status(500).json({ status: 500, msg: e.message });
    }
  }

  /** =================== LIST SCORE ================== **/
  async listScoreCtrl(req: Request, res: Response) {
    try {
      //service:
      const list = await service.listScoreServ();
      return res.json({ status: 200, msg: "OK", data: list });
    } catch (e: any) {
      logger.error(e.message);
      return res.status(500).json({ status: 500, msg: e.message });
    }
  }

  /** =============== DELETE SCORE ================= **/
  async deleteScoreCtrl(req: Request, res: Response) {
    try {
      //Data:
      const { id } = req.params;

      //Service:
      const del = await service.deleteScoreServ(id);
      if (!del)
        return res.status(500).json({ status: 500, msg: "SERVER_ERROR" });

      //Return:
      return res.json({ status: 200, msg: "SCORE_DELETED" });
    } catch (e: any) {
      logger.error(e.message);
      return res.status(500).json({ status: 500, msg: e.message });
    }
  }
}
