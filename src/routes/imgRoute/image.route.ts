import { Router } from "express";

//Controllers:
import {
  createImgProductCtrl,
  delImgProductCtrl,
} from "../../controllers/imgCtrl/imgProduct.ctrl";
import {
  createImgUserCtrl,
  delImgUserCtrl,
} from "../../controllers/imgCtrl/imgUser.ctrl";

//Middleware:
import productMulter from "../../middlewares/productMulter";
import userMulter from "../../middlewares/userMulter";
import { requireToken } from "../../middlewares/requireToken";
const router = Router();

//PRODUCT - ROUTES:
router.post(
  "/product/upload/:product",
  requireToken,
  productMulter.single("product"),
  createImgProductCtrl
);
router.delete("/product/del/:id", requireToken, delImgProductCtrl);
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//USER - ROUTES:
router.post(
  "/user/upload/:id",
  userMulter.single("user"),
  requireToken,
  createImgUserCtrl
);
router.delete("/user/del/:id", requireToken, delImgUserCtrl);
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
export { router };
