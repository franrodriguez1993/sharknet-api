"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const postgres_1 = require("../../../config/sql/postgres");
const ImageProduct = postgres_1.sequelize.define("image_product", {
    ip_id: {
        type: sequelize_1.DataTypes.STRING,
        primaryKey: true,
    },
    product_id: {
        type: sequelize_1.DataTypes.STRING,
    },
    ip_path: {
        type: sequelize_1.DataTypes.STRING,
    },
}, { timestamps: true, freezeTableName: true });
exports.default = ImageProduct;
