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
exports.daoRepuUserSQL = void 0;
const base_container_1 = __importDefault(require("../../../base/base.container"));
const repuUser_model_1 = __importDefault(require("../../../../models/sql/reputationModel/repuUser.model"));
const repuScore_model_1 = __importDefault(require("../../../../models/sql/reputationModel/repuScore.model"));
const paginationfunction_1 = require("../../../../utils/paginationfunction");
class daoRepuUserSQL extends base_container_1.default {
    constructor() {
        super(repuUser_model_1.default);
    }
    /** -------------- CREATE REPUTATION USER --------------**/
    createReputationUser(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                //check previous repu:
                const repu = yield repuUser_model_1.default.findOne({
                    where: {
                        ur_qualifier: data.ur_qualifier,
                        sale_id: data.sale_id,
                        ur_rol: data.ur_rol,
                    },
                });
                if (repu)
                    return "ALREADY_QUALIFIED";
                //create:
                return yield repuUser_model_1.default.create({
                    ur_id: data.ur_id,
                    ur_qualifier: data.ur_qualifier,
                    ur_receiver: data.ur_receiver,
                    sale_id: data.sale_id,
                    rs_id: data.rs_id,
                    ur_rol: data.ur_rol,
                    ur_description: data.ur_description,
                });
            }
            catch (e) {
                throw new Error(e.message);
            }
        });
    }
    /** -------------- DELETE REPUTATION USER --------------**/
    deleteReputationUser(ur_id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield repuUser_model_1.default.destroy({ where: { ur_id } });
            }
            catch (e) {
                throw new Error(e.message);
            }
        });
    }
    /** -------------- LIST REPUTATIONS  --------------**/
    listReputations(user_id, rol, page = 0, size = 0) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { limit, offset } = (0, paginationfunction_1.getPagination)(page, size);
                const data = yield repuUser_model_1.default.findAndCountAll({
                    where: { ur_receiver: user_id, ur_rol: rol },
                    limit,
                    offset,
                    include: [{ model: repuScore_model_1.default, attributes: ["rs_name"] }],
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
exports.daoRepuUserSQL = daoRepuUserSQL;
