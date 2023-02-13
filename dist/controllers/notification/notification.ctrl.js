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
const logger_1 = __importDefault(require("../../utils/logger"));
//Service:
const notification_serv_1 = __importDefault(require("../../services/notification/notification.serv"));
const service = new notification_serv_1.default();
class notificationController {
    /** ============== CHECK SEEN NOTIFICATION  =============== **/
    checkSeenCtrl(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                //Data:
                const { id } = req.params;
                //Service:
                const seen = yield service.checkSeenServ(id);
                //Return:
                if (!seen)
                    return res.status(400).json({ status: 400, msg: "ERROR_SEEN" });
                else if (seen === "NOTIFICATION_NOT_FOUND")
                    return res.status(404).json({ status: 404, msg: seen });
                else if (seen === "NOTIFICATION_SEEN")
                    return res.json({ status: 200, msg: seen });
            }
            catch (e) {
                logger_1.default.error(e.message);
                return res.status(500).json({ status: 500, msg: e.message });
            }
        });
    }
    /** ==============  GET NOTIFICATIONS LIST  =============== **/
    getNotificationCtrl(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                //Data:
                const { id } = req.params;
                const tokenID = { uid: req.uid, rol: req.rol };
                // query parameters:
                const page = parseInt(req.query.page);
                const size = parseInt(req.query.size);
                const seen = req.query.seen;
                //Service:
                const list = yield service.getNotificationServ(tokenID, id, page, size, seen);
                //Return:
                if (list === "UNAUTHORIZED_ACTION")
                    return res.status(401).json({ status: 401, msg: list });
                else if (list === "USER_NOT_FOUND")
                    return res.status(404).json({ status: 404, msg: list });
                //Ok:
                return res.json({ status: 200, msg: "OK", data: list });
            }
            catch (e) {
                logger_1.default.error(e.message);
                return res.status(500).json({ status: 500, msg: e.message });
            }
        });
    }
}
exports.default = notificationController;
