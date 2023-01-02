"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const postgres_1 = require("../../../config/sql/postgres");
const ProductReputation = postgres_1.sequelize.define("product_reputation", {
    pr_id: {
        type: sequelize_1.DataTypes.STRING,
        primaryKey: true,
    },
    pr_qualifier: {
        type: sequelize_1.DataTypes.STRING,
    },
    product_id: {
        type: sequelize_1.DataTypes.STRING,
    },
    sale_id: {
        type: sequelize_1.DataTypes.STRING,
    },
    rs_id: {
        type: sequelize_1.DataTypes.STRING,
    },
    pr_description: {
        type: sequelize_1.DataTypes.STRING,
    },
}, { timestamps: true, freezeTableName: true });
exports.default = ProductReputation;
