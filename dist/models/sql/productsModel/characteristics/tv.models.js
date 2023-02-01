"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const postgres_1 = require("../../../../config/sql/postgres");
const sequelize_1 = require("sequelize");
const product_model_1 = __importDefault(require("../product.model"));
const TVCharacteristics = postgres_1.sequelize.define("chars_tv", {
    chars_id: {
        type: sequelize_1.DataTypes.STRING,
        primaryKey: true,
    },
    product_id: {
        type: sequelize_1.DataTypes.STRING,
    },
    inches: {
        type: sequelize_1.DataTypes.FLOAT(),
    },
    screen: {
        type: sequelize_1.DataTypes.STRING,
    },
    dimentions: {
        type: sequelize_1.DataTypes.STRING,
    },
    smart: {
        type: sequelize_1.DataTypes.BOOLEAN,
    },
    wifi: {
        type: sequelize_1.DataTypes.BOOLEAN,
    },
}, { freezeTableName: true, timestamps: false });
product_model_1.default.hasOne(TVCharacteristics, {
    as: "characteristic",
    foreignKey: "product_id",
});
TVCharacteristics.belongsTo(product_model_1.default, {
    as: "characteristic",
    foreignKey: "product_id",
});
exports.default = TVCharacteristics;
