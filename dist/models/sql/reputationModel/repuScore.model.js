"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const postgres_1 = require("../../../config/sql/postgres");
/** ~~~~~~~~~~~~~~~~ Association Models ~~~~~~~~~~~~~~~~~~~**/
const repuUser_model_1 = __importDefault(require("./repuUser.model"));
const repuProduct_model_1 = __importDefault(require("./repuProduct.model"));
/**~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~**/
const ReputationScore = postgres_1.sequelize.define("reputation_score", {
    rs_id: {
        type: sequelize_1.DataTypes.STRING,
        primaryKey: true,
    },
    rs_name: {
        type: sequelize_1.DataTypes.STRING,
    },
}, { timestamps: false, freezeTableName: true });
/** ~~~~~~~~~~~~~~~~ Associations ~~~~~~~~~~~~~~~~ **/
//User:
ReputationScore.hasMany(repuUser_model_1.default, {
    foreignKey: "rs_id",
});
repuUser_model_1.default.belongsTo(ReputationScore, {
    foreignKey: "rs_id",
});
//Product:
ReputationScore.hasMany(repuProduct_model_1.default, {
    foreignKey: "rs_id",
});
repuProduct_model_1.default.belongsTo(ReputationScore, {
    foreignKey: "rs_id",
});
exports.default = ReputationScore;
