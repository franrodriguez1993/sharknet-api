import { sign, verify } from "jsonwebtoken";
import { UserPayload } from "../interfaces/userInterface/payload.interface";

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_REFRESH = process.env.JWT_REFRESH;

/*
~~~~~~~~~~~~~~~  SESSION TOKEN ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
*/

const generateToken = (uid: string) => {
  const jwt = sign({ uid }, JWT_SECRET, { expiresIn: "3h" });
  return jwt;
};
/*
~~~~~~~~~~~~~~~ VERIFY SESSION TOKEN ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
*/

const verifyToken = (jwt: string) => {
  const isOk = verify(jwt, JWT_SECRET) as UserPayload;

  return isOk;
};
/*
~~~~~~~~~~~~~~~ GENERATE REFRESH TOKEN ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
*/
const generateRefreshToken = (uid: string) => {
  const refresh = sign({ uid }, JWT_REFRESH, { expiresIn: "5d" });
  return refresh;
};

/*
~~~~~~~~~~~~~~~ VERIFY REFRESH TOKEN ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
*/

const verifyRefreshToken = (refresh: string) => {
  const isOk = verify(refresh, JWT_REFRESH) as UserPayload;
  return isOk;
};

export { generateToken, verifyToken, generateRefreshToken, verifyRefreshToken };
