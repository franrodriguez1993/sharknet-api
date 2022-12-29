import { Request, Response } from "express";
import { RequestExt } from "../../interfaces/userInterface/ReqExt.interface";
import {
  createProductServ,
  listProductsServ,
  listPStatusServ,
  listPBrandServ,
  listPUserServ,
  listPCategoryServ,
  listPTypeServ,
  getProductServ,
  editProductServ,
  updateViewsServ,
  addPFavoriteServ,
  listPFavoriteServ,
  buyProductServ,
  getSaleServ,
  getUserSalesServ,
  getUserBuysServ,
  pauseProductServ,
  deleteProductServ,
  reactivateProductServ,
  listQueryProductServ,
  listProductOfferServ,
} from "../../services/product/product.serv";

/**====================== CREATE PRODUCT ===========================**/
export async function createProductCtrl(req: RequestExt, res: Response) {
  try {
    //Data:
    const data = {
      pt_id: req.body.type, //id
      user_id: req.body.seller, //id
      product_name: req.body.name,
      product_brand: req.body.brand,
      product_price: req.body.price,
      product_stock: req.body.stock,
      product_description: req.body.description,
      product_status: req.body.status,
      product_warranty: req.body.warranty,
      address_id: req.body.address, //id
      pc_id: req.body.category, //id
    };
    const tokenData = {
      uid: req.uid,
      rol: req.rol,
    };
    //Service:
    const product = await createProductServ(tokenData, data);

    //Return:
    if (!product)
      return res.status(500).json({ status: 500, msg: "SERVER_ERROR" });
    else if (product === "USER_NOT_FOUND" || product === "ADDRESS_NOT_FOUND")
      return res.status(404).json({ status: 404, msg: product });
    else if (product === "UNAUTHORIZED_ACTION")
      return res.status(401).json({ status: 401, msg: product });
    else if (product === "INVALID_USER_ADDRESS")
      return res.status(400).json({ status: 400, msg: product });
    //Ok:
    return res.status(201).json({ status: 201, msg: "OK", data: product });
  } catch (e: any) {
    return res.status(500).json({ status: 500, msg: e.message });
  }
}

/**====================== LIST PRODUCTS ===========================**/
export async function listProductsCtrl(req: Request, res: Response) {
  try {
    // query parameters:
    const page: number = parseInt(req.query.page as string);
    const size: number = parseInt(req.query.size as string);

    //service:
    const list = await listProductsServ(page, size);
    if (!list)
      return res.status(500).json({ status: 500, msg: "SERVER_ERROR" });

    //return:
    return res.json({ status: 200, msg: "OK", data: list });
  } catch (e: any) {
    return res.status(500).json({ status: 500, msg: e.message });
  }
}

/**====================== LIST PRODUCTS BY STATUS ===========================**/
export async function listPStatusCtrl(req: Request, res: Response) {
  try {
    //data:
    const { status } = req.params;
    // query parameters:
    const page: number = parseInt(req.query.page as string);
    const size: number = parseInt(req.query.size as string);

    //Service:
    const list = await listPStatusServ(status, page, size);
    if (!list)
      return res.status(500).json({ status: 500, msg: "SERVER_ERROR" });
    //return:
    return res.json({ status: 200, msg: "OK", data: list });
  } catch (e: any) {
    return res.status(500).json({ status: 500, msg: e.message });
  }
}

/**====================== LIST PRODUCTS BY BRAND ===========================**/

export async function listPBrandCtrl(req: Request, res: Response) {
  try {
    //data:
    const { brand } = req.params;
    // query parameters:
    const page: number = parseInt(req.query.page as string);
    const size: number = parseInt(req.query.size as string);
    //Service:
    const list = await listPBrandServ(brand, page, size);
    if (!list)
      return res.status(500).json({ status: 500, msg: "SERVER_ERROR" });
    //return:
    return res.json({ status: 200, msg: "OK", data: list });
  } catch (e: any) {
    return res.status(500).json({ status: 500, msg: e.message });
  }
}

/**====================== LIST PRODUCTS BY USER ===========================**/

export async function listPUserCtrl(req: Request, res: Response) {
  try {
    //data:
    const { id } = req.params;
    // query parameters:
    const page: number = parseInt(req.query.page as string);
    const size: number = parseInt(req.query.size as string);

    //Service:
    const list = await listPUserServ(id, page, size);

    //return:
    if (!list)
      return res.status(500).json({ status: 500, msg: "SERVER_ERROR" });
    else if (list === "USER_NOT_FOUND")
      return res.status(404).json({ status: 404, msg: list });
    //Ok:
    return res.json({ status: 200, msg: "OK", data: list });
  } catch (e: any) {
    return res.status(500).json({ status: 500, msg: e.message });
  }
}
/**====================== LIST PRODUCTS BY CATEGORY ===========================**/

