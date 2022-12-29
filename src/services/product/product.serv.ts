//uuid:
import { v4 as uuidv4 } from "uuid";
//Dao:
import { daoNotification, daoProduct, daoSale } from "../../containers";
import { daoUser } from "../../containers";

//Interfaces:
import { productInterface } from "../../interfaces/productInterface/product.interface";
import { saleInterface } from "../../interfaces/productInterface/sale.interface";
import { addressInterface } from "../../interfaces/userInterface/address.Interface";
import { creditCardInterface } from "../../interfaces/userInterface/creditCard.interface";
import { ReqTokenDataInterface } from "../../interfaces/userInterface/reqTokenData.interface";

/**====================== CREATE PRODUCT ===========================**/

export async function createProductServ(
  tokenData: ReqTokenDataInterface,
  product: productInterface
) {
  //Compare token ID with the seller ID:
  if (
    tokenData.uid.toString() !== product.user_id.toString() ||
    tokenData.rol.toString() === "staff" ||
    tokenData.rol === "admin"
  )
    return "UNAUTHORIZED_ACTION";

  //CheckUser:
  const isUser = await daoUser.getUser("id", product.user_id, true);
  if (!isUser) return "USER_NOT_FOUND";

  //Check address:
  const isAddress: addressInterface | any = await daoUser.getAddress(
    product.address_id
  );
  if (!isAddress) return "ADDRESS_NOT_FOUND";
  if (isAddress.user_id.toString() !== product.user_id.toString())
    return "INVALID_USER_ADDRESS";

  //Normalize data:
  product.product_brand = product.product_brand.toString().toLowerCase();
  product.product_status = product.product_status.toString().toLowerCase();

  //Create:
  product.product_id = uuidv4();
  return await daoProduct.createProduct(product);
}

/**====================== LIST ALL PRODUCTS ===========================**/
export async function listProductsServ(page: number, size: number) {
  return await daoProduct.listProducts(null, null, page, size);
}

/**====================== LIST PRODUCTS BY STATUS ===========================**/
export async function listPStatusServ(
  status: string,
  page: number,
  size: number
) {
  return await daoProduct.listProducts("status", status, page, size);
}

/**====================== LIST PRODUCTS BY BRAND ===========================**/
export async function listPBrandServ(
  brand: string,
  page: number,
  size: number
) {
  //Normalize brand name:
  const search = brand.split("_").join(" ");
  return await daoProduct.listProducts("brand", search, page, size);
}

/**====================== LIST PRODUCTS BY USER ===========================**/

export async function listPUserServ(id: string, page: number, size: number) {
  //check User:
  const user = await daoUser.getUser("id", id, true);
  if (!user) return "USER_NOT_FOUND";
  return await daoProduct.listProducts("seller", id, page, size);
}

/**====================== LIST PRODUCTS BY CATEGORY ===========================**/

export async function listPCategoryServ(
  pc_id: string,
  page: number,
  size: number
) {
  return await daoProduct.listProducts("category", pc_id, page, size);
}

/**====================== LIST PRODUCTS BY TYPE  ===========================**/
//Use type id
export async function listPTypeServ(tid: string, page: number, size: number) {
  return await daoProduct.listProducts("type", tid, page, size);
}

/**====================== LIST PRODUCTS BY OFFER  ===========================**/
export async function listProductOfferServ(page: number, size: number) {
  return await daoProduct.listProducts("offer", "", page, size);
}

/**====================== GET PRODUCT BY ID ===========================**/
// use product id
export async function getProductServ(id: string) {
  return await daoProduct.getProduct(id);
}

/**====================== EDIT PRODUCT ===========================**/
export async function editProductServ(
  tokenData: ReqTokenDataInterface,
  data: productInterface
) {
  //Check Product:
  const product: productInterface | any = await daoProduct.getProduct(
    data.product_id,
    true
  );
  if (!product) return "PRODUCT_NOT_FOUND";

  //Check Authorization:
  if (
    product.user_id.toString() !== tokenData.uid.toString() ||
    tokenData.rol === "staff" ||
    tokenData.rol === "admin"
  )
    return "UNAUTHORIZED_ACTION";

  //Check address:
  if (data.address_id !== "") {
    const checkAddress: addressInterface | any = await daoUser.getAddress(
      data.address_id
    );
    if (!checkAddress) return "ADDRESS_NOT_FOUND";
    if (checkAddress.user_id.toString() !== product.user_id.toString())
      return "INVALID_USER_ADDRESS";
  }
  //check Offer:
  if (data.product_offer) {
    if (data.product_offer > 99 || data.product_offer < 1)
      return "INVALID_PRODUCT_OFFER";
  }

  //Edit:
  const updatedProduct = await daoProduct.editProduct(data);

  return updatedProduct;
}

/**====================== UPDATE VIEWS ===========================**/
export async function updateViewsServ(id: string) {
  return await daoProduct.updateViews(id);
}

/** ============================= ADD FAVORITE PRODUCT ============================== **/
export async function addPFavoriteServ(
  tokenID: ReqTokenDataInterface,
  uid: string,
  pid: string
) {
  //Check ids:
  const isUser = await daoUser.getUser("id", uid, true);
  if (!isUser) return "USER_NOT_FOUND";
  const isProduct: productInterface | any = await daoProduct.getProduct(
    pid,
    true
  );
  if (!isProduct) return "PRODUCT_NOT_FOUND";
  if (isProduct.user_id.toString() === uid.toString()) return "IS_YOUR_PRODUCT";

  //Check authorization:
  if (
    tokenID.uid.toString() !== uid.toString() ||
    tokenID.rol.toString() === "admin" ||
    tokenID.rol.toString() === "staff" ||
    tokenID.rol.toString() === "store"
  )
    return "UNAUTHORIZED_ACTION";

  //add favorite:
  const pf_id = uuidv4();
  return await daoProduct.addFavoriteProduct(pf_id, uid, pid);
}

