"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const postgres_1 = require("../../../config/sql/postgres");
/** ~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Association Models ~~~~~~~~~~~~~~~~~~~~~~~~~~~~  **/
const SaleProduct_models_1 = __importDefault(require("./SaleProduct.models"));
const repuUser_model_1 = __importDefault(require("../reputationModel/repuUser.model"));
/**~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ **/
const Sale = postgres_1.sequelize.define("sale_receipt", {
    sale_id: {
        type: sequelize_1.DataTypes.STRING,
        primaryKey: true,
    },
    sale_seller: {
        type: sequelize_1.DataTypes.STRING,
    },
    sale_buyer: {
        type: sequelize_1.DataTypes.STRING,
    },
    sale_amount: {
        type: sequelize_1.DataTypes.INTEGER,
    },
    sale_instalments: {
        type: sequelize_1.DataTypes.INTEGER,
    },
    cc_id: {
        type: sequelize_1.DataTypes.STRING,
    },
}, { freezeTableName: true, timestamps: true });
/** =========================  ASSOCIATIONS  ==========================  **/
//Sale products:
Sale.hasMany(SaleProduct_models_1.default, {
    foreignKey: "sale_id",
});
SaleProduct_models_1.default.belongsTo(Sale, {
    foreignKey: "sale_id",
});
//Reputations:
Sale.hasMany(repuUser_model_1.default, {
    foreignKey: "sale_id",
});
repuUser_model_1.default.belongsTo(Sale, {
    foreignKey: "sale_id",
});
/**=====================================================================**/
exports.default = Sale;
