//La recomendación de la documentación dice que es mejor importarlo con mayúscula.
import { Sequelize } from "sequelize";

export const sequelize = new Sequelize("commerceDB", "postgres", "147258", {
  host: "localhost",
  dialect: "postgres",
});
