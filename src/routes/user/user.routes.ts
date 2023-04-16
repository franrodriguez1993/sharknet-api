import { Router } from "express";
import multer from "multer";

//Controllers:
import userController from "../../controllers/user/user.ctrl";
const controller = new userController();
const upload = multer({ storage: multer.memoryStorage() });
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

//Middlewares:
import { requireToken } from "../../middlewares/requireToken";
import { checkIdentity } from "../../middlewares/checkIdentity";
import {
  validateBodyProfile,
  validatorAddressUser,
  validatorBirthdayUser,
} from "../../middlewares/validatorManager";
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

const router = Router();

//GET USER:
router.get("/data/id/:id", requireToken, controller.getUserIdCtrl);
router.post("/data/mail", requireToken, controller.getUserMailCtrl);
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//UPDATE DATA:
router.put(
  "/update/profile/:id",
  requireToken,
  checkIdentity,
  validateBodyProfile,
  controller.editProfileCtrl
);
router.put(
  "/update/mail/:id",
  requireToken,
  checkIdentity,
  validateBodyProfile,
  controller.changeEmailCtrl
);
router.put(
  "/update/password/:id",
  requireToken,
  checkIdentity,
  validateBodyProfile,
  controller.changePassCtrl
);
router.put(
  "/update/birthday/:id",
  requireToken,
  checkIdentity,
  validatorBirthdayUser,
  controller.addBirthdayCtrl
);
router.post(
  "/address/add/:id",
  requireToken,
  checkIdentity,
  validatorAddressUser,
  controller.addAddressCtrl
);

router.put(
  "/image/:id",
  requireToken,
  checkIdentity,
  upload.single("image"),
  controller.uploadProfileImage
);

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

export { router };
