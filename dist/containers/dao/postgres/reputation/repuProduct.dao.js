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
exports.daoRepuProductSQL = void 0;
const base_container_1 = __importDefault(require("../../../base/base.container"));
const repuProduct_model_1 = __importDefault(require("../../../../models/sql/reputationModel/repuProduct.model"));
const User_model_1 = __importDefault(require("../../../../models/sql/usersModel/User.model"));
const repuScore_model_1 = __importDefault(require("../../../../models/sql/reputationModel/repuScore.model"));
const paginationfunction_1 = require("../../../../utils/paginationfunction");
class daoRepuProductSQL extends base_container_1.default {
    constructor() {
        super(repuProduct_model_1.default);
    }
    /** -------------- CREATE REPUTATION --------------**/
    createReputation(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                //check previous repu:
                const repu = yield repuProduct_model_1.default.findOne({
                    where: { pr_qualifier: data.pr_qualifier, sale_id: data.sale_id },
                });
                if (repu)
                    return "ALREADY_QUALIFIED";
                //ok:
                return yield repuProduct_model_1.default.create({
                    pr_id: data.pr_id,
                    pr_qualifier: data.pr_qualifier,
                    product_id: data.product_id,
                    sale_id: data.sale_id,
                    rs_id: data.rs_id,
                    pr_description: data.pr_description,
                });
            }
            catch (e) {
                throw new Error(e.message);
            }
        });
    }
    /** -------------- DELETE REPUTATION --------------**/
    deleteReputation(pr_id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield repuProduct_model_1.default.destroy({ where: { pr_id } });
            }
            catch (e) {
                throw new Error(e.message);
            }
        });
    }
    /** -------------- LIST REPUTATION PRODUCT--------------**/
    listReputation(product_id, page = 0, size = 0) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { limit, offset } = (0, paginationfunction_1.getPagination)(page, size);
                const data = yield repuProduct_model_1.default.findAndCountAll({
                    where: { product_id },
                    limit,
                    offset,
                    attributes: ["pr_description", "pr_id"],
                    include: [
                        {
                            model: User_model_1.default,
                            as: "product_qualifier",
                            attributes: ["user_username", "user_name", "user_lastname"],
                        },
                        { model: repuScore_model_1.default, attributes: ["rs_name"] },
                    ],
                });
                if (data) {
                    return (0, paginationfunction_1.getPaginationRepu)(data, page, limit);
                }
            }
            catch (e) {
                throw new Error(e.message);
            }
        });
    }
}
exports.daoRepuProductSQL = daoRepuProductSQL;
