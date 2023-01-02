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
exports.delCommentServ = exports.listCommentServ = exports.replyCommentServ = exports.commentProductServ = void 0;
//uuid:
const uuid_1 = require("uuid");
//DAOs:
const containers_1 = require("../../containers");
/** ===========================  COMMENT PRODUCT ================================**/
function commentProductServ(tokenUID, data) {
    return __awaiter(this, void 0, void 0, function* () {
        //Check authorization:
        if (tokenUID.uid.toString() !== data.user_id.toString() ||
            tokenUID.rol.toString() !== "user")
            return "UNAUTHORIZED_ACTION";
        //CheckUser:
        const user = yield containers_1.daoUser.getUser("id", data.user_id, true);
        if (!user)
            return "USER_NOT_FOUND";
        //Check product:
        const product = yield containers_1.daoProduct.getProduct(data.product_id, true);
        if (!product)
            return "PRODUCT_NOT_FOUND";
        //Check seller:
        if (data.user_id.toString() === product.user_id.toString())
            return "USER_IS_SELLER";
        //Check if is reply:
        if (data.comment_reply || data.comment_parent === false)
            return "COMMENT_IS_REPLY";
        //create:
        const comment_id = (0, uuid_1.v4)();
        const comment = yield containers_1.daoComment.createComment(Object.assign(Object.assign({}, data), { comment_id }));
        if (comment) {
            //Create user notification:
            yield containers_1.daoNotification.createNotification({
                user_id: product.user_id,
                product_id: data.product_id,
                notification_type: "NEW_COMMENT",
            });
            return comment;
        }
    });
}
exports.commentProductServ = commentProductServ;
/** ===========================  REPLY COMMENT ================================**/
function replyCommentServ(tokenUID, data) {
    return __awaiter(this, void 0, void 0, function* () {
        //Check authorization:
        if (tokenUID.toString() !== data.user_id.toString())
            return "UNAUTHORIZED_ACTION";
        //CheckUser:
        const user = yield containers_1.daoUser.getUser("id", data.user_id, true);
        if (!user)
            return "USER_NOT_FOUND";
        //Check product:
        const product = yield containers_1.daoProduct.getProduct(data.product_id, true);
        if (!product)
            return "PRODUCT_NOT_FOUND";
        //Check seller:
        if (data.user_id.toString() !== product.user_id.toString())
            return "USER_ISNT_SELLER";
        //Check comment:
        const comment = yield containers_1.daoComment.getComment(data.comment_reply);
        if (!comment)
            return "COMMENT_NOT_FOUND";
        //Check if is reply:
        if (!data.comment_reply || data.comment_parent === true)
            return "COMMENT_ISNT_REPLY";
        //Check if has been already replied:
        const replied = yield containers_1.daoComment.checkReply(data.comment_reply, data.user_id);
        if (replied)
            return "COMMENT_ALREADY_REPLIED";
        //Create:
        const comment_id = (0, uuid_1.v4)();
        const replyComment = yield containers_1.daoComment.createComment(Object.assign(Object.assign({}, data), { comment_id }));
        if (replyComment) {
            yield containers_1.daoNotification.createNotification({
                user_id: comment.user_id,
                notification_type: "RESPONSE_RECEIVED",
                product_id: data.product_id,
            });
            return replyComment;
        }
    });
}
exports.replyCommentServ = replyCommentServ;
/** ===========================  LIST COMMENT ================================**/
function listCommentServ(product_id, page, size) {
    return __awaiter(this, void 0, void 0, function* () {
        const product = yield containers_1.daoProduct.getProduct(product_id, true);
        if (!product)
            return "PRODUCT_NOT_FOUND";
        return yield containers_1.daoComment.listComment(product_id, page, size);
    });
}
exports.listCommentServ = listCommentServ;
/** ===========================  DELETE COMMENT ================================**/
function delCommentServ(comment_id) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield containers_1.daoComment.deleteComment(comment_id);
    });
}
exports.delCommentServ = delCommentServ;
