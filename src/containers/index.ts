import { daoUserSQL } from "./dao/postgres/user/user.dao";
import { daoRolesSQL } from "./dao/postgres/user/rol.dao";
import { daoPTypeSQL } from "./dao/postgres/product/ptype.dao";
import { daoProductSQL } from "./dao/postgres/product/product.dao";
import { daoPCategotySQL } from "./dao/postgres/product/pcategory.dao";
import { daoSaleSQL } from "./dao/postgres/product/sale.dao";

import { daoCommentSQL } from "./dao/postgres/comment/comment.dao";
import { daoImgProductSQL } from "./dao/postgres/imagedao/imgProduct.dao";
import { daoStaffSQL } from "./dao/postgres/superuser/staff.dao";
import { daoAdminSQL } from "./dao/postgres/superuser/admin.dao";
import { LogActivitySQL } from "./dao/postgres/logsdao/logsActivity.dao";
import { daoNotificationSQL } from "./dao/postgres/notification/Notification.dao";

//Define daos:
export const daoUser = new daoUserSQL();
export const daoRoles = new daoRolesSQL();
export const daoProductTypes = new daoPTypeSQL();
export const daoProductCategory = new daoPCategotySQL();
export const daoProduct = new daoProductSQL();
export const daoSale = new daoSaleSQL();

export const daoComment = new daoCommentSQL();
export const daoImgProduct = new daoImgProductSQL();
export const daoStaff = new daoStaffSQL();
export const daoAdmin = new daoAdminSQL();
export const daoLogActivity = new LogActivitySQL();
export const daoNotification = new daoNotificationSQL();
