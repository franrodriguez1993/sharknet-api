"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sequelize = void 0;
const configServer_1 = __importDefault(require("../configServer"));
const sequelize_1 = require("sequelize");
exports.sequelize = new sequelize_1.Sequelize(configServer_1.default.postgres.db, configServer_1.default.postgres.username, configServer_1.default.postgres.password, {
    host: configServer_1.default.postgres.host,
    dialect: "postgres",
    logging: false,
});
// export const sequelize = new Sequelize("sharknet", "postgres", "123456", {
//   host: "postgreserver",
//   dialect: "postgres",
//   port: 6000,
// });
