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
const RUser_serv_1 = __importDefault(require("../../services/reputation/RUser.serv"));
const service = new RUser_serv_1.default();
class repuUserController {
    /** =============== CREATE REPUTATION SELLER ================= **/
    createRepuSellerCtrl(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                //Data:
                const data = {
                    ur_qualifier: req.body.qualifier,
                    ur_receiver: req.body.receiver,
                    sale_id: req.body.sale,
                    rs_id: req.body.rs_id,
                    ur_rol: req.body.rol,
                    ur_description: req.body.description,
                };
                //Service:
                const repu = yield service.createReputationServ(req.uid, data, "seller");
                //Return:
                if (repu === "SALE_NOT_FOUND" || repu === "USER_NOT_FOUND")
                    return res.status(404).json({ status: 404, msg: repu });
                else if (repu === "ALREADY_QUALIFIED" ||
                    repu === "INCORRECT_ROL" ||
                    repu === "INCORRECT_ROL_QUALIFY" ||
                    repu === "INVALID_QUALIFIER")
                    return res.status(400).json({ status: 400, msg: repu });
                //Ok:
                return res.json({ status: 201, msg: "USER_QUALIFIED" });
            }
            catch (e) {
                logger_1.default.error(e.message);
                return res.status(500).json({ status: 500, msg: e.message });
            }
        });
    }
    /** ================ CREATE REPUTATION BUYER ==================== **/
    createRepuBuyerCtrl(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                //Data:
                const data = {
                    ur_qualifier: req.body.qualifier,
                    ur_receiver: req.body.receiver,
                    sale_id: req.body.sale,
                    rs_id: req.body.rs_id,
                    ur_rol: req.body.rol,
                    ur_description: req.body.description,
                };
                //Service:
                const repu = yield service.createReputationServ(req.uid, data, "buyer");
                //Return:
                if (repu === "SALE_NOT_FOUND" || repu === "USER_NOT_FOUND")
                    return res.status(404).json({ status: 404, msg: repu });
                else if (repu === "ALREADY_QUALIFIED" ||
                    repu === "INCORRECT_ROL" ||
                    repu === "INCORRECT_ROL_QUALIFY" ||
                    repu === "INVALID_QUALIFIER")
                    return res.status(400).json({ status: 400, msg: repu });
                else if (repu === "UNAUTHORIZED_ACTION")
                    return res.status(400).json({ status: 401, msg: repu });
                //Ok:
                return res.json({ status: 201, msg: "USER_QUALIFIED" });
            }
            catch (e) {
                logger_1.default.error(e.message);
                return res.status(500).json({ status: 500, msg: e.message });
            }
        });
    }
    /** ================ DELETE REPUTATION USER ================= **/
    deleteReputationCtrl(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                //Data:
                const { id } = req.params;
                //Service:
                const del = yield service.deleteReputationServ(id);
                //Return:
                return res.json({ status: 200, msg: "OK", data: del });
            }
            catch (e) {
                logger_1.default.error(e.message);
                return res.status(500).json({ status: 500, msg: e.message });
            }
        });
    }
    /** =============== GET REPUTATION BUYER ================ **/
    ListRepuBuyerCtrl(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                //Data:
                const { id } = req.params;
                // query parameters:
                const page = parseInt(req.query.page);
                const size = parseInt(req.query.size);
                //Service:
                const list = yield service.ListRepuBuyerServ(id, page, size);
                //Return:
                if (!list)
                    return res.status(500).json({ status: 500, msg: "SERVER_ERROR" });
                else if (list === "USER_NOT_FOUND")
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
    /** =============== GET REPUTATION SELLER =============== **/
    listRepuSellerCtrl(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                //Data:
                const { id } = req.params;
                // query parameters:
                const page = parseInt(req.query.page);
                const size = parseInt(req.query.size);
                //Service:
                const list = yield service.listRepuSellerServ(id, page, size);
                //Return:
                if (!list)
                    return res.status(500).json({ status: 500, msg: "SERVER_ERROR" });
                else if (list === "USER_NOT_FOUND")
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
exports.default = repuUserController;
