"use strict";
//Middleware to check the identity of the user that is trying to change the field.
//If is not the user or staff/admin reject the request.
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
exports.checkIdentity = void 0;
const logger_1 = __importDefault(require("../utils/logger"));
function checkIdentity(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { id } = req.params; //id target of the request
            const uid = req.uid; //uid user
            if (id.toString() === uid.toString()) {
                next();
            }
            else {
                return res.status(401).json({ status: 401, msg: "UNAUTHORIZED_REQUEST" });
            }
        }
        catch (e) {
            logger_1.default.error(e.message);
            return res.status(500).json({ status: 500, msg: e.message });
        }
    });
}
exports.checkIdentity = checkIdentity;
