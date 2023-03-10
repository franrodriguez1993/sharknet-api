import { NextFunction, Response } from "express";
import logger from "../utils/logger";
import { RequestExt } from "../interfaces/userInterface/ReqExt.interface";

export async function requireAdmin(
  req: RequestExt,
  res: Response,
  next: NextFunction
) {
  try {
    const rol = req.rol;

    if (rol === "admin") {
      next();
    } else {
      return res.status(401).json({ status: 401, msg: "UNAUTHORIZED_ACTION" });
    }
  } catch (e: any) {
    logger.error(e.message);
    return res.status(500).json({ status: 500, msg: e.message });
  }
}
