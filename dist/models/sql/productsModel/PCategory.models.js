"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const postgres_1 = require("../../../config/sql/postgres");
const sequelize_1 = require("sequelize");
const ProductCategory = postgres_1.sequelize.define("product_category", {
    pc_id: {
        type: sequelize_1.DataTypes.STRING,
        primaryKey: true,
    },
    pc_name: {
        type: sequelize_1.DataTypes.STRING,
    },
}, { freezeTableName: true, timestamps: false });
exports.default = ProductCategory;
