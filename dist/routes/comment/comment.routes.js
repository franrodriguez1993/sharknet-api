"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
//Controllers:
const comment_ctrl_1 = require("../../controllers/comment/comment.ctrl");
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
//middleware:
const requireToken_1 = require("../../middlewares/requireToken");
const validatorManager_1 = require("../../middlewares/validatorManager");
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
const router = (0, express_1.Router)();
exports.router = router;
//create:
router.post("/create", requireToken_1.requireToken, validatorManager_1.validatorComment, comment_ctrl_1.commentProductCtrl);
router.post("/reply", requireToken_1.requireToken, validatorManager_1.validatorComment, comment_ctrl_1.replyCommentCtrl);
//List:
router.get("/list/:id", comment_ctrl_1.listCommentCtrl);
//Delete (admin)
router.delete("/del/:id", requireToken_1.requireToken, comment_ctrl_1.delCommentCtrl);
