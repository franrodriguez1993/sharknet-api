import { Router } from "express";

//Controllers:
import {
  createScoreCtrl,
  deleteScoreCtrl,
  listScoreCtrl,
} from "../../controllers/reputation/RScore.ctrl";

//Middlewares:
import { requireAdmin } from "../../middlewares/requireAdmin";
import { requireToken } from "../../middlewares/requireToken";

const router = Router();

//CREATE (admin)
router.post("/create", requireToken, requireAdmin, createScoreCtrl);
//LIST
router.get("/list", listScoreCtrl);
//DELETE (admin)
router.delete("/del/:id", requireToken, requireAdmin, deleteScoreCtrl);

export { router };
