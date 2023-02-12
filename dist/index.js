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
require("dotenv/config");
const postgres_1 = require("./config/sql/postgres");
const app_1 = __importDefault(require("./app"));
const logger_1 = __importDefault(require("./utils/logger"));
const configServer_1 = __importDefault(require("./config/configServer"));
const PORT = configServer_1.default.server.port;
const URL_API = configServer_1.default.server.url_api;
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            //sincronizamos con postgres:
            yield postgres_1.sequelize.sync();
            app_1.default.listen(PORT, () => {
                if (configServer_1.default.server.mode === "P") {
                    logger_1.default.info(` Running in production mode: ${URL_API}`);
                }
                else {
                    logger_1.default.info(` Running in dev mode: ${URL_API}${PORT}/`);
                }
            });
        }
        catch (e) {
            console.log(e);
            logger_1.default.error(e.message);
        }
    });
}
//Ejecutamos el server:
main();
