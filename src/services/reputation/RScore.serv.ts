//uuid:
import { v4 as uuidv4 } from "uuid";

//DAOs:
import { daoRepuScore } from "../../containers";

export default class repuScoreService {
  /** =============== CREATE SCORE ================= **/

  async createScoreServ(rs_name: string) {
    if (rs_name.trim() === "") return "NAME_REQUIRED";
    //create:
    const rs_id = uuidv4();
    return await daoRepuScore.createScore(rs_id, rs_name);
  }

  /** =================== LIST SCORE ==================== **/
  async listScoreServ() {
    return await daoRepuScore.listScores();
  }

  /** ================== DELETE SCORE ================== **/
  async deleteScoreServ(rs_id: string) {
    return await daoRepuScore.deleteScore(rs_id);
  }
}
