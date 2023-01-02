"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const postgres_1 = require("../../../config/sql/postgres");
const sequelize_1 = require("sequelize");
/** ~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Association Models ~~~~~~~~~~~~~~~~~~~~~~~~~~~~  **/
const PType_models_1 = __importDefault(require("./PType.models"));
const Address_model_1 = __importDefault(require("../usersModel/Address.model"));
const User_model_1 = __importDefault(require("../usersModel/User.model"));
const PFavorite_models_1 = __importDefault(require("./PFavorite.models"));
const SaleProduct_models_1 = __importDefault(require("./SaleProduct.models"));
const repuProduct_model_1 = __importDefault(require("../reputationModel/repuProduct.model"));
const comment_model_1 = __importDefault(require("../commentsModel/comment.model"));
const ImageProd_model_1 = __importDefault(require("../imagesModel/ImageProd.model"));
const PCategory_models_1 = __importDefault(require("./PCategory.models"));
/**~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ **/
const Product = postgres_1.sequelize.define("product", {
    product_id: {
        type: sequelize_1.DataTypes.STRING,
        primaryKey: true,
    },
    pt_id: {
        //type product id
        type: sequelize_1.DataTypes.STRING,
    },
    user_id: {
        type: sequelize_1.DataTypes.STRING,
    },
    product_name: {
        type: sequelize_1.DataTypes.STRING,
    },
    product_brand: {
        type: sequelize_1.DataTypes.STRING,
    },
    product_price: {
        type: sequelize_1.DataTypes.INTEGER,
    },
    product_stock: {
        type: sequelize_1.DataTypes.INTEGER,
    },
    product_offer: {
        type: sequelize_1.DataTypes.INTEGER,
        defaultValue: 0,
    },
    product_description: {
        type: sequelize_1.DataTypes.TEXT(),
    },
    product_status: {
        type: sequelize_1.DataTypes.STRING,
    },
    product_views: {
        type: sequelize_1.DataTypes.INTEGER,
        defaultValue: 0,
    },
    product_sales: {
        type: sequelize_1.DataTypes.INTEGER,
        defaultValue: 0,
    },
    product_warranty: {
        type: sequelize_1.DataTypes.INTEGER,
    },
    address_id: {
        type: sequelize_1.DataTypes.STRING,
    },
    pc_id: {
        type: sequelize_1.DataTypes.STRING,
    },
    product_condition: {
        type: sequelize_1.DataTypes.STRING,
        defaultValue: "active",
    },
}, { timestamps: true, freezeTableName: true });
/** =========================  ASSOCIATIONS  ==========================  **/
//Type:
PType_models_1.default.hasMany(Product, {
    foreignKey: "pt_id",
    sourceKey: "pt_id",
});
Product.belongsTo(PType_models_1.default, {
    foreignKey: "pt_id",
    targetKey: "pt_id",
});
// Category product:
PCategory_models_1.default.hasMany(Product, {
    foreignKey: "pc_id",
});
Product.belongsTo(PCategory_models_1.default, {
    foreignKey: "pc_id",
});
//Address:
Product.hasOne(Address_model_1.default, {
    foreignKey: "address_id",
    sourceKey: "address_id",
});
Address_model_1.default.belongsTo(Product, {
    foreignKey: "address_id",
    targetKey: "address_id",
});
//User (Seller):
Product.hasOne(User_model_1.default, {
    foreignKey: "user_id",
    sourceKey: "user_id",
});
User_model_1.default.belongsTo(Product, {
    foreignKey: "user_id",
    targetKey: "user_id",
});
//Favorites:
Product.hasMany(PFavorite_models_1.default, {
    foreignKey: "product_id",
    sourceKey: "product_id",
});
PFavorite_models_1.default.belongsTo(Product, {
    foreignKey: "product_id",
    targetKey: "product_id",
});
//Sale Products:
Product.hasMany(SaleProduct_models_1.default, {
    foreignKey: "product_id",
});
SaleProduct_models_1.default.belongsTo(Product, {
    foreignKey: "product_id",
});
// Reputation product:
Product.hasMany(repuProduct_model_1.default, {
    foreignKey: "product_id",
});
repuProduct_model_1.default.belongsTo(Product, {
    foreignKey: "product_id",
});
//Comments:
Product.hasMany(comment_model_1.default, {
    foreignKey: "product_id",
});
comment_model_1.default.belongsTo(Product, {
    foreignKey: "product_id",
});
//Image:
Product.hasMany(ImageProd_model_1.default, {
    foreignKey: "product_id",
});
ImageProd_model_1.default.belongsTo(Product, {
    foreignKey: "product_id",
});
/**=====================================================================**/
exports.default = Product;
