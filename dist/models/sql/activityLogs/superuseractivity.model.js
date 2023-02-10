"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const postgres_1 = require("../../../config/sql/postgres");
const sequelize_1 = require("sequelize");
/** --------- Association models --------- **/
const ALogUser_model_1 = __importDefault(require("./ALogUser.model"));
const User_model_1 = __importDefault(require("../usersModel/User.model"));
/** ---------------------------------------**/
const SuperuserActivity = postgres_1.sequelize.define("superuser_activity", {
    sa_id: {
        type: sequelize_1.DataTypes.STRING,
        primaryKey: true,
    },
    su_rol: {
        type: sequelize_1.DataTypes.STRING,
    },
    user_id: {
        type: sequelize_1.DataTypes.STRING,
    },
    activity_event: {
        type: sequelize_1.DataTypes.STRING,
    },
}, { timestamps: true, freezeTableName: true });
/** --------------- assosiations --------------- **/
//Actions with users:
ALogUser_model_1.default.hasOne(SuperuserActivity, {
    foreignKey: "activity_event",
    as: "action",
});
SuperuserActivity.belongsTo(ALogUser_model_1.default, {
    foreignKey: "activity_event",
    as: "action",
});
//User target:
SuperuserActivity.hasOne(User_model_1.default, {
    foreignKey: "user_id",
});
User_model_1.default.belongsTo(SuperuserActivity, { foreignKey: "user_id" });
exports.default = SuperuserActivity;
