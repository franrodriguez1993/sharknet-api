"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
//Controllers:
const imgProduct_ctrl_1 = require("../../controllers/imgCtrl/imgProduct.ctrl");
const imgUser_ctrl_1 = require("../../controllers/imgCtrl/imgUser.ctrl");
//Middleware:
const productMulter_1 = __importDefault(require("../../middlewares/productMulter"));
const userMulter_1 = __importDefault(require("../../middlewares/userMulter"));
const requireToken_1 = require("../../middlewares/requireToken");
const router = (0, express_1.Router)();
exports.router = router;
//PRODUCT - ROUTES:
router.post("/product/upload/:product", requireToken_1.requireToken, productMulter_1.default.single("product"), imgProduct_ctrl_1.createImgProductCtrl);
router.delete("/product/del/:id", requireToken_1.requireToken, imgProduct_ctrl_1.delImgProductCtrl);
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//USER - ROUTES:
router.post("/user/upload/:id", userMulter_1.default.single("user"), requireToken_1.requireToken, imgUser_ctrl_1.createImgUserCtrl);
router.delete("/user/del/:id", requireToken_1.requireToken, imgUser_ctrl_1.delImgUserCtrl);
