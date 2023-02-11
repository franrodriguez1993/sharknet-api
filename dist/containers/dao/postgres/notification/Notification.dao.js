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
exports.daoNotificationSQL = void 0;
//uuid:
const uuid_1 = require("uuid");
//Model:
const Notification_model_1 = __importDefault(require("../../../../models/sql/notificationModel/Notification.model"));
//pagination:
const paginationfunction_1 = require("../../../../utils/paginationfunction");
const product_model_1 = __importDefault(require("../../../../models/sql/productsModel/product.model"));
class daoNotificationSQL {
    constructor() { }
    /** -------------- CREATE NOTIFICATION -------------- **/
    createNotification(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const notification_id = (0, uuid_1.v4)();
                return yield Notification_model_1.default.create({
                    notification_id,
                    user_id: data.user_id,
                    notification_type: data.notification_type,
                    product_id: data.product_id,
                });
            }
            catch (e) {
                throw new Error(e.message);
            }
        });
    }
    /** -------------- SEEN NOTIFICATION -------------- **/
    checkSeen(notification_id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const notification = yield Notification_model_1.default.findOne({ where: { notification_id } });
                if (!notification)
                    return "NOTIFICATION_NOT_FOUND";
                notification.set({ notification_seen: true });
                yield notification.save();
                return "NOTIFICATION_SEEN";
            }
            catch (e) {
                throw new Error(e.message);
            }
        });
    }
    /** -------------- GET NOTIFICATIONS -------------- **/
    getNotifications(user_id, page = 0, size = 0) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { limit, offset } = (0, paginationfunction_1.getPagination)(page, size);
                const data = yield Notification_model_1.default.findAndCountAll({
                    where: { user_id },
                    limit,
                    offset,
                    order: [["createdAt", "DESC"]],
                    include: [
                        { model: product_model_1.default, attributes: ["product_name", "product_thumbnail"] },
                    ],
                });
                return (0, paginationfunction_1.getPaginationNotification)(data, page, limit);
            }
            catch (e) {
                throw new Error(e.message);
            }
        });
    }
}
exports.daoNotificationSQL = daoNotificationSQL;
