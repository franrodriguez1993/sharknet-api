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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const uuid_1 = require("uuid");
const configServer_1 = __importDefault(require("../../config/configServer"));
const UploadImages_1 = __importDefault(require("../../utils/UploadImages"));
const uploaderManager = new UploadImages_1.default();
//Dao:
const containers_1 = require("../../containers");
const containers_2 = require("../../containers");
class productService {
    /**============== CREATE PRODUCT =============**/
    createProductServ(tokenData, product) {
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
    /**=============== LIST ALL PRODUCTS ================**/
    listProductsServ(page, size) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield containers_1.daoProduct.listProducts(null, null, page, size);
        });
    }
    /**================ LIST PRODUCTS BY STATUS =================**/
    listPStatusServ(status, page, size) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield containers_1.daoProduct.listProducts("status", status, page, size);
        });
    }
    /**============= LIST PRODUCTS BY BRAND ===============**/
    listPBrandServ(brand, page, size) {
        return __awaiter(this, void 0, void 0, function* () {
            //Normalize brand name:
            const search = brand.split("_").join(" ");
            return yield containers_1.daoProduct.listProducts("brand", search, page, size);
        });
    }
    /**============ LIST PRODUCTS BY USER =================**/
    listPUserServ(id, page, size) {
        return __awaiter(this, void 0, void 0, function* () {
            //check User:
            const user = yield containers_2.daoUser.getUser("id", id, true);
            if (!user)
                return "USER_NOT_FOUND";
            return yield containers_1.daoProduct.listProducts("seller", id, page, size);
        });
    }
    /**============== LIST PRODUCTS BY CATEGORY =================**/
    listPCategoryServ(pc_id, page, size) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield containers_1.daoProduct.listProducts("category", pc_id, page, size);
        });
    }
    /**================= LIST PRODUCTS BY TYPE  ===================**/
    //Use type id
    listPTypeServ(tid, page, size) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield containers_1.daoProduct.listProducts("type", tid, page, size);
        });
    }
    /**============== LIST PRODUCTS BY OFFER  ==================**/
    listProductOfferServ(page, size) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield containers_1.daoProduct.listProducts("offer", "", page, size);
        });
    }
    /**=============== GET PRODUCT BY ID ===================**/
    // use product id
    getProductServ(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield containers_1.daoProduct.getProduct(id);
        });
    }
    /**============== EDIT PRODUCT ================**/
    editProductServ(tokenData, data) {
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
    /**=============== UPDATE VIEWS =================**/
    updateViewsServ(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield containers_1.daoProduct.updateViews(id);
        });
    }
    /** =================== ADD FAVORITE PRODUCT =================== **/
    addPFavoriteServ(tokenID, uid, pid) {
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
    /** ================ LIST FAVORITE PRODUCT =============== **/
    listPFavoriteServ(uid, page, size) {
        return __awaiter(this, void 0, void 0, function* () {
            //check User:
            const isUser = yield containers_2.daoUser.getUser("id", uid, true);
            if (!isUser)
                return "USER_NOT_FOUND";
            //list:
            return yield containers_1.daoProduct.listFavorite(uid, page, size);
        });
    }
    /** ================= BUY PRODUCT  =================== **/
    buyProductServ(tokenData, data) {
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
    /** ====================== GET SALE  ===================== **/
    getSaleServ(sale_id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield containers_1.daoSale.getSale(sale_id);
        });
    }
    /** =================== LIST USER SALES  ================== **/
    getUserSalesServ(tokenID, user_id, page, size) {
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
    /** ================== LIST USER BUYS  ================== **/
    getUserBuysServ(tokenID, user_id, page, size) {
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
    /** ================ PAUSE PRODUCT  ================== **/
    pauseProductServ(tokenID, product_id) {
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
    /** =================== PAUSE PRODUCT  ================== **/
    reactivateProductServ(tokenID, product_id) {
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
    /** ================== DELETE PRODUCT  =================== **/
    deleteProductServ(tokenID, product_id) {
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
    /** =============== SEARCH QUERY PRODUCT  ================ **/
    listQueryProductServ(search, page, size, status, category, type, pmin, pmax) {
        return __awaiter(this, void 0, void 0, function* () {
            //Normalize brand name:
            const newSearch = search.split("_").join(" ").toLowerCase();
            //Price params:
            if (Number.isNaN(pmin))
                pmin = 0;
            if (Number.isNaN(pmax))
                pmax = 10000000;
            return yield containers_1.daoProduct.searchQueryProducts(newSearch, page, size, status, category, type, pmin, pmax);
        });
    }
    /**~~~~~~~~~~~~~~~~~  IMAGE THUMBNAIL PRODUCT  ~~~~~~~~~~~~~~~~~~~**/
    updateThumbnailServ(tokenUID, product_id, image) {
        return __awaiter(this, void 0, void 0, function* () {
            const folderId = configServer_1.default.google.folders.products;
            //Check Product:
            const product = yield containers_1.daoProduct.getProduct(product_id, true);
            if (!product)
                return "PRODUCT_NOT_FOUND";
            if (product.user_id.toString() !== tokenUID.toString())
                return "INVALID_SELLER";
            //Upload image to google:
            const imageData = yield uploaderManager.uploadFile(product_id, image, folderId);
            //Check path:
            if (!imageData)
                return "ERROR_UPLOADING_PHOTO";
            //Create path:
            const product_thumbnail = `https://drive.google.com/uc?id=${imageData.imageId}`;
            return yield containers_1.daoProduct.updateThumbnail(product_id, product_thumbnail);
        });
    }
}
exports.default = productService;