export async function listPCategoryCtrl(req: Request, res: Response) {
  try {
    //data:
    const { id } = req.params;
    // query parameters:
    const page: number = parseInt(req.query.page as string);
    const size: number = parseInt(req.query.size as string);

    //service:
    const list = await listPCategoryServ(id, page, size);
    if (!list)
      return res.status(500).json({ status: 500, msg: "SERVER_ERROR" });
    //return:
    return res.json({ status: 200, msg: "OK", data: list });
  } catch (e: any) {
    return res.status(500).json({ status: 500, msg: e.message });
  }
}

/**====================== LIST PRODUCTS BY TYPE  ===========================**/

export async function listPTypeCtrl(req: Request, res: Response) {
  try {
    //data:
    const { id } = req.params;
    // query parameters:
    const page: number = parseInt(req.query.page as string);
    const size: number = parseInt(req.query.size as string);
    //Service:
    const list = await listPTypeServ(id, page, size);
    if (!list)
      return res.status(500).json({ status: 500, msg: "SERVER_ERROR" });
    //return:
    return res.json({ status: 200, msg: "OK", data: list });
  } catch (e: any) {
    return res.status(500).json({ status: 500, msg: e.message });
  }
}

/**====================== LIST PRODUCTS BY OFFER  ===========================**/

export async function listProductOfferCtrl(req: Request, res: Response) {
  try {
    // query parameters:
    const page: number = parseInt(req.query.page as string);
    const size: number = parseInt(req.query.size as string);

    //Service:
    const list = await listProductOfferServ(page, size);

    //Return:
    if (!list)
      return res.status(500).json({ status: 500, msg: "SERVER_ERROR" });
    return res.json({ status: 200, msg: "OK", data: list });
  } catch (e: any) {
    return res.status(500).json({ status: 500, msg: e.message });
  }
}

/**====================== GET PRODUCT BY ID ===========================**/

export async function getProductCtrl(req: Request, res: Response) {
  try {
    //data:
    const { id } = req.params;

    //Service:
    const product = await getProductServ(id);

    //return:

    if (!product)
      return res.status(404).json({ status: 404, msg: "PRODUCT_NOT_FOUND" });
    return res.json({ status: 200, msg: "OK", data: product });
  } catch (e: any) {
    return res.status(500).json({ status: 500, msg: e.message });
  }
}

/**====================== EDIT PRODUCT ===========================**/
export async function editProductCtrl(req: RequestExt, res: Response) {
  try {
    //data:
    const data = {
      user_id: req.uid,
      product_id: req.params.id,
      pt_id: req.body.type,
      product_name: req.body.name,
      product_brand: req.body.brand,
      product_price: req.body.price,
      product_stock: req.body.stock,
      product_offer: req.body.offer,
      product_description: req.body.description,
      product_status: req.body.status,
      product_warranty: req.body.warranty,
      address_id: req.body.address,
    };
    const tokenData = { uid: req.uid, rol: req.rol };

    //service:
    const updatedProduct = await editProductServ(tokenData, data);

    //Return:
    if (!updatedProduct)
      return res.status(500).json({ status: 500, msg: "SERVER_ERROR" });
    else if (
      updatedProduct === "PRODUCT_NOT_FOUND" ||
      updatedProduct === "ADDRESS_NOT_FOUND"
    )
      return res.status(404).json({ status: 404, msg: updatedProduct });
    else if (updatedProduct === "UNAUTHORIZED_ACTION")
      return res.status(401).json({ status: 401, msg: updatedProduct });
    else if (
      updatedProduct === "INVALID_PRODUCT_OFFER" ||
      updatedProduct === "INVALID_USER_ADDRESS"
    )
      return res.status(400).json({ status: 400, msg: updatedProduct });
    //Ok:
    return res.json({ status: 200, msg: "OK", data: updatedProduct });
  } catch (e: any) {
    return res.status(500).json({ status: 500, msg: e.message });
  }
}

/**====================== UPDATE VIEWS ===========================**/

export async function updateViewsCtrl(req: Request, res: Response) {
  try {
    //data:
    const { id } = req.params;

    //Service:
    const product = await updateViewsServ(id);

    //return:
    if (!product)
      return res.status(500).json({ status: 500, msg: "SERVER_ERROR" });
    else if (product === "PRODUCT_NOT_FOUND")
      return res.status(404).json({ status: 404, msg: product });
    else if (product === "VIEWS_UPDATED")
      return res.json({ status: 200, msg: "OK", data: product });
  } catch (e: any) {
    return res.status(500).json({ status: 500, msg: e.message });
  }
}

