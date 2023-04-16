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
const logger_1 = __importDefault(require("../../utils/logger"));
//Service:
const product_serv_1 = __importDefault(require("../../services/product/product.serv"));
const service = new product_serv_1.default();
class productController {
    /**============ CREATE PRODUCT ===============**/
    createProductCtrl(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                //Data:
                const data = {
                    pt_id: req.body.type,
                    user_id: req.body.seller,
                    product_name: req.body.name,
                    product_brand: req.body.brand,
                    product_price: req.body.price,
                    product_stock: req.body.stock,
                    product_description: req.body.description,
                    product_status: req.body.status,
                    product_warranty: req.body.warranty,
                    address_id: req.body.address,
                    pc_id: req.body.category, //id
                };
                const tokenData = {
                    uid: req.uid,
                    rol: req.rol,
                };
                //Service:
                const product = yield service.createProductServ(tokenData, data);
                //Return:
                if (!product)
                    return res.status(500).json({ status: 500, msg: "SERVER_ERROR" });
                else if (product === "USER_NOT_FOUND" || product === "ADDRESS_NOT_FOUND")
                    return res.status(404).json({ status: 404, msg: product });
                else if (product === "UNAUTHORIZED_ACTION")
                    return res.status(401).json({ status: 401, msg: product });
                else if (product === "INVALID_USER_ADDRESS" ||
                    product === "ERROR_CREATING")
                    return res.status(400).json({ status: 400, msg: product });
                //Ok:
                return res.status(201).json({ status: 201, msg: "OK", data: product });
            }
            catch (e) {
                logger_1.default.error(e.message);
                return res.status(500).json({ status: 500, msg: e.message });
            }
        });
    }
    /**================ LIST PRODUCTS =================**/
    listProductsCtrl(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // query parameters:
                const page = parseInt(req.query.page);
                const size = parseInt(req.query.size);
                //service:
                const list = yield service.listProductsServ(page, size);
                if (!list)
                    return res.status(500).json({ status: 500, msg: "SERVER_ERROR" });
                //return:
                return res.json({ status: 200, msg: "OK", data: list });
            }
            catch (e) {
                logger_1.default.error(e.message);
                return res.status(500).json({ status: 500, msg: e.message });
            }
        });
    }
    /**================ LIST PRODUCTS BY STATUS ====================**/
    listPStatusCtrl(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                //data:
                const { status } = req.params;
                // query parameters:
                const page = parseInt(req.query.page);
                const size = parseInt(req.query.size);
                //Service:
                const list = yield service.listPStatusServ(status, page, size);
                if (!list)
                    return res.status(500).json({ status: 500, msg: "SERVER_ERROR" });
                //return:
                return res.json({ status: 200, msg: "OK", data: list });
            }
            catch (e) {
                logger_1.default.error(e.message);
                return res.status(500).json({ status: 500, msg: e.message });
            }
        });
    }
    /**================= LIST PRODUCTS BY BRAND ====================**/
    listPBrandCtrl(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                //data:
                const { brand } = req.params;
                // query parameters:
                const page = parseInt(req.query.page);
                const size = parseInt(req.query.size);
                //Service:
                const list = yield service.listPBrandServ(brand, page, size);
                if (!list)
                    return res.status(500).json({ status: 500, msg: "SERVER_ERROR" });
                //return:
                return res.json({ status: 200, msg: "OK", data: list });
            }
            catch (e) {
                logger_1.default.error(e.message);
                return res.status(500).json({ status: 500, msg: e.message });
            }
        });
    }
    /**================== LIST PRODUCTS BY USER ====================**/
    //Difference: seller is for more products in "product section" and user is for user panel administration.
    listPUserCtrl(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                //data:
                const { id } = req.params;
                // query parameters:
                const page = parseInt(req.query.page);
                const size = parseInt(req.query.size);
                //Service:
                const list = yield service.listPUserServ(id, page, size);
                //return:
                if (!list)
                    return res.status(500).json({ status: 500, msg: "SERVER_ERROR" });
                else if (list === "USER_NOT_FOUND")
                    return res.status(404).json({ status: 404, msg: list });
                //Ok:
                return res.json({ status: 200, msg: "OK", data: list });
            }
            catch (e) {
                logger_1.default.error(e.message);
                return res.status(500).json({ status: 500, msg: e.message });
            }
        });
    }
    /**================== LIST PRODUCTS BY SELLER ====================**/
    //Difference: seller is for more products in "product section" and user is for user panel administration.
    listPSellerCtrl(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                //data:
                const { id } = req.params;
                // query parameters:
                const page = parseInt(req.query.page);
                const size = parseInt(req.query.size);
                //Service:
                const list = yield service.listPSellerServ(id, page, size);
                //return:
                if (!list)
                    return res.status(500).json({ status: 500, msg: "SERVER_ERROR" });
                else if (list === "USER_NOT_FOUND")
                    return res.status(404).json({ status: 404, msg: list });
                //Ok:
                return res.json({ status: 200, msg: "OK", data: list });
            }
            catch (e) {
                logger_1.default.error(e.message);
                return res.status(500).json({ status: 500, msg: e.message });
            }
        });
    }
    /**=============== LIST PRODUCTS BY CATEGORY ===================**/
    listPCategoryCtrl(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                //data:
                const { id } = req.params;
                // query parameters:
                const page = parseInt(req.query.page);
                const size = parseInt(req.query.size);
                //service:
                const list = yield service.listPCategoryServ(id, page, size);
                if (!list)
                    return res.status(500).json({ status: 500, msg: "SERVER_ERROR" });
                //return:
                return res.json({ status: 200, msg: "OK", data: list });
            }
            catch (e) {
                logger_1.default.error(e.message);
                return res.status(500).json({ status: 500, msg: e.message });
            }
        });
    }
    /**================= LIST PRODUCTS BY TYPE  =================**/
    listPTypeCtrl(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                //data:
                const { id } = req.params;
                // query parameters:
                const page = parseInt(req.query.page);
                const size = parseInt(req.query.size);
                //Service:
                const list = yield service.listPTypeServ(id, page, size);
                if (!list)
                    return res.status(500).json({ status: 500, msg: "SERVER_ERROR" });
                //return:
                return res.json({ status: 200, msg: "OK", data: list });
            }
            catch (e) {
                logger_1.default.error(e.message);
                return res.status(500).json({ status: 500, msg: e.message });
            }
        });
    }
    /**================ LIST PRODUCTS BY OFFER  ================**/
    listProductOfferCtrl(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // query parameters:
                const page = parseInt(req.query.page);
                const size = parseInt(req.query.size);
                //Service:
                const list = yield service.listProductOfferServ(page, size);
                //Return:
                if (!list)
                    return res.status(500).json({ status: 500, msg: "SERVER_ERROR" });
                return res.json({ status: 200, msg: "OK", data: list });
            }
            catch (e) {
                logger_1.default.error(e.message);
                return res.status(500).json({ status: 500, msg: e.message });
            }
        });
    }
    /**============= GET PRODUCT BY ID ================**/
    getProductCtrl(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                //data:
                const { id } = req.params;
                //Service:
                const resService = yield service.getProductServ(id);
                //return:
                if (!resService)
                    return res.status(404).json({ status: 404, msg: "PRODUCT_NOT_FOUND" });
                else if (resService === "INVALID_PRODUCT_ID") {
                    return res.status(400).json({ status: 400, msg: resService });
                }
                return res.json({ status: 200, msg: "OK", data: resService });
            }
            catch (e) {
                logger_1.default.error(e.message);
                return res.status(500).json({ status: 500, msg: e.message });
            }
        });
    }
    /**================= EDIT PRODUCT ==================**/
    editProductCtrl(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
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
                const resService = yield service.editProductServ(tokenData, data);
                //Return:
                if (!resService)
                    return res.status(500).json({ status: 500, msg: "SERVER_ERROR" });
                else if (resService === "PRODUCT_NOT_FOUND" ||
                    resService === "ADDRESS_NOT_FOUND")
                    return res.status(404).json({ status: 404, msg: resService });
                else if (resService === "UNAUTHORIZED_ACTION")
                    return res.status(401).json({ status: 401, msg: resService });
                else if (resService === "INVALID_PRODUCT_OFFER" ||
                    resService === "INVALID_USER_ADDRESS" ||
                    resService === "INVALID_PRODUCT_ID")
                    return res.status(400).json({ status: 400, msg: resService });
                //Ok:
                return res.json({ status: 200, msg: "OK", data: resService });
            }
            catch (e) {
                logger_1.default.error(e.message);
                return res.status(500).json({ status: 500, msg: e.message });
            }
        });
    }
    /**============= UPDATE VIEWS =================**/
    updateViewsCtrl(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                //data:
                const { id } = req.params;
                //Service:
                const resService = yield service.updateViewsServ(id);
                //return:
                if (!resService)
                    return res.status(500).json({ status: 500, msg: "SERVER_ERROR" });
                else if (resService === "PRODUCT_NOT_FOUND")
                    return res.status(404).json({ status: 404, msg: resService });
                else if (resService === "INVALID_PRODUCT_ID") {
                    return res.status(400).json({ status: 400, msg: resService });
                }
                else if (resService === "VIEWS_UPDATED")
                    return res.json({ status: 200, msg: "OK", data: resService });
            }
            catch (e) {
                logger_1.default.error(e.message);
                return res.status(500).json({ status: 500, msg: e.message });
            }
        });
    }
    /** ===================== ADD FAVORITE PRODUCT ====================== **/
    addPFavoriteCtrl(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                //Data:
                const { user, product } = req.body;
                const tokenID = { uid: req.uid, rol: req.rol };
                //Service:
                const resService = yield service.addPFavoriteServ(tokenID, user, product);
                //return:
                if (resService === "USER_NOT_FOUND" || resService === "PRODUCT_NOT_FOUND")
                    return res.status(404).json({ status: 404, msg: resService });
                else if (resService === "IS_YOUR_PRODUCT" ||
                    resService === "UNAUTHORIZED_ACTION" ||
                    resService === "INVALID_PRODUCT_ID")
                    return res.status(400).json({ status: 400, msg: resService });
                //ok:
                else if (resService === "FAVORITE_ADDED")
                    return res.json({ status: 201, msg: resService });
                else if (resService === "FAVORITE_ELIMINATED")
                    return res.json({ status: 200, msg: resService });
            }
            catch (e) {
                logger_1.default.error(e.message);
                return res.status(500).json({ status: 500, msg: e.message });
            }
        });
    }
    /** ===================== LIST FAVORITE PRODUCT ======================= **/
    listPFavoriteCtrl(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                //Data:
                const { id } = req.params;
                // query parameters:
                const page = parseInt(req.query.page);
                const size = parseInt(req.query.size);
                //Service:
                const resService = yield service.listPFavoriteServ(id, page, size);
                //Return:
                if (!resService)
                    return res.status(500).json({ status: 500, msg: "SERVER_ERROR" });
                else if (resService === "INVALID_USER_ID") {
                    return res.status(400).json({ status: 400, msg: resService });
                }
                else if (resService === "USER_NOT_FOUND")
                    return res.status(404).json({ status: 404, msg: resService });
                //ok:
                return res.json({ status: 200, msg: "OK", data: resService });
            }
            catch (e) {
                logger_1.default.error(e.message);
                return res.status(500).json({ status: 500, msg: e.message });
            }
        });
    }
    /** ======================= BUY PRODUCT ========================= **/
    buyProductCtrl(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                //Data:
                const bodySale = {
                    sale_buyer: req.body.buyer,
                    sale_product: req.body.products,
                    sale_instalments: req.body.instalments,
                };
                const tokenData = {
                    uid: req.uid,
                    rol: req.rol,
                };
                //Service:
                const sale = yield service.buyProductServ(tokenData, bodySale);
                //Return:
                if (!sale)
                    return res.status(500).json({ status: 500, msg: "SERVER_ERROR" });
                else if (sale === "USER_NOT_FOUND" || sale === "PRODUCT_NOT_FOUND")
                    return res.status(404).json({ status: 404, msg: sale });
                else if (sale === "ERROR_CREATING" ||
                    sale === "INVALID_PRODUCTS" ||
                    sale === "INVALID_USER_ID")
                    return res.status(400).json({ status: 400, msg: sale });
                else if (sale === "UNAUTHORIZED_ACTION")
                    return res.status(401).json({ status: 401, msg: sale });
                //Ok:
                return res.json({ status: 200, msg: "OK", data: sale });
            }
            catch (e) {
                logger_1.default.error(e.message);
                return res.status(500).json({ status: 500, msg: e.message });
            }
        });
    }
    /** ===================== GET SALE  ====================== **/
    getSaleCtrl(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                //Data:
                const { id } = req.params;
                //Service:
                const resService = yield service.getSaleServ(id);
                //Return:
                if (!resService)
                    return res.status(404).json({ status: 404, msg: "SALE_NOT_FOUND" });
                else if (resService === "INVALID_SALE_ID") {
                    return res.status(400).json({ status: 400, msg: resService });
                }
                //Ok:
                return res.json({ status: 200, msg: "OK", data: resService });
            }
            catch (e) {
                logger_1.default.error(e.message);
                return res.status(500).json({ status: 500, msg: e.message });
            }
        });
    }
    /** ==================== LIST USER SALES  ======================= **/
    getUserSalesCtrl(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                //Data:
                const { id } = req.params;
                const tokenID = { uid: req.uid, rol: req.rol };
                // query parameters:
                const page = parseInt(req.query.page);
                const size = parseInt(req.query.size);
                //Service:
                const resService = yield service.getUserSalesServ(tokenID, id, page, size);
                //Return:
                if (!resService)
                    return res.status(500).json({ status: 500, msg: "SERVER_ERROR" });
                else if (resService === "UNAUTHORIZED_ACTION")
                    return res.status(401).json({ status: 401, msg: resService });
                else if (resService === "INVALID_SALE_ID") {
                    return res.status(400).json({ status: 400, msg: resService });
                }
                else if (resService === "USER_NOT_FOUND")
                    return res.status(404).json({ status: 404, msg: resService });
                //Ok:
                return res.json({ status: 200, msg: "OK", data: resService });
            }
            catch (e) {
                logger_1.default.error(e.message);
                return res.status(500).json({ status: 500, msg: e.message });
            }
        });
    }
    /** ======================= LIST USER BUYS  ======================= **/
    getUserBuysCtrl(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                //Data:
                const { id } = req.params;
                const tokenID = { uid: req.uid, rol: req.rol };
                // query parameters:
                const page = parseInt(req.query.page);
                const size = parseInt(req.query.size);
                //Service:
                const resService = yield service.getUserBuysServ(tokenID, id, page, size);
                //Return:
                if (!resService)
                    return res.status(500).json({ status: 500, msg: "SERVER_ERROR" });
                else if (resService === "UNAUTHORIZED_ACTION")
                    return res.status(401).json({ status: 401, msg: resService });
                else if (resService === "INVALID_SALE_ID") {
                    return res.status(400).json({ status: 400, msg: resService });
                }
                else if (resService === "USER_NOT_FOUND")
                    return res.status(404).json({ status: 404, msg: resService });
                //Ok:
                return res.json({ status: 200, msg: "OK", data: resService });
            }
            catch (e) {
                logger_1.default.error(e.message);
                return res.status(500).json({ status: 500, msg: e.message });
            }
        });
    }
    /** ====================== PAUSE PRODUCT  ========================== **/
    pauseProductCtrl(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                //Data:
                const { id } = req.params;
                const tokenID = { uid: req.uid, rol: req.rol };
                //Service:
                const resService = yield service.pauseProductServ(tokenID, id);
                //Return:
                if (!resService)
                    return res.status(500).json({ status: 500, msg: "SERVER_ERROR" });
                else if (resService === "PRODUCT_NOT_FOUND")
                    return res.status(404).json({ status: 404, msg: resService });
                else if (resService === "INVALID_PRODUCT_ID") {
                    return res.status(400).json({ status: 400, msg: resService });
                }
                else if (resService === "UNAUTHORIZED_ACTION")
                    return res.status(401).json({ status: 401, msg: resService });
                //Ok:
                return res.json({ status: 200, msg: "PRODUCT_PAUSED" });
            }
            catch (e) {
                logger_1.default.error(e.message);
                return res.status(500).json({ status: 500, msg: e.message });
            }
        });
    }
    /** ===================== REACTIVATE PRODUCT  ============== **/
    reactivateProductCtrl(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                //Data:
                const { id } = req.params;
                const tokenID = { uid: req.uid, rol: req.rol };
                //Service:
                const resService = yield service.reactivateProductServ(tokenID, id);
                //Return:
                if (!resService)
                    return res.status(500).json({ status: 500, msg: "SERVER_ERROR" });
                else if (resService === "PRODUCT_NOT_FOUND")
                    return res.status(404).json({ status: 404, msg: resService });
                else if (resService === "UNAUTHORIZED_ACTION")
                    return res.status(401).json({ status: 401, msg: resService });
                else if (resService === "INVALID_PRODUCT_ID")
                    return res.status(400).json({ status: 400, msg: resService });
                else if (resService === "PRODUCT_IS_DELETED")
                    return res.status(400).json({ status: 400, msg: resService });
                //Ok:
                return res.json({ status: 200, msg: "PRODUCT_REACTIVATED" });
            }
            catch (e) {
                logger_1.default.error(e.message);
                return res.status(500).json({ status: 500, msg: e.message });
            }
        });
    }
    /** ====================== DELETE PRODUCT  ======================= **/
    deleteProductCtrl(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                //Data:
                const { id } = req.params;
                const tokenID = { uid: req.uid, rol: req.rol };
                //Service:
                const resService = yield service.deleteProductServ(tokenID, id);
                //Return:
                if (!resService)
                    return res.status(500).json({ status: 500, msg: "SERVER_ERROR" });
                else if (resService === "PRODUCT_NOT_FOUND")
                    return res.status(404).json({ status: 404, msg: resService });
                else if (resService === "INVALID_PRODUCT_ID")
                    return res.status(400).json({ status: 400, msg: resService });
                else if (resService === "UNAUTHORIZED_ACTION")
                    return res.status(401).json({ status: 401, msg: resService });
                //Ok:
                return res.json({ status: 200, msg: "PRODUCT_DELETED" });
            }
            catch (e) {
                logger_1.default.error(e.message);
                return res.status(500).json({ status: 500, msg: e.message });
            }
        });
    }
    /** ==================== SEARCH QUERY PRODUCT  ===================== **/
    listQueryProductCtrl(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                //data:
                const { search } = req.params;
                // query parameters:
                const page = parseInt(req.query.page);
                const size = parseInt(req.query.size);
                const category = req.query.category;
                const status = req.query.status;
                const type = req.query.type;
                const pmin = parseInt(req.query.pmin);
                const pmax = parseInt(req.query.pmax);
                //Service:
                const list = yield service.listQueryProductServ(search, page, size, status, category, type, pmin, pmax);
                //Return:
                if (!list)
                    return res.status(500).json({ status: 500, msg: "SERVER_ERROR" });
                return res.json({ status: 200, msg: "OK", data: list });
            }
            catch (e) {
                logger_1.default.error(e.message);
                return res.status(500).json({ status: 500, msg: e.message });
            }
        });
    }
    /**~~~~~~~~~~~~~~~~~  IMAGE THUMBNAIL PRODUCT  ~~~~~~~~~~~~~~~~~~~**/
    updateThumbnailCtrl(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                //Data:
                const { id } = req.params;
                const { file, uid } = req;
                //Service:
                const resUpdate = yield service.updateThumbnailServ(uid, id, file.buffer);
                //Return:
                if (resUpdate === "PRODUCT_NOT_FOUND") {
                    return res.status(404).json({ status: 404, msg: resUpdate });
                }
                else if (resUpdate === "INVALID_SELLER" || "INVALID_PRODUCT_ID") {
                    return res.status(400).json({ status: 400, msg: resUpdate });
                }
                else if (resUpdate === "ERROR_UPLOADING_PHOTO") {
                    return res.status(500).json({ status: 500, msg: resUpdate });
                }
                else if (resUpdate === "THUMBNAIL_UPDATED") {
                    return res.status(201).json({ status: 201, msg: resUpdate });
                }
            }
            catch (e) {
                logger_1.default.error(e.message);
                return res.status(500).json({ status: 500, msg: e.message });
            }
        });
    }
}
exports.default = productController;
