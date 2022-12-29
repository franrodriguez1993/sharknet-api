//uuid:
import { v4 as uuidv4 } from "uuid";

//DAOs:
import { daoRepuScore } from "../../containers";

/** ========================= CREATE SCORE ========================= **/
export async function createScoreServ(rs_name: string) {
  if (rs_name.trim() === "") return "NAME_REQUIRED";
  //create:
  const rs_id = uuidv4();
  return await daoRepuScore.createScore(rs_id, rs_name);
}

/** ========================= LIST SCORE ========================= **/
export async function listScoreServ() {
  return await daoRepuScore.listScores();
}

/** ========================= DELETE SCORE ========================= **/
export async function deleteScoreServ(rs_id: string) {
  return await daoRepuScore.deleteScore(rs_id);
}
