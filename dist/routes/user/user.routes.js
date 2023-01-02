"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
//Controllers:
const user_ctrl_1 = require("../../controllers/user/user.ctrl");
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//Middlewares:
const RequireRefresh_1 = __importDefault(require("../../middlewares/RequireRefresh"));
const requireToken_1 = require("../../middlewares/requireToken");
const checkIdentity_1 = require("../../middlewares/checkIdentity");
const validatorManager_1 = require("../../middlewares/validatorManager");
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const router = (0, express_1.Router)();
exports.router = router;
//LOGIN - REGISTER:
router.post("/register", validatorManager_1.validateBodyRegister, user_ctrl_1.registerUserCtrl);
router.post("/login", validatorManager_1.validateBodyLogin, user_ctrl_1.loginUserCtrl);
router.post("/session", RequireRefresh_1.default, user_ctrl_1.refreshSessionCtrl);
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//GET USER:
router.get("/data/id/:id", user_ctrl_1.getUserIdCtrl);
router.post("/data/mail", user_ctrl_1.getUserMailCtrl);
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//UPDATE DATA:
router.put("/update/profile/:id", requireToken_1.requireToken, checkIdentity_1.checkIdentity, validatorManager_1.validateBodyProfile, user_ctrl_1.editProfileCtrl);
router.put("/update/mail/:id", requireToken_1.requireToken, checkIdentity_1.checkIdentity, validatorManager_1.validateBodyProfile, user_ctrl_1.changeEmailCtrl);
router.put("/update/password/:id", requireToken_1.requireToken, checkIdentity_1.checkIdentity, validatorManager_1.validateBodyProfile, user_ctrl_1.changePassCtrl);
router.put("/update/birthday/:id", requireToken_1.requireToken, checkIdentity_1.checkIdentity, validatorManager_1.validatorBirthdayUser, user_ctrl_1.addBirthdayCtrl);
router.post("/address/add/:id", requireToken_1.requireToken, checkIdentity_1.checkIdentity, validatorManager_1.validatorAddressUser, user_ctrl_1.addAddressCtrl);
router.post("/creditcard/add/:id", requireToken_1.requireToken, checkIdentity_1.checkIdentity, validatorManager_1.validateCreditCard, user_ctrl_1.addCreditCardCtrl);
//DELETE DATA:
router.delete("/address/del/:id", requireToken_1.requireToken, user_ctrl_1.deleteAddressCtrl);
router.delete("/creditcard/del/:id", requireToken_1.requireToken, user_ctrl_1.deleteCreditCardCtrl);
