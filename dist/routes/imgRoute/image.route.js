"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
//Controllers:
const imgProduct_ctrl_1 = __importDefault(require("../../controllers/imgCtrl/imgProduct.ctrl"));
const controller = new imgProduct_ctrl_1.default();
//Middleware:
const productMulter_1 = __importDefault(require("../../middlewares/productMulter"));
const requireToken_1 = require("../../middlewares/requireToken");
const router = (0, express_1.Router)();
exports.router = router;
//PRODUCT - ROUTES:
router.post("/product/upload/:product", requireToken_1.requireToken, productMulter_1.default.single("product"), controller.createImgProductCtrl);
router.delete("/product/del/:id", requireToken_1.requireToken, controller.delImgProductCtrl);
