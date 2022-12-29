import basecontainer from "../../../base/base.container";
import UserReputation from "../../../../models/sql/reputationModel/repuUser.model";
import { repuUserInterface } from "../../../../interfaces/repuInterface/repuUser.interface";
import ReputationScore from "../../../../models/sql/reputationModel/repuScore.model";
import {
  getPagination,
  getPaginationRepu,
} from "../../../../utils/paginationfunction";

export class daoRepuUserSQL extends basecontainer {
  constructor() {
    super(UserReputation);
  }

  /** -------------- CREATE REPUTATION USER --------------**/
  async createReputationUser(data: repuUserInterface) {
    try {
      //check previous repu:
      const repu = await UserReputation.findOne({
        where: {
          ur_qualifier: data.ur_qualifier,
          sale_id: data.sale_id,
          ur_rol: data.ur_rol,
        },
      });
      if (repu) return "ALREADY_QUALIFIED";

      //create:
      return await UserReputation.create({
        ur_id: data.ur_id,
        ur_qualifier: data.ur_qualifier,
        ur_receiver: data.ur_receiver,
        sale_id: data.sale_id,
        rs_id: data.rs_id,
        ur_rol: data.ur_rol,
        ur_description: data.ur_description,
      });
    } catch (e: any) {
      throw new Error(e.message);
    }
  }

  /** -------------- DELETE REPUTATION USER --------------**/
  async deleteReputationUser(ur_id: string) {
    try {
      return await UserReputation.destroy({ where: { ur_id } });
    } catch (e: any) {
      throw new Error(e.message);
    }
  }

  /** -------------- LIST REPUTATIONS  --------------**/
  async listReputations(
    user_id: string,
    rol: string,
    page: number = 0,
    size: number = 0
  ) {
    try {
      const { limit, offset } = getPagination(page, size);
      const data = await UserReputation.findAndCountAll({
        where: { ur_receiver: user_id, ur_rol: rol },
        limit,
        offset,
        include: [{ model: ReputationScore, attributes: ["rs_name"] }],
      });
      if (data) {
        return getPaginationRepu(data, page, limit);
      }
    } catch (e: any) {
      throw new Error(e.message);
    }
  }
}
