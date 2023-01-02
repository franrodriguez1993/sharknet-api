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
exports.delImgUserCtrl = exports.createImgUserCtrl = void 0;
//Services:
const imgUser_serv_1 = require("../../services/imageServ/imgUser.serv");
/** ==================== CREATE IMG USER ===================== **/
function createImgUserCtrl(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            //data:
            const { id } = req.params;
            const { file } = req;
            const data = { iu_path: `${file.path.split("public")[1]}`, user_id: id };
            //Service:
            const img = yield (0, imgUser_serv_1.createImgUserServ)(req.uid, data);
            //return:
            if (img === "USER_NOT_FOUND")
                return res.status(404).json({ status: 404, msg: img });
            else if (img === "INVALID_ROUTE")
                return res.status(400).json({ status: 400, msg: img });
            else if (img === "UNAUTHORIZED_ACTION")
                return res.status(401).json({ status: 401, msg: img });
            //Ok:
            return res.json({ status: 201, msg: "OK", data: img });
        }
        catch (e) {
            return res.status(500).json({ status: 500, msg: e.message });
        }
    });
}
exports.createImgUserCtrl = createImgUserCtrl;
/** ==================== DELETE IMG USER ===================== **/
function delImgUserCtrl(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            //Data:
            const { id } = req.params;
            //Service:
            const del = yield (0, imgUser_serv_1.delImgUserServ)(id);
            //Return:
            return res.json({ status: 200, msg: "OK", data: del });
        }
        catch (e) {
            return res.status(500).json({ status: 500, msg: e.message });
        }
    });
}
exports.delImgUserCtrl = delImgUserCtrl;
