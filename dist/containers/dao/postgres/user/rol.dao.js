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
exports.daoRolesSQL = void 0;
const base_container_1 = __importDefault(require("../../../base/base.container"));
const Rol_model_1 = __importDefault(require("../../../../models/sql/usersModel/Rol.model"));
class daoRolesSQL extends base_container_1.default {
    constructor() {
        super(Rol_model_1.default);
    }
    /**------------- CREATE -----------**/
    create(rol_id, rol_name) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                //check rolname:
                const check = yield Rol_model_1.default.findOne({ where: { rol_name } });
                if (check)
                    return "NAME_ALREADY_IN_USE";
                const rol = yield Rol_model_1.default.create({ rol_id, rol_name });
                if (rol)
                    return "ROL_CREATED";
            }
            catch (e) {
                throw new Error(e.message);
            }
        });
    }
    /**------------- GET ROLES  -----------**/
    getRoles() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const list = yield Rol_model_1.default.findAll();
                return list;
            }
            catch (e) {
                throw new Error(e.message);
            }
        });
    }
    /**------------- GET ROL -----------**/
    findRol(rol_name) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield Rol_model_1.default.findOne({ where: { rol_name } });
            }
            catch (e) {
                throw new Error(e.message);
            }
        });
    }
}
exports.daoRolesSQL = daoRolesSQL;
