"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
// ~~~~~~~~~~~~~~~~~~~~~~~~ Controllers ~~~~~~~~~~~~~~~~~~~~~~~~
//Staff:
const staff_ctrl_1 = require("../../controllers/superuser/staff.ctrl");
//Admin:
const admin_ctrl_1 = require("../../controllers/superuser/admin.ctrl");
//Middlewares:
const requireToken_1 = require("../../middlewares/requireToken");
const requireStaff_1 = require("../../middlewares/requireStaff");
const requireAdmin_1 = require("../../middlewares/requireAdmin");
const router = (0, express_1.Router)();
exports.router = router;
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Routes ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
/** STAFF ROUTES **/
//(verify user)
router.put("/staff/verify/:id", requireToken_1.requireToken, requireStaff_1.requireStaff, staff_ctrl_1.verifyUserCtrl);
//(unverify user)
router.put("/staff/unverify/:id", requireToken_1.requireToken, requireStaff_1.requireStaff, staff_ctrl_1.unverifyUserCtrl);
//(delete user)
router.delete("/staff/del/:id", requireToken_1.requireToken, requireStaff_1.requireStaff, staff_ctrl_1.deleteUserCtrl);
//(suspend user)
router.put("/staff/suspend/:id", requireToken_1.requireToken, requireStaff_1.requireStaff, staff_ctrl_1.suspendUserCtrl);
//(reactive user)
router.put("/staff/reactive/:id", requireToken_1.requireToken, requireStaff_1.requireStaff, staff_ctrl_1.reactiveUserCtrl);
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
/** ADMIN ROUTES **/
//(make staff)
router.put("/admin/upgrade/staff/:id", requireToken_1.requireToken, requireAdmin_1.requireAdmin, admin_ctrl_1.staffUpgradeCtrl);
//(downgrade staff)
router.put("/admin/downgrade/staff/:id", requireToken_1.requireToken, requireAdmin_1.requireAdmin, admin_ctrl_1.staffDowngradeCtrl);
//(make admin)
router.put("/admin/upgrade/admin/:id", requireToken_1.requireToken, requireAdmin_1.requireAdmin, admin_ctrl_1.adminUpgradeCtrl);
//(downgrade admin)
router.put("/admin/downgrade/admin/:id", requireToken_1.requireToken, requireAdmin_1.requireAdmin, admin_ctrl_1.adminDowngradeCtrl);
//(suspend user)
router.put("/admin/suspend/:id", requireToken_1.requireToken, requireAdmin_1.requireAdmin, admin_ctrl_1.adminSuspendUserCtrl);
//(delete user)
router.delete("/admin/del/:id", requireToken_1.requireToken, requireAdmin_1.requireAdmin, admin_ctrl_1.adminDeleteUserCtrl);
//(reactive user)
router.put("/admin/reactive/:id", requireToken_1.requireToken, requireAdmin_1.requireAdmin, admin_ctrl_1.adminReactiveUserCtrl);
//(list logs activity)
router.get("/admin/logs/:id", requireToken_1.requireToken, requireAdmin_1.requireAdmin, admin_ctrl_1.listLogActivityCtrl);
//(list superusers)
router.get("/admin/list/superuser", requireToken_1.requireToken, requireAdmin_1.requireAdmin, admin_ctrl_1.listSuperuserCtrl);
