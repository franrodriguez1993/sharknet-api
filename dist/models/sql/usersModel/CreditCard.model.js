"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const postgres_1 = require("../../../config/sql/postgres");
const sequelize_1 = require("sequelize");
/** ~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Association Models ~~~~~~~~~~~~~~~~~~~~~~~~~~~~  **/
const Sale_model_1 = __importDefault(require("../productsModel/Sale.model"));
/**~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ **/
const CreditCard = postgres_1.sequelize.define("user_creditCard", {
    cc_id: {
        type: sequelize_1.DataTypes.STRING,
        primaryKey: true,
    },
    user_id: {
        type: sequelize_1.DataTypes.STRING,
    },
    cc_name: {
        type: sequelize_1.DataTypes.STRING,
    },
    cc_number: {
        type: sequelize_1.DataTypes.STRING,
    },
    cc_date: {
        type: sequelize_1.DataTypes.STRING,
    },
    cc_code: {
        type: sequelize_1.DataTypes.STRING,
    },
    cc_bank: {
        type: sequelize_1.DataTypes.STRING,
    },
}, { freezeTableName: true, timestamps: true });
/** =========================  ASSOCIATIONS  ==========================  **/
CreditCard.hasMany(Sale_model_1.default, {
    foreignKey: "cc_id",
});
Sale_model_1.default.belongsTo(CreditCard, {
    foreignKey: "cc_id",
});
/**=====================================================================**/
exports.default = CreditCard;
