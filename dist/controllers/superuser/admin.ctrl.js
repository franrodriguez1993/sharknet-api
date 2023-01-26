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
//Services:
const admin_serv_1 = __importDefault(require("../../services/superuser/admin.serv"));
const service = new admin_serv_1.default();
class adminController {
    /** =================  STAFF UPGRADE  ================ **/
    staffUpgradeCtrl(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                //Data:
                const { id } = req.params;
                const tokenData = { uid: req.uid, rol: req.rol };
                //Service:
                const user = yield service.staffUpgradeServ(tokenData, id);
                //Return:
                if (user === "USER_NOT_FOUND" || user === "ROL_NOT_FOUND")
                    return res.status(404).json({ status: 404, msg: user });
                //Ok:
                return res.json({ status: 200, msg: "OK", data: user });
            }
            catch (e) {
                logger_1.default.error(e.message);
                return res.status(500).json({ status: 500, msg: e.message });
            }
        });
    }
    /** ===================  STAFF DOWNGRADE  ================= **/
    staffDowngradeCtrl(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                //Data:
                const { id } = req.params;
                const tokenData = { uid: req.uid, rol: req.rol };
                //Service:
                const user = yield service.staffDowngradeServ(tokenData, id);
                //Return:
                if (user === "USER_NOT_FOUND" || user === "ROL_NOT_FOUND")
                    return res.status(404).json({ status: 404, msg: user });
                //Ok:
                return res.json({ status: 200, msg: "OK", data: user });
            }
            catch (e) {
                logger_1.default.error(e.message);
                return res.status(500).json({ status: 500, msg: e.message });
            }
        });
    }
    /** ================  ADMIN UPGRADE  ================ **/
    adminUpgradeCtrl(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                //Data:
                const { id } = req.params;
                const tokenData = { uid: req.uid, rol: req.rol };
                //Service:
                const user = yield service.adminUpgradeServ(tokenData, id);
                //Return:
                if (user === "USER_NOT_FOUND" || user === "ROL_NOT_FOUND")
                    return res.status(404).json({ status: 404, msg: user });
                //Ok:
                return res.json({ status: 200, msg: "OK", data: user });
            }
            catch (e) {
                logger_1.default.error(e.message);
                return res.status(500).json({ status: 500, msg: e.message });
            }
        });
    }
    /** ================  ADMIN DOWNGRADE  ================ **/
    adminDowngradeCtrl(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                //Data:
                const { id } = req.params;
                const tokenData = { uid: req.uid, rol: req.rol };
                //Service:
                const user = yield service.adminDowngradeServ(tokenData, id);
                //Return:
                if (user === "USER_NOT_FOUND" || user === "ROL_NOT_FOUND")
                    return res.status(404).json({ status: 404, msg: user });
                //Ok:
                return res.json({ status: 200, msg: "OK", data: user });
            }
            catch (e) {
                logger_1.default.error(e.message);
                return res.status(500).json({ status: 500, msg: e.message });
            }
        });
    }
    /** =============== DELETE USER  =============== **/
    adminDeleteUserCtrl(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                //Data:
                const { id } = req.params;
                const tokenData = { uid: req.uid, rol: req.rol };
                //Service:
                const del = yield service.adminDeleteUserServ(tokenData, id);
                //return:
                if (del === "USER_NOT_FOUND")
                    return res.status(404).json({ status: 404, msg: del });
                //Ok:
                return res.json({ status: 200, msg: "USER_DELETED" });
            }
            catch (e) {
                logger_1.default.error(e.message);
                return res.status(500).json({ status: 500, msg: e.message });
            }
        });
    }
    /** =============== SUSPEND USER  =============== **/
    adminSuspendUserCtrl(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                //Data:
                const { id } = req.params;
                const tokenData = { uid: req.uid, rol: req.rol };
                //Service:
                const suspend = yield service.adminSuspendUserServ(tokenData, id);
                //return:
                if (suspend === "USER_NOT_FOUND")
                    return res.status(404).json({ status: 404, msg: suspend });
                //Ok:
                return res.json({ status: 200, msg: "USER_SUSPENDED" });
            }
            catch (e) {
                logger_1.default.error(e.message);
                return res.status(500).json({ status: 500, msg: e.message });
            }
        });
    }
    /** =============== REACTIVE USER  =============== **/
    adminReactiveUserCtrl(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                //Data:
                const { id } = req.params;
                const tokenData = { uid: req.uid, rol: req.rol };
                //Service:
                const reactive = yield service.adminReactiveUserServ(tokenData, id);
                //return:
                if (reactive === "USER_NOT_FOUND")
                    return res.status(404).json({ status: 404, msg: reactive });
                return res.json({ status: 200, msg: "OK", data: reactive });
            }
            catch (e) {
                logger_1.default.error(e.message);
                return res.status(500).json({ status: 500, msg: e.message });
            }
        });
    }
    /** =============== LIST LOG ACTIVITY  =============== **/
    listLogActivityCtrl(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                //Data:
                const { id } = req.params;
                // query parameters:
                const page = parseInt(req.query.page);
                const size = parseInt(req.query.size);
                //Service:
                const list = yield service.listLogActivityServ(id, page, size);
                //return:
                if (list === "USER_NOT_FOUND")
                    return res.status(404).json({ status: 404, msg: list });
                return res.json({ status: 200, msg: "OK", data: list });
            }
            catch (e) {
                logger_1.default.error(e.message);
                return res.status(500).json({ status: 500, msg: e.message });
            }
        });
    }
    /** =============== LIST ALL SUPERUSERS ACTIVITY  =============== **/
    listSuperuserCtrl(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // query parameters:
                const page = parseInt(req.query.page);
                const size = parseInt(req.query.size);
                //Service:
                const list = yield service.listSuperuserServ(page, size);
                //Return:
                if (!list)
                    return res.status(500).json({ status: 500, msg: "SERVER_ERROR" });
                else if (list === "FIND_ROL_ERROR")
                    return res.status(500).json({ status: 500, msg: list });
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
exports.default = adminController;
