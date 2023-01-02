"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const postgres_1 = require("../../../config/sql/postgres");
const sequelize_1 = require("sequelize");
/** ~~~~~~~~~~~ Associations Models ~~~~~~~~~~~~  **/
const PCategory_models_1 = __importDefault(require("./PCategory.models"));
const ProductTypes = postgres_1.sequelize.define("product_type", {
    pt_id: {
        type: sequelize_1.DataTypes.STRING,
        primaryKey: true,
    },
    pt_name: {
        type: sequelize_1.DataTypes.STRING,
    },
    pc_id: {
        type: sequelize_1.DataTypes.STRING,
    },
}, { freezeTableName: true, timestamps: false });
/** ~~~~~~~~~~~ Associations ~~~~~~~~~~~~ **/
PCategory_models_1.default.hasMany(ProductTypes, {
    foreignKey: "pc_id",
});
ProductTypes.belongsTo(PCategory_models_1.default, {
    foreignKey: "pc_id",
});
exports.default = ProductTypes;
