import { Request, Response } from "express";
import { RequestExt } from "../../interfaces/userInterface/ReqExt.interface";
//Services:
import {
  createImgUserServ,
  delImgUserServ,
} from "../../services/imageServ/imgUser.serv";

/** ==================== CREATE IMG USER ===================== **/
export async function createImgUserCtrl(req: RequestExt, res: Response) {
  try {
    //data:
    const { id } = req.params;
    const { file } = req;
    const data = { iu_path: `${file.path.split("public")[1]}`, user_id: id };

    //Service:
    const img = await createImgUserServ(req.uid, data);

    //return:
    if (img === "USER_NOT_FOUND")
      return res.status(404).json({ status: 404, msg: img });
    else if (img === "INVALID_ROUTE")
      return res.status(400).json({ status: 400, msg: img });
    else if (img === "UNAUTHORIZED_ACTION")
      return res.status(401).json({ status: 401, msg: img });
    //Ok:
    return res.json({ status: 201, msg: "OK", data: img });
  } catch (e: any) {
    return res.status(500).json({ status: 500, msg: e.message });
  }
}

/** ==================== DELETE IMG USER ===================== **/
export async function delImgUserCtrl(req: Request, res: Response) {
  try {
    //Data:
    const { id } = req.params;

    //Service:
    const del = await delImgUserServ(id);

    //Return:
    return res.json({ status: 200, msg: "OK", data: del });
  } catch (e: any) {
    return res.status(500).json({ status: 500, msg: e.message });
  }
}
