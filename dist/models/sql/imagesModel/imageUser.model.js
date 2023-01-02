"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const postgres_1 = require("../../../config/sql/postgres");
const ImageUser = postgres_1.sequelize.define("image_user", {
    iu_id: {
        type: sequelize_1.DataTypes.STRING,
        primaryKey: true,
    },
    user_id: {
        type: sequelize_1.DataTypes.STRING,
    },
    iu_path: {
        type: sequelize_1.DataTypes.STRING,
    },
}, { timestamps: true, freezeTableName: true });
exports.default = ImageUser;
