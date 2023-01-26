//Middleware to check the identity of the user that is trying to change the field.
//If is not the user or staff/admin reject the request.

import { NextFunction, Response } from "express";
import logger from "../utils/logger";
import { RequestExt } from "../interfaces/userInterface/ReqExt.interface";

export async function checkIdentity(
  req: RequestExt,
  res: Response,
  next: NextFunction
) {
  try {
    const { id } = req.params; //id target of the request
    const uid = req.uid; //uid user

    if (id.toString() === uid.toString()) {
      next();
    } else {
      return res.status(401).json({ status: 401, msg: "UNAUTHORIZED_REQUEST" });
    }
  } catch (e: any) {
    logger.error(e.message);
    return res.status(500).json({ status: 500, msg: e.message });
  }
}
