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
//Services:
const types_serv_1 = __importDefault(require("../../services/product/types.serv"));
const service = new types_serv_1.default();
class typesProductController {
    /**============= CREATE PRODUCT TYPE =================**/
    createPTypesCtrl(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                //data:
                const { name, category } = req.body;
                //Service:
                const resService = yield service.createPTypesServ(name, category);
                //Return:
                if (!resService)
                    return res.status(500).json({ status: 500, msg: "SERVER_ERROR" });
                else if (resService === "PRODUCT_TYPE_ALREADY_EXISTS" ||
                    resService === "CATEGORY_ID_REQUIRED" ||
                    resService === "PRODUCT_TYPE_REQUIRED" ||
                    resService === "INVALID_PRODUCT_CATEGORY_ID")
                    return res.status(400).json({ status: 400, msg: resService });
                else if (resService === "PRODUCT_TYPE_CREATED")
                    return res.status(201).json({ status: 201, msg: resService });
            }
            catch (e) {
                logger_1.default.error(e.message);
                return res.status(500).json({ status: 500, msg: e.message });
            }
        });
    }
    /**=================== LIST PRODUCT TYPE ===================**/
    listPTypesCtrl(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                //Service:
                const list = yield service.listPTypesServ();
                //Return:
                return res.json({ status: 200, msg: "OK", data: list });
            }
            catch (e) {
                logger_1.default.error(e.message);
                return res.status(500).json({ status: 500, msg: e.message });
            }
        });
    }
    /**============== DELETE PRODUCT TYPE ================**/
    delPTypesCtrl(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                //data:
                const { id } = req.params;
                //Service:
                const resService = yield service.delPTypesServ(id);
                if (!resService)
                    return res.status(500).json({ status: 500, msg: "SERVER_ERROR" });
                else if (resService === "INVALID_PRODUCT_TYPE_ID") {
                    return res.status(400).json({ status: 400, msg: resService });
                }
                else
                    return res.json({ status: 200, msg: "PRODUCT_TYPE_DELETED" });
            }
            catch (e) {
                logger_1.default.error(e.message);
                return res.status(500).json({ status: 500, msg: e.message });
            }
        });
    }
}
exports.default = typesProductController;
