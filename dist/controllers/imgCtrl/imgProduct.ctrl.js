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
const imgProduct_serv_1 = __importDefault(require("../../services/imageServ/imgProduct.serv"));
const service = new imgProduct_serv_1.default();
class imageProductController {
    /** ============ CREATE IMG PRODUCT =========== **/
    createImgProductCtrl(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                //Data:
                const { file } = req;
                const { product } = req.params;
                if (!file)
                    return res.status(400).json({ status: 400, msg: "FILE_REQUIRED" });
                //Service:
                const img = yield service.createImgProductServ(req.uid, product, file.buffer);
                //Return:
                if (img === "PRODUCT_NOT_FOUND")
                    return res.status(404).json({ status: 404, msg: img });
                else if (img === "INVALID_ROUTE" || img === "INVALID_SELLER")
                    return res.status(400).json({ status: 400, msg: img });
                else if (img === "UNAUTHORIZED_ACTION")
                    return res.status(401).json({ status: 401, msg: img });
                //Ok:
                return res.json({ status: 201, msg: "IMAGE_UPLOADED", data: img });
            }
            catch (e) {
                logger_1.default.error(e.message);
                return res.status(500).json({ status: 500, msg: e.message });
            }
        });
    }
    /** =============== DELETE IMG PRODUCT =============== **/
    delImgProductCtrl(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                //Data:
                const { id } = req.params;
                //Service:
                const del = yield service.delImgProductServ(id);
                //Return:
                if (!del)
                    return res.status(500).json({ status: 500, msg: "SERVER_ERROR" });
                else if (del === "ERROR_DELETE") {
                    return res.status(400).json({ status: 400, msg: del });
                }
                return res.json({ status: 200, msg: "IMAGE_DELETED" });
            }
            catch (e) {
                logger_1.default.error(e.message);
                return res.status(500).json({ status: 500, msg: e.message });
            }
        });
    }
}
exports.default = imageProductController;
