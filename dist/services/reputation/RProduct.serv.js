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
class reputationProductService {
    /** ==================== CREATE REPUTATION  =================== **/
    createRepuServ(tokenID, data) {
        return __awaiter(this, void 0, void 0, function* () {
            //Check authorization:
            if (tokenID.uid.toString() !== data.pr_qualifier.toString())
                return "UNAUTHORIZED_ACTION";
            //check Sale:
            const sale = yield containers_1.daoSale.getSale(data.sale_id);
            if (!sale)
                return "SALE_NOT_FOUND";
            //check user:
            const user = yield containers_1.daoUser.getUser("id", data.pr_qualifier, true);
            if (!user)
                return "USER_NOT_FOUND";
            //Check product:
            const product = yield containers_1.daoProduct.getProduct(data.product_id, true);
            if (!product)
                return "PRODUCT_NOT_FOUND";
            //create:
            const pr_id = (0, uuid_1.v4)();
            return yield containers_1.daoRepuProduct.createReputation(Object.assign(Object.assign({}, data), { pr_id }));
        });
    }
    /** =================== DELETE REPUTATION  =================== **/
    delRepuProductServ(pr_id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield containers_1.daoRepuProduct.deleteReputation(pr_id);
        });
    }
    /** ================= LIST REPUTATION  =============== **/
    listRepuProductServ(product_id, page, size) {
        return __awaiter(this, void 0, void 0, function* () {
            //check product:
            const product = yield containers_1.daoProduct.getProduct(product_id, true);
            if (!product)
                return "PRODUCT_NOT_FOUND";
            return yield containers_1.daoRepuProduct.listReputation(product_id, page, size);
        });
    }
}
exports.default = reputationProductService;
