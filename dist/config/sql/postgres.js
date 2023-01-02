"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sequelize = void 0;
//La recomendación de la documentación dice que es mejor importarlo con mayúscula.
const sequelize_1 = require("sequelize");
exports.sequelize = new sequelize_1.Sequelize(process.env.POSTGRES_DB, process.env.POSTGRES_USERNAME, process.env.POSTGRES_PASSWORD, {
    host: process.env.POSTGRES_HOST,
    dialect: "postgres",
});
// export const sequelize = new Sequelize("commerceDB", "postgres", "147258", {
//   host: "localhost",
//   dialect: "postgres",
// });
