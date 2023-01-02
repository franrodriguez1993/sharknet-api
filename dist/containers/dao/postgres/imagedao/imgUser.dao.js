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
exports.daoImgUserSQL = void 0;
const base_container_1 = __importDefault(require("../../../base/base.container"));
const imageUser_model_1 = __importDefault(require("../../../../models/sql/imagesModel/imageUser.model"));
class daoImgUserSQL extends base_container_1.default {
    constructor() {
        super(imageUser_model_1.default);
    }
    /** ------------- CREATE --------------**/
    createImg(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                //check img:
                const img = yield imageUser_model_1.default.findOne({
                    where: { user_id: data.user_id },
                });
                if (img) {
                    img.iu_path = data.iu_path;
                    return yield img.save();
                }
                else {
                    return yield imageUser_model_1.default.create({
                        iu_id: data.iu_id,
                        user_id: data.user_id,
                        iu_path: data.iu_path,
                    });
                }
            }
            catch (e) {
                throw new Error(e.message);
            }
        });
    }
    /** ------------- DELETE --------------**/
    deleteImg(iu_id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield imageUser_model_1.default.destroy({ where: { iu_id } });
            }
            catch (e) {
                throw new Error(e.message);
            }
        });
    }
}
exports.daoImgUserSQL = daoImgUserSQL;
