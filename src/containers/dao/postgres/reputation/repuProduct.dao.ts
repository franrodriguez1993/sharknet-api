import basecontainer from "../../../base/base.container";
import ProductReputation from "../../../../models/sql/reputationModel/repuProduct.model";
import { repuProductInterface } from "../../../../interfaces/repuInterface/repuProduct.interface";
import User from "../../../../models/sql/usersModel/User.model";
import ReputationScore from "../../../../models/sql/reputationModel/repuScore.model";
import {
  getPagination,
  getPaginationRepu,
} from "../../../../utils/paginationfunction";
export class daoRepuProductSQL extends basecontainer {
  constructor() {
    super(ProductReputation);
  }
  /** -------------- CREATE REPUTATION --------------**/
  async createReputation(data: repuProductInterface) {
    try {
      //check previous repu:
      const repu = await ProductReputation.findOne({
        where: { pr_qualifier: data.pr_qualifier, sale_id: data.sale_id },
      });
      if (repu) return "ALREADY_QUALIFIED";
      //ok:
      return await ProductReputation.create({
        pr_id: data.pr_id,
        pr_qualifier: data.pr_qualifier,
        product_id: data.product_id,
        sale_id: data.sale_id,
        rs_id: data.rs_id,
        pr_description: data.pr_description,
      });
    } catch (e: any) {
      throw new Error(e.message);
    }
  }

  /** -------------- DELETE REPUTATION --------------**/
  async deleteReputation(pr_id: string) {
    try {
      return await ProductReputation.destroy({ where: { pr_id } });
    } catch (e: any) {
      throw new Error(e.message);
    }
  }

  /** -------------- LIST REPUTATION PRODUCT--------------**/

  async listReputation(product_id: string, page: number = 0, size: number = 0) {
    try {
      const { limit, offset } = getPagination(page, size);
      const data = await ProductReputation.findAndCountAll({
        where: { product_id },
        limit,
        offset,
        attributes: ["pr_description", "pr_id"],
        include: [
          {
            model: User,
            as: "product_qualifier",
            attributes: ["user_username", "user_name", "user_lastname"],
          },
          { model: ReputationScore, attributes: ["rs_name"] },
        ],
      });
      if (data) {
        return getPaginationRepu(data, page, limit);
      }
    } catch (e: any) {
      throw new Error(e.message);
    }
  }
}
