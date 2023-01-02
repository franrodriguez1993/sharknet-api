"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
//Controllers:
const notification_ctrl_1 = require("../../controllers/notification/notification.ctrl");
//Middlewares:
const requireToken_1 = require("../../middlewares/requireToken");
const router = (0, express_1.Router)();
exports.router = router;
router.post("/seen/:id", requireToken_1.requireToken, notification_ctrl_1.checkSeenCtrl);
router.get("/list/:id", requireToken_1.requireToken, notification_ctrl_1.getNotificationCtrl);
