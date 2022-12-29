import basecontainer from "../../../base/base.container";
import ImageUser from "../../../../models/sql/imagesModel/imageUser.model";
import { imgUserInterface } from "../../../../interfaces/imageInterface/imgUser.interface";
export class daoImgUserSQL extends basecontainer {
  constructor() {
    super(ImageUser);
  }

  /** ------------- CREATE --------------**/
  async createImg(data: imgUserInterface) {
    try {
      //check img:
      const img: imgUserInterface | any = await ImageUser.findOne({
        where: { user_id: data.user_id },
      });
      if (img) {
        img.iu_path = data.iu_path;
        return await img.save();
      } else {
        return await ImageUser.create({
          iu_id: data.iu_id,
          user_id: data.user_id,
          iu_path: data.iu_path,
        });
      }
    } catch (e: any) {
      throw new Error(e.message);
    }
  }

  /** ------------- DELETE --------------**/
  async deleteImg(iu_id: string) {
    try {
      return await ImageUser.destroy({ where: { iu_id } });
    } catch (e: any) {
      throw new Error(e.message);
    }
  }
}
