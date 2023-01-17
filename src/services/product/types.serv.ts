//uuid:
import { v4 as uuidv4 } from "uuid";

//Dao:
import { daoProductTypes } from "../../containers";

export default class typesProductService {
  /**=============== CREATE PRODUCT TYPE =================**/
  async createPTypesServ(pt_name: string, pc_id: string) {
    if (pt_name.trim() === "") return "PRODUCT_TYPE_REQUIRED";
    else if (pc_id.trim() === "") return "CATEGORY_ID_REQUIRED";
    const pt_id = uuidv4();
    return await daoProductTypes.createType(pt_id, pt_name, pc_id);
  }

  /**================ LIST PRODUCT TYPE =================**/
  async listPTypesServ() {
    return await daoProductTypes.listTypes();
  }

  /**============= DELETE PRODUCT TYPE ==================**/
  async delPTypesServ(id: string) {
    return await daoProductTypes.deleteTypes(id);
  }
}
