import { Router } from "express";

//Controllers:
import {
  createPTypesCtrl,
  delPTypesCtrl,
  listPTypesCtrl,
} from "../../controllers/product/types.ctrl";

//Middlewares:
import { requireAdmin } from "../../middlewares/requireAdmin";
import { requireToken } from "../../middlewares/requireToken";

const router = Router();

router.post("/create", requireToken, requireAdmin, createPTypesCtrl);
router.get("/list", listPTypesCtrl);
router.delete("/del/:id", requireToken, requireAdmin, delPTypesCtrl);
export { router };
