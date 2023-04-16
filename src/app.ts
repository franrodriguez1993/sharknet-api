import cors from "cors";
import express from "express";
import serverConfigurations from "./config/configServer";
/** ------ ROUTES ------  **/
import { userRouters } from "./routes/user";
import { productRouters } from "./routes/product";
import { commentRouter } from "./routes/comment";
import { imageRouters } from "./routes/imgRoute";
import { superRouters } from "./routes/superuser";
import { notificationtRouters } from "./routes/notification";
import { authRouter } from "./routes/auth/auth.routes";

const app = express();

/** =========================  CORS  ==========================  **/

const urlList = [
  serverConfigurations.cors.first,
  serverConfigurations.cors.second,
];
const corsOptions = {
  credentials: true,
  origin: function (origin: any, callback: any) {
    if (!origin) {
      //for bypassing postman req with  no origin
      return callback(null, true);
    }
    if (urlList.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
};
app.use(cors(corsOptions));

app.use(express.json());

/** =========================  ROUTER  ==========================  **/
app.use(userRouters);
app.use(productRouters);
app.use(commentRouter);
app.use(imageRouters);
app.use(superRouters);
app.use(notificationtRouters);
app.use("/api/v1/auth", authRouter);
export default app;
