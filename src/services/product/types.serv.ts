//uuid:
import { v4 as uuidv4, validate as isValidUUID } from "uuid";

//Dao:
import { daoProductTypes } from "../../containers";

export default class typesProductService {
  /**=============== CREATE PRODUCT TYPE =================**/
  async createPTypesServ(pt_name: string, pc_id: string) {
    if (pt_name.trim() === "") return "PRODUCT_TYPE_REQUIRED";
    else if (pc_id.trim() === "") return "CATEGORY_ID_REQUIRED";

    //valid uuid:
    if (!isValidUUID(pc_id)) {
      return "INVALID_PRODUCT_CATEGORY_ID";
    }
    const pt_id = uuidv4();
    return await daoProductTypes.createType(pt_id, pt_name, pc_id);
  }

  /**================ LIST PRODUCT TYPE =================**/
  async listPTypesServ() {
    return await daoProductTypes.listTypes();
  }

  /**============= DELETE PRODUCT TYPE ==================**/
  async delPTypesServ(id: string) {
    //valid uuid:
    if (!isValidUUID(id)) {
      return "INVALID_PRODUCT_TYPE_ID";
    }
    return await daoProductTypes.deleteTypes(id);
  }
}
