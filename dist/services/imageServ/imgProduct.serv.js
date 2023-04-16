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
//DAOs:
const containers_1 = require("../../containers");
const imageKitClass_1 = __importDefault(require("../../utils/imageKitClass"));
const uuid_1 = require("uuid");
const uploaderManager = new imageKitClass_1.default();
class imageProductService {
    /** ============= CREATE IMG PRODUCT ============= **/
    createImgProductServ(tokenUID, productId, image) {
        return __awaiter(this, void 0, void 0, function* () {
            //valid uuid:
            if (!(0, uuid_1.validate)(productId)) {
                return "INVALID_PRODUCT_ID";
            }
            //Check Product:
            const product = yield containers_1.daoProduct.getProduct(productId, true);
            if (!product)
                return "PRODUCT_NOT_FOUND";
            if (product.user_id.toString() !== tokenUID.toString())
                return "INVALID_SELLER";
            //Check Authorization:
            if (product.user_id.toString() !== tokenUID.toString())
                return "UNAUTHORIZED_ACTION";
            //Upload image to google:
            const imageData = yield uploaderManager.uploadImage(image);
            //Check path:
            if (!imageData)
                return "INVALID_ROUTE";
            const urlImg = imageData.url;
            return yield containers_1.daoImgProduct.createImg({
                product_id: productId,
                ip_path: urlImg,
                ip_id: imageData.fileId,
            });
        });
    }
    /** ============== DELETE IMG PRODUCT ================ **/
    delImgProductServ(ip_id) {
        return __awaiter(this, void 0, void 0, function* () {
            //valid uuid:
            if (!(0, uuid_1.validate)(ip_id)) {
                return "INVALID_IMAGE_ID";
            }
            yield uploaderManager.deleteImage(ip_id);
            return yield containers_1.daoImgProduct.deleteImg(ip_id);
        });
    }
}
exports.default = imageProductService;
