//uuid:
import { v4 as uuidv4, validate as isValidUUID } from "uuid";

//Dao:
import { daoProductCategory } from "../../containers";

export default class categoryProductService {
  /** ================= CREATE CATEGORY ================ **/
  async createCategoryServ(pc_name: string) {
    if (pc_name.trim() === "") return "CATEGORY_NAME_REQUIRED";
    //Create:
    const pc_id = uuidv4();
    return await daoProductCategory.createCategory(pc_id, pc_name);
  }

  /** ================ LIST CATEGORY =============== **/
  async listCategoryServ() {
    return await daoProductCategory.listCategories();
  }
  /** ================ DELETE CATEGORY =================== **/

  async deleteCategoryServ(id: string) {
    //valid uuid:
    if (!isValidUUID(id)) {
      return "INVALID_PRODUCT_CATEGORY_ID";
    }
    return await daoProductCategory.deleteCategory(id);
  }
}
