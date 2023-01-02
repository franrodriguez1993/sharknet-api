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
exports.daoImgProductSQL = void 0;
const base_container_1 = __importDefault(require("../../../base/base.container"));
const ImageProd_model_1 = __importDefault(require("../../../../models/sql/imagesModel/ImageProd.model"));
class daoImgProductSQL extends base_container_1.default {
    constructor() {
        super(ImageProd_model_1.default);
    }
    /** ------------- CREATE --------------**/
    createImg(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield ImageProd_model_1.default.create({
                    ip_id: data.ip_id,
                    product_id: data.product_id,
                    ip_path: data.ip_path,
                });
            }
            catch (e) {
                throw new Error(e.message);
            }
        });
    }
    /** ------------- DELETE --------------**/
    deleteImg(ip_id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield ImageProd_model_1.default.destroy({ where: { ip_id } });
            }
            catch (e) {
                throw new Error(e.message);
            }
        });
    }
}
exports.daoImgProductSQL = daoImgProductSQL;
