"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.delCommentCtrl = exports.listCommentCtrl = exports.replyCommentCtrl = exports.commentProductCtrl = void 0;
const comment_serv_1 = require("../../services/comment/comment.serv");
/** ===========================  COMMENT PRODUCT ================================**/
function commentProductCtrl(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            //Data:
            const data = {
                product_id: req.body.product,
                user_id: req.body.user,
                comment_body: req.body.body,
                comment_reply: req.body.reply,
                comment_parent: req.body.parent,
            };
            const tokenID = { uid: req.uid, rol: req.rol };
            //Service:
            const comment = yield (0, comment_serv_1.commentProductServ)(tokenID, data);
            //Return:
            if (!comment)
                return res.status(500).json({ status: 500, msg: "SERVER_ERROR" });
            else if (comment === "PRODUCT_NOT_FOUND" || comment === "USER_NOT_FOUND")
                return res.status(404).json({ status: 404, msg: comment });
            else if (comment === "COMMENT_IS_REPLY" || comment === "USER_IS_SELLER")
                return res.status(400).json({ status: 400, msg: comment });
            else if (comment === "UNAUTHORIZED_ACTION")
                return res.status(401).json({ status: 401, msg: comment });
            //Ok:
            return res.json({ status: 201, msg: "COMMENT_CREATED" });
        }
        catch (e) {
            return res.status(500).json({ status: 500, msg: e.message });
        }
    });
}
exports.commentProductCtrl = commentProductCtrl;
/** ===========================  REPLY COMMENT  ================================**/
function replyCommentCtrl(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            //data:
            const data = {
                product_id: req.body.product,
                user_id: req.body.user,
                comment_body: req.body.body,
                comment_reply: req.body.reply,
                comment_parent: req.body.parent,
            };
            //Service:
            const comment = yield (0, comment_serv_1.replyCommentServ)(req.uid, data);
            //Return:
            if (!comment)
                return res.status(500).json({ status: 500, msg: "SERVER_ERROR" });
            else if (comment === "PRODUCT_NOT_FOUND" ||
                comment === "USER_NOT_FOUND" ||
                comment === "COMMENT_NOT_FOUND")
                return res.status(404).json({ status: 404, msg: comment });
            else if (comment === "COMMENT_ISNT_REPLY" ||
                comment === "USER_ISNT_SELLER" ||
                comment === "COMMENT_ALREADY_REPLIED")
                return res.status(400).json({ status: 400, msg: comment });
            else if (comment === "UNAUTHORIZED_ACTION")
                return res.status(401).json({ status: 401, msg: comment });
            //Ok:
            return res.json({ status: 201, msg: "REPLY_CREATED" });
        }
        catch (e) {
            return res.status(500).json({ status: 500, msg: e.message });
        }
    });
}
exports.replyCommentCtrl = replyCommentCtrl;
/** ===========================  LIST COMMENT ================================**/
function listCommentCtrl(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            //Data:
            const { id } = req.params;
            // query parameters:
            const page = parseInt(req.query.page);
            const size = parseInt(req.query.size);
            //Service:
            const list = yield (0, comment_serv_1.listCommentServ)(id, page, size);
            //Return:
            if (!list)
                return res.status(500).json({ status: 500, msg: "SERVER_ERROR" });
            else if (list === "PRODUCT_NOT_FOUND")
                return res.status(404).json({ status: 404, msg: list });
            //Ok:
            return res.json({ status: 200, msg: "OK", data: list });
        }
        catch (e) {
            return res.status(500).json({ status: 500, msg: e.message });
        }
    });
}
exports.listCommentCtrl = listCommentCtrl;
/** ===========================  DELETE COMMENT ================================**/
function delCommentCtrl(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            //Data:
            const { id } = req.params;
            //Service:
            const del = yield (0, comment_serv_1.delCommentServ)(id);
            //Return:
            return res.json({ status: 200, msg: "OK", data: del });
        }
        catch (e) {
            return res.status(500).json({ status: 500, msg: e.message });
        }
    });
}
exports.delCommentCtrl = delCommentCtrl;
