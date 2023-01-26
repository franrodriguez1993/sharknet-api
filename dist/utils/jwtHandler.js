"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyRefreshToken = exports.generateRefreshToken = exports.verifyToken = exports.generateToken = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
const configServer_1 = __importDefault(require("../config/configServer"));
const JWT_SECRET = configServer_1.default.server.jwt_secret;
const JWT_REFRESH = configServer_1.default.server.jwt_refresh_secret;
const EXPIRATION_JWT = configServer_1.default.server.jwt_expiration;
const EXPIRATION_JWT_REFRESH = configServer_1.default.server.jwt_refresh_expiration;
/*
~~~~~~~~~~~~~~~  SESSION TOKEN ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
*/
const generateToken = (uid) => {
    const jwt = (0, jsonwebtoken_1.sign)({ uid }, JWT_SECRET, { expiresIn: EXPIRATION_JWT });
    return jwt;
};
exports.generateToken = generateToken;
/*
~~~~~~~~~~~~~~~ VERIFY SESSION TOKEN ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
*/
const verifyToken = (jwt) => {
    const isOk = (0, jsonwebtoken_1.verify)(jwt, JWT_SECRET);
    return isOk;
};
exports.verifyToken = verifyToken;
/*
~~~~~~~~~~~~~~~ GENERATE REFRESH TOKEN ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
*/
const generateRefreshToken = (uid) => {
    const refresh = (0, jsonwebtoken_1.sign)({ uid }, JWT_REFRESH, {
        expiresIn: EXPIRATION_JWT_REFRESH,
    });
    return refresh;
};
exports.generateRefreshToken = generateRefreshToken;
/*
~~~~~~~~~~~~~~~ VERIFY REFRESH TOKEN ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
*/
const verifyRefreshToken = (refresh) => {
    const isOk = (0, jsonwebtoken_1.verify)(refresh, JWT_REFRESH);
    return isOk;
};
exports.verifyRefreshToken = verifyRefreshToken;
