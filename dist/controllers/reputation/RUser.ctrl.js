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
exports.listRepuSellerCtrl = exports.ListRepuBuyerCtrl = exports.deleteReputationCtrl = exports.createRepuBuyerCtrl = exports.createRepuSellerCtrl = void 0;
const RUser_serv_1 = require("../../services/reputation/RUser.serv");
/** ========================= CREATE REPUTATION SELLER ========================= **/
function createRepuSellerCtrl(req, res) {
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
            const repu = yield (0, RUser_serv_1.createReputationServ)(req.uid, data, "seller");
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
            return res.status(500).json({ status: 500, msg: e.message });
        }
    });
}
exports.createRepuSellerCtrl = createRepuSellerCtrl;
/** ========================= CREATE REPUTATION BUYER ========================= **/
function createRepuBuyerCtrl(req, res) {
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
            const repu = yield (0, RUser_serv_1.createReputationServ)(req.uid, data, "buyer");
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
            return res.status(500).json({ status: 500, msg: e.message });
        }
    });
}
exports.createRepuBuyerCtrl = createRepuBuyerCtrl;
/** ========================= DELETE REPUTATION USER ========================= **/
function deleteReputationCtrl(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            //Data:
            const { id } = req.params;
            //Service:
            const del = yield (0, RUser_serv_1.deleteReputationServ)(id);
            //Return:
            return res.json({ status: 200, msg: "OK", data: del });
        }
        catch (e) {
            return res.status(500).json({ status: 500, msg: e.message });
        }
    });
}
exports.deleteReputationCtrl = deleteReputationCtrl;
/** ========================= GET REPUTATION BUYER ========================= **/
function ListRepuBuyerCtrl(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            //Data:
            const { id } = req.params;
            // query parameters:
            const page = parseInt(req.query.page);
            const size = parseInt(req.query.size);
            //Service:
            const list = yield (0, RUser_serv_1.ListRepuBuyerServ)(id, page, size);
            //Return:
            if (!list)
                return res.status(500).json({ status: 500, msg: "SERVER_ERROR" });
            else if (list === "USER_NOT_FOUND")
                return res.status(404).json({ status: 404, msg: list });
            //Ok:
            return res.json({ status: 200, msg: "OK", data: list });
        }
        catch (e) {
            return res.status(500).json({ status: 500, msg: e.message });
        }
    });
}
exports.ListRepuBuyerCtrl = ListRepuBuyerCtrl;
/** ========================= GET REPUTATION SELLER ========================= **/
function listRepuSellerCtrl(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            //Data:
            const { id } = req.params;
            // query parameters:
            const page = parseInt(req.query.page);
            const size = parseInt(req.query.size);
            //Service:
            const list = yield (0, RUser_serv_1.listRepuSellerServ)(id, page, size);
            //Return:
            if (!list)
                return res.status(500).json({ status: 500, msg: "SERVER_ERROR" });
            else if (list === "USER_NOT_FOUND")
                return res.status(404).json({ status: 404, msg: list });
            //Ok:
            return res.json({ status: 200, msg: "OK", data: list });
        }
        catch (e) {
            return res.status(500).json({ status: 500, msg: e.message });
        }
    });
}
exports.listRepuSellerCtrl = listRepuSellerCtrl;
