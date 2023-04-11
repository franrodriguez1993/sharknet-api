import { daoRoles, daoUser } from "../../..";
import { rolObjectIF } from "../../../../interfaces/userInterface/rol.interface";
import { userObjectIF } from "../../../../interfaces/userInterface/user.interface";
import Rol from "../../../../models/sql/usersModel/Rol.model";
import sequelize from "sequelize";
const Op = sequelize.Op;
import { superUser } from "../../../base/superUser.container";
//Utils:
import {
  getPagination,
  getPaginationSuperuser,
} from "../../../../utils/paginationfunction";
import User from "../../../../models/sql/usersModel/User.model";
export class daoAdminSQL extends superUser {
  /** -------------- STAFF UPGRADE-------------- **/
  async staffUpgrade(user_id: string) {
    try {
      //Find user:
      const user: userObjectIF = await daoUser.getUser("id", user_id, true);
      if (!user) return "USER_NOT_FOUND";
      const rol: rolObjectIF = await daoRoles.findRol("staff");
      if (!rol) return "ROL_NOT_FOUND";
      user.set({ rol_id: rol.rol_id });

      const staff = await user.save();
      if (staff) return "USER_STAFF_UPGRADED";
    } catch (e: any) {
      throw new Error(e.message);
    }
  }
  /** --------------  STAFF DOWNGRADE-------------- **/
  async staffDowngrade(user_id: string) {
    try {
      //Find user:
      const user: userObjectIF = await daoUser.getUser("id", user_id, true);
      if (!user) return "USER_NOT_FOUND";
      const rol: rolObjectIF = await daoRoles.findRol("user");
      if (!rol) return "ROL_NOT_FOUND";
      user.set({ rol_id: rol.rol_id });

      const staff = await user.save();
      if (staff) return "USER_STAFF_DOWNGRADED";
    } catch (e: any) {
      throw new Error(e.message);
    }
  }
  /** -------------- ADMIN UPGRADE-------------- **/
  async adminUpgrade(user_id: string) {
    try {
      //Find user:
      const user: userObjectIF = await daoUser.getUser("id", user_id, true);
      if (!user) return "USER_NOT_FOUND";
      const rol: rolObjectIF = await daoRoles.findRol("admin");
      if (!rol) return "ROL_NOT_FOUND";
      user.set({ rol_id: rol.rol_id });
      const admin = await user.save();
      if (admin) return "USER_ADMIN_UPGRADED";
    } catch (e: any) {
      throw new Error(e.message);
    }
  }
  /** -------------- ADMIN DOWNGRADE-------------- **/
  async admindowngrade(user_id: string) {
    try {
      //Find user:
      const user: userObjectIF = await daoUser.getUser("id", user_id, true);
      if (!user) return "USER_NOT_FOUND";
      const rol: rolObjectIF = await daoRoles.findRol("user");
      if (!rol) return "ROL_NOT_FOUND";
      user.set({ rol_id: rol.rol_id });
      const admin = await user.save();
      if (admin) return "USER_ADMIN_DOWNGRADED";
    } catch (e: any) {
      throw new Error(e.message);
    }
  }

  /** --------- DELETE USER --------- */
  async deleteUserAdmin(user_id: string) {
    try {
      const user: userObjectIF = await daoUser.getUser("id", user_id);

      user.set({ user_status: "deleted" });
      return await user.save();
    } catch (e: any) {
      throw new Error(e.message);
    }
  }

  /** --------- SUSPEND USER --------- */
  async suspendUserAdmin(user_id: string) {
    try {
      const user: userObjectIF = await daoUser.getUser("id", user_id);

      user.set({ user_status: "suspended" });
      return await user.save();
    } catch (e: any) {
      throw new Error(e.message);
    }
  }

  /** --------- REACTIVATE USER --------- */
  async reactivateUserAdmin(user_id: string) {
    try {
      const user: userObjectIF = await daoUser.getUser("id", user_id);

      user.set({ user_status: "active" });
      return await user.save();
    } catch (e: any) {
      throw new Error(e.message);
    }
  }

  /** -------------- LIST SUPERUSERS-------------- **/
  async listSuperusers(page: number = 0, size: number = 0) {
    try {
      const { limit, offset } = getPagination(page, size);
      //Find rol id:
      const staff: rolObjectIF = await Rol.findOne({
        where: { rol_name: "staff" },
      });
      const admin: rolObjectIF = await Rol.findOne({
        where: { rol_name: "admin" },
      });
      if (!staff || !admin) return "FIND_ROL_ERROR";
      //List:
      const list = await User.findAndCountAll({
        where: { rol_id: { [Op.or]: [staff.rol_id, admin.rol_id] } },
        limit,
        offset,
        attributes: { exclude: ["user_password", "rol_id"] },
        include: [{ model: Rol }],
      });
      if (list) {
        return getPaginationSuperuser(list, page, limit);
      }
    } catch (e: any) {
      throw new Error(e.message);
    }
  }
}
