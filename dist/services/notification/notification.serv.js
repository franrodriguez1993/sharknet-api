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
const containers_1 = require("../../containers");
class notificationService {
    /** ===========  CHECK SEEN NOTIFICATION  ============== **/
    checkSeenServ(notification_id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield containers_1.daoNotification.checkSeen(notification_id);
        });
    }
    /** ================  GET NOTIFICATIONS LIST  =============== **/
    getNotificationServ(tokenID, user_id, page, size) {
        return __awaiter(this, void 0, void 0, function* () {
            //Check Authorization:
            if (tokenID.uid.toString() !== user_id.toString())
                return "UNAUTHORIZED_ACTION";
            //Check user:
            const user = yield containers_1.daoUser.getUser("id", user_id, true);
            if (!user)
                return "USER_NOT_FOUND";
            return yield containers_1.daoNotification.getNotifications(user_id, page, size);
        });
    }
}
exports.default = notificationService;
