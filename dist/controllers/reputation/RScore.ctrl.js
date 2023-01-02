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
exports.deleteScoreCtrl = exports.listScoreCtrl = exports.createScoreCtrl = void 0;
const RScore_serv_1 = require("../../services/reputation/RScore.serv");
/** ========================= CREATE SCORE ========================= **/
function createScoreCtrl(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            //Data:
            const { name } = req.body;
            //Service:
            const score = yield (0, RScore_serv_1.createScoreServ)(name);
            //return:
            if (!score)
                return res.status(500).json({ status: 500, msg: "SERVER_ERROR" });
            else if (score === "SCORE_ALREADY_CREATED" || score === "NAME_REQUIRED")
                return res.status(400).json({ status: 400, msg: score });
            //Ok:
            return res.json({ status: 201, msg: "SCORE_CREATED" });
        }
        catch (e) {
            return res.status(500).json({ status: 500, msg: e.message });
        }
    });
}
exports.createScoreCtrl = createScoreCtrl;
/** ========================= LIST SCORE ========================= **/
function listScoreCtrl(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            //service:
            const list = yield (0, RScore_serv_1.listScoreServ)();
            return res.json({ status: 200, msg: "OK", data: list });
        }
        catch (e) {
            return res.status(500).json({ status: 500, msg: e.message });
        }
    });
}
exports.listScoreCtrl = listScoreCtrl;
/** ========================= DELETE SCORE ========================= **/
function deleteScoreCtrl(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            //Data:
            const { id } = req.params;
            //Service:
            const del = yield (0, RScore_serv_1.deleteScoreServ)(id);
            if (!del)
                return res.status(500).json({ status: 500, msg: "SERVER_ERROR" });
            //Return:
            return res.json({ status: 200, msg: "SCORE_DELETED" });
        }
        catch (e) {
            return res.status(500).json({ status: 500, msg: e.message });
        }
    });
}
exports.deleteScoreCtrl = deleteScoreCtrl;
