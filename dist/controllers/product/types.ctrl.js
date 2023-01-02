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
exports.delPTypesCtrl = exports.listPTypesCtrl = exports.createPTypesCtrl = void 0;
const types_serv_1 = require("../../services/product/types.serv");
/**====================== CREATE PRODUCT TYPE ===========================**/
function createPTypesCtrl(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            //data:
            const { name, category } = req.body;
            //Service:
            const newType = yield (0, types_serv_1.createPTypesServ)(name, category);
            //Return:
            if (!newType)
                return res.status(500).json({ status: 500, msg: "SERVER_ERROR" });
            else if (newType === "PRODUCT_TYPE_ALREADY_EXISTS" ||
                newType === "CATEGORY_ID_REQUIRED" ||
                newType === "PRODUCT_TYPE_REQUIRED")
                return res.status(400).json({ status: 400, msg: newType });
            else if (newType === "PRODUCT_TYPE_CREATED")
                return res.status(201).json({ status: 201, msg: newType });
        }
        catch (e) {
            return res.status(500).json({ status: 500, msg: e.message });
        }
    });
}
exports.createPTypesCtrl = createPTypesCtrl;
/**====================== LIST PRODUCT TYPE ===========================**/
function listPTypesCtrl(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            //Service:
            const list = yield (0, types_serv_1.listPTypesServ)();
            //Return:
            return res.json({ status: 200, msg: "OK", data: list });
        }
        catch (e) {
            return res.status(500).json({ status: 500, msg: e.message });
        }
    });
}
exports.listPTypesCtrl = listPTypesCtrl;
/**====================== DELETE PRODUCT TYPE ===========================**/
function delPTypesCtrl(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            //data:
            const { id } = req.params;
            //Service:
            const deleteRes = yield (0, types_serv_1.delPTypesServ)(id);
            if (!deleteRes)
                return res.status(500).json({ status: 500, msg: "SERVER_ERROR" });
            else
                return res.json({ status: 200, msg: "PRODUCT_TYPE_DELETED" });
        }
        catch (e) {
            return res.status(500).json({ status: 500, msg: e.message });
        }
    });
}
exports.delPTypesCtrl = delPTypesCtrl;
