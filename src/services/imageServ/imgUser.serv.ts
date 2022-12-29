//uuid:
import { v4 as uuidv4 } from "uuid";

//DAOs:
import { daoImgUser, daoUser } from "../../containers";
import { imgUserInterface } from "../../interfaces/imageInterface/imgUser.interface";

/** ==================== CREATE IMG USER ===================== **/
export async function createImgUserServ(
  tokenUID: string,
  data: imgUserInterface
) {
  //Check Authorization:
  if (tokenUID.toString() !== data.user_id.toString())
    return "UNAUTHORIZED_ACTION";
  //check user:
  const user = await daoUser.getUser("id", data.user_id, true);
  if (!user) return "USER_NOT_FOUND";
  //Check path:
  if (!data.iu_path) return "INVALID_ROUTE";

  //Create:
  const iu_id = uuidv4();
  return await daoImgUser.createImg({ ...data, iu_id });
}
/** ==================== DELETE IMG USER ===================== **/
export async function delImgUserServ(iu_id: string) {
  return await daoImgUser.deleteImg(iu_id);
}
