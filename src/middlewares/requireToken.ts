import { NextFunction, Response } from "express";
import { RequestExt } from "../interfaces/userInterface/ReqExt.interface";
import { daoUser } from "../containers";
import { verifyToken } from "../utils/jwtHandler";
import { UserPayload } from "../interfaces/userInterface/payload.interface";
import { UserInterface } from "../interfaces/userInterface/user.interface";

export async function requireToken(
  req: RequestExt,
  res: Response,
  next: NextFunction
) {
  try {
    //token:
    let token = req.headers?.authorization;
    if (!token)
      return res.status(403).json({ status: 403, msg: "TOKEN_REQUIRED" });
    token = token.split(" ")[1];
    const verifiedToken = verifyToken(token) as UserPayload;

    const user: UserInterface | any = await daoUser.getUserRol(
      verifiedToken.uid
    );
    if (!user)
      return res.status(404).json({ status: 404, msg: "USER_NOT_FOUND" });
    req.rol = user.Rol.rol_name;
    req.uid = user.user_id;
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
}
