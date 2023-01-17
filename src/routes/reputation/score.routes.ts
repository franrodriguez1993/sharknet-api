import { Router } from "express";

//Controllers:
import repuScoreController from "../../controllers/reputation/RScore.ctrl";

const controller = new repuScoreController();

//Middlewares:
import { requireAdmin } from "../../middlewares/requireAdmin";
import { requireToken } from "../../middlewares/requireToken";

const router = Router();

//CREATE (admin)
router.post("/create", requireToken, requireAdmin, controller.createScoreCtrl);
//LIST
router.get("/list", controller.listScoreCtrl);
//DELETE (admin)
router.delete(
  "/del/:id",
  requireToken,
  requireAdmin,
  controller.deleteScoreCtrl
);

export { router };
