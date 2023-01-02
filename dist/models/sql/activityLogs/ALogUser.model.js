"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const postgres_1 = require("../../../config/sql/postgres");
const sequelize_1 = require("sequelize");
const ActivityLogUser = postgres_1.sequelize.define("activity_log_user", {
    alu_id: {
        type: sequelize_1.DataTypes.STRING,
        primaryKey: true,
    },
    user_id: {
        type: sequelize_1.DataTypes.STRING,
    },
    alu_action: {
        type: sequelize_1.DataTypes.STRING, //"delete""edit""verified""unverified""upgrade""downgrade"
    },
}, { timestamps: true, freezeTableName: true });
exports.default = ActivityLogUser;
