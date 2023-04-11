import { sequelize } from "../../../config/sql/postgres";
import { DataTypes, Model, BuildOptions } from "sequelize";
import { commentObjectIF } from "../../../interfaces/commentInterface/comment.interface";

type commentTypeModel = typeof Model & {
  new (values?: object, options?: BuildOptions): commentObjectIF;
};

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
) as commentTypeModel;
/** =========================  ASSOCIATIONS  ==========================  **/
Comment.hasMany(Comment, {
  foreignKey: "comment_reply",
});
Comment.belongsTo(Comment, {
  foreignKey: "comment_reply",
});
/**=====================================================================**/
export default Comment;
