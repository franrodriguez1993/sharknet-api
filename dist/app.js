"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const configServer_1 = __importDefault(require("./config/configServer"));
/** ------ ROUTES ------  **/
const user_1 = require("./routes/user");
const product_1 = require("./routes/product");
const reputation_1 = require("./routes/reputation");
const comment_1 = require("./routes/comment");
const imgRoute_1 = require("./routes/imgRoute");
const superuser_1 = require("./routes/superuser");
const notification_1 = require("./routes/notification");
const app = (0, express_1.default)();
/** =========================  CORS  ==========================  **/
const urlList = [
    configServer_1.default.cors.first,
    configServer_1.default.cors.second,
];
const corsOptions = {
    credentials: true,
    origin: function (origin, callback) {
        if (!origin) {
            //for bypassing postman req with  no origin
            return callback(null, true);
        }
        if (urlList.indexOf(origin) !== -1) {
            callback(null, true);
        }
        else {
            callback(new Error("Not allowed by CORS"));
        }
    },
};
app.use((0, cors_1.default)(corsOptions));
app.use(express_1.default.json());
/** =========================  ROUTER  ==========================  **/
app.use(user_1.userRouters);
app.use(product_1.productRouters);
app.use(reputation_1.reputationRouters);
app.use(comment_1.commentRouter);
app.use(imgRoute_1.imageRouters);
app.use(superuser_1.superRouters);
app.use(notification_1.notificationtRouters);
exports.default = app;
