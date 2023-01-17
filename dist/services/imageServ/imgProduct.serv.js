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
//uuid:
const uuid_1 = require("uuid");
//DAOs:
const containers_1 = require("../../containers");
class imageProductService {
    /** ============= CREATE IMG PRODUCT ============= **/
    createImgProductServ(tokenUID, data) {
        return __awaiter(this, void 0, void 0, function* () {
            //Check Product:
            const product = yield containers_1.daoProduct.getProduct(data.product_id, true);
            if (!product)
                return "PRODUCT_NOT_FOUND";
            if (product.user_id.toString() !== tokenUID.toString())
                return "INVALID_SELLER";
            //Check Authorization:
            if (product.user_id.toString() !== tokenUID.toString())
                return "UNAUTHORIZED_ACTION";
            //Check path:
            if (!data.ip_path)
                return "INVALID_ROUTE";
            //Create:
            const ip_id = (0, uuid_1.v4)();
            return yield containers_1.daoImgProduct.createImg(Object.assign(Object.assign({}, data), { ip_id }));
        });
    }
    /** ============== DELETE IMG PRODUCT ================ **/
    delImgProductServ(ip_id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield containers_1.daoImgProduct.deleteImg(ip_id);
        });
    }
}
exports.default = imageProductService;
