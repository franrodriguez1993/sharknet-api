import { Router } from "express";

//Controllers:
import notificationController from "../../controllers/notification/notification.ctrl";

const controller = new notificationController();

//Middlewares:
import { requireToken } from "../../middlewares/requireToken";

const router = Router();

router.post("/seen/:id", requireToken, controller.checkSeenCtrl);
router.get("/list/:id", requireToken, controller.getNotificationCtrl);

export { router };
