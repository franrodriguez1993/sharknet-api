"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const postgres_1 = require("../../../config/sql/postgres");
const sequelize_1 = require("sequelize");
const Address = postgres_1.sequelize.define("user_address", {
    address_id: {
        type: sequelize_1.DataTypes.STRING,
        primaryKey: true,
    },
    user_id: {
        type: sequelize_1.DataTypes.STRING,
    },
    address_street: {
        type: sequelize_1.DataTypes.STRING,
    },
    address_number: {
        type: sequelize_1.DataTypes.STRING,
    },
    address_floor: {
        type: sequelize_1.DataTypes.STRING,
    },
    address_apartment: {
        type: sequelize_1.DataTypes.STRING,
    },
    address_city: {
        type: sequelize_1.DataTypes.STRING,
    },
    address_state: {
        type: sequelize_1.DataTypes.STRING,
    },
}, { freezeTableName: true, timestamps: true });
exports.default = Address;
