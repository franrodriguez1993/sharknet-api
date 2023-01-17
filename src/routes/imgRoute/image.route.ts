import { Router } from "express";

//Controllers:
import imageProductController from "../../controllers/imgCtrl/imgProduct.ctrl";

const controller = new imageProductController();

//Middleware:
import productMulter from "../../middlewares/productMulter";
import { requireToken } from "../../middlewares/requireToken";
const router = Router();

//PRODUCT - ROUTES:
router.post(
  "/product/upload/:product",
  requireToken,
  productMulter.single("product"),
  controller.createImgProductCtrl
);
router.delete("/product/del/:id", requireToken, controller.delImgProductCtrl);
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
export { router };
