//uuid:
import { v4 as uuidv4 } from "uuid";

//DAOs:
import { daoRoles } from "../../containers";

export default class rolUserService {
  /**================= CREATE ROL =======================**/
  async createRolService(rol_name: string) {
    const rol_id = uuidv4();

    if (rol_name.trim() === "") return "ROL_NAME_REQUIRED";

    const rol = await daoRoles.create(rol_id, rol_name);
    return rol;
  }

  /**=================== GET ROL =====================**/
  async getAllRolServ() {
    const rolList = await daoRoles.getRoles();
    return rolList;
  }
}
