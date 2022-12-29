import { Router } from "express";

//Controllers:
import {
  registerUserCtrl,
  loginUserCtrl,
  refreshSessionCtrl,
  getUserIdCtrl,
  getUserMailCtrl,
  editProfileCtrl,
  changeEmailCtrl,
  changePassCtrl,
  addBirthdayCtrl,
  addAddressCtrl,
  deleteAddressCtrl,
  addCreditCardCtrl,
  deleteCreditCardCtrl,
} from "../../controllers/user/user.ctrl";
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
router.post("/register", validateBodyRegister, registerUserCtrl);
router.post("/login", validateBodyLogin, loginUserCtrl);
router.post("/session", requireRefresh, refreshSessionCtrl);
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//GET USER:
router.get("/data/id/:id", getUserIdCtrl);
router.post("/data/mail", getUserMailCtrl);
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//UPDATE DATA:
router.put(
  "/update/profile/:id",
  requireToken,
  checkIdentity,
  validateBodyProfile,
  editProfileCtrl
);
router.put(
  "/update/mail/:id",
  requireToken,
  checkIdentity,
  validateBodyProfile,
  changeEmailCtrl
);
router.put(
  "/update/password/:id",
  requireToken,
  checkIdentity,
  validateBodyProfile,
  changePassCtrl
);
router.put(
  "/update/birthday/:id",
  requireToken,
  checkIdentity,
  validatorBirthdayUser,
  addBirthdayCtrl
);
router.post(
  "/address/add/:id",
  requireToken,
  checkIdentity,
  validatorAddressUser,
  addAddressCtrl
);
router.post(
  "/creditcard/add/:id",
  requireToken,
  checkIdentity,
  validateCreditCard,
  addCreditCardCtrl
);
//DELETE DATA:
router.delete("/address/del/:id", requireToken, deleteAddressCtrl);
router.delete("/creditcard/del/:id", requireToken, deleteCreditCardCtrl);
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

export { router };
