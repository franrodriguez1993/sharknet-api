//uuid:
import { v4 as uuidv4 } from "uuid";
//Interfaces:
import { repuUserInterface } from "../../interfaces/repuInterface/repuUser.interface";
//DAOs:
import { daoRepuUser, daoSale, daoUser } from "../../containers";
import { saleInterface } from "../../interfaces/productInterface/sale.interface";

export default class repuUserService {
  /** ================== CREATE REPUTATION USER ================ **/
  // Mode: "seller" and "buyer" to qualify specific user with the same service

  async createReputationServ(
    tokenUid: string,
    data: repuUserInterface,
    mode: string
  ) {
    //Check rol qualify:
    if (data.ur_rol !== "seller" && data.ur_rol !== "buyer")
      return "INCORRECT_ROL_QUALIFY";

    //Compare the token id with the qualifier:
    if (tokenUid.toString() !== data.ur_qualifier.toString())
      return "UNAUTHORIZED_ACTION";
    //Check Sale:
    const sale: saleInterface | any = await daoSale.getSale(data.sale_id);
    if (!sale) return "SALE_NOT_FOUND";

    //Check Users:
    const qualifier = await daoUser.getUser("id", data.ur_qualifier, true);
    const receiver = await daoUser.getUser("id", data.ur_receiver, true);
    if (!qualifier || !receiver) return "USER_NOT_FOUND";

    //Check mode and rol reputation:
    if (mode === "seller") {
      if (sale.buyer.user_id.toString() !== data.ur_qualifier.toString())
        return "INVALID_QUALIFIER";
      if (data.ur_rol !== "seller") return "INCORRECT_ROL";
    } else if (mode === "buyer") {
      if (data.ur_rol !== "buyer") return "INCORRECT_ROL";
    }

    //Create:
    const ur_id = uuidv4();
    return await daoRepuUser.createReputationUser({ ...data, ur_id });
  }

  /** ===================== DELETE REPUTATION USER =================== **/
  async deleteReputationServ(ur_id: string) {
    return await daoRepuUser.deleteReputationUser(ur_id);
  }

  /** ==================== GET REPUTATION BUYER ==================== **/
  async ListRepuBuyerServ(user_id: string, page: number, size: number) {
    //check user:
    const check = await daoUser.getUser("id", user_id, true);
    if (!check) return "USER_NOT_FOUND";
    return await daoRepuUser.listReputations(user_id, "buyer", page, size);
  }

  /** =================== GET REPUTATION SELLER ==================== **/
  async listRepuSellerServ(user_id: string, page: number, size: number) {
    //check user:
    const check = await daoUser.getUser("id", user_id, true);
    if (!check) return "USER_NOT_FOUND";
    return await daoRepuUser.listReputations(user_id, "seller", page, size);
  }
}
