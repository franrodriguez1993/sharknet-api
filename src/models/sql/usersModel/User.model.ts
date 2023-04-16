import { sequelize } from "../../../config/sql/postgres";
import { DataTypes, Model, BuildOptions } from "sequelize";
import { userObjectIF } from "../../../interfaces/userInterface/user.interface";

/**  ==================== ASSOCIATION MODELS =========================  **/
import Birthday from "./Birthday.model";
import Rol from "./Rol.model";
import Address from "./Address.model";
import ProductFavorite from "../productsModel/PFavorite.models";
import Sale from "../productsModel/Sale.model";
import Comment from "../commentsModel/comment.model";
import NotificationUser from "../notificationModel/Notification.model";
import ActivityLogUser from "../activityLogs/ALogUser.model";
/**=====================================================================**/

type userTypeModel = typeof Model & {
  new (values?: object, options?: BuildOptions): userObjectIF;
};

const User = sequelize.define(
  "user",
  {
    user_id: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    user_name: {
      type: DataTypes.STRING(40),
    },
    user_lastname: {
      type: DataTypes.STRING(40),
    },
    user_username: {
      type: DataTypes.STRING(40),
    },
    user_mail: {
      type: DataTypes.STRING(40),
      allowNull: false,
    },
    user_password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    user_dni: {
      type: DataTypes.INTEGER,
    },
    user_phone: {
      type: DataTypes.STRING,
    },
    rol_id: {
      type: DataTypes.STRING,
    },
    user_status: {
      type: DataTypes.STRING,
      defaultValue: "active",
    },
    user_image: {
      type: DataTypes.STRING,
    },
  },
  { freezeTableName: true, timestamps: true }
) as userTypeModel;

/** =========================  ASSOCIATIONS  ==========================  **/
//Birthday:
User.hasOne(Birthday, {
  foreignKey: "user_id",
  sourceKey: "user_id",
});
Birthday.belongsTo(User, {
  foreignKey: "user_id",
  targetKey: "user_id",
});
//Rol:
User.hasOne(Rol, {
  foreignKey: "rol_id",
  sourceKey: "rol_id",
});
Rol.belongsTo(User, {
  foreignKey: "rol_id",
  targetKey: "rol_id",
});
//Adress:
User.hasMany(Address, {
  foreignKey: "user_id",
  sourceKey: "user_id",
});
Address.belongsTo(User, {
  foreignKey: "user_id",
  targetKey: "user_id",
});

//Favorites:
User.hasMany(ProductFavorite, {
  foreignKey: "user_id",
  sourceKey: "user_id",
});
ProductFavorite.belongsTo(User, {
  foreignKey: "user_id",
  targetKey: "user_id",
});
//Sale - buyer:
User.hasMany(Sale, {
  as: "buyer",
  foreignKey: "sale_buyer",
});
Sale.belongsTo(User, {
  as: "buyer",
  foreignKey: "sale_buyer",
});

//Comment:
User.hasMany(Comment, {
  foreignKey: "user_id",
});
Comment.belongsTo(User, {
  foreignKey: "user_id",
});

//ALog User:
User.hasMany(ActivityLogUser, {
  foreignKey: "user_id",
});
ActivityLogUser.belongsTo(User, {
  foreignKey: "user_id",
});
//Notifications:
User.hasMany(NotificationUser, {
  foreignKey: "user_id",
});
NotificationUser.belongsTo(User, {
  foreignKey: "user_id",
});
/**=====================================================================**/

export default User;
