//uuid:
import { v4 as uuidv4 } from "uuid";
//DAOs:
import { daoImgProduct, daoProduct } from "../../containers";
//Interface:
import { imgProductInterface } from "../../interfaces/imageInterface/imgProd.interface";
import { productInterface } from "../../interfaces/productInterface/product.interface";

/** ==================== CREATE IMG PRODUCT ===================== **/
export async function createImgProductServ(
  tokenUID: string,
  data: imgProductInterface
) {
  //Check Product:
  const product: productInterface | any = await daoProduct.getProduct(
    data.product_id,
    true
  );
  if (!product) return "PRODUCT_NOT_FOUND";
  if (product.user_id.toString() !== tokenUID.toString())
    return "INVALID_SELLER";
  //Check Authorization:
  if (product.user_id.toString() !== tokenUID.toString())
    return "UNAUTHORIZED_ACTION";
  //Check path:
  if (!data.ip_path) return "INVALID_ROUTE";

  //Create:
  const ip_id = uuidv4();
  return await daoImgProduct.createImg({ ...data, ip_id });
}

/** ==================== DELETE IMG PRODUCT ===================== **/
export async function delImgProductServ(ip_id: string) {
  return await daoImgProduct.deleteImg(ip_id);
}
