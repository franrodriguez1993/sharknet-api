//Service:
import { Request, Response } from "express";
import { RequestExt } from "../../interfaces/userInterface/ReqExt.interface";
import {
  commentProductServ,
  delCommentServ,
  listCommentServ,
  replyCommentServ,
} from "../../services/comment/comment.serv";

/** ===========================  COMMENT PRODUCT ================================**/
export async function commentProductCtrl(req: RequestExt, res: Response) {
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
    const comment = await commentProductServ(tokenID, data);

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
    return res.status(500).json({ status: 500, msg: e.message });
  }
}
/** ===========================  REPLY COMMENT  ================================**/
export async function replyCommentCtrl(req: RequestExt, res: Response) {
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
    const comment = await replyCommentServ(req.uid, data);

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
    return res.status(500).json({ status: 500, msg: e.message });
  }
}

/** ===========================  LIST COMMENT ================================**/
export async function listCommentCtrl(req: Request, res: Response) {
  try {
    //Data:
    const { id } = req.params;
    // query parameters:
    const page: number = parseInt(req.query.page as string);
    const size: number = parseInt(req.query.size as string);

    //Service:
    const list = await listCommentServ(id, page, size);

    //Return:
    if (!list)
      return res.status(500).json({ status: 500, msg: "SERVER_ERROR" });
    else if (list === "PRODUCT_NOT_FOUND")
      return res.status(404).json({ status: 404, msg: list });

    //Ok:
    return res.json({ status: 200, msg: "OK", data: list });
  } catch (e: any) {
    return res.status(500).json({ status: 500, msg: e.message });
  }
}
/** ===========================  DELETE COMMENT ================================**/
export async function delCommentCtrl(req: Request, res: Response) {
  try {
    //Data:
    const { id } = req.params;

    //Service:
    const del = await delCommentServ(id);

    //Return:
    return res.json({ status: 200, msg: "OK", data: del });
  } catch (e: any) {
    return res.status(500).json({ status: 500, msg: e.message });
  }
}
