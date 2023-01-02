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
exports.deleteScoreServ = exports.listScoreServ = exports.createScoreServ = void 0;
//uuid:
const uuid_1 = require("uuid");
//DAOs:
const containers_1 = require("../../containers");
/** ========================= CREATE SCORE ========================= **/
function createScoreServ(rs_name) {
    return __awaiter(this, void 0, void 0, function* () {
        if (rs_name.trim() === "")
            return "NAME_REQUIRED";
        //create:
        const rs_id = (0, uuid_1.v4)();
        return yield containers_1.daoRepuScore.createScore(rs_id, rs_name);
    });
}
exports.createScoreServ = createScoreServ;
/** ========================= LIST SCORE ========================= **/
function listScoreServ() {
    return __awaiter(this, void 0, void 0, function* () {
        return yield containers_1.daoRepuScore.listScores();
    });
}
exports.listScoreServ = listScoreServ;
/** ========================= DELETE SCORE ========================= **/
function deleteScoreServ(rs_id) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield containers_1.daoRepuScore.deleteScore(rs_id);
    });
}
exports.deleteScoreServ = deleteScoreServ;
