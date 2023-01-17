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
class repuUserService {
    /** ================== CREATE REPUTATION USER ================ **/
    // Mode: "seller" and "buyer" to qualify specific user with the same service
    createReputationServ(tokenUid, data, mode) {
        return __awaiter(this, void 0, void 0, function* () {
            //Check rol qualify:
            if (data.ur_rol !== "seller" && data.ur_rol !== "buyer")
                return "INCORRECT_ROL_QUALIFY";
            //Compare the token id with the qualifier:
            if (tokenUid.toString() !== data.ur_qualifier.toString())
                return "UNAUTHORIZED_ACTION";
            //Check Sale:
            const sale = yield containers_1.daoSale.getSale(data.sale_id);
            if (!sale)
                return "SALE_NOT_FOUND";
            //Check Users:
            const qualifier = yield containers_1.daoUser.getUser("id", data.ur_qualifier, true);
            const receiver = yield containers_1.daoUser.getUser("id", data.ur_receiver, true);
            if (!qualifier || !receiver)
                return "USER_NOT_FOUND";
            //Check mode and rol reputation:
            if (mode === "seller") {
                if (sale.buyer.user_id.toString() !== data.ur_qualifier.toString())
                    return "INVALID_QUALIFIER";
                if (data.ur_rol !== "seller")
                    return "INCORRECT_ROL";
            }
            else if (mode === "buyer") {
                if (sale.seller.user_id.toString() !== data.ur_qualifier.toString())
                    return "INVALID_QUALIFIER";
                if (data.ur_rol !== "buyer")
                    return "INCORRECT_ROL";
            }
            //Create:
            const ur_id = (0, uuid_1.v4)();
            return yield containers_1.daoRepuUser.createReputationUser(Object.assign(Object.assign({}, data), { ur_id }));
        });
    }
    /** ===================== DELETE REPUTATION USER =================== **/
    deleteReputationServ(ur_id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield containers_1.daoRepuUser.deleteReputationUser(ur_id);
        });
    }
    /** ==================== GET REPUTATION BUYER ==================== **/
    ListRepuBuyerServ(user_id, page, size) {
        return __awaiter(this, void 0, void 0, function* () {
            //check user:
            const check = yield containers_1.daoUser.getUser("id", user_id, true);
            if (!check)
                return "USER_NOT_FOUND";
            return yield containers_1.daoRepuUser.listReputations(user_id, "buyer", page, size);
        });
    }
    /** =================== GET REPUTATION SELLER ==================== **/
    listRepuSellerServ(user_id, page, size) {
        return __awaiter(this, void 0, void 0, function* () {
            //check user:
            const check = yield containers_1.daoUser.getUser("id", user_id, true);
            if (!check)
                return "USER_NOT_FOUND";
            return yield containers_1.daoRepuUser.listReputations(user_id, "seller", page, size);
        });
    }
}
exports.default = repuUserService;
