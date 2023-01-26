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
//Service:
const RProduct_serv_1 = __importDefault(require("../../services/reputation/RProduct.serv"));
const service = new RProduct_serv_1.default();
class reputationProductController {
    /** ===================== CREATE REPUTATION  ==================== **/
    createReputationCtrl(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                //Data:
                const data = {
                    pr_qualifier: req.body.qualifier,
                    product_id: req.body.product,
                    sale_id: req.body.sale,
                    rs_id: req.body.rs_id,
                    pr_description: req.body.description,
                };
                const tokenID = { uid: req.uid, rol: req.rol };
                //Service:
                const repu = yield service.createRepuServ(tokenID, data);
                //Return:
                if (repu === "SALE_NOT_FOUND" ||
                    repu === "USER_NOT_FOUND" ||
                    repu === "PRODUCT_NOT_FOUND")
                    return res.status(404).json({ status: 404, msg: repu });
                else if (repu === "ALREADY_QUALIFIED" || repu === "UNAUTHORIZED_ACTION")
                    return res.status(400).json({ status: 400, msg: repu });
                //ok:
                return res.json({ status: 201, msg: "PRODUCT_QUALIFIED" });
            }
            catch (e) {
                logger_1.default.error(e.message);
                return res.status(500).json({ status: 500, msg: e.message });
            }
        });
    }
    /** ==================== DELETE REPUTATION  =================== **/
    delRepuProductCtrl(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                //Data:
                const { id } = req.params;
                //Service:
                const del = yield service.delRepuProductServ(id);
                //Return:
                return res.json({ status: 200, msg: "OK", data: del });
            }
            catch (e) {
                logger_1.default.error(e.message);
                return res.status(500).json({ status: 500, msg: e.message });
            }
        });
    }
    /** ================== LIST REPUTATION  ================== **/
    listRepuProductCtrl(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                //Data:
                const { id } = req.params;
                // query parameters:
                const page = parseInt(req.query.page);
                const size = parseInt(req.query.size);
                //Service:
                const list = yield service.listRepuProductServ(id, page, size);
                //Return:
                if (!list)
                    return res.status(500).json({ status: 500, msg: "SERVER_ERROR" });
                else if (list === "PRODUCT_NOT_FOUND")
                    return res.status(404).json({ status: 404, msg: list });
                //Ok:
                return res.json({ status: 200, msg: "OK", data: list });
            }
            catch (e) {
                logger_1.default.error(e.message);
                return res.status(500).json({ status: 500, msg: e.message });
            }
        });
    }
}
exports.default = reputationProductController;
