import { Request, Response } from "express";
import logger from "../../utils/logger";
//Interface:
import { RequestExt } from "../../interfaces/userInterface/ReqExt.interface";
//Service:
import staffService from "../../services/superuser/staff.serv";
const service = new staffService();

export default class staffController {
  /** =============== VERIFY USER  =============== **/
  async verifyUserCtrl(req: RequestExt, res: Response) {
    try {
      //Data:
      const { id } = req.params;
      const tokenData = { uid: req.uid, rol: req.rol };

      //Service:
      const user = await service.verifyUserServ(tokenData, id);

      //Return:
      if (user === "USER_NOT_FOUND" || user === "ROL_NOT_FOUND")
        return res.status(404).json({ status: 404, msg: user });
      else if (user === "INVALID_USER_ID") {
        return res.status(400).json({ status: 400, msg: user });
      }
      //Ok:
      return res.json({ status: 200, msg: "OK", data: user });
    } catch (e: any) {
      logger.error(e.message);
      return res.status(500).json({ status: 500, msg: e.message });
    }
  }

  /** =============== UNVERIFY USER  =============== **/
  async unverifyUserCtrl(req: RequestExt, res: Response) {
    try {
      //Data:
      const { id } = req.params;
      const tokenData = { uid: req.uid, rol: req.rol };
      //Service:
      const user = await service.unverifyUserServ(tokenData, id);

      //Return:
      if (user === "USER_NOT_FOUND" || user === "ROL_NOT_FOUND")
        return res.status(404).json({ status: 404, msg: user });
      else if (user === "INVALID_USER_ID") {
        return res.status(400).json({ status: 400, msg: user });
      }
      //Ok:
      return res.json({ status: 200, msg: "OK", data: user });
    } catch (e: any) {
      logger.error(e.message);
      return res.status(500).json({ status: 500, msg: e.message });
    }
  }

  /** =============== DELETE USER  =============== **/
  async deleteUserCtrl(req: RequestExt, res: Response) {
    try {
      //Data:
      const { id } = req.params;
      const tokenData = { uid: req.uid, rol: req.rol };
      //Service:
      const del = await service.deleteUserServ(tokenData, id);

      //Return
      if (del === "UNAUTHORIZED_DELETE_ROL")
        return res.status(401).json({ status: 401, msg: del });
      else if (del === "USER_NOT_FOUND")
        return res.status(404).json({ status: 404, msg: del });
      else if (del === "INVALID_USER_ID") {
        return res.status(400).json({ status: 400, msg: del });
      }
      //Ok:
      return res.json({ status: 200, msg: "OK", data: del });
    } catch (e: any) {
      logger.error(e.message);
      return res.status(500).json({ status: 500, msg: e.message });
    }
  }

  /** =============== SUSPEND USER  =============== **/
  async suspendUserCtrl(req: RequestExt, res: Response) {
    try {
      //Data:
      const { id } = req.params;
      const tokenData = { uid: req.uid, rol: req.rol };

      //Service:
      const suspend = await service.suspendUserServ(tokenData, id);

      //Return
      if (suspend === "UNAUTHORIZED_SUSPEND_ROL")
        return res.status(401).json({ status: 401, msg: suspend });
      else if (suspend === "USER_NOT_FOUND")
        return res.status(404).json({ status: 404, msg: suspend });
      else if (suspend === "INVALID_USER_ID") {
        return res.status(400).json({ status: 400, msg: suspend });
      }

      //Ok:
      return res.json({ status: 200, msg: "OK", data: suspend });
    } catch (e: any) {
      logger.error(e.message);
      return res.status(500).json({ status: 500, msg: e.message });
    }
  }

  /** =============== REACTIVATE USER  =============== **/
  async reactiveUserCtrl(req: RequestExt, res: Response) {
    try {
      //Data:
      const { id } = req.params;
      const tokenData = { uid: req.uid, rol: req.rol };

      //Service:
      const reactive = await service.reactiveUserServ(tokenData, id);

      //Return
      if (reactive === "UNAUTHORIZED_REACTIVE_ROL")
        return res.status(401).json({ status: 401, msg: reactive });
      else if (reactive === "USER_NOT_FOUND")
        return res.status(404).json({ status: 404, msg: reactive });
      else if (reactive === "INVALID_USER_ID") {
        return res.status(400).json({ status: 400, msg: reactive });
      }
      //Ok:
      return res.json({ status: 200, msg: "OK", data: reactive });
    } catch (e: any) {
      logger.error(e.message);
      return res.status(500).json({ status: 500, msg: e.message });
    }
  }
}
