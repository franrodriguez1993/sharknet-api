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
const logger_1 = __importDefault(require("../../utils/logger"));
//Service:
const category_serv_1 = __importDefault(require("../../services/product/category.serv"));
const service = new category_serv_1.default();
class categoryProductController {
    /** ============== CREATE CATEGORY ================= **/
    createCategoryCtrl(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                //data:
                const { name } = req.body;
                //Service:
                const category = yield service.createCategoryServ(name);
                if (!category)
                    return res.status(500).json({ status: 500, msg: "SERVER_ERROR" });
                else if (category === "CATEGORY_ALREADY_EXISTS" ||
                    category === "CATEGORY_NAME_REQUIRED")
                    return res.status(400).json({ status: 400, msg: category });
                else if (category === "CATEGORY_CREATED")
                    return res.status(201).json({ status: 201, msg: category });
            }
            catch (e) {
                logger_1.default.error(e.message);
                return res.status(500).json({ status: 500, msg: e.message });
            }
        });
    }
    /** ============= LIST CATEGORY ============== **/
    listCategoryCtrl(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                //Service:
                const list = yield service.listCategoryServ();
                //return:
                return res.json({ status: 200, msg: "OK", data: list });
            }
            catch (e) {
                logger_1.default.error(e.message);
                return res.status(500).json({ status: 500, msg: e.message });
            }
        });
    }
    /** ========== DELETE CATEGORY =============== **/
    deleteCategoryCtrl(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                //Data:
                const { id } = req.params;
                //Service:
                const deleted = yield service.deleteCategoryServ(id);
                //return:
                if (!deleted)
                    return res.status(500).json({ status: 500, msg: "SERVER_ERROR" });
                else if (deleted)
                    return res.json({ status: 200, msg: "CATEGORY_DELETED" });
            }
            catch (e) {
                logger_1.default.error(e.message);
                return res.status(500).json({ status: 500, msg: e.message });
            }
        });
    }
}
exports.default = categoryProductController;
