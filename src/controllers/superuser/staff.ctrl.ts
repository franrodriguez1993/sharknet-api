import { Request, Response } from "express";
import { RequestExt } from "../../interfaces/userInterface/ReqExt.interface";
import {
  verifyUserServ,
  unverifyUserServ,
  deleteUserServ,
  suspendUserServ,
  reactiveUserServ,
} from "../../services/superuser/staff.serv";

/** =============== VERIFY USER  =============== **/
export async function verifyUserCtrl(req: RequestExt, res: Response) {
  try {
    //Data:
    const { id } = req.params;
    const tokenData = { uid: req.uid, rol: req.rol };
    //Service:
    const user = await verifyUserServ(tokenData, id);

    //Return:
    if (user === "USER_NOT_FOUND" || user === "ROL_NOT_FOUND")
      return res.status(404).json({ status: 404, msg: user });
    //Ok:
    return res.json({ status: 200, msg: "OK", data: user });
  } catch (e: any) {
    return res.status(500).json({ status: 500, msg: e.message });
  }
}
/** =============== UNVERIFY USER  =============== **/
export async function unverifyUserCtrl(req: RequestExt, res: Response) {
  try {
    //Data:
    const { id } = req.params;
    const tokenData = { uid: req.uid, rol: req.rol };
    //Service:
    const user = await unverifyUserServ(tokenData, id);

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
export async function deleteUserCtrl(req: RequestExt, res: Response) {
  try {
    //Data:
    const { id } = req.params;
    const tokenData = { uid: req.uid, rol: req.rol };
    //Service:
    const del = await deleteUserServ(tokenData, id);

    //Return
    if (del === "UNAUTHORIZED_DELETE_ROL")
      return res.status(401).json({ status: 401, msg: del });
    else if (del === "USER_NOT_FOUND")
      return res.status(404).json({ status: 404, msg: del });

    //Ok:
    return res.json({ status: 200, msg: "OK", data: del });
  } catch (e: any) {
    return res.status(500).json({ status: 500, msg: e.message });
  }
}

/** =============== SUSPEND USER  =============== **/
export async function suspendUserCtrl(req: RequestExt, res: Response) {
  try {
    //Data:
    const { id } = req.params;
    const tokenData = { uid: req.uid, rol: req.rol };

    //Service:
    const suspend = await suspendUserServ(tokenData, id);

    //Return
    if (suspend === "UNAUTHORIZED_SUSPEND_ROL")
      return res.status(401).json({ status: 401, msg: suspend });
    else if (suspend === "USER_NOT_FOUND")
      return res.status(404).json({ status: 404, msg: suspend });

    //Ok:
    return res.json({ status: 200, msg: "OK", data: suspend });
  } catch (e: any) {
    return res.status(500).json({ status: 500, msg: e.message });
  }
}

/** =============== REACTIVATE USER  =============== **/
export async function reactiveUserCtrl(req: RequestExt, res: Response) {
  try {
    //Data:
    const { id } = req.params;
    const tokenData = { uid: req.uid, rol: req.rol };

    //Service:
    const reactive = await reactiveUserServ(tokenData, id);

    //Return
    if (reactive === "UNAUTHORIZED_REACTIVE_ROL")
      return res.status(401).json({ status: 401, msg: reactive });
    else if (reactive === "USER_NOT_FOUND")
      return res.status(404).json({ status: 404, msg: reactive });
    //Ok:
    return res.json({ status: 200, msg: "OK", data: reactive });
  } catch (e: any) {
    return res.status(500).json({ status: 500, msg: e.message });
  }
}
