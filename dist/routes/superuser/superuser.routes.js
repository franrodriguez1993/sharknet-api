"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const staff_ctrl_1 = __importDefault(require("../../controllers/superuser/staff.ctrl"));
const admin_ctrl_1 = __importDefault(require("../../controllers/superuser/admin.ctrl"));
// ~~~~~~~~~~~~~~~~~~~~~~~~ Controllers ~~~~~~~~~~~~~~~~~~~~~~~~
//Staff:
const staffContrl = new staff_ctrl_1.default();
//Admin:
const admContrl = new admin_ctrl_1.default();
//Middlewares:
const requireToken_1 = require("../../middlewares/requireToken");
const requireStaff_1 = require("../../middlewares/requireStaff");
const requireAdmin_1 = require("../../middlewares/requireAdmin");
const router = (0, express_1.Router)();
exports.router = router;
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Routes ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
/** STAFF ROUTES **/
//(verify user)
router.put("/staff/verify/:id", requireToken_1.requireToken, requireStaff_1.requireStaff, staffContrl.verifyUserCtrl);
//(unverify user)
router.put("/staff/unverify/:id", requireToken_1.requireToken, requireStaff_1.requireStaff, staffContrl.unverifyUserCtrl);
//(delete user)
router.delete("/staff/del/:id", requireToken_1.requireToken, requireStaff_1.requireStaff, staffContrl.deleteUserCtrl);
//(suspend user)
router.put("/staff/suspend/:id", requireToken_1.requireToken, requireStaff_1.requireStaff, staffContrl.suspendUserCtrl);
//(reactive user)
router.put("/staff/reactive/:id", requireToken_1.requireToken, requireStaff_1.requireStaff, staffContrl.reactiveUserCtrl);
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
/** ADMIN ROUTES **/
//(make staff)
router.put("/admin/upgrade/staff/:id", requireToken_1.requireToken, requireAdmin_1.requireAdmin, admContrl.staffUpgradeCtrl);
//(downgrade staff)
router.put("/admin/downgrade/staff/:id", requireToken_1.requireToken, requireAdmin_1.requireAdmin, admContrl.staffDowngradeCtrl);
//(make admin)
router.put("/admin/upgrade/admin/:id", requireToken_1.requireToken, requireAdmin_1.requireAdmin, admContrl.adminUpgradeCtrl);
//(downgrade admin)
router.put("/admin/downgrade/admin/:id", requireToken_1.requireToken, requireAdmin_1.requireAdmin, admContrl.adminDowngradeCtrl);
//(suspend user)
router.put("/admin/suspend/:id", requireToken_1.requireToken, requireAdmin_1.requireAdmin, admContrl.adminSuspendUserCtrl);
//(delete user)
router.delete("/admin/del/:id", requireToken_1.requireToken, requireAdmin_1.requireAdmin, admContrl.adminDeleteUserCtrl);
//(reactive user)
router.put("/admin/reactive/:id", requireToken_1.requireToken, requireAdmin_1.requireAdmin, admContrl.adminReactiveUserCtrl);
//(list logs activity)
router.get("/admin/logs/:id", requireToken_1.requireToken, requireAdmin_1.requireAdmin, admContrl.listLogActivityCtrl);
//(list superusers)
router.get("/admin/list/superuser", requireToken_1.requireToken, requireAdmin_1.requireAdmin, admContrl.listSuperuserCtrl);
