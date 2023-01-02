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
exports.reactiveUserServ = exports.suspendUserServ = exports.deleteUserServ = exports.unverifyUserServ = exports.verifyUserServ = void 0;
//DAOs:
const containers_1 = require("../../containers");
/** =============== VERIFY USER  =============== **/
function verifyUserServ(tokenData, user_id) {
    return __awaiter(this, void 0, void 0, function* () {
        //verify:
        const verified = yield containers_1.daoStaff.verifyUser(user_id);
        //create log:
        if (verified === "USER_VERIFIED") {
            yield containers_1.daoLogActivity.createUserLog(tokenData.uid, user_id, "VERIFIED", tokenData.rol);
        }
        return verified;
    });
}
exports.verifyUserServ = verifyUserServ;
/** =============== UNVERIFY USER  =============== **/
function unverifyUserServ(tokenData, user_id) {
    return __awaiter(this, void 0, void 0, function* () {
        //unverify:
        const unverified = yield containers_1.daoStaff.unverifyUser(user_id);
        //create log:
        if (unverified === "USER_UNVERIFIED") {
            yield containers_1.daoLogActivity.createUserLog(tokenData.uid, user_id, "UNVERIFIED", tokenData.rol);
        }
        return unverified;
    });
}
exports.unverifyUserServ = unverifyUserServ;
/** =============== DELETE USER  =============== **/
function deleteUserServ(tokenData, user_id) {
    return __awaiter(this, void 0, void 0, function* () {
        //Check user
        const check = yield containers_1.daoUser.getUser("id", user_id, true);
        if (!check)
            return "USER_NOT_FOUND";
        const resDelete = yield containers_1.daoStaff.deleteUser(user_id);
        //Create log Activity:
        if (resDelete === "USER_DELETED") {
            yield containers_1.daoLogActivity.createUserLog(tokenData.uid, user_id, "DELETE", tokenData.rol);
        }
        return resDelete;
    });
}
exports.deleteUserServ = deleteUserServ;
/** =============== SUSPEND USER  =============== **/
function suspendUserServ(tokenData, user_id) {
    return __awaiter(this, void 0, void 0, function* () {
        //Check user
        const check = yield containers_1.daoUser.getUser("id", user_id, true);
        if (!check)
            return "USER_NOT_FOUND";
        const resSuspend = yield containers_1.daoStaff.suspendUser(user_id);
        //Create log Activity:
        if (resSuspend === "USER_SUSPENDED") {
            yield containers_1.daoLogActivity.createUserLog(tokenData.uid, user_id, "SUSPEND", tokenData.rol);
        }
        return resSuspend;
    });
}
exports.suspendUserServ = suspendUserServ;
/** =============== REACTIVE USER  =============== **/
function reactiveUserServ(tokenData, user_id) {
    return __awaiter(this, void 0, void 0, function* () {
        //Check user
        const check = yield containers_1.daoUser.getUser("id", user_id, true);
        if (!check)
            return "USER_NOT_FOUND";
        //reactive:
        const reactiveUser = yield containers_1.daoStaff.reactivateUser(user_id);
        //Create log Activity:
        if (reactiveUser === "USER_REACTIVATED") {
            yield containers_1.daoLogActivity.createUserLog(tokenData.uid, user_id, "REACTIVE", tokenData.rol);
        }
        return reactiveUser;
    });
}
exports.reactiveUserServ = reactiveUserServ;
