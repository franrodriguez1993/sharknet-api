"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
//Controllers:
const product_ctrl_1 = require("../../controllers/product/product.ctrl");
//Middlewares
const requireToken_1 = require("../../middlewares/requireToken");
const validatorManager_1 = require("../../middlewares/validatorManager");
const router = (0, express_1.Router)();
exports.router = router;
//CREATE:
router.post("/create", requireToken_1.requireToken, validatorManager_1.validatorProduct, product_ctrl_1.createProductCtrl);
router.post("/favorite", requireToken_1.requireToken, product_ctrl_1.addPFavoriteCtrl);
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//LIST PRODUCTS:
router.get("/list", product_ctrl_1.listProductsCtrl);
router.get("/list/:id", product_ctrl_1.getProductCtrl);
router.get("/list/search/:search", product_ctrl_1.listQueryProductCtrl);
router.get("/list/status/:status", product_ctrl_1.listPStatusCtrl);
router.get("/list/brand/:brand", product_ctrl_1.listPBrandCtrl);
router.get("/list/user/:id", product_ctrl_1.listPUserCtrl);
router.get("/list/category/:id", product_ctrl_1.listPCategoryCtrl);
router.get("/list/type/:id", product_ctrl_1.listPTypeCtrl);
router.get("/list/offer/all", product_ctrl_1.listProductOfferCtrl);
router.get("/list/favorite/:id", requireToken_1.requireToken, product_ctrl_1.listPFavoriteCtrl); //list user favorite
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//EDIT:
router.put("/edit/:id", requireToken_1.requireToken, validatorManager_1.validatorEditProduct, product_ctrl_1.editProductCtrl);
router.put("/edit/views/:id", product_ctrl_1.updateViewsCtrl);
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//CONDITION:
router.put("/condition/pause/:id", requireToken_1.requireToken, product_ctrl_1.pauseProductCtrl);
router.put("/condition/reactivate/:id", requireToken_1.requireToken, product_ctrl_1.reactivateProductCtrl);
router.delete("/condition/delete/:id", requireToken_1.requireToken, product_ctrl_1.deleteProductCtrl);
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//SALE:
router.post("/sale/buy", requireToken_1.requireToken, product_ctrl_1.buyProductCtrl);
router.get("/sale/:id", requireToken_1.requireToken, product_ctrl_1.getSaleCtrl);
router.get("/sale/list/sales/:id", requireToken_1.requireToken, product_ctrl_1.getUserSalesCtrl);
router.get("/sale/list/buys/:id", requireToken_1.requireToken, product_ctrl_1.getUserBuysCtrl);
