import basecontainer from "../../../base/base.container";

//Models:
import ProductCategory from "../../../../models/sql/productsModel/PCategory.models";

export class daoPCategotySQL extends basecontainer {
  constructor() {
    super(ProductCategory);
  }

  /** ~~~~~~~~~~~~~~~~~ CREATE CATEGORY ~~~~~~~~~~~~~~~~~~ **/
  async createCategory(pc_id: string, pc_name: string) {
    try {
      //check category:
      const check = await ProductCategory.findOne({ where: { pc_name } });
      if (check) return "CATEGORY_ALREADY_EXISTS";
      const category = await ProductCategory.create({ pc_id, pc_name });
      if (category) return "CATEGORY_CREATED";
    } catch (e: any) {
      throw new Error(e.message);
    }
  }

  /** ~~~~~~~~~~~~~~~~~ LIST CATEGORIES ~~~~~~~~~~~~~~~~~~ **/
  async listCategories() {
    try {
      return await ProductCategory.findAll();
    } catch (e: any) {
      throw new Error(e.message);
    }
  }

  /** ~~~~~~~~~~~~~~~~~ DELETE CATEGORIES ~~~~~~~~~~~~~~~~~~ **/
  async deleteCategory(id: string) {
    try {
      return await ProductCategory.destroy({ where: { pc_id: id } });
    } catch (e: any) {
      throw new Error(e.message);
    }
  }
}
