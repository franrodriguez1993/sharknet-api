"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const postgres_1 = require("../../../config/sql/postgres");
const sequelize_1 = require("sequelize");
const Rol = postgres_1.sequelize.define("Rol", {
    rol_id: {
        type: sequelize_1.DataTypes.STRING,
        primaryKey: true,
    },
    rol_name: {
        type: sequelize_1.DataTypes.STRING(40),
    },
}, { freezeTableName: true, timestamps: false });
exports.default = Rol;
