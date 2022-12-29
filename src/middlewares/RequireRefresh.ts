import { NextFunction, Response } from "express";
import { RequestExt } from "../interfaces/userInterface/ReqExt.interface";
import { UserPayload } from "../interfaces/userInterface/payload.interface";
import { verifyRefreshToken } from "../utils/jwtHandler";

const requireRefresh = async (
  req: RequestExt,
  res: Response,
  next: NextFunction
) => {
  try {
    const refreshToken = req.body.refreshToken;

    //No token:
    if (!refreshToken) {
      return res.json({ status: 403, message: "REFRESH_TOKEN_REQUIRED" });
    }

    //data:
    const data = verifyRefreshToken(refreshToken) as UserPayload;
    req.uid = data.uid;
    req.rol = data.rol;

    //Continue:
    next();
  } catch (e: any) {
    if (e.message === "invalid signature")
      return res.json({ status: 403, message: "INVALID_SIGNATURE" });
    else if (e.message === "jwt expired")
      return res.json({ status: 403, message: "JWT_EXPIRED" });
    else if (e.message === "invalid token")
      return res.json({ status: 403, message: "INVALID_TOKEN" });
    //default:
    return res.json({ status: 500, message: "INTERNAL_SERVER_ERROR" });
  }
};

export default requireRefresh;
