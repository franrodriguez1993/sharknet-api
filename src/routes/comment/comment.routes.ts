import { Router } from "express";

//Controllers:
import {
  commentProductCtrl,
  delCommentCtrl,
  listCommentCtrl,
  replyCommentCtrl,
} from "../../controllers/comment/comment.ctrl";
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//

//middleware:
import { requireToken } from "../../middlewares/requireToken";
import { validatorComment } from "../../middlewares/validatorManager";

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
const router = Router();
//create:
router.post("/create", requireToken, validatorComment, commentProductCtrl);
router.post("/reply", requireToken, validatorComment, replyCommentCtrl);
//List:
router.get("/list/:id", listCommentCtrl);
//Delete (admin)
router.delete("/del/:id", requireToken, delCommentCtrl);

export { router };
