import basecontainer from "../../../base/base.container";
import ImageProduct from "../../../../models/sql/imagesModel/ImageProd.model";
import { imgProductInterface } from "../../../../interfaces/imageInterface/imgProd.interface";

export class daoImgProductSQL extends basecontainer {
  constructor() {
    super(ImageProduct);
  }
  /** ------------- CREATE --------------**/
  async createImg(data: imgProductInterface) {
    try {
      return await ImageProduct.create({
        ip_id: data.ip_id,
        product_id: data.product_id,
        ip_path: data.ip_path,
      });
    } catch (e: any) {
      throw new Error(e.message);
    }
  }

  /** ------------- DELETE --------------**/
  async deleteImg(ip_id: string) {
    try {
      return await ImageProduct.destroy({ where: { ip_id } });
    } catch (e: any) {
      throw new Error(e.message);
    }
  }
}
