//uuid:
import { v4 as uuidv4 } from "uuid";
//DAOs:
import { daoProduct, daoRepuProduct, daoSale, daoUser } from "../../containers";
//Interfaces:
import { repuProductInterface } from "../../interfaces/repuInterface/repuProduct.interface";
import { ReqTokenDataInterface } from "../../interfaces/userInterface/reqTokenData.interface";

/** ========================= CREATE REPUTATION  ========================= **/
export async function createRepuServ(
  tokenID: ReqTokenDataInterface,
  data: repuProductInterface
) {
  //Check authorization:
  if (tokenID.uid.toString() !== data.pr_qualifier.toString())
    return "UNAUTHORIZED_ACTION";
  //check Sale:
  const sale = await daoSale.getSale(data.sale_id);
  if (!sale) return "SALE_NOT_FOUND";

  //check user:
  const user = await daoUser.getUser("id", data.pr_qualifier, true);
  if (!user) return "USER_NOT_FOUND";

  //Check product:
  const product = await daoProduct.getProduct(data.product_id, true);
  if (!product) return "PRODUCT_NOT_FOUND";
  //create:
  const pr_id = uuidv4();
  return await daoRepuProduct.createReputation({ ...data, pr_id });
}

/** ========================= DELETE REPUTATION  ========================= **/
export async function delRepuProductServ(pr_id: string) {
  return await daoRepuProduct.deleteReputation(pr_id);
}

/** ========================= LIST REPUTATION  ========================= **/
export async function listRepuProductServ(
  product_id: string,
  page: number,
  size: number
) {
  //check product:
  const product = await daoProduct.getProduct(product_id, true);
  if (!product) return "PRODUCT_NOT_FOUND";
  return await daoRepuProduct.listReputation(product_id, page, size);
}
