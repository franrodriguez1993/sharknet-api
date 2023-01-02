"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.listQueryProductServ = exports.deleteProductServ = exports.reactivateProductServ = exports.pauseProductServ = exports.getUserBuysServ = exports.getUserSalesServ = exports.getSaleServ = exports.buyProductServ = exports.listPFavoriteServ = exports.addPFavoriteServ = exports.updateViewsServ = exports.editProductServ = exports.getProductServ = exports.listProductOfferServ = exports.listPTypeServ = exports.listPCategoryServ = exports.listPUserServ = exports.listPBrandServ = exports.listPStatusServ = exports.listProductsServ = exports.createProductServ = void 0;
//uuid:
const uuid_1 = require("uuid");
//Dao:
const containers_1 = require("../../containers");
const containers_2 = require("../../containers");
/**====================== CREATE PRODUCT ===========================**/
function createProductServ(tokenData, product) {
    return __awaiter(this, void 0, void 0, function* () {
        //Compare token ID with the seller ID:
        if (tokenData.uid.toString() !== product.user_id.toString() ||
            tokenData.rol.toString() === "staff" ||
            tokenData.rol === "admin")
            return "UNAUTHORIZED_ACTION";
        //CheckUser:
        const isUser = yield containers_2.daoUser.getUser("id", product.user_id, true);
        if (!isUser)
            return "USER_NOT_FOUND";
        //Check address:
        const isAddress = yield containers_2.daoUser.getAddress(product.address_id);
        if (!isAddress)
            return "ADDRESS_NOT_FOUND";
        if (isAddress.user_id.toString() !== product.user_id.toString())
            return "INVALID_USER_ADDRESS";
        //Normalize data:
        product.product_brand = product.product_brand.toString().toLowerCase();
        product.product_status = product.product_status.toString().toLowerCase();
        //Create:
        product.product_id = (0, uuid_1.v4)();
        return yield containers_1.daoProduct.createProduct(product);
    });
}
exports.createProductServ = createProductServ;
/**====================== LIST ALL PRODUCTS ===========================**/
function listProductsServ(page, size) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield containers_1.daoProduct.listProducts(null, null, page, size);
    });
}
exports.listProductsServ = listProductsServ;
/**====================== LIST PRODUCTS BY STATUS ===========================**/
function listPStatusServ(status, page, size) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield containers_1.daoProduct.listProducts("status", status, page, size);
    });
}
exports.listPStatusServ = listPStatusServ;
/**====================== LIST PRODUCTS BY BRAND ===========================**/
function listPBrandServ(brand, page, size) {
    return __awaiter(this, void 0, void 0, function* () {
        //Normalize brand name:
        const search = brand.split("_").join(" ");
        return yield containers_1.daoProduct.listProducts("brand", search, page, size);
    });
}
exports.listPBrandServ = listPBrandServ;
/**====================== LIST PRODUCTS BY USER ===========================**/
function listPUserServ(id, page, size) {
    return __awaiter(this, void 0, void 0, function* () {
        //check User:
        const user = yield containers_2.daoUser.getUser("id", id, true);
        if (!user)
            return "USER_NOT_FOUND";
        return yield containers_1.daoProduct.listProducts("seller", id, page, size);
    });
}
exports.listPUserServ = listPUserServ;
/**====================== LIST PRODUCTS BY CATEGORY ===========================**/
function listPCategoryServ(pc_id, page, size) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield containers_1.daoProduct.listProducts("category", pc_id, page, size);
    });
}
exports.listPCategoryServ = listPCategoryServ;
/**====================== LIST PRODUCTS BY TYPE  ===========================**/
//Use type id
function listPTypeServ(tid, page, size) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield containers_1.daoProduct.listProducts("type", tid, page, size);
    });
}
exports.listPTypeServ = listPTypeServ;
/**====================== LIST PRODUCTS BY OFFER  ===========================**/
function listProductOfferServ(page, size) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield containers_1.daoProduct.listProducts("offer", "", page, size);
    });
}
exports.listProductOfferServ = listProductOfferServ;
/**====================== GET PRODUCT BY ID ===========================**/
// use product id
function getProductServ(id) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield containers_1.daoProduct.getProduct(id);
    });
}
exports.getProductServ = getProductServ;
/**====================== EDIT PRODUCT ===========================**/
function editProductServ(tokenData, data) {
    return __awaiter(this, void 0, void 0, function* () {
        //Check Product:
        const product = yield containers_1.daoProduct.getProduct(data.product_id, true);
        if (!product)
            return "PRODUCT_NOT_FOUND";
        //Check Authorization:
        if (product.user_id.toString() !== tokenData.uid.toString() ||
            tokenData.rol === "staff" ||
            tokenData.rol === "admin")
            return "UNAUTHORIZED_ACTION";
        //Check address:
        if (data.address_id !== "") {
            const checkAddress = yield containers_2.daoUser.getAddress(data.address_id);
            if (!checkAddress)
                return "ADDRESS_NOT_FOUND";
            if (checkAddress.user_id.toString() !== product.user_id.toString())
                return "INVALID_USER_ADDRESS";
        }
        //check Offer:
        if (data.product_offer) {
            if (data.product_offer > 99 || data.product_offer < 1)
                return "INVALID_PRODUCT_OFFER";
        }
        //Edit:
        const updatedProduct = yield containers_1.daoProduct.editProduct(data);
        return updatedProduct;
    });
}
exports.editProductServ = editProductServ;
/**====================== UPDATE VIEWS ===========================**/
function updateViewsServ(id) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield containers_1.daoProduct.updateViews(id);
    });
}
exports.updateViewsServ = updateViewsServ;
/** ============================= ADD FAVORITE PRODUCT ============================== **/
function addPFavoriteServ(tokenID, uid, pid) {
    return __awaiter(this, void 0, void 0, function* () {
        //Check ids:
        const isUser = yield containers_2.daoUser.getUser("id", uid, true);
        if (!isUser)
            return "USER_NOT_FOUND";
        const isProduct = yield containers_1.daoProduct.getProduct(pid, true);
        if (!isProduct)
            return "PRODUCT_NOT_FOUND";
        if (isProduct.user_id.toString() === uid.toString())
            return "IS_YOUR_PRODUCT";
        //Check authorization:
        if (tokenID.uid.toString() !== uid.toString() ||
            tokenID.rol.toString() === "admin" ||
            tokenID.rol.toString() === "staff" ||
            tokenID.rol.toString() === "store")
            return "UNAUTHORIZED_ACTION";
        //add favorite:
        const pf_id = (0, uuid_1.v4)();
        return yield containers_1.daoProduct.addFavoriteProduct(pf_id, uid, pid);
    });
}
exports.addPFavoriteServ = addPFavoriteServ;
/** ============================= LIST FAVORITE PRODUCT ============================== **/
function listPFavoriteServ(uid, page, size) {
    return __awaiter(this, void 0, void 0, function* () {
        //check User:
        const isUser = yield containers_2.daoUser.getUser("id", uid, true);
        if (!isUser)
            return "USER_NOT_FOUND";
        //list:
        return yield containers_1.daoProduct.listFavorite(uid, page, size);
    });
}
exports.listPFavoriteServ = listPFavoriteServ;
/** ============================= BUY PRODUCT  ============================== **/
function buyProductServ(tokenData, data) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            //Check Authorization:
            if (tokenData.uid.toString() !== data.sale_buyer.toString() ||
                tokenData.rol.toString() !== "user" ||
                tokenData.uid.toString() === data.sale_seller.toString())
                return "UNAUTHORIZED_ACTION";
            //check users:
            const buyer = yield containers_2.daoUser.getUser("id", data.sale_buyer);
            const seller = yield containers_2.daoUser.getUser("id", data.sale_seller);
            if (!buyer || !seller)
                return "USER_NOT_FOUND";
            //check creditCard:
            const creditCard = yield containers_2.daoUser.getCreditCard(data.cc_id);
            if (!creditCard)
                return "CREDITCARD_NOT_FOUND";
            if (creditCard.user_id.toString() !== data.sale_buyer.toString())
                return "INVALID_CREDITCARD";
            //Check product and seller:
            const product = yield containers_1.daoProduct.getProduct(data.sale_product, true);
            if (product.user_id.toString() !== data.sale_seller.toString())
                return "INCORRECT_SELLER";
            if (product.user_id.toString() === data.sale_buyer.toString())
                return "SELLER_CANT_BUY_OWN_PRODUCT";
            //Create sale:
            const sale_id = (0, uuid_1.v4)();
            const sale = yield containers_1.daoSale.Buy(Object.assign(Object.assign({}, data), { sale_id }));
            if (sale) {
                //Notification to seller:
                yield containers_1.daoNotification.createNotification({
                    user_id: data.sale_seller,
                    notification_type: "PRODUCT_SOLD",
                    product_id: data.sale_product,
                });
                return sale;
            }
        }
        catch (e) {
            throw new Error(e.message);
        }
    });
}
exports.buyProductServ = buyProductServ;
/** ============================= GET SALE  ============================== **/
function getSaleServ(sale_id) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield containers_1.daoSale.getSale(sale_id);
    });
}
exports.getSaleServ = getSaleServ;
/** ============================= LIST USER SALES  ============================== **/
function getUserSalesServ(tokenID, user_id, page, size) {
    return __awaiter(this, void 0, void 0, function* () {
        //Check user:
        const user = yield containers_2.daoUser.getUser("id", user_id, true);
        if (!user)
            return "USER_NOT_FOUND";
        //Chech Authorization:
        if (tokenID.uid.toString() !== user_id.toString())
            return "UNAUTHORIZED_ACTION";
        return yield containers_1.daoSale.listSales(user_id, "sale", page, size);
    });
}
exports.getUserSalesServ = getUserSalesServ;
/** ============================= LIST USER BUYS  ============================== **/
function getUserBuysServ(tokenID, user_id, page, size) {
    return __awaiter(this, void 0, void 0, function* () {
        //Check user:
        const user = yield containers_2.daoUser.getUser("id", user_id, true);
        if (!user)
            return "USER_NOT_FOUND";
        //Chech Authorization:
        if (tokenID.uid.toString() !== user_id.toString())
            return "UNAUTHORIZED_ACTION";
        return yield containers_1.daoSale.listSales(user_id, "buy", page, size);
    });
}
exports.getUserBuysServ = getUserBuysServ;
/** ============================= PAUSE PRODUCT  ============================== **/
function pauseProductServ(tokenID, product_id) {
    return __awaiter(this, void 0, void 0, function* () {
        //Check product:
        const product = yield containers_1.daoProduct.getProduct(product_id, true);
        if (!product)
            return "PRODUCT_NOT_FOUND";
        if (product.user_id.toString() !== tokenID.uid.toString())
            return "UNAUTHORIZED_ACTION";
        //Pause:
        return yield containers_1.daoProduct.pauseProduct(product_id);
    });
}
exports.pauseProductServ = pauseProductServ;
/** ============================= PAUSE PRODUCT  ============================== **/
function reactivateProductServ(tokenID, product_id) {
    return __awaiter(this, void 0, void 0, function* () {
        //Check product:
        const product = yield containers_1.daoProduct.getProduct(product_id, true);
        if (!product)
            return "PRODUCT_NOT_FOUND";
        if (product.user_id.toString() !== tokenID.uid.toString())
            return "UNAUTHORIZED_ACTION";
        //Pause:
        return yield containers_1.daoProduct.reactivateProduct(product_id);
    });
}
exports.reactivateProductServ = reactivateProductServ;
/** ============================= DELETE PRODUCT  ============================== **/
function deleteProductServ(tokenID, product_id) {
    return __awaiter(this, void 0, void 0, function* () {
        //Check product:
        const product = yield containers_1.daoProduct.getProduct(product_id, true);
        if (!product)
            return "PRODUCT_NOT_FOUND";
        if (product.user_id.toString() !== tokenID.uid.toString())
            return "UNAUTHORIZED_ACTION";
        //Pause:
        return yield containers_1.daoProduct.deleteProduct(product_id);
    });
}
exports.deleteProductServ = deleteProductServ;
/** ============================= SEARCH QUERY PRODUCT  ============================== **/
function listQueryProductServ(search, page, size, status, category, type, pmin, pmax) {
    return __awaiter(this, void 0, void 0, function* () {
        //Normalize brand name:
        const newSearch = search.split("_").join(" ").toLowerCase();
        if (Number.isNaN(pmin))
            pmin = 0;
        if (Number.isNaN(pmax))
            pmax = 10000000;
        return yield containers_1.daoProduct.searchQueryProducts(newSearch, page, size, status, category, type, pmin, pmax);
    });
}
exports.listQueryProductServ = listQueryProductServ;