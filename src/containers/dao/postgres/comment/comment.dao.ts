import basecontainer from "../../../base/base.container";
import Comment from "../../../../models/sql/commentsModel/comment.model";
import { commentInterface } from "../../../../interfaces/commentInterface/comment.interface";
import User from "../../../../models/sql/usersModel/User.model";

import {
  getPagination,
  getPaginationComment,
} from "../../../../utils/paginationfunction";
export class daoCommentSQL extends basecontainer {
  constructor() {
    super(Comment);
  }
  /** --------------- COMMENT PRODUCT --------------- **/
  async createComment(data: commentInterface) {
    try {
      return await Comment.create({
        comment_id: data.comment_id,
        product_id: data.product_id,
        user_id: data.user_id,
        comment_body: data.comment_body,
        comment_reply: data.comment_reply,
        comment_parent: data.comment_parent,
      });
    } catch (e: any) {
      throw new Error(e.message);
    }
  }

  /** --------------- GET COMMENT --------------- **/
  async getComment(comment_id: string) {
    try {
      return await Comment.findOne({ where: { comment_id } });
    } catch (e: any) {
      throw new Error(e.message);
    }
  }
  /** --------------- CHECK REPLY --------------- **/
  //Function to check if the comments has been already replied for the seller
  async checkReply(comment_reply: string, user_id: string) {
    try {
      return await Comment.findOne({ where: { comment_reply, user_id } });
    } catch (e: any) {
      throw new Error(e.message);
    }
  }

  /** --------------- LIST COMMENTS --------------- **/
  async listComment(product_id: string, page: number = 0, size: number = 0) {
    try {
      const { limit, offset } = getPagination(page, size);
      const data = await Comment.findAndCountAll({
        where: { product_id, comment_parent: true },
        limit,
        offset,
        order: [["createdAt", "DESC"]],
        attributes: { exclude: ["user_id", "product_id"] },
        include: [
          {
            model: User,
            attributes: ["user_username", "user_name", "user_lastname"],
          },
          {
            model: Comment,
            include: [
              {
                model: User,
                attributes: ["user_username", "user_name", "user_lastname"],
              },
            ],
          },
        ],
      });
      if (data) {
        return getPaginationComment(data, page, limit);
      }
    } catch (e: any) {
      throw new Error(e.message);
    }
  }

  /** --------------- GET COMMENT BY ID --------------- **/
  async getCommentByID(comment_id: string) {
    try {
      return await Comment.findOne({
        where: { comment_id },
        include: [
          {
            model: User,
            attributes: ["user_username", "user_name", "user_lastname"],
          },
          {
            model: Comment,
            include: [
              {
                model: User,
                attributes: ["user_username", "user_name", "user_lastname"],
              },
            ],
          },
        ],
      });
    } catch (e: any) {
      throw new Error(e.message);
    }
  }

  /** --------------- DELETE COMMENTS --------------- **/
  async deleteComment(comment_id: string) {
    try {
      return await Comment.destroy({ where: { comment_id } });
    } catch (e: any) {
      throw new Error(e.message);
    }
  }
}
