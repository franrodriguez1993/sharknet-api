"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
//Controllers:
const RScore_ctrl_1 = require("../../controllers/reputation/RScore.ctrl");
//Middlewares:
const requireAdmin_1 = require("../../middlewares/requireAdmin");
const requireToken_1 = require("../../middlewares/requireToken");
const router = (0, express_1.Router)();
exports.router = router;
//CREATE (admin)
router.post("/create", requireToken_1.requireToken, requireAdmin_1.requireAdmin, RScore_ctrl_1.createScoreCtrl);
//LIST
router.get("/list", RScore_ctrl_1.listScoreCtrl);
//DELETE (admin)
router.delete("/del/:id", requireToken_1.requireToken, requireAdmin_1.requireAdmin, RScore_ctrl_1.deleteScoreCtrl);
