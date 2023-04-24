import { Router } from "express";

//Midlewares:
import { rateLimit } from "express-rate-limit";
import {
  validateBodyLogin,
  validateBodyRegister,
} from "../../middlewares/validatorManager";
import requireRefresh from "../../middlewares/RequireRefresh";
//Controllers:
import userController from "../../controllers/user/user.ctrl";
const controller = new userController();

//Auth request limiter:
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: "ERROR: Too many requests",
});

const authRouter = Router();

//LOGIN - REGISTER:
authRouter.post(
  "/register",
  authLimiter,
  validateBodyRegister,
  controller.registerUserCtrl
);
authRouter.post(
  "/login",
  authLimiter,
  validateBodyLogin,
  controller.loginUserCtrl
);
authRouter.post("/session", requireRefresh, controller.refreshSessionCtrl);
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

export { authRouter };
