import { Router } from "express";

//Controllers:
import typesProductController from "../../controllers/product/types.ctrl";

const controller = new typesProductController();

//Middlewares:
import { requireAdmin } from "../../middlewares/requireAdmin";
import { requireToken } from "../../middlewares/requireToken";

const router = Router();

router.post("/create", requireToken, requireAdmin, controller.createPTypesCtrl);
router.get("/list", controller.listPTypesCtrl);
router.delete("/del/:id", requireToken, requireAdmin, controller.delPTypesCtrl);
export { router };
