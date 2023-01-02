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
exports.verified = exports.encrypt = void 0;
const bcryptjs_1 = require("bcryptjs");
//Encriptar:
const encrypt = (pass) => __awaiter(void 0, void 0, void 0, function* () {
    const hashPass = yield (0, bcryptjs_1.hash)(pass, 8);
    return hashPass;
});
exports.encrypt = encrypt;
//comparar:
const verified = (pass, hashPash) => __awaiter(void 0, void 0, void 0, function* () {
    const isCorrect = yield (0, bcryptjs_1.compare)(pass, hashPash);
    return isCorrect;
});
exports.verified = verified;