/** ============================= ADD FAVORITE PRODUCT ============================== **/
export async function addPFavoriteCtrl(req: RequestExt, res: Response) {
  try {
    //Data:
    const { user, product } = req.body;
    const tokenID = { uid: req.uid, rol: req.rol };
    //Service:
    const favorite = await addPFavoriteServ(tokenID, user, product);

    //return:
    if (favorite === "USER_NOT_FOUND" || favorite === "PRODUCT_NOT_FOUND")
      return res.status(404).json({ status: 404, msg: favorite });
    else if (
      favorite === "IS_YOUR_PRODUCT" ||
      favorite === "UNAUTHORIZED_ACTION"
    )
      return res.status(400).json({ status: 400, msg: favorite });
    //ok:
    else if (favorite === "FAVORITE_ADDED")
      return res.json({ status: 201, msg: favorite });
    else if (favorite === "FAVORITE_ELIMINATED")
      return res.json({ status: 200, msg: favorite });
  } catch (e: any) {
    return res.status(500).json({ status: 500, msg: e.message });
  }
}

/** ============================= LIST FAVORITE PRODUCT ============================== **/
export async function listPFavoriteCtrl(req: Request, res: Response) {
  try {
    //Data:
    const { id } = req.params;
    // query parameters:
    const page: number = parseInt(req.query.page as string);
    const size: number = parseInt(req.query.size as string);
    //Service:
    const list = await listPFavoriteServ(id, page, size);

    //Return:
    if (!list)
      return res.status(500).json({ status: 500, msg: "SERVER_ERROR" });
    else if (list === "USER_NOT_FOUND")
      return res.status(404).json({ status: 404, msg: list });

    //ok:
    return res.json({ status: 200, msg: "OK", data: list });
  } catch (e: any) {
    return res.status(500).json({ status: 500, msg: e.message });
  }
}

/** ============================= BUY PRODUCT ============================== **/
export async function buyProductCtrl(req: RequestExt, res: Response) {
  try {
    //Data:
    const bodySale = {
      sale_seller: req.body.seller,
      sale_buyer: req.body.buyer,
      sale_product: req.body.product,
      sale_quantity: req.body.quantity,
      sale_instalments: req.body.instalments,
      cc_id: req.body.creditCard,
    };
    const tokenData = {
      uid: req.uid,
      rol: req.rol,
    };

    //Service:
    const sale = await buyProductServ(tokenData, bodySale);

    //Return:
    if (!sale)
      return res.status(500).json({ status: 500, msg: "SERVER_ERROR" });
    else if (
      sale === "USER_NOT_FOUND" ||
      sale === "CREDITCARD_NOT_FOUND" ||
      sale === "PRODUCT_NOT_FOUND"
    )
      return res.status(404).json({ status: 404, msg: sale });
    else if (
      sale === "ERROR_CREATING" ||
      sale === "NO_STOCK" ||
      sale === "INVALID_CREDITCARD" ||
      sale === "INCORRECT_SELLER" ||
      sale === "SELLER_CANT_BUY_OWN_PRODUCT"
    )
      return res.status(400).json({ status: 400, msg: sale });
    else if (sale === "UNAUTHORIZED_ACTION")
      return res.status(401).json({ status: 401, msg: sale });
    //Ok:
    return res.json({ status: 200, msg: "OK", data: sale });
  } catch (e: any) {
    return res.status(500).json({ status: 500, msg: e.message });
  }
}
/** ============================= GET SALE  ============================== **/
export async function getSaleCtrl(req: Request, res: Response) {
  try {
    //Data:
    const { id } = req.params;
    //Service:
    const sale = await getSaleServ(id);

    //Return:
    if (!sale)
      return res.status(404).json({ status: 404, msg: "SALE_NOT_FOUND" });

    //Ok:
    return res.json({ status: 200, msg: "OK", data: sale });
  } catch (e: any) {
    return res.status(500).json({ status: 500, msg: e.message });
  }
}
/** ============================= LIST USER SALES  ============================== **/
export async function getUserSalesCtrl(req: RequestExt, res: Response) {
  try {
    //Data:
    const { id } = req.params;
    const tokenID = { uid: req.uid, rol: req.rol };
    // query parameters:
    const page: number = parseInt(req.query.page as string);
    const size: number = parseInt(req.query.size as string);
    //Service:
    const list = await getUserSalesServ(tokenID, id, page, size);

    //Return:
    if (!list)
      return res.status(500).json({ status: 500, msg: "SERVER_ERROR" });
    else if (list === "UNAUTHORIZED_ACTION")
      return res.status(401).json({ status: 401, msg: list });
    else if (list === "USER_NOT_FOUND")
      return res.status(404).json({ status: 404, msg: list });

    //Ok:
    return res.json({ status: 200, msg: "OK", data: list });
  } catch (e: any) {
    return res.status(500).json({ status: 500, msg: e.message });
  }
}
/** ============================= LIST USER BUYS  ============================== **/
export async function getUserBuysCtrl(req: RequestExt, res: Response) {
  try {
    //Data:
    const { id } = req.params;
    const tokenID = { uid: req.uid, rol: req.rol };
    // query parameters:
    const page: number = parseInt(req.query.page as string);
    const size: number = parseInt(req.query.size as string);
    //Service:
    const list = await getUserBuysServ(tokenID, id, page, size);

    //Return:
    if (!list)
      return res.status(500).json({ status: 500, msg: "SERVER_ERROR" });
    else if (list === "UNAUTHORIZED_ACTION")
      return res.status(401).json({ status: 401, msg: list });
    else if (list === "USER_NOT_FOUND")
      return res.status(404).json({ status: 404, msg: list });

    //Ok:
    return res.json({ status: 200, msg: "OK", data: list });
  } catch (e: any) {
    return res.status(500).json({ status: 500, msg: e.message });
  }
}

