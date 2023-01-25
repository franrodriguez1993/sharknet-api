//DAOs:
import { daoImgProduct, daoProduct } from "../../containers";
//Interface:

import { productInterface } from "../../interfaces/productInterface/product.interface";

import UploadImages from "../../utils/UploadImages";
const uploaderManager = new UploadImages();

export default class imageProductService {
  /** ============= CREATE IMG PRODUCT ============= **/
  async createImgProductServ(
    tokenUID: string,
    productId: string,
    image: Buffer
  ) {
    const folderId = process.env.GD_FOLDER_PRODUCTS;
    //Check Product:
    const product: productInterface | any = await daoProduct.getProduct(
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
    const imageData = await uploaderManager.uploadFile(
      productId,
      image,
      folderId
    );

    //Check path:
    if (!imageData) return "INVALID_ROUTE";

    //Create path:
    const ip_path = `https://drive.google.com/uc?id=${imageData.imageId}`;
    return await daoImgProduct.createImg({
      product_id: productId,
      ip_path,
      ip_id: imageData.imageId,
    });
  }

  /** ============== DELETE IMG PRODUCT ================ **/
  async delImgProductServ(ip_id: string) {
    const resDelete = await uploaderManager.deleteFile(ip_id);
    if (resDelete === 204) {
      return await daoImgProduct.deleteImg(ip_id);
    } else {
      return "ERROR_DELETE";
    }
  }
}
