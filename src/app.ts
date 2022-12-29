import cors from "cors";
import express from "express";
import { userRouters } from "./routes/user";
import { productRouters } from "./routes/product";
import { reputationRouters } from "./routes/reputation";
import { commentRouter } from "./routes/comment";
import { imageRouters } from "./routes/imgRoute";
import { superRouters } from "./routes/superuser";
import { notificationtRouters } from "./routes/notification";
const app = express();

const whitelist = ["http://localhost:3000"];
const corsOptions = {
  credentials: true,
  origin: function (origin: any, callback: any) {
    if (!origin) {
      //for bypassing postman req with  no origin
      return callback(null, true);
    }
    if (whitelist.indexOf(origin) !== -1) {
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
app.use(reputationRouters);
app.use(commentRouter);
app.use(imageRouters);
app.use(superRouters);
app.use(notificationtRouters);
export default app;
