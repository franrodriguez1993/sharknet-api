import { Router } from "express";

//Controllers:
import {
  checkSeenCtrl,
  getNotificationCtrl,
} from "../../controllers/notification/notification.ctrl";

//Middlewares:
import { requireToken } from "../../middlewares/requireToken";

const router = Router();

router.post("/seen/:id", requireToken, checkSeenCtrl);
router.get("/list/:id", requireToken, getNotificationCtrl);

export { router };
