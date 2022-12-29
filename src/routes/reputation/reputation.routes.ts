import { Router } from "express";

//Controllers:
//REPUTATION USER:
import {
  createRepuBuyerCtrl,
  createRepuSellerCtrl,
  deleteReputationCtrl,
  ListRepuBuyerCtrl,
  listRepuSellerCtrl,
} from "../../controllers/reputation/RUser.ctrl";
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
//REPUTATION PRODUCTS:
import {
  createReputationCtrl,
  delRepuProductCtrl,
  listRepuProductCtrl,
} from "../../controllers/reputation/RProduct.ctrl";

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
//Middlewares:
import { requireToken } from "../../middlewares/requireToken";
import { validatorQualifyUser } from "../../middlewares/validatorManager";
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
const router = Router();

//USER REPUTATION:
//create:
router.post(
  "/user/qualify/seller",
  requireToken,
  validatorQualifyUser,
  createRepuSellerCtrl
);
router.post(
  "/user/qualify/buyer",
  requireToken,
  validatorQualifyUser,
  createRepuBuyerCtrl
);
//list:
router.get("/user/buyer/:id", ListRepuBuyerCtrl);
router.get("/user/seller/:id", listRepuSellerCtrl);

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
//PRODUCT REPUTATION:
//create:
router.post("/product/qualify", requireToken, createReputationCtrl);
//list:
router.get("/product/:id", listRepuProductCtrl);
//delete:
router.delete("/product/del/:id", requireToken, delRepuProductCtrl);
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
export { router };
