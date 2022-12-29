import { sequelize } from "../../../config/sql/postgres";
import { DataTypes } from "sequelize";

const Comment = sequelize.define(
  "comment",
  {
    comment_id: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    product_id: {
      type: DataTypes.STRING,
    },
    user_id: {
      type: DataTypes.STRING,
    },
    comment_body: {
      type: DataTypes.STRING,
    },
    comment_reply: {
      type: DataTypes.STRING,
    },
    comment_parent: {
      type: DataTypes.BOOLEAN,
    },
  },
  { timestamps: true, freezeTableName: true }
);
/** =========================  ASSOCIATIONS  ==========================  **/
Comment.hasMany(Comment, {
  foreignKey: "comment_reply",
});
Comment.belongsTo(Comment, {
  foreignKey: "comment_reply",
});
/**=====================================================================**/
export default Comment;
