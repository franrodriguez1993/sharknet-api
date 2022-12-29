import "dotenv/config";
import { sequelize } from "./config/sql/postgres";
import app from "./app";

const PORT = process.env.PORT || 5000;

async function main() {
  try {
    //sincronizamos con postgres:
    await sequelize.sync();
    app.listen(PORT, () => {
      console.log(`App funcionando http://localhost:${PORT}`);
    });
  } catch (e) {
    console.log(e);
  }
}
//Ejecutamos el server:
main();
