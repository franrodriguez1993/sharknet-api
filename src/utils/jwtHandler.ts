import { sign, verify } from "jsonwebtoken";
import { UserPayload } from "../interfaces/userInterface/payload.interface";
import serverConfigurations from "../config/configServer";

const JWT_SECRET = serverConfigurations.server.jwt_secret;
const JWT_REFRESH = serverConfigurations.server.jwt_refresh_secret;
const EXPIRATION_JWT = serverConfigurations.server.jwt_expiration;
const EXPIRATION_JWT_REFRESH =
  serverConfigurations.server.jwt_refresh_expiration;

/*
~~~~~~~~~~~~~~~  SESSION TOKEN ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
*/

const generateToken = (uid: string) => {
  const jwt = sign({ uid }, JWT_SECRET, { expiresIn: EXPIRATION_JWT });
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
  const refresh = sign({ uid }, JWT_REFRESH, {
    expiresIn: EXPIRATION_JWT_REFRESH,
  });
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
