"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const postgres_1 = require("../../../config/sql/postgres");
const UserReputation = postgres_1.sequelize.define("user_reputation", {
    ur_id: {
        type: sequelize_1.DataTypes.STRING,
        primaryKey: true,
    },
    ur_qualifier: {
        type: sequelize_1.DataTypes.STRING,
    },
    ur_receiver: {
        type: sequelize_1.DataTypes.STRING,
    },
    sale_id: {
        type: sequelize_1.DataTypes.STRING,
    },
    rs_id: {
        type: sequelize_1.DataTypes.STRING,
    },
    ur_rol: {
        type: sequelize_1.DataTypes.STRING,
    },
    ur_description: {
        type: sequelize_1.DataTypes.STRING,
    },
}, { timestamps: true, freezeTableName: true });
exports.default = UserReputation;
