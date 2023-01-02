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
exports.deleteCategoryServ = exports.listCategoryServ = exports.createCategoryServ = void 0;
//uuid:
const uuid_1 = require("uuid");
//Dao:
const containers_1 = require("../../containers");
/** ============================ CREATE CATEGORY ============================== **/
function createCategoryServ(pc_name) {
    return __awaiter(this, void 0, void 0, function* () {
        if (pc_name.trim() === "")
            return "CATEGORY_NAME_REQUIRED";
        //Create:
        const pc_id = (0, uuid_1.v4)();
        return yield containers_1.daoProductCategory.createCategory(pc_id, pc_name);
    });
}
exports.createCategoryServ = createCategoryServ;
/** ============================ LIST CATEGORY ============================== **/
function listCategoryServ() {
    return __awaiter(this, void 0, void 0, function* () {
        return yield containers_1.daoProductCategory.listCategories();
    });
}
exports.listCategoryServ = listCategoryServ;
/** ============================ DELETE CATEGORY ============================== **/
function deleteCategoryServ(id) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield containers_1.daoProductCategory.deleteCategory(id);
    });
}
exports.deleteCategoryServ = deleteCategoryServ;
