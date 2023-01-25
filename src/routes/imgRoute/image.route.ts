import { Router } from "express";
import multer from "multer";

//Controllers:
import imageProductController from "../../controllers/imgCtrl/imgProduct.ctrl";

const controller = new imageProductController();

//Middleware:
import { requireToken } from "../../middlewares/requireToken";
const router = Router();

const upload = multer({ storage: multer.memoryStorage() });

//PRODUCT - ROUTES:
router.post(
  "/product/upload/:product",
  requireToken,
  upload.single("image"),
  controller.createImgProductCtrl
);

router.delete("/product/del/:id", requireToken, controller.delImgProductCtrl);
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
export { router };
