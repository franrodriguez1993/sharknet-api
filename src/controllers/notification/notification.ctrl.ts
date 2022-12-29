import { Request, Response } from "express";
import { RequestExt } from "../../interfaces/userInterface/ReqExt.interface";
import {
  checkSeenServ,
  getNotificationServ,
} from "../../services/notification/notification.serv";

/** ======================  CHECK SEEN NOTIFICATION  ====================== **/

export async function checkSeenCtrl(req: Request, res: Response) {
  try {
    //Data:
    const { id } = req.params;

    //Service:
    const seen = await checkSeenServ(id);

    //Return:
    if (!seen) return res.status(400).json({ status: 400, msg: "ERROR_SEEN" });
    else if (seen === "NOTIFICATION_NOT_FOUND")
      return res.status(404).json({ status: 404, msg: seen });
    else if (seen === "NOTIFICATION_SEEN")
      return res.json({ status: 200, msg: seen });
  } catch (e: any) {
    return res.status(500).json({ status: 500, msg: e.message });
  }
}

/** ======================  GET NOTIFICATIONS LIST  ====================== **/
export async function getNotificationCtrl(req: RequestExt, res: Response) {
  try {
    //Data:
    const { id } = req.params;
    const tokenID = { uid: req.uid, rol: req.rol };
    // query parameters:
    const page: number = parseInt(req.query.page as string);
    const size: number = parseInt(req.query.size as string);

    //Service:
    const list = await getNotificationServ(tokenID, id, page, size);

    //Return:
    if (list === "UNAUTHORIZED_ACTION")
      return res.status(401).json({ status: 401, msg: list });
    else if (list === "USER_NOT_FOUND")
      return res.status(404).json({ status: 404, msg: list });

    //Ok:
    return res.json({ status: 200, msg: "OK", data: list });
  } catch (e: any) {
    return res.status(500).json({ status: 500, msg: e.message });
  }
}
