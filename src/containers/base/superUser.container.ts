import { daoRoles, daoUser } from "..";
import { UserInterface } from "../../interfaces/userInterface/user.interface";
import { RolInterface } from "../../interfaces/userInterface/rol.interface";

export class superUser {
  constructor() {}

  /** --------- VERIFIED USER --------- */
  async verifyUser(user_id: string) {
    try {
      //Find user:
      const user: UserInterface | any = await daoUser.getUser(
        "id",
        user_id,
        true
      );
      if (!user) return "USER_NOT_FOUND";
      const rol: RolInterface | any = await daoRoles.findRol("store");
      if (!rol) return "ROL_NOT_FOUND";
      user.set({ rol_id: rol.rol_id });
      const updated = await user.save();
      if (updated) return "USER_VERIFIED";
    } catch (e: any) {
      throw new Error(e.message);
    }
  }
  /** --------- UNVERIFIED USER --------- */
  async unverifyUser(user_id: string) {
    try {
      //Find user:
      const user: UserInterface | any = await daoUser.getUser(
        "id",
        user_id,
        true
      );
      if (!user) return "USER_NOT_FOUND";
      const rol: RolInterface | any = await daoRoles.findRol("user");
      if (!rol) return "ROL_NOT_FOUND";
      user.set({ rol_id: rol.rol_id });

      const updated = await user.save();
      if (updated) return "USER_UNVERIFIED";
    } catch (e: any) {
      throw new Error(e.message);
    }
  }
  /** --------- DELETE USER --------- */

  async deleteUser(user_id: string) {
    try {
      const user: UserInterface | any = await daoUser.getUser("id", user_id);
      //Check authorization:
      if (user.Rol.rol_name === "staff" || user.Rol.rol_name === "admin")
        return "UNAUTHORIZED_DELETE_ROL";

      user.set({ user_status: "deleted" });
      const deleted = await user.save();
      if (deleted) return "USER_DELETED";
    } catch (e: any) {
      throw new Error(e.message);
    }
  }

  /** --------- SUSPEND USER --------- */
  async suspendUser(user_id: string) {
    try {
      const user: UserInterface | any = await daoUser.getUser("id", user_id);
      //Check authorization:
      if (user.Rol.rol_name === "staff" || user.Rol.rol_name === "admin")
        return "UNAUTHORIZED_SUSPEND_ROL";

      user.set({ user_status: "suspended" });
      const suspended = await user.save();
      if (suspended) return "USER_SUSPENDED";
    } catch (e: any) {
      throw new Error(e.message);
    }
  }
  /** --------- REACTIVATE USER --------- */
  async reactivateUser(user_id: string) {
    try {
      const user: UserInterface | any = await daoUser.getUser("id", user_id);
      if (user.Rol.rol_name === "staff" || user.Rol.rol_name === "admin")
        return "UNAUTHORIZED_REACTIVE_ROL";
      user.set({ user_status: "active" });
      const reactivated = await user.save();
      if (reactivated) return "USER_REACTIVATED";
    } catch (e: any) {
      throw new Error(e.message);
    }
  }
}
