import "dotenv/config";
import { sequelize } from "./config/sql/postgres";
import app from "./app";
import logger from "./utils/logger";
import serverConfigurations from "./config/configServer";

const PORT = serverConfigurations.server.port;
const URL_API = serverConfigurations.server.url_api;
async function main() {
  try {
    //sincronizamos con postgres:
    await sequelize.sync();
    app.listen(PORT, () => {
      if (serverConfigurations.server.mode === "P") {
        logger.info(` Running in production mode: ${URL_API}`);
      } else {
        logger.info(` Running in dev mode: ${URL_API}${PORT}/`);
      }
    });
  } catch (e: any) {
    console.log(e);
    logger.error(e.message);
  }
}
//Ejecutamos el server:
main();
