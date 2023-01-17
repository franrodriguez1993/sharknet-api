import { Request, Response } from "express";
import { RequestExt } from "../../interfaces/userInterface/ReqExt.interface";
import imageProductService from "../../services/imageServ/imgProduct.serv";

const service = new imageProductService();

export default class imageProductController {
  /** ============ CREATE IMG PRODUCT =========== **/
  async createImgProductCtrl(req: RequestExt, res: Response) {
    try {
      //Data:
      const { file } = req;
      const { product } = req.params;
      const data = {
        product_id: product,
        ip_path: `${file.path.split("public")[1]}`,
      };
      //Service:
      const img = await service.createImgProductServ(req.uid, data);

      //Return:
      if (img === "PRODUCT_NOT_FOUND")
        return res.status(404).json({ status: 404, msg: img });
      else if (img === "INVALID_ROUTE" || img === "INVALID_SELLER")
        return res.status(400).json({ status: 400, msg: img });
      else if (img === "UNAUTHORIZED_ACTION")
        return res.status(401).json({ status: 401, msg: img });
      //Ok:
      return res.json({ status: 201, msg: "IMAGE_UPLOADED", data: img });
    } catch (e: any) {
      return res.status(500).json({ status: 500, msg: e.message });
    }
  }

  /** =============== DELETE IMG PRODUCT =============== **/
  async delImgProductCtrl(req: Request, res: Response) {
    try {
      //Data:
      const { id } = req.params;
      //Service:
      const del = await service.delImgProductServ(id);

      //Return:
      if (!del)
        return res.status(500).json({ status: 500, msg: "SERVER_ERROR" });
      return res.json({ status: 200, msg: "IMAGE_DELETED" });
    } catch (e: any) {
      return res.status(500).json({ status: 500, msg: e.message });
    }
  }
}
