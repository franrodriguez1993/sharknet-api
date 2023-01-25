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
const googleapis_1 = require("googleapis");
const streamifier_1 = __importDefault(require("streamifier"));
//VARIABLES:
const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REDIRECT_URI = process.env.REDIRECT_URI;
const REFRESH_TOKEN = process.env.REFRESH_TOKEN_GD;
//Cliente OAUTH:
const oauth2client = new googleapis_1.google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);
oauth2client.setCredentials({ refresh_token: REFRESH_TOKEN });
//Conexión a Google Drive:
const drive = googleapis_1.google.drive({ version: "v3", auth: oauth2client });
class UploadImages {
    /** GENERATE PUBLIC URL  **/
    generatePublicURL(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                //Create permission:
                yield drive.permissions.create({
                    fileId: data.id,
                    requestBody: {
                        role: "reader",
                        type: "anyone",
                    },
                });
                //Get URL:
                const result = yield drive.files.get({
                    fileId: data.id,
                    fields: "webViewLink, webContentLink",
                });
                return result.data;
            }
            catch (e) {
                console.log(e.message);
            }
        });
    }
    /**  SUBIR IMAGEN **/
    uploadFile(name = "fileImage", data, folderID) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const stream = streamifier_1.default.createReadStream(data);
                const response = yield drive.files.create({
                    requestBody: {
                        name: name,
                        mimeType: "image/jpg",
                        parents: [folderID],
                    },
                    media: {
                        mimeType: "image/jpg",
                        body: stream,
                    },
                });
                const linksData = yield this.generatePublicURL(response.data);
                return { imageId: response.data.id, linksData };
            }
            catch (e) {
                console.log(e.message);
            }
        });
    }
    /** BORRAR IMAGEN **/
    deleteFile(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield drive.files.delete({
                    fileId: id,
                });
                return response.status;
            }
            catch (e) {
                console.log(e.message);
            }
        });
    }
}
exports.default = UploadImages;
