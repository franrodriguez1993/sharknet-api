import { Router } from "express";

//Controllers:
import commentController from "../../controllers/comment/comment.ctrl";

const controller = new commentController();
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//

//middleware:
import { requireToken } from "../../middlewares/requireToken";
import { validatorComment } from "../../middlewares/validatorManager";

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
const router = Router();
//create:
router.post(
  "/create",
  requireToken,
  validatorComment,
  controller.commentProductCtrl
);
router.post(
  "/reply",
  requireToken,
  validatorComment,
  controller.replyCommentCtrl
);
//List:
router.get("/list/:id", controller.listCommentCtrl);
//Delete (admin)
router.delete("/del/:id", requireToken, controller.delCommentCtrl);

export { router };
