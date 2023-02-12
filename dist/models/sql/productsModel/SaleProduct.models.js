"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const postgres_1 = require("../../../config/sql/postgres");
const sequelize_1 = require("sequelize");
const SaleProducts = postgres_1.sequelize.define("sale_product", {
    sp_id: {
        type: sequelize_1.DataTypes.STRING,
        primaryKey: true,
    },
    user_id: {
        type: sequelize_1.DataTypes.STRING,
    },
    sp_quantity: {
        type: sequelize_1.DataTypes.INTEGER,
    },
    product_id: {
        type: sequelize_1.DataTypes.STRING,
    },
    sale_id: {
        type: sequelize_1.DataTypes.STRING,
    },
}, { freezeTableName: true, timestamps: true });
exports.default = SaleProducts;
