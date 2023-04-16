import { Router } from "express";

//Midlewares:
import {
  validateBodyLogin,
  validateBodyRegister,
} from "../../middlewares/validatorManager";
import requireRefresh from "../../middlewares/RequireRefresh";
//Controllers:
import userController from "../../controllers/user/user.ctrl";
const controller = new userController();

const authRouter = Router();

//LOGIN - REGISTER:
authRouter.post("/register", validateBodyRegister, controller.registerUserCtrl);
authRouter.post("/login", validateBodyLogin, controller.loginUserCtrl);
authRouter.post("/session", requireRefresh, controller.refreshSessionCtrl);
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

export { authRouter };
