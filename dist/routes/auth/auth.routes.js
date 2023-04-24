"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRouter = void 0;
const express_1 = require("express");
//Midlewares:
const express_rate_limit_1 = require("express-rate-limit");
const validatorManager_1 = require("../../middlewares/validatorManager");
const RequireRefresh_1 = __importDefault(require("../../middlewares/RequireRefresh"));
//Controllers:
const user_ctrl_1 = __importDefault(require("../../controllers/user/user.ctrl"));
const controller = new user_ctrl_1.default();
//Auth request limiter:
const authLimiter = (0, express_rate_limit_1.rateLimit)({
    windowMs: 15 * 60 * 1000,
    max: 10,
    message: "ERROR: Too many requests",
});
const authRouter = (0, express_1.Router)();
exports.authRouter = authRouter;
//LOGIN - REGISTER:
authRouter.post("/register", authLimiter, validatorManager_1.validateBodyRegister, controller.registerUserCtrl);
authRouter.post("/login", authLimiter, validatorManager_1.validateBodyLogin, controller.loginUserCtrl);
authRouter.post("/session", RequireRefresh_1.default, controller.refreshSessionCtrl);
