"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
//Controllers:
const category_ctrl_1 = require("../../controllers/product/category.ctrl");
const requireAdmin_1 = require("../../middlewares/requireAdmin");
const requireToken_1 = require("../../middlewares/requireToken");
const router = (0, express_1.Router)();
exports.router = router;
router.post("/create", requireToken_1.requireToken, requireAdmin_1.requireAdmin, category_ctrl_1.createCategoryCtrl);
router.get("/list", category_ctrl_1.listCategoryCtrl);
router.delete("/del/:id", requireToken_1.requireToken, requireAdmin_1.requireAdmin, category_ctrl_1.deleteCategoryCtrl);
