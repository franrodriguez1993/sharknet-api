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
exports.daoAdminSQL = void 0;
const __1 = require("../../..");
const Rol_model_1 = __importDefault(require("../../../../models/sql/usersModel/Rol.model"));
const sequelize_1 = __importDefault(require("sequelize"));
const Op = sequelize_1.default.Op;
const superUser_container_1 = require("../../../base/superUser.container");
//Utils:
const paginationfunction_1 = require("../../../../utils/paginationfunction");
const User_model_1 = __importDefault(require("../../../../models/sql/usersModel/User.model"));
class daoAdminSQL extends superUser_container_1.superUser {
    /** -------------- STAFF UPGRADE-------------- **/
    staffUpgrade(user_id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                //Find user:
                const user = yield __1.daoUser.getUser("id", user_id, true);
                if (!user)
                    return "USER_NOT_FOUND";
                const rol = yield __1.daoRoles.findRol("staff");
                if (!rol)
                    return "ROL_NOT_FOUND";
                user.set({ rol_id: rol.rol_id });
                const staff = yield user.save();
                if (staff)
                    return "USER_STAFF_UPGRADED";
            }
            catch (e) {
                throw new Error(e.message);
            }
        });
    }
    /** --------------  STAFF DOWNGRADE-------------- **/
    staffDowngrade(user_id) {
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
                const staff = yield user.save();
                if (staff)
                    return "USER_STAFF_DOWNGRADED";
            }
            catch (e) {
                throw new Error(e.message);
            }
        });
    }
    /** -------------- ADMIN UPGRADE-------------- **/
    adminUpgrade(user_id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                //Find user:
                const user = yield __1.daoUser.getUser("id", user_id, true);
                if (!user)
                    return "USER_NOT_FOUND";
                const rol = yield __1.daoRoles.findRol("admin");
                if (!rol)
                    return "ROL_NOT_FOUND";
                user.set({ rol_id: rol.rol_id });
                const admin = yield user.save();
                if (admin)
                    return "USER_ADMIN_UPGRADED";
            }
            catch (e) {
                throw new Error(e.message);
            }
        });
    }
    /** -------------- ADMIN DOWNGRADE-------------- **/
    admindowngrade(user_id) {
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
                const admin = yield user.save();
                if (admin)
                    return "USER_ADMIN_DOWNGRADED";
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
                user.set({ user_status: "deleted" });
                return yield user.save();
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
                user.set({ user_status: "suspended" });
                return yield user.save();
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
                user.set({ user_status: "active" });
                return yield user.save();
            }
            catch (e) {
                throw new Error(e.message);
            }
        });
    }
    /** -------------- LIST SUPERUSERS-------------- **/
    listSuperusers(page = 0, size = 0) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { limit, offset } = (0, paginationfunction_1.getPagination)(page, size);
                //Find rol id:
                const staff = yield Rol_model_1.default.findOne({
                    where: { rol_name: "staff" },
                });
                const admin = yield Rol_model_1.default.findOne({
                    where: { rol_name: "admin" },
                });
                if (!staff || !admin)
                    return "FIND_ROL_ERROR";
                //List:
                const list = yield User_model_1.default.findAndCountAll({
                    where: { rol_id: { [Op.or]: [staff.rol_id, admin.rol_id] } },
                    limit,
                    offset,
                    attributes: { exclude: ["user_password", "rol_id"] },
                    include: [{ model: Rol_model_1.default }],
                });
                if (list) {
                    return (0, paginationfunction_1.getPaginationSuperuser)(list, page, limit);
                }
            }
            catch (e) {
                throw new Error(e.message);
            }
        });
    }
}
exports.daoAdminSQL = daoAdminSQL;
