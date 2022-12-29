import { Request, Response } from "express";
// Services:
import { createRolService, getAllRolServ } from "../../services/user/rol.serv";

/**============================= CREATE ROL ==================================**/

export async function createRolCtrl(req: Request, res: Response) {
  try {
    //Data:
    const { rol_name } = req.body;
    //Service:
    const rol = await createRolService(rol_name);

    //Return:
    if (!rol)
      return res.status(400).json({ status: 400, msg: "ERROR_CREATING" });
    else if (rol === "NAME_ALREADY_IN_USE" || rol === "ROL_NAME_REQUIRED")
      return res.status(400).json({ status: 400, msg: rol });
    else if (rol === "ROL_CREATED")
      return res.status(201).json({ status: 201, msg: rol });
  } catch (e: any) {
    return res.json({ status: 500, msg: e.message });
  }
}

/**============================= GET ROL ==================================**/

export async function getAllRolCtrl(req: Request, res: Response) {
  try {
    const list = await getAllRolServ();
    return res.json({ status: 200, msg: "OK", data: list });
  } catch (e: any) {
    return res.json({ status: 500, msg: e.message });
  }
}
