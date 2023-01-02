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
exports.daoRepuScoreSQL = void 0;
const base_container_1 = __importDefault(require("../../../base/base.container"));
const repuScore_model_1 = __importDefault(require("../../../../models/sql/reputationModel/repuScore.model"));
class daoRepuScoreSQL extends base_container_1.default {
    constructor() {
        super(repuScore_model_1.default);
    }
    /** -------------------- CREATE REPUTATION SCORE ---------------------- **/
    createScore(rs_id, rs_name) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                //Check score:
                const check = yield repuScore_model_1.default.findOne({ where: { rs_name } });
                if (check)
                    return "SCORE_ALREADY_CREATED";
                return yield repuScore_model_1.default.create({ rs_id, rs_name });
            }
            catch (e) {
                throw new Error(e.message);
            }
        });
    }
    /** -------------------- LIST REPUTATION SCORE ---------------------- **/
    listScores() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield repuScore_model_1.default.findAll();
            }
            catch (e) {
                throw new Error(e.message);
            }
        });
    }
    /** -------------------- DELETE REPUTATION SCORE ---------------------- **/
    deleteScore(rs_id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const del = yield repuScore_model_1.default.destroy({ where: { rs_id } });
                if (!del)
                    return "SCORE_NOT_FOUND";
                else
                    return "SCORE_DELETED";
            }
            catch (e) {
                throw new Error(e.message);
            }
        });
    }
}
exports.daoRepuScoreSQL = daoRepuScoreSQL;
