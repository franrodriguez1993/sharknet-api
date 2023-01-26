import serverConfigurations from "../configServer";
import { Sequelize } from "sequelize";

export const sequelize = new Sequelize(
  serverConfigurations.postgres.db,
  serverConfigurations.postgres.username,
  serverConfigurations.postgres.password,
  {
    host: serverConfigurations.postgres.host,
    dialect: "postgres",
    logging: false,
  }
);

// export const sequelize = new Sequelize("commerceDB", "postgres", "147258", {
//   host: "localhost",
//   dialect: "postgres",
// });
