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
exports.daoPTypeSQL = void 0;
const base_container_1 = __importDefault(require("../../../base/base.container"));
const PType_models_1 = __importDefault(require("../../../../models/sql/productsModel/PType.models"));
const PCategory_models_1 = __importDefault(require("../../../../models/sql/productsModel/PCategory.models"));
class daoPTypeSQL extends base_container_1.default {
    constructor() {
        super(PType_models_1.default);
    }
    /** ~~~~~~~~~~~~~~~~~~~~~~~~~~ Create product type ~~~~~~~~~~~~~~~~~~~~~~~~~~  **/
    createType(pt_id, pt_name, pc_id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                //Check type:
                const check = yield PType_models_1.default.findOne({ where: { pc_id, pt_name } });
                if (check)
                    return "PRODUCT_TYPE_ALREADY_EXISTS";
                const newType = yield PType_models_1.default.create({ pt_id, pt_name, pc_id });
                if (newType)
                    return "PRODUCT_TYPE_CREATED";
            }
            catch (e) {
                throw new Error(e.message);
            }
        });
    }
    /** ~~~~~~~~~~~~~~~~~~~~~~~~~~ List product type ~~~~~~~~~~~~~~~~~~~~~~~~~~  **/
    listTypes() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield PType_models_1.default.findAll({
                    include: [{ model: PCategory_models_1.default }],
                });
            }
            catch (e) {
                throw new Error(e.message);
            }
        });
    }
    /** ~~~~~~~~~~~~~~~~~~~~~~~~~~ Delete product type ~~~~~~~~~~~~~~~~~~~~~~~~~~  **/
    deleteTypes(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield PType_models_1.default.destroy({ where: { pt_id: id } });
            }
            catch (e) {
                throw new Error(e.message);
            }
        });
    }
}
exports.daoPTypeSQL = daoPTypeSQL;
