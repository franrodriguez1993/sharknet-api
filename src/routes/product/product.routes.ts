import { Router } from "express";

import multer from "multer";
const upload = multer({ storage: multer.memoryStorage() });

//Controllers:
import productController from "../../controllers/product/product.ctrl";
const controller = new productController();

//Middlewares
import { requireToken } from "../../middlewares/requireToken";
import {
  validatorEditProduct,
  validatorProduct,
} from "../../middlewares/validatorManager";

const router = Router();

//CREATE:
router.post(
  "/create",
  requireToken,
  validatorProduct,
  controller.createProductCtrl
);
router.post("/favorite", requireToken, controller.addPFavoriteCtrl);
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
router.get("/list/favorite/:id", requireToken, controller.listPFavoriteCtrl); //list user favorite
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//EDIT:
router.put(
  "/edit/:id",
  requireToken,
  validatorEditProduct,
  controller.editProductCtrl
);
router.put("/edit/views/:id", controller.updateViewsCtrl);
router.put(
  "/edit/thumbnail/:id",
  requireToken,
  upload.single("product"),
  controller.updateThumbnailCtrl
);
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//CONDITION:
router.put("/condition/pause/:id", requireToken, controller.pauseProductCtrl);
router.put(
  "/condition/reactivate/:id",
  requireToken,
  controller.reactivateProductCtrl
);
router.delete(
  "/condition/delete/:id",
  requireToken,
  controller.deleteProductCtrl
);
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//SALE:
router.post("/sale/buy", requireToken, controller.buyProductCtrl);
router.post("/sale/test", requireToken, controller.buyProductCtrl);
router.get("/sale/:id", requireToken, controller.getSaleCtrl);
router.get("/sale/list/sales/:id", requireToken, controller.getUserSalesCtrl);
router.get("/sale/list/buys/:id", requireToken, controller.getUserBuysCtrl);
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
export { router };
