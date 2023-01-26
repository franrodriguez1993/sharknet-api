import { Request, Response } from "express";
import logger from "../../utils/logger";
// Services:
import rolUserService from "../../services/user/rol.serv";
const service = new rolUserService();

export default class rolUserController {
  /**=================== CREATE ROL =====================**/
  async createRolCtrl(req: Request, res: Response) {
    try {
      //Data:
      const { rol_name } = req.body;
      //Service:
      const rol = await service.createRolService(rol_name);

      //Return:
      if (!rol)
        return res.status(400).json({ status: 400, msg: "ERROR_CREATING" });
      else if (rol === "NAME_ALREADY_IN_USE" || rol === "ROL_NAME_REQUIRED")
        return res.status(400).json({ status: 400, msg: rol });
      else if (rol === "ROL_CREATED")
        return res.status(201).json({ status: 201, msg: rol });
    } catch (e: any) {
      logger.error(e.message);
      return res.json({ status: 500, msg: e.message });
    }
  }

  /**===================== GET ROL =========================**/
  async getAllRolCtrl(req: Request, res: Response) {
    try {
      const list = await service.getAllRolServ();
      return res.json({ status: 200, msg: "OK", data: list });
    } catch (e: any) {
      logger.error(e.message);
      return res.json({ status: 500, msg: e.message });
    }
  }
}
