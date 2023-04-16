//DAOs:
import { daoImgProduct, daoProduct } from "../../containers";
//Interface:
import { productObjectIF } from "../../interfaces/productInterface/product.interface";
import imageKitClass from "../../utils/imageKitClass";
import { validate as isValidUUID } from "uuid";
const uploaderManager = new imageKitClass();

export default class imageProductService {
  /** ============= CREATE IMG PRODUCT ============= **/
  async createImgProductServ(
    tokenUID: string,
    productId: string,
    image: Buffer
  ) {
    //valid uuid:
    if (!isValidUUID(productId)) {
      return "INVALID_PRODUCT_ID";
    }
    //Check Product:
    const product: productObjectIF = await daoProduct.getProduct(
      productId,
      true
    );
    if (!product) return "PRODUCT_NOT_FOUND";
    if (product.user_id.toString() !== tokenUID.toString())
      return "INVALID_SELLER";
    //Check Authorization:
    if (product.user_id.toString() !== tokenUID.toString())
      return "UNAUTHORIZED_ACTION";

    //Upload image to google:
    const imageData = await uploaderManager.uploadImage(image);

    //Check path:
    if (!imageData) return "INVALID_ROUTE";
    const urlImg = imageData.url;
    return await daoImgProduct.createImg({
      product_id: productId,
      ip_path: urlImg,
      ip_id: imageData.fileId,
    });
  }

  /** ============== DELETE IMG PRODUCT ================ **/
  async delImgProductServ(ip_id: string) {
    //valid uuid:
    if (!isValidUUID(ip_id)) {
      return "INVALID_IMAGE_ID";
    }
    await uploaderManager.deleteImage(ip_id);
    return await daoImgProduct.deleteImg(ip_id);
  }
}
