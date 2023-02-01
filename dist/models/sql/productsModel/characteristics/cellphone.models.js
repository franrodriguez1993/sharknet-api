"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const postgres_1 = require("../../../../config/sql/postgres");
const sequelize_1 = require("sequelize");
const product_model_1 = __importDefault(require("../product.model"));
const cellphoneCharacteristics = postgres_1.sequelize.define("chars_cellpone", {
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
    disk_memory: {
        type: sequelize_1.DataTypes.INTEGER,
    },
    ram_memory: {
        type: sequelize_1.DataTypes.INTEGER,
    },
    dimentions: {
        type: sequelize_1.DataTypes.STRING,
    },
    processor: {
        type: sequelize_1.DataTypes.STRING,
    },
}, { freezeTableName: true, timestamps: false });
//Cellphone:
product_model_1.default.hasOne(cellphoneCharacteristics, {
    as: "characteristic",
    foreignKey: "product_id",
});
cellphoneCharacteristics.belongsTo(product_model_1.default, {
    as: "characteristic",
    foreignKey: "product_id",
});
exports.default = cellphoneCharacteristics;
