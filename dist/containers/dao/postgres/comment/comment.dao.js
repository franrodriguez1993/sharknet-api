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
exports.daoCommentSQL = void 0;
const base_container_1 = __importDefault(require("../../../base/base.container"));
const comment_model_1 = __importDefault(require("../../../../models/sql/commentsModel/comment.model"));
const User_model_1 = __importDefault(require("../../../../models/sql/usersModel/User.model"));
const paginationfunction_1 = require("../../../../utils/paginationfunction");
class daoCommentSQL extends base_container_1.default {
    constructor() {
        super(comment_model_1.default);
    }
    /** --------------- COMMENT PRODUCT --------------- **/
    createComment(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield comment_model_1.default.create({
                    comment_id: data.comment_id,
                    product_id: data.product_id,
                    user_id: data.user_id,
                    comment_body: data.comment_body,
                    comment_reply: data.comment_reply,
                    comment_parent: data.comment_parent,
                });
            }
            catch (e) {
                throw new Error(e.message);
            }
        });
    }
    /** --------------- GET COMMENT --------------- **/
    getComment(comment_id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield comment_model_1.default.findOne({ where: { comment_id } });
            }
            catch (e) {
                throw new Error(e.message);
            }
        });
    }
    /** --------------- CHECK REPLY --------------- **/
    //Function to check if the comments has been already replied for the seller
    checkReply(comment_reply, user_id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield comment_model_1.default.findOne({ where: { comment_reply, user_id } });
            }
            catch (e) {
                throw new Error(e.message);
            }
        });
    }
    /** --------------- LIST COMMENTS --------------- **/
    listComment(product_id, page = 0, size = 0) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { limit, offset } = (0, paginationfunction_1.getPagination)(page, size);
                const data = yield comment_model_1.default.findAndCountAll({
                    where: { product_id, comment_parent: true },
                    limit,
                    offset,
                    attributes: { exclude: ["user_id", "product_id"] },
                    include: [
                        {
                            model: User_model_1.default,
                            attributes: ["user_username", "user_name", "user_lastname"],
                        },
                        {
                            model: comment_model_1.default,
                            include: [
                                {
                                    model: User_model_1.default,
                                    attributes: ["user_username", "user_name", "user_lastname"],
                                },
                            ],
                        },
                    ],
                });
                if (data) {
                    return (0, paginationfunction_1.getPaginationComment)(data, page, limit);
                }
            }
            catch (e) {
                throw new Error(e.message);
            }
        });
    }
    /** --------------- DELETE COMMENTS --------------- **/
    deleteComment(comment_id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield comment_model_1.default.destroy({ where: { comment_id } });
            }
            catch (e) {
                throw new Error(e.message);
            }
        });
    }
}
exports.daoCommentSQL = daoCommentSQL;