/** ============================= PAUSE PRODUCT  ============================== **/
export async function pauseProductCtrl(req: RequestExt, res: Response) {
  try {
    //Data:
    const { id } = req.params;
    const tokenID = { uid: req.uid, rol: req.rol };

    //Service:
    const resPause = await pauseProductServ(tokenID, id);

    //Return:
    if (!resPause)
      return res.status(500).json({ status: 500, msg: "SERVER_ERROR" });
    else if (resPause === "PRODUCT_NOT_FOUND")
      return res.status(404).json({ status: 404, msg: resPause });
    else if (resPause === "UNAUTHORIZED_ACTION")
      return res.status(401).json({ status: 401, msg: resPause });
    //Ok:
    return res.json({ status: 200, msg: "PRODUCT_PAUSED" });
  } catch (e: any) {
    return res.status(500).json({ status: 500, msg: e.message });
  }
}

/** ============================= REACTIVATE PRODUCT  ============================== **/
export async function reactivateProductCtrl(req: RequestExt, res: Response) {
  try {
    //Data:
    const { id } = req.params;
    const tokenID = { uid: req.uid, rol: req.rol };

    //Service:
    const reactivate = await reactivateProductServ(tokenID, id);

    //Return:
    if (!reactivate)
      return res.status(500).json({ status: 500, msg: "SERVER_ERROR" });
    else if (reactivate === "PRODUCT_NOT_FOUND")
      return res.status(404).json({ status: 404, msg: reactivate });
    else if (reactivate === "UNAUTHORIZED_ACTION")
      return res.status(401).json({ status: 401, msg: reactivate });
    else if (reactivate === "PRODUCT_IS_DELETED")
      return res.status(400).json({ status: 400, msg: reactivate });
    //Ok:
    return res.json({ status: 200, msg: "PRODUCT_REACTIVATED" });
  } catch (e: any) {
    return res.status(500).json({ status: 500, msg: e.message });
  }
}

/** ============================= DELETE PRODUCT  ============================== **/
export async function deleteProductCtrl(req: RequestExt, res: Response) {
  try {
    //Data:
    const { id } = req.params;
    const tokenID = { uid: req.uid, rol: req.rol };

    //Service:
    const resDelete = await deleteProductServ(tokenID, id);

    //Return:
    if (!resDelete)
      return res.status(500).json({ status: 500, msg: "SERVER_ERROR" });
    else if (resDelete === "PRODUCT_NOT_FOUND")
      return res.status(404).json({ status: 404, msg: resDelete });
    else if (resDelete === "UNAUTHORIZED_ACTION")
      return res.status(401).json({ status: 401, msg: resDelete });
    //Ok:
    return res.json({ status: 200, msg: "PRODUCT_DELETED" });
  } catch (e: any) {
    return res.status(500).json({ status: 500, msg: e.message });
  }
}

/** ============================= SEARCH QUERY PRODUCT  ============================== **/

export async function listQueryProductCtrl(req: Request, res: Response) {
  try {
    //data:
    const { search } = req.params;
    // query parameters:
    const page: number = parseInt(req.query.page as string);
    const size: number = parseInt(req.query.size as string);
    const category: string = req.query.category as string;
    const status: string = req.query.status as string;
    const type: string = req.query.type as string;
    const pmin: number = parseInt(req.query.pmin as string);
    const pmax: number = parseInt(req.query.pmax as string);

    //Service:
    const list = await listQueryProductServ(
      search,
      page,
      size,
      status,
      category,
      type,
      pmin,
      pmax
    );

    //Return:
    if (!list)
      return res.status(500).json({ status: 500, msg: "SERVER_ERROR" });
    return res.json({ status: 200, msg: "OK", data: list });
  } catch (e: any) {
    return res.status(500).json({ status: 500, msg: e.message });
  }
}