/** ============================= LIST FAVORITE PRODUCT ============================== **/
export async function listPFavoriteServ(
  uid: string,
  page: number,
  size: number
) {
  //check User:
  const isUser = await daoUser.getUser("id", uid, true);
  if (!isUser) return "USER_NOT_FOUND";

  //list:
  return await daoProduct.listFavorite(uid, page, size);
}

/** ============================= BUY PRODUCT  ============================== **/

export async function buyProductServ(
  tokenData: ReqTokenDataInterface,
  data: saleInterface
) {
  try {
    //Check Authorization:
    if (
      tokenData.uid.toString() !== data.sale_buyer.toString() ||
      tokenData.rol.toString() !== "user" ||
      tokenData.uid.toString() === data.sale_seller.toString()
    )
      return "UNAUTHORIZED_ACTION";
    //check users:
    const buyer = await daoUser.getUser("id", data.sale_buyer);
    const seller = await daoUser.getUser("id", data.sale_seller);
    if (!buyer || !seller) return "USER_NOT_FOUND";

    //check creditCard:
    const creditCard: creditCardInterface | any = await daoUser.getCreditCard(
      data.cc_id
    );
    if (!creditCard) return "CREDITCARD_NOT_FOUND";
    if (creditCard.user_id.toString() !== data.sale_buyer.toString())
      return "INVALID_CREDITCARD";

    //Check product and seller:
    const product: productInterface | any = await daoProduct.getProduct(
      data.sale_product,
      true
    );
    if (product.user_id.toString() !== data.sale_seller.toString())
      return "INCORRECT_SELLER";
    if (product.user_id.toString() === data.sale_buyer.toString())
      return "SELLER_CANT_BUY_OWN_PRODUCT";

    //Create sale:
    const sale_id = uuidv4();
    const sale = await daoSale.Buy({ ...data, sale_id });

    if (sale) {
      //Notification to seller:
      await daoNotification.createNotification({
        user_id: data.sale_seller,
        notification_type: "PRODUCT_SOLD",
        product_id: data.sale_product,
      });
      return sale;
    }
  } catch (e: any) {
    throw new Error(e.message);
  }
}

/** ============================= GET SALE  ============================== **/
export async function getSaleServ(sale_id: string) {
  return await daoSale.getSale(sale_id);
}

/** ============================= LIST USER SALES  ============================== **/
export async function getUserSalesServ(
  tokenID: ReqTokenDataInterface,
  user_id: string,
  page: number,
  size: number
) {
  //Check user:
  const user = await daoUser.getUser("id", user_id, true);
  if (!user) return "USER_NOT_FOUND";

  //Chech Authorization:
  if (tokenID.uid.toString() !== user_id.toString())
    return "UNAUTHORIZED_ACTION";

  return await daoSale.listSales(user_id, "sale", page, size);
}

/** ============================= LIST USER BUYS  ============================== **/
export async function getUserBuysServ(
  tokenID: ReqTokenDataInterface,
  user_id: string,
  page: number,
  size: number
) {
  //Check user:
  const user = await daoUser.getUser("id", user_id, true);
  if (!user) return "USER_NOT_FOUND";

  //Chech Authorization:
  if (tokenID.uid.toString() !== user_id.toString())
    return "UNAUTHORIZED_ACTION";

  return await daoSale.listSales(user_id, "buy", page, size);
}

/** ============================= PAUSE PRODUCT  ============================== **/
export async function pauseProductServ(
  tokenID: ReqTokenDataInterface,
  product_id: string
) {
  //Check product:
  const product: productInterface | any = await daoProduct.getProduct(
    product_id,
    true
  );
  if (!product) return "PRODUCT_NOT_FOUND";
  if (product.user_id.toString() !== tokenID.uid.toString())
    return "UNAUTHORIZED_ACTION";

  //Pause:
  return await daoProduct.pauseProduct(product_id);
}
/** ============================= PAUSE PRODUCT  ============================== **/
export async function reactivateProductServ(
  tokenID: ReqTokenDataInterface,
  product_id: string
) {
  //Check product:
  const product: productInterface | any = await daoProduct.getProduct(
    product_id,
    true
  );
  if (!product) return "PRODUCT_NOT_FOUND";
  if (product.user_id.toString() !== tokenID.uid.toString())
    return "UNAUTHORIZED_ACTION";

  //Pause:
  return await daoProduct.reactivateProduct(product_id);
}

/** ============================= DELETE PRODUCT  ============================== **/
export async function deleteProductServ(
  tokenID: ReqTokenDataInterface,
  product_id: string
) {
  //Check product:
  const product: productInterface | any = await daoProduct.getProduct(
    product_id,
    true
  );
  if (!product) return "PRODUCT_NOT_FOUND";
  if (product.user_id.toString() !== tokenID.uid.toString())
    return "UNAUTHORIZED_ACTION";

  //Pause:
  return await daoProduct.deleteProduct(product_id);
}

/** ============================= SEARCH QUERY PRODUCT  ============================== **/
export async function listQueryProductServ(
  search: string,
  page: number,
  size: number,
  status: string,
  category: string,
  type: string,
  pmin: number,
  pmax: number
) {
  //Normalize brand name:
  const newSearch = search.split("_").join(" ").toLowerCase();
  if (Number.isNaN(pmin)) pmin = 0;
  if (Number.isNaN(pmax)) pmax = 10000000;
  return await daoProduct.searchQueryProducts(
    newSearch,
    page,
    size,
    status,
    category,
    type,
    pmin,
    pmax
  );
}
