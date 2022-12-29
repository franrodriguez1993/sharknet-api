import { Router } from "express";

//Controllers:
import {
  createCategoryCtrl,
  listCategoryCtrl,
  deleteCategoryCtrl,
} from "../../controllers/product/category.ctrl";
import { requireAdmin } from "../../middlewares/requireAdmin";
import { requireToken } from "../../middlewares/requireToken";

const router = Router();
router.post("/create", requireToken, requireAdmin, createCategoryCtrl);
router.get("/list", listCategoryCtrl);
router.delete("/del/:id", requireToken, requireAdmin, deleteCategoryCtrl);

export { router };
