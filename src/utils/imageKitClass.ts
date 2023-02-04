import ImageKit from "imagekit";
import serverConfigurations from "../config/configServer";
import { v4 as uuidv4 } from "uuid";
import logger from "./logger";
const imageKit = new ImageKit({
  publicKey: serverConfigurations.imageKit.publicKey,
  privateKey: serverConfigurations.imageKit.privateKey,
  urlEndpoint: serverConfigurations.imageKit.urlEndPoing,
});
export default class imageKitClass {
  /**  UPLOAD IMAGE  **/
  async uploadImage(img: Buffer) {
    try {
      const base = img.toString("base64");
      const data = await imageKit.upload({
        file: base,
        fileName: `${uuidv4()}`,
      });
      return data;
    } catch (e: any) {
      return logger.error(e.message);
    }
  }

  /** DELETE IMAGE  **/
  async deleteImage(id: string) {
    try {
      const res = await imageKit.deleteFile(id);
      return res;
    } catch (e: any) {
      return logger.error(e.message);
    }
  }
}
