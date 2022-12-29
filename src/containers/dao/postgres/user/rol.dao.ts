import basecontainer from "../../../base/base.container";
import Rol from "../../../../models/sql/usersModel/Rol.model";

export class daoRolesSQL extends basecontainer {
  constructor() {
    super(Rol);
  }

  /**------------- CREATE -----------**/
  async create(rol_id: string, rol_name: string) {
    try {
      //check rolname:
      const check = await Rol.findOne({ where: { rol_name } });
      if (check) return "NAME_ALREADY_IN_USE";
      const rol = await Rol.create({ rol_id, rol_name });
      if (rol) return "ROL_CREATED";
    } catch (e: any) {
      throw new Error(e.message);
    }
  }

  /**------------- GET ROLES  -----------**/

  async getRoles() {
    try {
      const list = await Rol.findAll();
      return list;
    } catch (e: any) {
      throw new Error(e.message);
    }
  }

  /**------------- GET ROL -----------**/
  async findRol(rol_name: string) {
    try {
      return await Rol.findOne({ where: { rol_name } });
    } catch (e: any) {
      throw new Error(e.message);
    }
  }
}
