import basecontainer from "../../../base/base.container";
import ReputationScore from "../../../../models/sql/reputationModel/repuScore.model";

export class daoRepuScoreSQL extends basecontainer {
  constructor() {
    super(ReputationScore);
  }

  /** -------------------- CREATE REPUTATION SCORE ---------------------- **/
  async createScore(rs_id: string, rs_name: string) {
    try {
      //Check score:
      const check = await ReputationScore.findOne({ where: { rs_name } });
      if (check) return "SCORE_ALREADY_CREATED";
      return await ReputationScore.create({ rs_id, rs_name });
    } catch (e: any) {
      throw new Error(e.message);
    }
  }

  /** -------------------- LIST REPUTATION SCORE ---------------------- **/
  async listScores() {
    try {
      return await ReputationScore.findAll();
    } catch (e: any) {
      throw new Error(e.message);
    }
  }

  /** -------------------- DELETE REPUTATION SCORE ---------------------- **/
  async deleteScore(rs_id: string) {
    try {
      const del = await ReputationScore.destroy({ where: { rs_id } });
      if (!del) return "SCORE_NOT_FOUND";
      else return "SCORE_DELETED";
    } catch (e: any) {
      throw new Error(e.message);
    }
  }
}
