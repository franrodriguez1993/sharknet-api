"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const multer_1 = __importDefault(require("multer"));
const upload = (0, multer_1.default)({ storage: multer_1.default.memoryStorage() });
//Controllers:
const product_ctrl_1 = __importDefault(require("../../controllers/product/product.ctrl"));
const controller = new product_ctrl_1.default();
//Middlewares
const requireToken_1 = require("../../middlewares/requireToken");
const validatorManager_1 = require("../../middlewares/validatorManager");
const router = (0, express_1.Router)();
exports.router = router;
//CREATE:
router.post("/create", requireToken_1.requireToken, validatorManager_1.validatorProduct, controller.createProductCtrl);
router.post("/favorite", requireToken_1.requireToken, controller.addPFavoriteCtrl);
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//LIST PRODUCTS:
router.get("/list", controller.listProductsCtrl);
router.get("/list/:id", controller.getProductCtrl);
router.get("/list/search/:search", controller.listQueryProductCtrl);
router.get("/list/status/:status", controller.listPStatusCtrl);
router.get("/list/brand/:brand", controller.listPBrandCtrl);
router.get("/list/user/:id", controller.listPUserCtrl);
router.get("/list/seller/:id", controller.listPSellerCtrl);
router.get("/list/category/:id", controller.listPCategoryCtrl);
router.get("/list/type/:id", controller.listPTypeCtrl);
router.get("/list/offer/all", controller.listProductOfferCtrl);
router.get("/list/favorite/:id", requireToken_1.requireToken, controller.listPFavoriteCtrl); //list user favorite
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//EDIT:
router.put("/edit/:id", requireToken_1.requireToken, validatorManager_1.validatorEditProduct, controller.editProductCtrl);
router.put("/edit/views/:id", controller.updateViewsCtrl);
router.put("/edit/thumbnail/:id", requireToken_1.requireToken, upload.single("product"), controller.updateThumbnailCtrl);
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//CONDITION:
router.put("/condition/pause/:id", requireToken_1.requireToken, controller.pauseProductCtrl);
router.put("/condition/reactivate/:id", requireToken_1.requireToken, controller.reactivateProductCtrl);
router.delete("/condition/delete/:id", requireToken_1.requireToken, controller.deleteProductCtrl);
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//SALE:
router.post("/sale/buy", requireToken_1.requireToken, controller.buyProductCtrl);
router.get("/sale/:id", requireToken_1.requireToken, controller.getSaleCtrl);
router.get("/sale/list/sales/:id", requireToken_1.requireToken, controller.getUserSalesCtrl);
router.get("/sale/list/buys/:id", requireToken_1.requireToken, controller.getUserBuysCtrl);
