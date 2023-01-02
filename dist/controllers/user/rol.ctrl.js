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
exports.getAllRolCtrl = exports.createRolCtrl = void 0;
// Services:
const rol_serv_1 = require("../../services/user/rol.serv");
/**============================= CREATE ROL ==================================**/
function createRolCtrl(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            //Data:
            const { rol_name } = req.body;
            //Service:
            const rol = yield (0, rol_serv_1.createRolService)(rol_name);
            //Return:
            if (!rol)
                return res.status(400).json({ status: 400, msg: "ERROR_CREATING" });
            else if (rol === "NAME_ALREADY_IN_USE" || rol === "ROL_NAME_REQUIRED")
                return res.status(400).json({ status: 400, msg: rol });
            else if (rol === "ROL_CREATED")
                return res.status(201).json({ status: 201, msg: rol });
        }
        catch (e) {
            return res.json({ status: 500, msg: e.message });
        }
    });
}
exports.createRolCtrl = createRolCtrl;
/**============================= GET ROL ==================================**/
function getAllRolCtrl(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const list = yield (0, rol_serv_1.getAllRolServ)();
            return res.json({ status: 200, msg: "OK", data: list });
        }
        catch (e) {
            return res.json({ status: 500, msg: e.message });
        }
    });
}
exports.getAllRolCtrl = getAllRolCtrl;
