import { Request } from "express";
import { v4 as uuidv4 } from "uuid";
import multer, { diskStorage } from "multer";

//Dirección donde se guardan las imagenes:
const PATH_STORAGE = `${process.cwd()}/public/images/user`;

//Storage:
const storage = diskStorage({
  destination(req: Request, file: any, cb: any) {
    cb(null, PATH_STORAGE);
  },
  filename(req: Request, file: any, cb: any) {
    const ext = file.originalname.split(".").pop();
    const partialName = uuidv4();
    //Pedimos por params tambien el id de la conversacion
    const filenameRandom = `image${partialName}.${ext}`;
    cb(null, filenameRandom);
  },
});
const userMulter = multer({ storage });
export default userMulter;
