import { sequelize } from "../../../config/sql/postgres";
import { DataTypes } from "sequelize";

/** ~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Association Models ~~~~~~~~~~~~~~~~~~~~~~~~~~~~  **/
import ProductTypes from "./PType.models";
import Adress from "../usersModel/Address.model";
import User from "../usersModel/User.model";
import ProductFavorite from "./PFavorite.models";
import SaleProducts from "./SaleProduct.models";
import ProductReputation from "../reputationModel/repuProduct.model";
import Comment from "../commentsModel/comment.model";
import ImageProduct from "../imagesModel/ImageProd.model";
import ProductCategory from "./PCategory.models";
import NotificationUser from "../notificationModel/Notification.model";
/**~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ **/
const Product = sequelize.define(
  "product",
  {
    product_id: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    pt_id: {
      //type product id
      type: DataTypes.STRING,
    },
    user_id: {
      type: DataTypes.STRING,
    },
    product_name: {
      type: DataTypes.STRING,
    },
    product_brand: {
      type: DataTypes.STRING,
    },
    product_price: {
      type: DataTypes.INTEGER,
    },
    product_stock: {
      type: DataTypes.INTEGER,
    },
    product_offer: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    product_description: {
      type: DataTypes.TEXT(),
    },
    product_status: {
      type: DataTypes.STRING,
    },
    product_thumbnail: {
      type: DataTypes.STRING,
    },
    product_views: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    product_sales: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    product_warranty: {
      type: DataTypes.INTEGER,
    },
    address_id: {
      type: DataTypes.STRING,
    },
    pc_id: {
      type: DataTypes.STRING,
    },
    product_condition: {
      type: DataTypes.STRING,
      defaultValue: "active",
    },
  },
  { timestamps: true, freezeTableName: true }
);

/** =========================  ASSOCIATIONS  ==========================  **/
//Type:
ProductTypes.hasMany(Product, {
  foreignKey: "pt_id",
  sourceKey: "pt_id",
});
Product.belongsTo(ProductTypes, {
  foreignKey: "pt_id",
  targetKey: "pt_id",
});
// Category product:
ProductCategory.hasMany(Product, {
  foreignKey: "pc_id",
});
Product.belongsTo(ProductCategory, {
  foreignKey: "pc_id",
});
//Address:
Product.hasOne(Adress, {
  foreignKey: "address_id",
  sourceKey: "address_id",
});
Adress.belongsTo(Product, {
  foreignKey: "address_id",
  targetKey: "address_id",
});
//User (Seller):
Product.hasOne(User, {
  foreignKey: "user_id",
  sourceKey: "user_id",
});
User.belongsTo(Product, {
  foreignKey: "user_id",
  targetKey: "user_id",
});
//Favorites:
Product.hasMany(ProductFavorite, {
  foreignKey: "product_id",
  sourceKey: "product_id",
});
ProductFavorite.belongsTo(Product, {
  foreignKey: "product_id",
  targetKey: "product_id",
});
//Sale Products:
Product.hasMany(SaleProducts, {
  foreignKey: "product_id",
});
SaleProducts.belongsTo(Product, {
  foreignKey: "product_id",
});
// Reputation product:
Product.hasMany(ProductReputation, {
  foreignKey: "product_id",
});
ProductReputation.belongsTo(Product, {
  foreignKey: "product_id",
});
//Comments:
Product.hasMany(Comment, {
  foreignKey: "product_id",
});
Comment.belongsTo(Product, {
  foreignKey: "product_id",
});
//Image:
Product.hasMany(ImageProduct, {
  foreignKey: "product_id",
});
ImageProduct.belongsTo(Product, {
  foreignKey: "product_id",
});
Product.hasMany(NotificationUser, {
  foreignKey: "product_id",
  sourceKey: "product_id",
});
NotificationUser.belongsTo(Product, {
  foreignKey: "product_id",
  targetKey: "product_id",
});
/**=====================================================================**/
export default Product;
