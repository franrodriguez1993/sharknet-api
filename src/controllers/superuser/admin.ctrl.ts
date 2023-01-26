import { Request, Response } from "express";
import logger from "../../utils/logger";
//Interface:
import { RequestExt } from "../../interfaces/userInterface/ReqExt.interface";
//Services:
import adminService from "../../services/superuser/admin.serv";
const service = new adminService();

export default class adminController {
  /** =================  STAFF UPGRADE  ================ **/
  async staffUpgradeCtrl(req: RequestExt, res: Response) {
    try {
      //Data:
      const { id } = req.params;
      const tokenData = { uid: req.uid, rol: req.rol };
      //Service:
      const user = await service.staffUpgradeServ(tokenData, id);
      //Return:
      if (user === "USER_NOT_FOUND" || user === "ROL_NOT_FOUND")
        return res.status(404).json({ status: 404, msg: user });
      //Ok:
      return res.json({ status: 200, msg: "OK", data: user });
    } catch (e: any) {
      logger.error(e.message);
      return res.status(500).json({ status: 500, msg: e.message });
    }
  }

  /** ===================  STAFF DOWNGRADE  ================= **/
  async staffDowngradeCtrl(req: RequestExt, res: Response) {
    try {
      //Data:
      const { id } = req.params;
      const tokenData = { uid: req.uid, rol: req.rol };
      //Service:
      const user = await service.staffDowngradeServ(tokenData, id);
      //Return:
      if (user === "USER_NOT_FOUND" || user === "ROL_NOT_FOUND")
        return res.status(404).json({ status: 404, msg: user });
      //Ok:
      return res.json({ status: 200, msg: "OK", data: user });
    } catch (e: any) {
      logger.error(e.message);
      return res.status(500).json({ status: 500, msg: e.message });
    }
  }

  /** ================  ADMIN UPGRADE  ================ **/
  async adminUpgradeCtrl(req: RequestExt, res: Response) {
    try {
      //Data:
      const { id } = req.params;
      const tokenData = { uid: req.uid, rol: req.rol };
      //Service:
      const user = await service.adminUpgradeServ(tokenData, id);
      //Return:
      if (user === "USER_NOT_FOUND" || user === "ROL_NOT_FOUND")
        return res.status(404).json({ status: 404, msg: user });
      //Ok:
      return res.json({ status: 200, msg: "OK", data: user });
    } catch (e: any) {
      logger.error(e.message);
      return res.status(500).json({ status: 500, msg: e.message });
    }
  }

  /** ================  ADMIN DOWNGRADE  ================ **/
  async adminDowngradeCtrl(req: RequestExt, res: Response) {
    try {
      //Data:
      const { id } = req.params;
      const tokenData = { uid: req.uid, rol: req.rol };
      //Service:
      const user = await service.adminDowngradeServ(tokenData, id);
      //Return:
      if (user === "USER_NOT_FOUND" || user === "ROL_NOT_FOUND")
        return res.status(404).json({ status: 404, msg: user });
      //Ok:
      return res.json({ status: 200, msg: "OK", data: user });
    } catch (e: any) {
      logger.error(e.message);
      return res.status(500).json({ status: 500, msg: e.message });
    }
  }

  /** =============== DELETE USER  =============== **/
  async adminDeleteUserCtrl(req: RequestExt, res: Response) {
    try {
      //Data:
      const { id } = req.params;
      const tokenData = { uid: req.uid, rol: req.rol };
      //Service:
      const del = await service.adminDeleteUserServ(tokenData, id);

      //return:
      if (del === "USER_NOT_FOUND")
        return res.status(404).json({ status: 404, msg: del });
      //Ok:
      return res.json({ status: 200, msg: "USER_DELETED" });
    } catch (e: any) {
      logger.error(e.message);
      return res.status(500).json({ status: 500, msg: e.message });
    }
  }

  /** =============== SUSPEND USER  =============== **/
  async adminSuspendUserCtrl(req: RequestExt, res: Response) {
    try {
      //Data:
      const { id } = req.params;
      const tokenData = { uid: req.uid, rol: req.rol };

      //Service:
      const suspend = await service.adminSuspendUserServ(tokenData, id);

      //return:
      if (suspend === "USER_NOT_FOUND")
        return res.status(404).json({ status: 404, msg: suspend });
      //Ok:
      return res.json({ status: 200, msg: "USER_SUSPENDED" });
    } catch (e: any) {
      logger.error(e.message);
      return res.status(500).json({ status: 500, msg: e.message });
    }
  }

  /** =============== REACTIVE USER  =============== **/
  async adminReactiveUserCtrl(req: RequestExt, res: Response) {
    try {
      //Data:
      const { id } = req.params;
      const tokenData = { uid: req.uid, rol: req.rol };

      //Service:
      const reactive = await service.adminReactiveUserServ(tokenData, id);

      //return:
      if (reactive === "USER_NOT_FOUND")
        return res.status(404).json({ status: 404, msg: reactive });
      return res.json({ status: 200, msg: "OK", data: reactive });
    } catch (e: any) {
      logger.error(e.message);
      return res.status(500).json({ status: 500, msg: e.message });
    }
  }

  /** =============== LIST LOG ACTIVITY  =============== **/
  async listLogActivityCtrl(req: Request, res: Response) {
    try {
      //Data:
      const { id } = req.params;
      // query parameters:
      const page: number = parseInt(req.query.page as string);
      const size: number = parseInt(req.query.size as string);
      //Service:
      const list = await service.listLogActivityServ(id, page, size);

      //return:
      if (list === "USER_NOT_FOUND")
        return res.status(404).json({ status: 404, msg: list });
      return res.json({ status: 200, msg: "OK", data: list });
    } catch (e: any) {
      logger.error(e.message);
      return res.status(500).json({ status: 500, msg: e.message });
    }
  }

  /** =============== LIST ALL SUPERUSERS ACTIVITY  =============== **/
  async listSuperuserCtrl(req: Request, res: Response) {
    try {
      // query parameters:
      const page: number = parseInt(req.query.page as string);
      const size: number = parseInt(req.query.size as string);

      //Service:
      const list = await service.listSuperuserServ(page, size);

      //Return:
      if (!list)
        return res.status(500).json({ status: 500, msg: "SERVER_ERROR" });
      else if (list === "FIND_ROL_ERROR")
        return res.status(500).json({ status: 500, msg: list });
      //Ok:
      return res.json({ status: 200, msg: "OK", data: list });
    } catch (e: any) {
      logger.error(e.message);
      return res.status(500).json({ status: 500, msg: e.message });
    }
  }
}
