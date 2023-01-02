"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const postgres_1 = require("../../../config/sql/postgres");
const sequelize_1 = require("sequelize");
const Birthday = postgres_1.sequelize.define("user_birthday", {
    birthday_id: {
        type: sequelize_1.DataTypes.STRING,
        primaryKey: true,
    },
    user_id: {
        type: sequelize_1.DataTypes.STRING,
    },
    birthday_day: {
        type: sequelize_1.DataTypes.INTEGER,
    },
    birthday_month: {
        type: sequelize_1.DataTypes.INTEGER,
    },
    birthday_year: {
        type: sequelize_1.DataTypes.INTEGER,
    },
}, { freezeTableName: true, timestamps: false });
exports.default = Birthday;
