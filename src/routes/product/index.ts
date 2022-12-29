import { Router } from "express";
import { readdirSync } from "fs";

const PATH_ROUTER = `${__dirname}`;

const productRouters = Router();

//Funcion para limpiar el nombre del archivo:

const cleanFileName = (fileName: string) => {
  const file = fileName.split(".").shift();
  return file;
};

//Escanear el directorio y usarlos para generar las rutas de forma dinámica:

readdirSync(PATH_ROUTER).filter((fileName) => {
  const cleanName = cleanFileName(fileName);
  if (cleanName !== "index") {
    import(`./${fileName}`).then((moduleRouter) => {
      productRouters.use(`/api/v1/${cleanName}`, moduleRouter.router);
    });
  }
});

export { productRouters };
