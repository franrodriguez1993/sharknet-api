import { Router } from "express";

/**============================= CONTROLLERS ==================================**/
import { createRolCtrl, getAllRolCtrl } from "../../controllers/user/rol.ctrl";

/**============================= MIDDLEWARES ==================================**/
import { requireAdmin } from "../../middlewares/requireAdmin";
import { requireToken } from "../../middlewares/requireToken";

const router = Router();

router.post("/create", requireToken, requireAdmin, createRolCtrl);
router.get("/list", getAllRolCtrl);

export { router };
