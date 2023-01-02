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
exports.delPTypesServ = exports.listPTypesServ = exports.createPTypesServ = void 0;
//uuid:
const uuid_1 = require("uuid");
//Dao:
const containers_1 = require("../../containers");
/**====================== CREATE PRODUCT TYPE ===========================**/
function createPTypesServ(pt_name, pc_id) {
    return __awaiter(this, void 0, void 0, function* () {
        if (pt_name.trim() === "")
            return "PRODUCT_TYPE_REQUIRED";
        else if (pc_id.trim() === "")
            return "CATEGORY_ID_REQUIRED";
        const pt_id = (0, uuid_1.v4)();
        return yield containers_1.daoProductTypes.createType(pt_id, pt_name, pc_id);
    });
}
exports.createPTypesServ = createPTypesServ;
/**====================== LIST PRODUCT TYPE ===========================**/
function listPTypesServ() {
    return __awaiter(this, void 0, void 0, function* () {
        return yield containers_1.daoProductTypes.listTypes();
    });
}
exports.listPTypesServ = listPTypesServ;
/**====================== DELETE PRODUCT TYPE ===========================**/
function delPTypesServ(id) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield containers_1.daoProductTypes.deleteTypes(id);
    });
}
exports.delPTypesServ = delPTypesServ;
