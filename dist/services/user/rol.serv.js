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
//uuid:
const uuid_1 = require("uuid");
//DAOs:
const containers_1 = require("../../containers");
class rolUserService {
    /**================= CREATE ROL =======================**/
    createRolService(rol_name) {
        return __awaiter(this, void 0, void 0, function* () {
            const rol_id = (0, uuid_1.v4)();
            if (rol_name.trim() === "")
                return "ROL_NAME_REQUIRED";
            const rol = yield containers_1.daoRoles.create(rol_id, rol_name);
            return rol;
        });
    }
    /**=================== GET ROL =====================**/
    getAllRolServ() {
        return __awaiter(this, void 0, void 0, function* () {
            const rolList = yield containers_1.daoRoles.getRoles();
            return rolList;
        });
    }
}
exports.default = rolUserService;
