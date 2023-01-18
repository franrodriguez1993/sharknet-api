import { Router } from "express";
import staffController from "../../controllers/superuser/staff.ctrl";
import adminController from "../../controllers/superuser/admin.ctrl";

// ~~~~~~~~~~~~~~~~~~~~~~~~ Controllers ~~~~~~~~~~~~~~~~~~~~~~~~
//Staff:
const staffContrl = new staffController();
//Admin:
const admContrl = new adminController();

//Middlewares:
import { requireToken } from "../../middlewares/requireToken";
import { requireStaff } from "../../middlewares/requireStaff";
import { requireAdmin } from "../../middlewares/requireAdmin";
const router = Router();

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Routes ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

/** STAFF ROUTES **/
//(verify user)
router.put(
  "/staff/verify/:id",
  requireToken,
  requireStaff,
  staffContrl.verifyUserCtrl
);
//(unverify user)
router.put(
  "/staff/unverify/:id",
  requireToken,
  requireStaff,
  staffContrl.unverifyUserCtrl
);
//(delete user)
router.delete(
  "/staff/del/:id",
  requireToken,
  requireStaff,
  staffContrl.deleteUserCtrl
);
//(suspend user)
router.put(
  "/staff/suspend/:id",
  requireToken,
  requireStaff,
  staffContrl.suspendUserCtrl
);
//(reactive user)
router.put(
  "/staff/reactive/:id",
  requireToken,
  requireStaff,
  staffContrl.reactiveUserCtrl
);
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

/** ADMIN ROUTES **/
//(make staff)
router.put(
  "/admin/upgrade/staff/:id",
  requireToken,
  requireAdmin,
  admContrl.staffUpgradeCtrl
);
//(downgrade staff)
router.put(
  "/admin/downgrade/staff/:id",
  requireToken,
  requireAdmin,
  admContrl.staffDowngradeCtrl
);
//(make admin)
router.put(
  "/admin/upgrade/admin/:id",
  requireToken,
  requireAdmin,
  admContrl.adminUpgradeCtrl
);
//(downgrade admin)
router.put(
  "/admin/downgrade/admin/:id",
  requireToken,
  requireAdmin,
  admContrl.adminDowngradeCtrl
);
//(suspend user)
router.put(
  "/admin/suspend/:id",
  requireToken,
  requireAdmin,
  admContrl.adminSuspendUserCtrl
);
//(delete user)
router.delete(
  "/admin/del/:id",
  requireToken,
  requireAdmin,
  admContrl.adminDeleteUserCtrl
);
//(reactive user)
router.put(
  "/admin/reactive/:id",
  requireToken,
  requireAdmin,
  admContrl.adminReactiveUserCtrl
);
//(list logs activity)
router.get(
  "/admin/logs/:id",
  requireToken,
  requireAdmin,
  admContrl.listLogActivityCtrl
);
//(list superusers)
router.get(
  "/admin/list/superuser",
  requireToken,
  requireAdmin,
  admContrl.listSuperuserCtrl
);
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
export { router };
