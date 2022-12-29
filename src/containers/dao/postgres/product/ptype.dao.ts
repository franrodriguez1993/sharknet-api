import basecontainer from "../../../base/base.container";
import ProductTypes from "../../../../models/sql/productsModel/PType.models";
import ProductCategory from "../../../../models/sql/productsModel/PCategory.models";

export class daoPTypeSQL extends basecontainer {
  constructor() {
    super(ProductTypes);
  }

  /** ~~~~~~~~~~~~~~~~~~~~~~~~~~ Create product type ~~~~~~~~~~~~~~~~~~~~~~~~~~  **/
  async createType(pt_id: string, pt_name: string, pc_id: string) {
    try {
      //Check type:
      const check = await ProductTypes.findOne({ where: { pc_id, pt_name } });
      if (check) return "PRODUCT_TYPE_ALREADY_EXISTS";
      const newType = await ProductTypes.create({ pt_id, pt_name, pc_id });
      if (newType) return "PRODUCT_TYPE_CREATED";
    } catch (e: any) {
      throw new Error(e.message);
    }
  }

  /** ~~~~~~~~~~~~~~~~~~~~~~~~~~ List product type ~~~~~~~~~~~~~~~~~~~~~~~~~~  **/
  async listTypes() {
    try {
      return await ProductTypes.findAll({
        include: [{ model: ProductCategory }],
      });
    } catch (e: any) {
      throw new Error(e.message);
    }
  }

  /** ~~~~~~~~~~~~~~~~~~~~~~~~~~ Delete product type ~~~~~~~~~~~~~~~~~~~~~~~~~~  **/

  async deleteTypes(id: string) {
    try {
      return await ProductTypes.destroy({ where: { pt_id: id } });
    } catch (e: any) {
      throw new Error(e.message);
    }
  }
}
