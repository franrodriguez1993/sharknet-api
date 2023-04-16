"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const multer_1 = __importDefault(require("multer"));
//Controllers:
const user_ctrl_1 = __importDefault(require("../../controllers/user/user.ctrl"));
const controller = new user_ctrl_1.default();
const upload = (0, multer_1.default)({ storage: multer_1.default.memoryStorage() });
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
router.post("/register", validatorManager_1.validateBodyRegister, controller.registerUserCtrl);
router.post("/login", validatorManager_1.validateBodyLogin, controller.loginUserCtrl);
router.post("/session", RequireRefresh_1.default, controller.refreshSessionCtrl);
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//GET USER:
router.get("/data/id/:id", requireToken_1.requireToken, controller.getUserIdCtrl);
router.post("/data/mail", requireToken_1.requireToken, controller.getUserMailCtrl);
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//UPDATE DATA:
router.put("/update/profile/:id", requireToken_1.requireToken, checkIdentity_1.checkIdentity, validatorManager_1.validateBodyProfile, controller.editProfileCtrl);
router.put("/update/mail/:id", requireToken_1.requireToken, checkIdentity_1.checkIdentity, validatorManager_1.validateBodyProfile, controller.changeEmailCtrl);
router.put("/update/password/:id", requireToken_1.requireToken, checkIdentity_1.checkIdentity, validatorManager_1.validateBodyProfile, controller.changePassCtrl);
router.put("/update/birthday/:id", requireToken_1.requireToken, checkIdentity_1.checkIdentity, validatorManager_1.validatorBirthdayUser, controller.addBirthdayCtrl);
router.post("/address/add/:id", requireToken_1.requireToken, checkIdentity_1.checkIdentity, validatorManager_1.validatorAddressUser, controller.addAddressCtrl);
router.put("/image/:id", requireToken_1.requireToken, checkIdentity_1.checkIdentity, upload.single("image"), controller.uploadProfileImage);
