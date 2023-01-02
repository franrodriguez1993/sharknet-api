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
exports.delImgUserServ = exports.createImgUserServ = void 0;
//uuid:
const uuid_1 = require("uuid");
//DAOs:
const containers_1 = require("../../containers");
/** ==================== CREATE IMG USER ===================== **/
function createImgUserServ(tokenUID, data) {
    return __awaiter(this, void 0, void 0, function* () {
        //Check Authorization:
        if (tokenUID.toString() !== data.user_id.toString())
            return "UNAUTHORIZED_ACTION";
        //check user:
        const user = yield containers_1.daoUser.getUser("id", data.user_id, true);
        if (!user)
            return "USER_NOT_FOUND";
        //Check path:
        if (!data.iu_path)
            return "INVALID_ROUTE";
        //Create:
        const iu_id = (0, uuid_1.v4)();
        return yield containers_1.daoImgUser.createImg(Object.assign(Object.assign({}, data), { iu_id }));
    });
}
exports.createImgUserServ = createImgUserServ;
/** ==================== DELETE IMG USER ===================== **/
function delImgUserServ(iu_id) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield containers_1.daoImgUser.deleteImg(iu_id);
    });
}
exports.delImgUserServ = delImgUserServ;
