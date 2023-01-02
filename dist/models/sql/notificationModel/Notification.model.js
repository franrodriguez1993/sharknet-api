"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const postgres_1 = require("../../../config/sql/postgres");
const sequelize_1 = require("sequelize");
const NotificationUser = postgres_1.sequelize.define("notification_user", {
    notification_id: {
        type: sequelize_1.DataTypes.STRING,
        primaryKey: true,
    },
    user_id: {
        type: sequelize_1.DataTypes.STRING,
    },
    notification_type: {
        type: sequelize_1.DataTypes.STRING,
    },
    notification_seen: {
        type: sequelize_1.DataTypes.BOOLEAN,
        defaultValue: false,
    },
    product_id: {
        type: sequelize_1.DataTypes.STRING,
    },
}, { timestamps: true, freezeTableName: true });
exports.default = NotificationUser;
