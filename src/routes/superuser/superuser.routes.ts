import { Router } from "express";

// ~~~~~~~~~~~~~~~~~~~~~~~~ Controllers ~~~~~~~~~~~~~~~~~~~~~~~~
//Staff:
import {
  deleteUserCtrl,
  suspendUserCtrl,
  unverifyUserCtrl,
  verifyUserCtrl,
  reactiveUserCtrl,
} from "../../controllers/superuser/staff.ctrl";
//Admin:
import {
  staffUpgradeCtrl,
  staffDowngradeCtrl,
  adminUpgradeCtrl,
  adminDowngradeCtrl,
  adminDeleteUserCtrl,
  adminSuspendUserCtrl,
  adminReactiveUserCtrl,
  listLogActivityCtrl,
  listSuperuserCtrl,
} from "../../controllers/superuser/admin.ctrl";

//Middlewares:
import { requireToken } from "../../middlewares/requireToken";
import { requireStaff } from "../../middlewares/requireStaff";
import { requireAdmin } from "../../middlewares/requireAdmin";
const router = Router();

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Routes ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

/** STAFF ROUTES **/
//(verify user)
router.put("/staff/verify/:id", requireToken, requireStaff, verifyUserCtrl);
//(unverify user)
router.put("/staff/unverify/:id", requireToken, requireStaff, unverifyUserCtrl);
//(delete user)
router.delete("/staff/del/:id", requireToken, requireStaff, deleteUserCtrl);
//(suspend user)
router.put("/staff/suspend/:id", requireToken, requireStaff, suspendUserCtrl);
//(reactive user)
router.put("/staff/reactive/:id", requireToken, requireStaff, reactiveUserCtrl);
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

/** ADMIN ROUTES **/
//(make staff)
router.put(
  "/admin/upgrade/staff/:id",
  requireToken,
  requireAdmin,
  staffUpgradeCtrl
);
//(downgrade staff)
router.put(
  "/admin/downgrade/staff/:id",
  requireToken,
  requireAdmin,
  staffDowngradeCtrl
);
//(make admin)
router.put(
  "/admin/upgrade/admin/:id",
  requireToken,
  requireAdmin,
  adminUpgradeCtrl
);
//(downgrade admin)
router.put(
  "/admin/downgrade/admin/:id",
  requireToken,
  requireAdmin,
  adminDowngradeCtrl
);
//(suspend user)
router.put(
  "/admin/suspend/:id",
  requireToken,
  requireAdmin,
  adminSuspendUserCtrl
);
//(delete user)
router.delete(
  "/admin/del/:id",
  requireToken,
  requireAdmin,
  adminDeleteUserCtrl
);
//(reactive user)
router.put(
  "/admin/reactive/:id",
  requireToken,
  requireAdmin,
  adminReactiveUserCtrl
);
//(list logs activity)
router.get("/admin/logs/:id", requireToken, requireAdmin, listLogActivityCtrl);
//(list superusers)
router.get(
  "/admin/list/superuser",
  requireToken,
  requireAdmin,
  listSuperuserCtrl
);
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
export { router };
