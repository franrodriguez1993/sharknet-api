import { Request, Response } from "express";
import { RequestExt } from "../../interfaces/userInterface/ReqExt.interface";
//Services:
import {
  staffUpgradeServ,
  staffDowngradeServ,
  adminUpgradeServ,
  adminDowngradeServ,
  adminSuspendUserServ,
  adminDeleteUserServ,
  adminReactiveUserServ,
  listLogActivityServ,
  listSuperuserServ,
} from "../../services/superuser/admin.serv";

/** =====================  STAFF UPGRADE  ===================== **/
export async function staffUpgradeCtrl(req: RequestExt, res: Response) {
  try {
    //Data:
    const { id } = req.params;
    const tokenData = { uid: req.uid, rol: req.rol };
    //Service:
    const user = await staffUpgradeServ(tokenData, id);
    //Return:
    if (user === "USER_NOT_FOUND" || user === "ROL_NOT_FOUND")
      return res.status(404).json({ status: 404, msg: user });
    //Ok:
    return res.json({ status: 200, msg: "OK", data: user });
  } catch (e: any) {
    return res.status(500).json({ status: 500, msg: e.message });
  }
}

/** =====================  STAFF DOWNGRADE  ===================== **/
export async function staffDowngradeCtrl(req: RequestExt, res: Response) {
  try {
    //Data:
    const { id } = req.params;
    const tokenData = { uid: req.uid, rol: req.rol };
    //Service:
    const user = await staffDowngradeServ(tokenData, id);
    //Return:
    if (user === "USER_NOT_FOUND" || user === "ROL_NOT_FOUND")
      return res.status(404).json({ status: 404, msg: user });
    //Ok:
    return res.json({ status: 200, msg: "OK", data: user });
  } catch (e: any) {
    return res.status(500).json({ status: 500, msg: e.message });
  }
}
/** =====================  ADMIN UPGRADE  ===================== **/
export async function adminUpgradeCtrl(req: RequestExt, res: Response) {
  try {
    //Data:
    const { id } = req.params;
    const tokenData = { uid: req.uid, rol: req.rol };
    //Service:
    const user = await adminUpgradeServ(tokenData, id);
    //Return:
    if (user === "USER_NOT_FOUND" || user === "ROL_NOT_FOUND")
      return res.status(404).json({ status: 404, msg: user });
    //Ok:
    return res.json({ status: 200, msg: "OK", data: user });
  } catch (e: any) {
    return res.status(500).json({ status: 500, msg: e.message });
  }
}

/** =====================  ADMIN DOWNGRADE  ===================== **/
export async function adminDowngradeCtrl(req: RequestExt, res: Response) {
  try {
    //Data:
    const { id } = req.params;
    const tokenData = { uid: req.uid, rol: req.rol };
    //Service:
    const user = await adminDowngradeServ(tokenData, id);
    //Return:
    if (user === "USER_NOT_FOUND" || user === "ROL_NOT_FOUND")
      return res.status(404).json({ status: 404, msg: user });
    //Ok:
    return res.json({ status: 200, msg: "OK", data: user });
  } catch (e: any) {
    return res.status(500).json({ status: 500, msg: e.message });
  }
}

/** =============== DELETE USER  =============== **/
export async function adminDeleteUserCtrl(req: RequestExt, res: Response) {
  try {
    //Data:
    const { id } = req.params;
    const tokenData = { uid: req.uid, rol: req.rol };
    //Service:
    const del = await adminDeleteUserServ(tokenData, id);

    //return:
    if (del === "USER_NOT_FOUND")
      return res.status(404).json({ status: 404, msg: del });
    //Ok:
    return res.json({ status: 200, msg: "USER_DELETED" });
  } catch (e: any) {
    return res.status(500).json({ status: 500, msg: e.message });
  }
}

/** =============== SUSPEND USER  =============== **/
export async function adminSuspendUserCtrl(req: RequestExt, res: Response) {
  try {
    //Data:
    const { id } = req.params;
    const tokenData = { uid: req.uid, rol: req.rol };

    //Service:
    const suspend = await adminSuspendUserServ(tokenData, id);

    //return:
    if (suspend === "USER_NOT_FOUND")
      return res.status(404).json({ status: 404, msg: suspend });
    //Ok:
    return res.json({ status: 200, msg: "USER_SUSPENDED" });
  } catch (e: any) {
    return res.status(500).json({ status: 500, msg: e.message });
  }
}

/** =============== REACTIVE USER  =============== **/
export async function adminReactiveUserCtrl(req: RequestExt, res: Response) {
  try {
    //Data:
    const { id } = req.params;
    const tokenData = { uid: req.uid, rol: req.rol };

    //Service:
    const reactive = await adminReactiveUserServ(tokenData, id);

    //return:
    if (reactive === "USER_NOT_FOUND")
      return res.status(404).json({ status: 404, msg: reactive });
    return res.json({ status: 200, msg: "OK", data: reactive });
  } catch (e: any) {
    return res.status(500).json({ status: 500, msg: e.message });
  }
}

export async function listLogActivityCtrl(req: Request, res: Response) {
  try {
    //Data:
    const { id } = req.params;
    // query parameters:
    const page: number = parseInt(req.query.page as string);
    const size: number = parseInt(req.query.size as string);
    //Service:
    const list = await listLogActivityServ(id, page, size);

    //return:
    if (list === "USER_NOT_FOUND")
      return res.status(404).json({ status: 404, msg: list });
    return res.json({ status: 200, msg: "OK", data: list });
  } catch (e: any) {
    return res.status(500).json({ status: 500, msg: e.message });
  }
}

export async function listSuperuserCtrl(req: Request, res: Response) {
  try {
    // query parameters:
    const page: number = parseInt(req.query.page as string);
    const size: number = parseInt(req.query.size as string);

    //Service:
    const list = await listSuperuserServ(page, size);

    //Return:
    if (!list)
      return res.status(500).json({ status: 500, msg: "SERVER_ERROR" });
    else if (list === "FIND_ROL_ERROR")
      return res.status(500).json({ status: 500, msg: list });
    //Ok:
    return res.json({ status: 200, msg: "OK", data: list });
  } catch (e: any) {
    return res.status(500).json({ status: 500, msg: e.message });
  }
}
