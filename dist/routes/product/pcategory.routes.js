"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
//Controllers:
const category_ctrl_1 = __importDefault(require("../../controllers/product/category.ctrl"));
const controller = new category_ctrl_1.default();
const requireAdmin_1 = require("../../middlewares/requireAdmin");
const requireToken_1 = require("../../middlewares/requireToken");
const router = (0, express_1.Router)();
exports.router = router;
router.post("/create", requireToken_1.requireToken, requireAdmin_1.requireAdmin, controller.createCategoryCtrl);
router.get("/list", controller.listCategoryCtrl);
router.delete("/del/:id", requireToken_1.requireToken, requireAdmin_1.requireAdmin, controller.deleteCategoryCtrl);
