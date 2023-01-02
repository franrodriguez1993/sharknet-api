"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
//Controllers:
//REPUTATION USER:
const RUser_ctrl_1 = require("../../controllers/reputation/RUser.ctrl");
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
//REPUTATION PRODUCTS:
const RProduct_ctrl_1 = require("../../controllers/reputation/RProduct.ctrl");
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
//Middlewares:
const requireToken_1 = require("../../middlewares/requireToken");
const validatorManager_1 = require("../../middlewares/validatorManager");
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
const router = (0, express_1.Router)();
exports.router = router;
//USER REPUTATION:
//create:
router.post("/user/qualify/seller", requireToken_1.requireToken, validatorManager_1.validatorQualifyUser, RUser_ctrl_1.createRepuSellerCtrl);
router.post("/user/qualify/buyer", requireToken_1.requireToken, validatorManager_1.validatorQualifyUser, RUser_ctrl_1.createRepuBuyerCtrl);
//list:
router.get("/user/buyer/:id", RUser_ctrl_1.ListRepuBuyerCtrl);
router.get("/user/seller/:id", RUser_ctrl_1.listRepuSellerCtrl);
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
//PRODUCT REPUTATION:
//create:
router.post("/product/qualify", requireToken_1.requireToken, RProduct_ctrl_1.createReputationCtrl);
//list:
router.get("/product/:id", RProduct_ctrl_1.listRepuProductCtrl);
//delete:
router.delete("/product/del/:id", requireToken_1.requireToken, RProduct_ctrl_1.delRepuProductCtrl);
