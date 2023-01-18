import { Router } from "express";

/**============================= CONTROLLERS ==================================**/

import rolUserController from "../../controllers/user/rol.ctrl";

const controller = new rolUserController();

/**============================= MIDDLEWARES ==================================**/
import { requireAdmin } from "../../middlewares/requireAdmin";
import { requireToken } from "../../middlewares/requireToken";

const router = Router();

router.post("/create", requireToken, requireAdmin, controller.createRolCtrl);
router.get("/list", controller.getAllRolCtrl);

export { router };
