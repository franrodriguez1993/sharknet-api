"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const postgres_1 = require("../../../config/sql/postgres");
const sequelize_1 = require("sequelize");
const Comment = postgres_1.sequelize.define("comment", {
    comment_id: {
        type: sequelize_1.DataTypes.STRING,
        primaryKey: true,
    },
    product_id: {
        type: sequelize_1.DataTypes.STRING,
    },
    user_id: {
        type: sequelize_1.DataTypes.STRING,
    },
    comment_body: {
        type: sequelize_1.DataTypes.STRING,
    },
    comment_reply: {
        type: sequelize_1.DataTypes.STRING,
    },
    comment_parent: {
        type: sequelize_1.DataTypes.BOOLEAN,
    },
}, { timestamps: true, freezeTableName: true });
/** =========================  ASSOCIATIONS  ==========================  **/
Comment.hasMany(Comment, {
    foreignKey: "comment_reply",
});
Comment.belongsTo(Comment, {
    foreignKey: "comment_reply",
});
/**=====================================================================**/
exports.default = Comment;
