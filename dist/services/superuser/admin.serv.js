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
exports.listSuperuserServ = exports.listLogActivityServ = exports.adminReactiveUserServ = exports.adminSuspendUserServ = exports.adminDeleteUserServ = exports.adminDowngradeServ = exports.adminUpgradeServ = exports.staffDowngradeServ = exports.staffUpgradeServ = void 0;
const containers_1 = require("../../containers");
/** =====================  STAFF UPGRADE  ===================== **/
function staffUpgradeServ(tokenData, user_id) {
    return __awaiter(this, void 0, void 0, function* () {
        //dao:
        const resData = yield containers_1.daoAdmin.staffUpgrade(user_id);
        //Create log Activity:
        if (resData === "USER_STAFF_UPGRADED") {
            yield containers_1.daoLogActivity.createUserLog(tokenData.uid, user_id, "STAFF_UPGRADE", tokenData.rol);
        }
        return resData;
    });
}
exports.staffUpgradeServ = staffUpgradeServ;
/** =====================  STAFF DOWNGRADE  ===================== **/
function staffDowngradeServ(tokenData, user_id) {
    return __awaiter(this, void 0, void 0, function* () {
        //dao:
        const resData = yield containers_1.daoAdmin.staffDowngrade(user_id);
        //Create log Activity:
        if (resData === "USER_STAFF_DOWNGRADED") {
            yield containers_1.daoLogActivity.createUserLog(tokenData.uid, user_id, "STAFF_DOWNGRADE", tokenData.rol);
        }
        return resData;
    });
}
exports.staffDowngradeServ = staffDowngradeServ;
/** =====================  ADMIN UPGRADE  ===================== **/
function adminUpgradeServ(tokenData, user_id) {
    return __awaiter(this, void 0, void 0, function* () {
        // check user:
        const check = yield containers_1.daoUser.getUser("id", user_id, true);
        if (!check)
            return "USER_NOT_FOUND";
        //dao:
        const resData = yield containers_1.daoAdmin.adminUpgrade(user_id);
        //Create log Activity:
        if (resData === "USER_ADMIN_UPGRADED") {
            yield containers_1.daoLogActivity.createUserLog(tokenData.uid, user_id, "ADMIN_UPGRADE", tokenData.rol);
        }
        return resData;
    });
}
exports.adminUpgradeServ = adminUpgradeServ;
/** =====================  ADMIN DOWNGRADE  ===================== **/
function adminDowngradeServ(tokenData, user_id) {
    return __awaiter(this, void 0, void 0, function* () {
        // check user:
        const check = yield containers_1.daoUser.getUser("id", user_id, true);
        if (!check)
            return "USER_NOT_FOUND";
        //dao:
        const resData = yield containers_1.daoAdmin.admindowngrade(user_id);
        //Create log Activity:
        if (resData === "USER_ADMIN_DOWNGRADED") {
            yield containers_1.daoLogActivity.createUserLog(tokenData.uid, user_id, "ADMIN_DOWNGRADE", tokenData.rol);
        }
        return resData;
    });
}
exports.adminDowngradeServ = adminDowngradeServ;
/** =============== DELETE USER  =============== **/
function adminDeleteUserServ(tokenData, user_id) {
    return __awaiter(this, void 0, void 0, function* () {
        // check user:
        const check = yield containers_1.daoUser.getUser("id", user_id, true);
        if (!check)
            return "USER_NOT_FOUND";
        const resDelete = yield containers_1.daoAdmin.deleteUser(user_id);
        //Create log Activity:
        if (resDelete) {
            yield containers_1.daoLogActivity.createUserLog(tokenData.uid, user_id, "DELETE", tokenData.rol);
        }
        return "USER_DELETED";
    });
}
exports.adminDeleteUserServ = adminDeleteUserServ;
/** =============== SUSPEND USER  =============== **/
function adminSuspendUserServ(tokenData, user_id) {
    return __awaiter(this, void 0, void 0, function* () {
        // check user:
        const check = yield containers_1.daoUser.getUser("id", user_id, true);
        if (!check)
            return "USER_NOT_FOUND";
        const resSuspend = yield containers_1.daoAdmin.suspendUser(user_id);
        //Create log Activity:
        if (resSuspend) {
            yield containers_1.daoLogActivity.createUserLog(tokenData.uid, user_id, "SUSPEND", tokenData.rol);
        }
        return "USER_SUSPENDED";
    });
}
exports.adminSuspendUserServ = adminSuspendUserServ;
/** =============== REACTIVE USER  =============== **/
function adminReactiveUserServ(tokenData, user_id) {
    return __awaiter(this, void 0, void 0, function* () {
        // check user:
        const check = yield containers_1.daoUser.getUser("id", user_id, true);
        if (!check)
            return "USER_NOT_FOUND";
        //Reactive user:
        const reactiveUser = yield containers_1.daoAdmin.reactivateUser(user_id);
        //Log:
        if (reactiveUser) {
            yield containers_1.daoLogActivity.createUserLog(tokenData.uid, user_id, "REACTIVE", tokenData.rol);
        }
        return "USER_REACTIVATED";
    });
}
exports.adminReactiveUserServ = adminReactiveUserServ;
/**  =====================  LIST LOGS ACTIVITY ====================  **/
function listLogActivityServ(user_id, page, size) {
    return __awaiter(this, void 0, void 0, function* () {
        // check user:
        const check = yield containers_1.daoUser.getUser("id", user_id, true);
        if (!check)
            return "USER_NOT_FOUND";
        return yield containers_1.daoLogActivity.listLogActivity(user_id, page, size);
    });
}
exports.listLogActivityServ = listLogActivityServ;
/**  =====================  LIST LOGS ACTIVITY ====================  **/
function listSuperuserServ(page, size) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield containers_1.daoAdmin.listSuperusers(page, size);
    });
}
exports.listSuperuserServ = listSuperuserServ;
