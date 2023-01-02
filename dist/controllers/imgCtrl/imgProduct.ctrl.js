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
exports.delImgProductCtrl = exports.createImgProductCtrl = void 0;
const imgProduct_serv_1 = require("../../services/imageServ/imgProduct.serv");
/** ==================== CREATE IMG PRODUCT ===================== **/
function createImgProductCtrl(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            //Data:
            const { file } = req;
            const { product } = req.params;
            const data = {
                product_id: product,
                ip_path: `${file.path.split("public")[1]}`,
            };
            //Service:
            const img = yield (0, imgProduct_serv_1.createImgProductServ)(req.uid, data);
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
            return res.status(500).json({ status: 500, msg: e.message });
        }
    });
}
exports.createImgProductCtrl = createImgProductCtrl;
/** ==================== DELETE IMG PRODUCT ===================== **/
function delImgProductCtrl(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            //Data:
            const { id } = req.params;
            //Service:
            const del = yield (0, imgProduct_serv_1.delImgProductServ)(id);
            //Return:
            if (!del)
                return res.status(500).json({ status: 500, msg: "SERVER_ERROR" });
            return res.json({ status: 200, msg: "IMAGE_DELETED" });
        }
        catch (e) {
            return res.status(500).json({ status: 500, msg: e.message });
        }
    });
}
exports.delImgProductCtrl = delImgProductCtrl;
