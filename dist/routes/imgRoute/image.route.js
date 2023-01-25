"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const multer_1 = __importDefault(require("multer"));
//Controllers:
const imgProduct_ctrl_1 = __importDefault(require("../../controllers/imgCtrl/imgProduct.ctrl"));
const controller = new imgProduct_ctrl_1.default();
//Middleware:
const requireToken_1 = require("../../middlewares/requireToken");
const router = (0, express_1.Router)();
exports.router = router;
const upload = (0, multer_1.default)({ storage: multer_1.default.memoryStorage() });
//PRODUCT - ROUTES:
router.post("/product/upload/:product", requireToken_1.requireToken, upload.single("image"), controller.createImgProductCtrl);
router.delete("/product/del/:id", requireToken_1.requireToken, controller.delImgProductCtrl);
