"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const serverConfigurations = {
    server: {
        port: process.env.PORT || 5000,
        mode: process.env.MODE,
        url_api: process.env.URL_API || "http://localhost:",
        jwt_secret: process.env.JWT_SECRET,
        jwt_refresh_secret: process.env.JWT_REFRESH,
        jwt_expiration: process.env.JWT_EXPIRATION || "3h",
        jwt_refresh_expiration: process.env.JWT_REFRESH_EXPIRATION || "5d",
    },
    postgres: {
        host: process.env.MODE === "P"
            ? process.env.POSTGRES_HOST
            : process.env.POSTGRES_HOST_DEV,
        db: process.env.MODE === "P"
            ? process.env.POSTGRES_DB
            : process.env.POSTGRES_DB_DEV,
        username: process.env.MODE === "P"
            ? process.env.POSTGRES_USERNAME
            : process.env.POSTGRES_USERNAME_DEV,
        password: process.env.MODE === "P"
            ? process.env.POSTGRES_PASSWORD
            : process.env.POSTGRES_PASSWORD_DEV,
    },
    cors: {
        first: process.env.CORS_URL1,
        second: process.env.CORS_URL2,
    },
    google: {
        client_id: process.env.CLIENT_ID,
        client_secret: process.env.CLIENT_SECRET,
        redirect_uri: process.env.REDIRECT_URI,
        refresh_token: process.env.REFRESH_TOKEN_GD,
        folders: {
            products: process.env.GD_FOLDER_PRODUCTS,
            users: process.env.GD_FOLDER_USERS,
        },
    },
    imageKit: {
        publicKey: process.env.IK_PUBLIC_KEY,
        privateKey: process.env.IK_PRIVATE_KEY,
        urlEndPoing: process.env.IK_URL_ENDPOINT,
    },
};
exports.default = serverConfigurations;
