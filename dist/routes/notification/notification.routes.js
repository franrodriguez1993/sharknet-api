"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
//Controllers:
const notification_ctrl_1 = __importDefault(require("../../controllers/notification/notification.ctrl"));
const controller = new notification_ctrl_1.default();
//Middlewares:
const requireToken_1 = require("../../middlewares/requireToken");
const router = (0, express_1.Router)();
exports.router = router;
router.post("/seen/:id", requireToken_1.requireToken, controller.checkSeenCtrl);
router.get("/list/:id", requireToken_1.requireToken, controller.getNotificationCtrl);
