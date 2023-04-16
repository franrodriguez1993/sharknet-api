"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const postgres_1 = require("../../../config/sql/postgres");
const sequelize_1 = require("sequelize");
/**  ==================== ASSOCIATION MODELS =========================  **/
const Birthday_model_1 = __importDefault(require("./Birthday.model"));
const Rol_model_1 = __importDefault(require("./Rol.model"));
const Address_model_1 = __importDefault(require("./Address.model"));
const PFavorite_models_1 = __importDefault(require("../productsModel/PFavorite.models"));
const Sale_model_1 = __importDefault(require("../productsModel/Sale.model"));
const comment_model_1 = __importDefault(require("../commentsModel/comment.model"));
const Notification_model_1 = __importDefault(require("../notificationModel/Notification.model"));
const ALogUser_model_1 = __importDefault(require("../activityLogs/ALogUser.model"));
const User = postgres_1.sequelize.define("user", {
    user_id: {
        type: sequelize_1.DataTypes.STRING,
        primaryKey: true,
    },
    user_name: {
        type: sequelize_1.DataTypes.STRING(40),
    },
    user_lastname: {
        type: sequelize_1.DataTypes.STRING(40),
    },
    user_username: {
        type: sequelize_1.DataTypes.STRING(40),
    },
    user_mail: {
        type: sequelize_1.DataTypes.STRING(40),
        allowNull: false,
    },
    user_password: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    user_dni: {
        type: sequelize_1.DataTypes.INTEGER,
    },
    user_phone: {
        type: sequelize_1.DataTypes.STRING,
    },
    rol_id: {
        type: sequelize_1.DataTypes.STRING,
    },
    user_status: {
        type: sequelize_1.DataTypes.STRING,
        defaultValue: "active",
    },
    user_image: {
        type: sequelize_1.DataTypes.STRING,
    },
}, { freezeTableName: true, timestamps: true });
/** =========================  ASSOCIATIONS  ==========================  **/
//Birthday:
User.hasOne(Birthday_model_1.default, {
    foreignKey: "user_id",
    sourceKey: "user_id",
});
Birthday_model_1.default.belongsTo(User, {
    foreignKey: "user_id",
    targetKey: "user_id",
});
//Rol:
User.hasOne(Rol_model_1.default, {
    foreignKey: "rol_id",
    sourceKey: "rol_id",
});
Rol_model_1.default.belongsTo(User, {
    foreignKey: "rol_id",
    targetKey: "rol_id",
});
//Adress:
User.hasMany(Address_model_1.default, {
    foreignKey: "user_id",
    sourceKey: "user_id",
});
Address_model_1.default.belongsTo(User, {
    foreignKey: "user_id",
    targetKey: "user_id",
});
//Favorites:
User.hasMany(PFavorite_models_1.default, {
    foreignKey: "user_id",
    sourceKey: "user_id",
});
PFavorite_models_1.default.belongsTo(User, {
    foreignKey: "user_id",
    targetKey: "user_id",
});
//Sale - buyer:
User.hasMany(Sale_model_1.default, {
    as: "buyer",
    foreignKey: "sale_buyer",
});
Sale_model_1.default.belongsTo(User, {
    as: "buyer",
    foreignKey: "sale_buyer",
});
//Comment:
User.hasMany(comment_model_1.default, {
    foreignKey: "user_id",
});
comment_model_1.default.belongsTo(User, {
    foreignKey: "user_id",
});
//ALog User:
User.hasMany(ALogUser_model_1.default, {
    foreignKey: "user_id",
});
ALogUser_model_1.default.belongsTo(User, {
    foreignKey: "user_id",
});
//Notifications:
User.hasMany(Notification_model_1.default, {
    foreignKey: "user_id",
});
Notification_model_1.default.belongsTo(User, {
    foreignKey: "user_id",
});
/**=====================================================================**/
exports.default = User;
