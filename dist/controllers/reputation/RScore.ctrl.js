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
const RScore_serv_1 = __importDefault(require("../../services/reputation/RScore.serv"));
const service = new RScore_serv_1.default();
class repuScoreController {
    /** ================= CREATE SCORE ================= **/
    createScoreCtrl(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                //Data:
                const { name } = req.body;
                //Service:
                const score = yield service.createScoreServ(name);
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
    /** =================== LIST SCORE ================== **/
    listScoreCtrl(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                //service:
                const list = yield service.listScoreServ();
                return res.json({ status: 200, msg: "OK", data: list });
            }
            catch (e) {
                return res.status(500).json({ status: 500, msg: e.message });
            }
        });
    }
    /** =============== DELETE SCORE ================= **/
    deleteScoreCtrl(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                //Data:
                const { id } = req.params;
                //Service:
                const del = yield service.deleteScoreServ(id);
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
}
exports.default = repuScoreController;
