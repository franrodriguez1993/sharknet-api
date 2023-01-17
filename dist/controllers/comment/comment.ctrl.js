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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const comment_serv_1 = __importDefault(require("../../services/comment/comment.serv"));
const service = new comment_serv_1.default();
class commentController {
    /** =================  COMMENT PRODUCT ==================**/
    commentProductCtrl(req, res) {
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
                const comment = yield service.commentProductServ(tokenID, data);
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
    /** =================  REPLY COMMENT  ====================**/
    replyCommentCtrl(req, res) {
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
                const comment = yield service.replyCommentServ(req.uid, data);
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
    /** ===============  LIST COMMENT ==============**/
    listCommentCtrl(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                //Data:
                const { id } = req.params;
                // query parameters:
                const page = parseInt(req.query.page);
                const size = parseInt(req.query.size);
                //Service:
                const list = yield service.listCommentServ(id, page, size);
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
    /** ===========  DELETE COMMENT ==============**/
    delCommentCtrl(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                //Data:
                const { id } = req.params;
                //Service:
                const del = yield service.delCommentServ(id);
                //Return:
                return res.json({ status: 200, msg: "OK", data: del });
            }
            catch (e) {
                return res.status(500).json({ status: 500, msg: e.message });
            }
        });
    }
}
exports.default = commentController;
