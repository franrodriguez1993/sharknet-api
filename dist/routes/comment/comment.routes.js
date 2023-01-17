"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
//Controllers:
const comment_ctrl_1 = __importDefault(require("../../controllers/comment/comment.ctrl"));
const controller = new comment_ctrl_1.default();
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
//middleware:
const requireToken_1 = require("../../middlewares/requireToken");
const validatorManager_1 = require("../../middlewares/validatorManager");
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
const router = (0, express_1.Router)();
exports.router = router;
//create:
router.post("/create", requireToken_1.requireToken, validatorManager_1.validatorComment, controller.commentProductCtrl);
router.post("/reply", requireToken_1.requireToken, validatorManager_1.validatorComment, controller.replyCommentCtrl);
//List:
router.get("/list/:id", controller.listCommentCtrl);
//Delete (admin)
router.delete("/del/:id", requireToken_1.requireToken, controller.delCommentCtrl);
