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
const imagekit_1 = __importDefault(require("imagekit"));
const configServer_1 = __importDefault(require("../config/configServer"));
const uuid_1 = require("uuid");
const logger_1 = __importDefault(require("./logger"));
const imageKit = new imagekit_1.default({
    publicKey: configServer_1.default.imageKit.publicKey,
    privateKey: configServer_1.default.imageKit.privateKey,
    urlEndpoint: configServer_1.default.imageKit.urlEndPoing,
});
class imageKitClass {
    /**  UPLOAD IMAGE  **/
    uploadImage(img) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const base = img.toString("base64");
                const data = yield imageKit.upload({
                    file: base,
                    fileName: `${(0, uuid_1.v4)()}`,
                });
                return data;
            }
            catch (e) {
                return logger_1.default.error(e.message);
            }
        });
    }
    /** DELETE IMAGE  **/
    deleteImage(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const res = yield imageKit.deleteFile(id);
                return res;
            }
            catch (e) {
                return logger_1.default.error(e.message);
            }
        });
    }
}
exports.default = imageKitClass;
