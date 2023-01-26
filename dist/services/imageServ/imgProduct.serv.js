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
const configServer_1 = __importDefault(require("../../config/configServer"));
//DAOs:
const containers_1 = require("../../containers");
const UploadImages_1 = __importDefault(require("../../utils/UploadImages"));
const uploaderManager = new UploadImages_1.default();
class imageProductService {
    /** ============= CREATE IMG PRODUCT ============= **/
    createImgProductServ(tokenUID, productId, image) {
        return __awaiter(this, void 0, void 0, function* () {
            const folderId = configServer_1.default.google.folders.products;
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
            const imageData = yield uploaderManager.uploadFile(productId, image, folderId);
            //Check path:
            if (!imageData)
                return "INVALID_ROUTE";
            //Create path:
            const ip_path = `https://drive.google.com/uc?id=${imageData.imageId}`;
            return yield containers_1.daoImgProduct.createImg({
                product_id: productId,
                ip_path,
                ip_id: imageData.imageId,
            });
        });
    }
    /** ============== DELETE IMG PRODUCT ================ **/
    delImgProductServ(ip_id) {
        return __awaiter(this, void 0, void 0, function* () {
            const resDelete = yield uploaderManager.deleteFile(ip_id);
            if (resDelete === 204) {
                return yield containers_1.daoImgProduct.deleteImg(ip_id);
            }
            else {
                return "ERROR_DELETE";
            }
        });
    }
}
exports.default = imageProductService;
