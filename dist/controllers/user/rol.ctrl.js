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
const logger_1 = __importDefault(require("../../utils/logger"));
// Services:
const rol_serv_1 = __importDefault(require("../../services/user/rol.serv"));
const service = new rol_serv_1.default();
class rolUserController {
    /**=================== CREATE ROL =====================**/
    createRolCtrl(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                //Data:
                const { rol_name } = req.body;
                //Service:
                const rol = yield service.createRolService(rol_name);
                //Return:
                if (!rol)
                    return res.status(400).json({ status: 400, msg: "ERROR_CREATING" });
                else if (rol === "NAME_ALREADY_IN_USE" || rol === "ROL_NAME_REQUIRED")
                    return res.status(400).json({ status: 400, msg: rol });
                else if (rol === "ROL_CREATED")
                    return res.status(201).json({ status: 201, msg: rol });
            }
            catch (e) {
                logger_1.default.error(e.message);
                return res.json({ status: 500, msg: e.message });
            }
        });
    }
    /**===================== GET ROL =========================**/
    getAllRolCtrl(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const list = yield service.getAllRolServ();
                return res.json({ status: 200, msg: "OK", data: list });
            }
            catch (e) {
                logger_1.default.error(e.message);
                return res.json({ status: 500, msg: e.message });
            }
        });
    }
}
exports.default = rolUserController;
