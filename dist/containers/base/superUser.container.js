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
exports.superUser = void 0;
const __1 = require("..");
class superUser {
    constructor() { }
    /** --------- VERIFIED USER --------- */
    verifyUser(user_id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                //Find user:
                const user = yield __1.daoUser.getUser("id", user_id, true);
                if (!user)
                    return "USER_NOT_FOUND";
                const rol = yield __1.daoRoles.findRol("store");
                if (!rol)
                    return "ROL_NOT_FOUND";
                user.set({ rol_id: rol.rol_id });
                const updated = yield user.save();
                if (updated)
                    return "USER_VERIFIED";
            }
            catch (e) {
                throw new Error(e.message);
            }
        });
    }
    /** --------- UNVERIFIED USER --------- */
    unverifyUser(user_id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                //Find user:
                const user = yield __1.daoUser.getUser("id", user_id, true);
                if (!user)
                    return "USER_NOT_FOUND";
                const rol = yield __1.daoRoles.findRol("user");
                if (!rol)
                    return "ROL_NOT_FOUND";
                user.set({ rol_id: rol.rol_id });
                const updated = yield user.save();
                if (updated)
                    return "USER_UNVERIFIED";
            }
            catch (e) {
                throw new Error(e.message);
            }
        });
    }
    /** --------- DELETE USER --------- */
    deleteUser(user_id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield __1.daoUser.getUser("id", user_id);
                //Check authorization:
                if (user.Rol.rol_name === "staff" || user.Rol.rol_name === "admin")
                    return "UNAUTHORIZED_DELETE_ROL";
                user.set({ user_status: "deleted" });
                const deleted = yield user.save();
                if (deleted)
                    return "USER_DELETED";
            }
            catch (e) {
                throw new Error(e.message);
            }
        });
    }
    /** --------- SUSPEND USER --------- */
    suspendUser(user_id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield __1.daoUser.getUser("id", user_id);
                //Check authorization:
                if (user.Rol.rol_name === "staff" || user.Rol.rol_name === "admin")
                    return "UNAUTHORIZED_SUSPEND_ROL";
                user.set({ user_status: "suspended" });
                const suspended = yield user.save();
                if (suspended)
                    return "USER_SUSPENDED";
            }
            catch (e) {
                throw new Error(e.message);
            }
        });
    }
    /** --------- REACTIVATE USER --------- */
    reactivateUser(user_id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield __1.daoUser.getUser("id", user_id);
                if (user.Rol.rol_name === "staff" || user.Rol.rol_name === "admin")
                    return "UNAUTHORIZED_REACTIVE_ROL";
                user.set({ user_status: "active" });
                const reactivated = yield user.save();
                if (reactivated)
                    return "USER_REACTIVATED";
            }
            catch (e) {
                throw new Error(e.message);
            }
        });
    }
}
exports.superUser = superUser;
