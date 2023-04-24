import "dotenv/config";
import { sequelize } from "./config/sql/postgres";
import app from "./app";
import logger from "./utils/logger";
import serverConfigurations from "./config/configServer";

import os from "os";
import cluster from "cluster";

//cluster cpu numbers:
const cpuNumbers = os.cpus().length;

const MODE = serverConfigurations.server.mode;
const PORT = serverConfigurations.server.port;
const URL_API = serverConfigurations.server.url_api;

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//Init function:
async function main() {
  try {
    //sincronizamos con postgres:
    await sequelize.sync();
    app.listen(PORT, () => {
      if (serverConfigurations.server.mode === "P") {
        logger.info(
          ` Running in production mode: ${URL_API} - PID:${process.pid} `
        );
      } else {
        logger.info(
          ` Running in dev mode: ${URL_API}${PORT}/ - PID:${process.pid} `
        );
      }
    });
  } catch (e: any) {
    logger.info(e);
    logger.error(e.message);
  }
}

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//Cluster configuration:
function clusterConfig() {
  if (cluster.isPrimary) {
    logger.info(`Primary ${process.pid} is running`);

    // Fork workers.
    for (let i = 0; i < cpuNumbers; i++) {
      cluster.fork();
    }

    cluster.on("exit", (worker, code, signal) => {
      logger.error(`worker ${worker.process.pid} died`);
      logger.info("starting new cluster");
      cluster.fork();
    });
  } else {
    main();
    logger.info(`Worker ${process.pid} started`);
  }
}

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// SERVER INIT:

if (MODE === "P") {
  clusterConfig();
} else {
  main();
}
