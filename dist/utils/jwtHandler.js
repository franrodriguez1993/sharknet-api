"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyRefreshToken = exports.generateRefreshToken = exports.verifyToken = exports.generateToken = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;
const JWT_REFRESH = process.env.JWT_REFRESH;
/*
~~~~~~~~~~~~~~~  SESSION TOKEN ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
*/
const generateToken = (uid) => {
    const jwt = (0, jsonwebtoken_1.sign)({ uid }, JWT_SECRET, { expiresIn: "3h" });
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
    const refresh = (0, jsonwebtoken_1.sign)({ uid }, JWT_REFRESH, { expiresIn: "5d" });
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
