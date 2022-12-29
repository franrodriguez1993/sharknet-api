import { Router } from "express";

//Controllers:
import {
  createProductCtrl,
  listProductsCtrl,
  listPStatusCtrl,
  listPBrandCtrl,
  listPUserCtrl,
  listPCategoryCtrl,
  listPTypeCtrl,
  getProductCtrl,
  editProductCtrl,
  updateViewsCtrl,
  addPFavoriteCtrl,
  listPFavoriteCtrl,
  buyProductCtrl,
  getSaleCtrl,
  getUserSalesCtrl,
  getUserBuysCtrl,
  pauseProductCtrl,
  deleteProductCtrl,
  reactivateProductCtrl,
  listQueryProductCtrl,
  listProductOfferCtrl,
} from "../../controllers/product/product.ctrl";

//Middlewares
import { requireToken } from "../../middlewares/requireToken";
import {
  validatorEditProduct,
  validatorProduct,
} from "../../middlewares/validatorManager";

const router = Router();
//CREATE:
router.post("/create", requireToken, validatorProduct, createProductCtrl);
router.post("/favorite", requireToken, addPFavoriteCtrl);
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//LIST PRODUCTS:
router.get("/list", listProductsCtrl);
router.get("/list/:id", getProductCtrl);
router.get("/list/search/:search", listQueryProductCtrl);
router.get("/list/status/:status", listPStatusCtrl);
router.get("/list/brand/:brand", listPBrandCtrl);
router.get("/list/user/:id", listPUserCtrl);
router.get("/list/category/:id", listPCategoryCtrl);
router.get("/list/type/:id", listPTypeCtrl);
router.get("/list/offer/all", listProductOfferCtrl);
router.get("/list/favorite/:id", requireToken, listPFavoriteCtrl); //list user favorite
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//EDIT:
router.put("/edit/:id", requireToken, validatorEditProduct, editProductCtrl);
router.put("/edit/views/:id", updateViewsCtrl);
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//CONDITION:
router.put("/condition/pause/:id", requireToken, pauseProductCtrl);
router.put("/condition/reactivate/:id", requireToken, reactivateProductCtrl);
router.delete("/condition/delete/:id", requireToken, deleteProductCtrl);
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//SALE:
router.post("/sale/buy", requireToken, buyProductCtrl);
router.get("/sale/:id", requireToken, getSaleCtrl);
router.get("/sale/list/sales/:id", requireToken, getUserSalesCtrl);
router.get("/sale/list/buys/:id", requireToken, getUserBuysCtrl);
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
export { router };
