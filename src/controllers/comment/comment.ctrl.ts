import { Request, Response } from "express";
import logger from "../../utils/logger";
//Service:
import commentService from "../../services/comment/comment.serv";
const service = new commentService();
//Interface:
import { RequestExt } from "../../interfaces/userInterface/ReqExt.interface";

export default class commentController {
  /** =================  COMMENT PRODUCT ==================**/

  async commentProductCtrl(req: RequestExt, res: Response) {
    try {
      //Data:
      const data = {
        product_id: req.body.product,
        user_id: req.body.user,
        comment_body: req.body.body,
        comment_reply: req.body.reply,
        comment_parent: req.body.parent,
      };
      const tokenID = { uid: req.uid, rol: req.rol };
      //Service:
      const comment = await service.commentProductServ(tokenID, data);

      //Return:
      if (!comment)
        return res.status(500).json({ status: 500, msg: "SERVER_ERROR" });
      else if (comment === "PRODUCT_NOT_FOUND" || comment === "USER_NOT_FOUND")
        return res.status(404).json({ status: 404, msg: comment });
      else if (comment === "COMMENT_IS_REPLY" || comment === "USER_IS_SELLER")
        return res.status(400).json({ status: 400, msg: comment });
      else if (comment === "UNAUTHORIZED_ACTION")
        return res.status(401).json({ status: 401, msg: comment });
      //Ok:
      return res.json({ status: 201, msg: "COMMENT_CREATED" });
    } catch (e: any) {
      logger.error(e.message);
      return res.status(500).json({ status: 500, msg: e.message });
    }
  }
  /** =================  REPLY COMMENT  ====================**/
  async replyCommentCtrl(req: RequestExt, res: Response) {
    try {
      //data:
      const data = {
        product_id: req.body.product,
        user_id: req.body.user,
        comment_body: req.body.body,
        comment_reply: req.body.reply,
        comment_parent: req.body.parent,
      };

      //Service:
      const comment = await service.replyCommentServ(req.uid, data);

      //Return:
      if (!comment)
        return res.status(500).json({ status: 500, msg: "SERVER_ERROR" });
      else if (
        comment === "PRODUCT_NOT_FOUND" ||
        comment === "USER_NOT_FOUND" ||
        comment === "COMMENT_NOT_FOUND"
      )
        return res.status(404).json({ status: 404, msg: comment });
      else if (
        comment === "COMMENT_ISNT_REPLY" ||
        comment === "USER_ISNT_SELLER" ||
        comment === "COMMENT_ALREADY_REPLIED"
      )
        return res.status(400).json({ status: 400, msg: comment });
      else if (comment === "UNAUTHORIZED_ACTION")
        return res.status(401).json({ status: 401, msg: comment });

      //Ok:
      return res.json({ status: 201, msg: "REPLY_CREATED" });
    } catch (e: any) {
      logger.error(e.message);
      return res.status(500).json({ status: 500, msg: e.message });
    }
  }

  /** ===============  LIST COMMENT ==============**/

  async listCommentCtrl(req: Request, res: Response) {
    try {
      //Data:
      const { id } = req.params;
      // query parameters:
      const page: number = parseInt(req.query.page as string);
      const size: number = parseInt(req.query.size as string);

      //Service:
      const list = await service.listCommentServ(id, page, size);

      //Return:
      if (!list)
        return res.status(500).json({ status: 500, msg: "SERVER_ERROR" });
      else if (list === "PRODUCT_NOT_FOUND")
        return res.status(404).json({ status: 404, msg: list });

      //Ok:
      return res.json({ status: 200, msg: "OK", data: list });
    } catch (e: any) {
      logger.error(e.message);
      return res.status(500).json({ status: 500, msg: e.message });
    }
  }

  /** ===========  GET COMMENT BY ID ==============**/
  async getCommentByIdCtrl(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const comment = await service.getCommentByIDServ(id);

      if (comment === "COMMENT_NOT_FOUND") {
        return res.status(404).json({ status: 404, msg: comment });
      } else {
        return res.json({ status: 200, msg: "OK", data: comment });
      }
    } catch (e: any) {
      logger.error(e.message);
      return res.status(500).json({ status: 500, msg: e.message });
    }
  }

  /** ===========  DELETE COMMENT ==============**/
  async delCommentCtrl(req: Request, res: Response) {
    try {
      //Data:
      const { id } = req.params;

      //Service:
      const del = await service.delCommentServ(id);

      //Return:
      return res.json({ status: 200, msg: "OK", data: del });
    } catch (e: any) {
      logger.error(e.message);
      return res.status(500).json({ status: 500, msg: e.message });
    }
  }
}
