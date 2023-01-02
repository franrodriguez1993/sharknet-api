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
exports.listSuperuserCtrl = exports.listLogActivityCtrl = exports.adminReactiveUserCtrl = exports.adminSuspendUserCtrl = exports.adminDeleteUserCtrl = exports.adminDowngradeCtrl = exports.adminUpgradeCtrl = exports.staffDowngradeCtrl = exports.staffUpgradeCtrl = void 0;
//Services:
const admin_serv_1 = require("../../services/superuser/admin.serv");
/** =====================  STAFF UPGRADE  ===================== **/
function staffUpgradeCtrl(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            //Data:
            const { id } = req.params;
            const tokenData = { uid: req.uid, rol: req.rol };
            //Service:
            const user = yield (0, admin_serv_1.staffUpgradeServ)(tokenData, id);
            //Return:
            if (user === "USER_NOT_FOUND" || user === "ROL_NOT_FOUND")
                return res.status(404).json({ status: 404, msg: user });
            //Ok:
            return res.json({ status: 200, msg: "OK", data: user });
        }
        catch (e) {
            return res.status(500).json({ status: 500, msg: e.message });
        }
    });
}
exports.staffUpgradeCtrl = staffUpgradeCtrl;
/** =====================  STAFF DOWNGRADE  ===================== **/
function staffDowngradeCtrl(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            //Data:
            const { id } = req.params;
            const tokenData = { uid: req.uid, rol: req.rol };
            //Service:
            const user = yield (0, admin_serv_1.staffDowngradeServ)(tokenData, id);
            //Return:
            if (user === "USER_NOT_FOUND" || user === "ROL_NOT_FOUND")
                return res.status(404).json({ status: 404, msg: user });
            //Ok:
            return res.json({ status: 200, msg: "OK", data: user });
        }
        catch (e) {
            return res.status(500).json({ status: 500, msg: e.message });
        }
    });
}
exports.staffDowngradeCtrl = staffDowngradeCtrl;
/** =====================  ADMIN UPGRADE  ===================== **/
function adminUpgradeCtrl(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            //Data:
            const { id } = req.params;
            const tokenData = { uid: req.uid, rol: req.rol };
            //Service:
            const user = yield (0, admin_serv_1.adminUpgradeServ)(tokenData, id);
            //Return:
            if (user === "USER_NOT_FOUND" || user === "ROL_NOT_FOUND")
                return res.status(404).json({ status: 404, msg: user });
            //Ok:
            return res.json({ status: 200, msg: "OK", data: user });
        }
        catch (e) {
            return res.status(500).json({ status: 500, msg: e.message });
        }
    });
}
exports.adminUpgradeCtrl = adminUpgradeCtrl;
/** =====================  ADMIN DOWNGRADE  ===================== **/
function adminDowngradeCtrl(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            //Data:
            const { id } = req.params;
            const tokenData = { uid: req.uid, rol: req.rol };
            //Service:
            const user = yield (0, admin_serv_1.adminDowngradeServ)(tokenData, id);
            //Return:
            if (user === "USER_NOT_FOUND" || user === "ROL_NOT_FOUND")
                return res.status(404).json({ status: 404, msg: user });
            //Ok:
            return res.json({ status: 200, msg: "OK", data: user });
        }
        catch (e) {
            return res.status(500).json({ status: 500, msg: e.message });
        }
    });
}
exports.adminDowngradeCtrl = adminDowngradeCtrl;
/** =============== DELETE USER  =============== **/
function adminDeleteUserCtrl(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            //Data:
            const { id } = req.params;
            const tokenData = { uid: req.uid, rol: req.rol };
            //Service:
            const del = yield (0, admin_serv_1.adminDeleteUserServ)(tokenData, id);
            //return:
            if (del === "USER_NOT_FOUND")
                return res.status(404).json({ status: 404, msg: del });
            //Ok:
            return res.json({ status: 200, msg: "USER_DELETED" });
        }
        catch (e) {
            return res.status(500).json({ status: 500, msg: e.message });
        }
    });
}
exports.adminDeleteUserCtrl = adminDeleteUserCtrl;
/** =============== SUSPEND USER  =============== **/
function adminSuspendUserCtrl(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            //Data:
            const { id } = req.params;
            const tokenData = { uid: req.uid, rol: req.rol };
            //Service:
            const suspend = yield (0, admin_serv_1.adminSuspendUserServ)(tokenData, id);
            //return:
            if (suspend === "USER_NOT_FOUND")
                return res.status(404).json({ status: 404, msg: suspend });
            //Ok:
            return res.json({ status: 200, msg: "USER_SUSPENDED" });
        }
        catch (e) {
            return res.status(500).json({ status: 500, msg: e.message });
        }
    });
}
exports.adminSuspendUserCtrl = adminSuspendUserCtrl;
/** =============== REACTIVE USER  =============== **/
function adminReactiveUserCtrl(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            //Data:
            const { id } = req.params;
            const tokenData = { uid: req.uid, rol: req.rol };
            //Service:
            const reactive = yield (0, admin_serv_1.adminReactiveUserServ)(tokenData, id);
            //return:
            if (reactive === "USER_NOT_FOUND")
                return res.status(404).json({ status: 404, msg: reactive });
            return res.json({ status: 200, msg: "OK", data: reactive });
        }
        catch (e) {
            return res.status(500).json({ status: 500, msg: e.message });
        }
    });
}
exports.adminReactiveUserCtrl = adminReactiveUserCtrl;
function listLogActivityCtrl(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            //Data:
            const { id } = req.params;
            // query parameters:
            const page = parseInt(req.query.page);
            const size = parseInt(req.query.size);
            //Service:
            const list = yield (0, admin_serv_1.listLogActivityServ)(id, page, size);
            //return:
            if (list === "USER_NOT_FOUND")
                return res.status(404).json({ status: 404, msg: list });
            return res.json({ status: 200, msg: "OK", data: list });
        }
        catch (e) {
            return res.status(500).json({ status: 500, msg: e.message });
        }
    });
}
exports.listLogActivityCtrl = listLogActivityCtrl;
function listSuperuserCtrl(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // query parameters:
            const page = parseInt(req.query.page);
            const size = parseInt(req.query.size);
            //Service:
            const list = yield (0, admin_serv_1.listSuperuserServ)(page, size);
            //Return:
            if (!list)
                return res.status(500).json({ status: 500, msg: "SERVER_ERROR" });
            else if (list === "FIND_ROL_ERROR")
                return res.status(500).json({ status: 500, msg: list });
            //Ok:
            return res.json({ status: 200, msg: "OK", data: list });
        }
        catch (e) {
            return res.status(500).json({ status: 500, msg: e.message });
        }
    });
}
exports.listSuperuserCtrl = listSuperuserCtrl;
