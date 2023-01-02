"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
/**============================= CONTROLLERS ==================================**/
const rol_ctrl_1 = require("../../controllers/user/rol.ctrl");
/**============================= MIDDLEWARES ==================================**/
const requireAdmin_1 = require("../../middlewares/requireAdmin");
const requireToken_1 = require("../../middlewares/requireToken");
const router = (0, express_1.Router)();
exports.router = router;
router.post("/create", requireToken_1.requireToken, requireAdmin_1.requireAdmin, rol_ctrl_1.createRolCtrl);
router.get("/list", rol_ctrl_1.getAllRolCtrl);
