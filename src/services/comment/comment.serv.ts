//uuid:
import { v4 as uuidv4 } from "uuid";

//DAOs:
import {
  daoComment,
  daoUser,
  daoProduct,
  daoNotification,
} from "../../containers";

//Interfaces:
import {
  commentBodyIF,
  commentObjectIF,
} from "../../interfaces/commentInterface/comment.interface";
import { productObjectIF } from "../../interfaces/productInterface/product.interface";
import { ReqTokenDataInterface } from "../../interfaces/userInterface/reqTokenData.interface";

export default class commentService {
  /** ===============  COMMENT PRODUCT ===============**/

  async commentProductServ(
    tokenUID: ReqTokenDataInterface,
    data: commentBodyIF
  ) {
    //Check authorization:
    if (
      tokenUID.uid.toString() !== data.user_id.toString() ||
      tokenUID.rol.toString() !== "user"
    )
      return "UNAUTHORIZED_ACTION";
    //CheckUser:
    const user = await daoUser.getUser("id", data.user_id, true);
    if (!user) return "USER_NOT_FOUND";

    //Check product:
    const product: productObjectIF = await daoProduct.getProduct(
      data.product_id,
      true
    );
    if (!product) return "PRODUCT_NOT_FOUND";

    //Check seller:
    if (data.user_id.toString() === product.user_id.toString())
      return "USER_IS_SELLER";

    //Check if is reply:
    if (data.comment_reply || data.comment_parent === false)
      return "COMMENT_IS_REPLY";

    //create:
    const comment_id = uuidv4();
    const comment = await daoComment.createComment({ ...data, comment_id });

    if (comment) {
      //Create user notification:
      await daoNotification.createNotification({
        user_id: product.user_id,
        product_id: data.product_id,
        notification_type: "NEW_COMMENT",
      });
      return comment;
    }
  }

  /** ===============  REPLY COMMENT =================**/

  async replyCommentServ(tokenUID: string, data: commentBodyIF) {
    //Check authorization:
    if (tokenUID.toString() !== data.user_id.toString())
      return "UNAUTHORIZED_ACTION";

    //CheckUser:
    const user = await daoUser.getUser("id", data.user_id, true);
    if (!user) return "USER_NOT_FOUND";

    //Check product:
    const product: productObjectIF = await daoProduct.getProduct(
      data.product_id,
      true
    );
    if (!product) return "PRODUCT_NOT_FOUND";

    //Check seller:
    if (data.user_id.toString() !== product.user_id.toString())
      return "USER_ISNT_SELLER";

    //Check comment:
    const comment: commentObjectIF = await daoComment.getComment(
      data.comment_reply
    );
    if (!comment) return "COMMENT_NOT_FOUND";

    //Check if is reply:
    if (!data.comment_reply || data.comment_parent === true)
      return "COMMENT_ISNT_REPLY";

    //Check if has been already replied:
    const replied = await daoComment.checkReply(
      data.comment_reply,
      data.user_id
    );
    if (replied) return "COMMENT_ALREADY_REPLIED";

    //Create:
    const comment_id = uuidv4();
    const replyComment = await daoComment.createComment({
      ...data,
      comment_id,
    });

    if (replyComment) {
      await daoNotification.createNotification({
        user_id: comment.user_id,
        notification_type: "RESPONSE_RECEIVED",
        product_id: data.product_id,
      });
      return replyComment;
    }
  }

  /** ====================  LIST COMMENT =====================**/

  async listCommentServ(product_id: string, page: number, size: number) {
    const product = await daoProduct.getProduct(product_id, true);
    if (!product) return "PRODUCT_NOT_FOUND";
    return await daoComment.listComment(product_id, page, size);
  }

  /** ===============  GET COMMENT BY ID ===============**/
  async getCommentByIDServ(comment_id: string) {
    const comment = await daoComment.getCommentByID(comment_id);
    if (!comment) return "COMMENT_NOT_FOUND";
    return comment;
  }

  /** ==================  DELETE COMMENT ====================**/
  async delCommentServ(comment_id: string) {
    return await daoComment.deleteComment(comment_id);
  }
}
