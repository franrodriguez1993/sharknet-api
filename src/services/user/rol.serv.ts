//uuid:
import { v4 as uuidv4 } from "uuid";

//DAOs:
import { daoRoles } from "../../containers";

/**============================= CREATE ROL ==================================**/

export async function createRolService(rol_name: string) {
  const rol_id = uuidv4();

  if (rol_name.trim() === "") return "ROL_NAME_REQUIRED";

  const rol = await daoRoles.create(rol_id, rol_name);
  return rol;
}

/**============================= GET ROL ==================================**/

export async function getAllRolServ() {
  const rolList = await daoRoles.getRoles();
  return rolList;
}
