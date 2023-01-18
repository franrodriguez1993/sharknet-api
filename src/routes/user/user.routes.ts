import { Router } from "express";

//Controllers:
import userController from "../../controllers/user/user.ctrl";
const controller = new userController();
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

//Middlewares:
import requireRefresh from "../../middlewares/RequireRefresh";
import { requireToken } from "../../middlewares/requireToken";
import { checkIdentity } from "../../middlewares/checkIdentity";
import {
  validateBodyLogin,
  validateBodyProfile,
  validateBodyRegister,
  validateCreditCard,
  validatorAddressUser,
  validatorBirthdayUser,
} from "../../middlewares/validatorManager";
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

const router = Router();

//LOGIN - REGISTER:
router.post("/register", validateBodyRegister, controller.registerUserCtrl);
router.post("/login", validateBodyLogin, controller.loginUserCtrl);
router.post("/session", requireRefresh, controller.refreshSessionCtrl);
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
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
router.post(
  "/creditcard/add/:id",
  requireToken,
  checkIdentity,
  validateCreditCard,
  controller.addCreditCardCtrl
);
//DELETE DATA:
router.delete("/address/del/:id", requireToken, controller.deleteAddressCtrl);
router.delete(
  "/creditcard/del/:id",
  requireToken,
  controller.deleteCreditCardCtrl
);
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

export { router };
