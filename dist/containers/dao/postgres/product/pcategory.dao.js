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
exports.daoPCategotySQL = void 0;
const base_container_1 = __importDefault(require("../../../base/base.container"));
//Models:
const PCategory_models_1 = __importDefault(require("../../../../models/sql/productsModel/PCategory.models"));
class daoPCategotySQL extends base_container_1.default {
    constructor() {
        super(PCategory_models_1.default);
    }
    /** ~~~~~~~~~~~~~~~~~ CREATE CATEGORY ~~~~~~~~~~~~~~~~~~ **/
    createCategory(pc_id, pc_name) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                //check category:
                const check = yield PCategory_models_1.default.findOne({ where: { pc_name } });
                if (check)
                    return "CATEGORY_ALREADY_EXISTS";
                const category = yield PCategory_models_1.default.create({ pc_id, pc_name });
                if (category)
                    return "CATEGORY_CREATED";
            }
            catch (e) {
                throw new Error(e.message);
            }
        });
    }
    /** ~~~~~~~~~~~~~~~~~ LIST CATEGORIES ~~~~~~~~~~~~~~~~~~ **/
    listCategories() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield PCategory_models_1.default.findAll();
            }
            catch (e) {
                throw new Error(e.message);
            }
        });
    }
    /** ~~~~~~~~~~~~~~~~~ DELETE CATEGORIES ~~~~~~~~~~~~~~~~~~ **/
    deleteCategory(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield PCategory_models_1.default.destroy({ where: { pc_id: id } });
            }
            catch (e) {
                throw new Error(e.message);
            }
        });
    }
}
exports.daoPCategotySQL = daoPCategotySQL;
