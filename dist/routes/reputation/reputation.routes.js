"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
//Controllers:
//REPUTATION USER:
const RUser_ctrl_1 = __importDefault(require("../../controllers/reputation/RUser.ctrl"));
const repUserController = new RUser_ctrl_1.default();
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
//REPUTATION PRODUCTS:
const RProduct_ctrl_1 = __importDefault(require("../../controllers/reputation/RProduct.ctrl"));
const repProdController = new RProduct_ctrl_1.default();
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
//Middlewares:
const requireToken_1 = require("../../middlewares/requireToken");
const validatorManager_1 = require("../../middlewares/validatorManager");
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
const router = (0, express_1.Router)();
exports.router = router;
//USER REPUTATION:
//create:
router.post("/user/qualify/seller", requireToken_1.requireToken, validatorManager_1.validatorQualifyUser, repUserController.createRepuSellerCtrl);
router.post("/user/qualify/buyer", requireToken_1.requireToken, validatorManager_1.validatorQualifyUser, repUserController.createRepuBuyerCtrl);
//list:
router.get("/user/buyer/:id", repUserController.ListRepuBuyerCtrl);
router.get("/user/seller/:id", repUserController.listRepuSellerCtrl);
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
//PRODUCT REPUTATION:
//create:
router.post("/product/qualify", requireToken_1.requireToken, repProdController.createReputationCtrl);
//list:
router.get("/product/:id", repProdController.listRepuProductCtrl);
//delete:
router.delete("/product/del/:id", requireToken_1.requireToken, repProdController.delRepuProductCtrl);
