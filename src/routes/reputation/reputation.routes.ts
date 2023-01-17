import { Router } from "express";

//Controllers:
//REPUTATION USER:
import repuUserController from "../../controllers/reputation/RUser.ctrl";

const repUserController = new repuUserController();
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
//REPUTATION PRODUCTS:
import reputationProductController from "../../controllers/reputation/RProduct.ctrl";

const repProdController = new reputationProductController();

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
  repUserController.createRepuSellerCtrl
);
router.post(
  "/user/qualify/buyer",
  requireToken,
  validatorQualifyUser,
  repUserController.createRepuBuyerCtrl
);
//list:
router.get("/user/buyer/:id", repUserController.ListRepuBuyerCtrl);
router.get("/user/seller/:id", repUserController.listRepuSellerCtrl);

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
//PRODUCT REPUTATION:
//create:
router.post(
  "/product/qualify",
  requireToken,
  repProdController.createReputationCtrl
);
//list:
router.get("/product/:id", repProdController.listRepuProductCtrl);
//delete:
router.delete(
  "/product/del/:id",
  requireToken,
  repProdController.delRepuProductCtrl
);
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
export { router };
