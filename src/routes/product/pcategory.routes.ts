import { Router } from "express";

//Controllers:
import categoryProductController from "../../controllers/product/category.ctrl";

const controller = new categoryProductController();
import { requireAdmin } from "../../middlewares/requireAdmin";
import { requireToken } from "../../middlewares/requireToken";

const router = Router();
router.post(
  "/create",
  requireToken,
  requireAdmin,
  controller.createCategoryCtrl
);
router.get("/list", controller.listCategoryCtrl);
router.delete(
  "/del/:id",
  requireToken,
  requireAdmin,
  controller.deleteCategoryCtrl
);

export { router };
