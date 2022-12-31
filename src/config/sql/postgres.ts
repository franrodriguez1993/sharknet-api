//La recomendación de la documentación dice que es mejor importarlo con mayúscula.
import { Sequelize } from "sequelize";

export const sequelize = new Sequelize(
  process.env.POSTGRES_DB,
  process.env.POSTGRES_USERNAME,
  process.env.POSTGRES_PASSWORD,
  {
    host: process.env.POSTGRES_HOST,
    dialect: "postgres",
  }
);

// export const sequelize = new Sequelize("commerceDB", "postgres", "147258", {
//   host: "localhost",
//   dialect: "postgres",
// });
