"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const postgres_1 = require("../../../config/sql/postgres");
const sequelize_1 = require("sequelize");
const ProductFavorite = postgres_1.sequelize.define("product_favorite", {
    pf_id: {
        type: sequelize_1.DataTypes.STRING,
        primaryKey: true,
    },
    user_id: {
        type: sequelize_1.DataTypes.STRING,
    },
    product_id: {
        type: sequelize_1.DataTypes.STRING,
    },
}, { freezeTableName: true, timestamps: true });
exports.default = ProductFavorite;
