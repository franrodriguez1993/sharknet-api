"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
//Controllers:
const types_ctrl_1 = require("../../controllers/product/types.ctrl");
//Middlewares:
const requireAdmin_1 = require("../../middlewares/requireAdmin");
const requireToken_1 = require("../../middlewares/requireToken");
const router = (0, express_1.Router)();
exports.router = router;
router.post("/create", requireToken_1.requireToken, requireAdmin_1.requireAdmin, types_ctrl_1.createPTypesCtrl);
router.get("/list", types_ctrl_1.listPTypesCtrl);
router.delete("/del/:id", requireToken_1.requireToken, requireAdmin_1.requireAdmin, types_ctrl_1.delPTypesCtrl);
