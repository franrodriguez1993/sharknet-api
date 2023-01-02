"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const jwtHandler_1 = require("../utils/jwtHandler");
const requireRefresh = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const refreshToken = req.body.refreshToken;
        //No token:
        if (!refreshToken) {
            return res.json({ status: 403, message: "REFRESH_TOKEN_REQUIRED" });
        }
        //data:
        const data = (0, jwtHandler_1.verifyRefreshToken)(refreshToken);
        req.uid = data.uid;
        req.rol = data.rol;
        //Continue:
        next();
    }
    catch (e) {
        if (e.message === "invalid signature")
            return res.json({ status: 403, message: "INVALID_SIGNATURE" });
        else if (e.message === "jwt expired")
            return res.json({ status: 403, message: "JWT_EXPIRED" });
        else if (e.message === "invalid token")
            return res.json({ status: 403, message: "INVALID_TOKEN" });
        //default:
        return res.json({ status: 500, message: "INTERNAL_SERVER_ERROR" });
    }
});
exports.default = requireRefresh;
