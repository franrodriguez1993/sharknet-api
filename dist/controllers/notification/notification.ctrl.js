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
exports.getNotificationCtrl = exports.checkSeenCtrl = void 0;
const notification_serv_1 = require("../../services/notification/notification.serv");
/** ======================  CHECK SEEN NOTIFICATION  ====================== **/
function checkSeenCtrl(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            //Data:
            const { id } = req.params;
            //Service:
            const seen = yield (0, notification_serv_1.checkSeenServ)(id);
            //Return:
            if (!seen)
                return res.status(400).json({ status: 400, msg: "ERROR_SEEN" });
            else if (seen === "NOTIFICATION_NOT_FOUND")
                return res.status(404).json({ status: 404, msg: seen });
            else if (seen === "NOTIFICATION_SEEN")
                return res.json({ status: 200, msg: seen });
        }
        catch (e) {
            return res.status(500).json({ status: 500, msg: e.message });
        }
    });
}
exports.checkSeenCtrl = checkSeenCtrl;
/** ======================  GET NOTIFICATIONS LIST  ====================== **/
function getNotificationCtrl(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            //Data:
            const { id } = req.params;
            const tokenID = { uid: req.uid, rol: req.rol };
            // query parameters:
            const page = parseInt(req.query.page);
            const size = parseInt(req.query.size);
            //Service:
            const list = yield (0, notification_serv_1.getNotificationServ)(tokenID, id, page, size);
            //Return:
            if (list === "UNAUTHORIZED_ACTION")
                return res.status(401).json({ status: 401, msg: list });
            else if (list === "USER_NOT_FOUND")
                return res.status(404).json({ status: 404, msg: list });
            //Ok:
            return res.json({ status: 200, msg: "OK", data: list });
        }
        catch (e) {
            return res.status(500).json({ status: 500, msg: e.message });
        }
    });
}
exports.getNotificationCtrl = getNotificationCtrl;