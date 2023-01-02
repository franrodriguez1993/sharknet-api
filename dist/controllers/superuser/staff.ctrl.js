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
exports.reactiveUserCtrl = exports.suspendUserCtrl = exports.deleteUserCtrl = exports.unverifyUserCtrl = exports.verifyUserCtrl = void 0;
const staff_serv_1 = require("../../services/superuser/staff.serv");
/** =============== VERIFY USER  =============== **/
function verifyUserCtrl(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            //Data:
            const { id } = req.params;
            const tokenData = { uid: req.uid, rol: req.rol };
            //Service:
            const user = yield (0, staff_serv_1.verifyUserServ)(tokenData, id);
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
exports.verifyUserCtrl = verifyUserCtrl;
/** =============== UNVERIFY USER  =============== **/
function unverifyUserCtrl(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            //Data:
            const { id } = req.params;
            const tokenData = { uid: req.uid, rol: req.rol };
            //Service:
            const user = yield (0, staff_serv_1.unverifyUserServ)(tokenData, id);
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
exports.unverifyUserCtrl = unverifyUserCtrl;
/** =============== DELETE USER  =============== **/
function deleteUserCtrl(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            //Data:
            const { id } = req.params;
            const tokenData = { uid: req.uid, rol: req.rol };
            //Service:
            const del = yield (0, staff_serv_1.deleteUserServ)(tokenData, id);
            //Return
            if (del === "UNAUTHORIZED_DELETE_ROL")
                return res.status(401).json({ status: 401, msg: del });
            else if (del === "USER_NOT_FOUND")
                return res.status(404).json({ status: 404, msg: del });
            //Ok:
            return res.json({ status: 200, msg: "OK", data: del });
        }
        catch (e) {
            return res.status(500).json({ status: 500, msg: e.message });
        }
    });
}
exports.deleteUserCtrl = deleteUserCtrl;
/** =============== SUSPEND USER  =============== **/
function suspendUserCtrl(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            //Data:
            const { id } = req.params;
            const tokenData = { uid: req.uid, rol: req.rol };
            //Service:
            const suspend = yield (0, staff_serv_1.suspendUserServ)(tokenData, id);
            //Return
            if (suspend === "UNAUTHORIZED_SUSPEND_ROL")
                return res.status(401).json({ status: 401, msg: suspend });
            else if (suspend === "USER_NOT_FOUND")
                return res.status(404).json({ status: 404, msg: suspend });
            //Ok:
            return res.json({ status: 200, msg: "OK", data: suspend });
        }
        catch (e) {
            return res.status(500).json({ status: 500, msg: e.message });
        }
    });
}
exports.suspendUserCtrl = suspendUserCtrl;
/** =============== REACTIVATE USER  =============== **/
function reactiveUserCtrl(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            //Data:
            const { id } = req.params;
            const tokenData = { uid: req.uid, rol: req.rol };
            //Service:
            const reactive = yield (0, staff_serv_1.reactiveUserServ)(tokenData, id);
            //Return
            if (reactive === "UNAUTHORIZED_REACTIVE_ROL")
                return res.status(401).json({ status: 401, msg: reactive });
            else if (reactive === "USER_NOT_FOUND")
                return res.status(404).json({ status: 404, msg: reactive });
            //Ok:
            return res.json({ status: 200, msg: "OK", data: reactive });
        }
        catch (e) {
            return res.status(500).json({ status: 500, msg: e.message });
        }
    });
}
exports.reactiveUserCtrl = reactiveUserCtrl;
