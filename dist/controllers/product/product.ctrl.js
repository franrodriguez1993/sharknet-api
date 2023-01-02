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
exports.listQueryProductCtrl = exports.deleteProductCtrl = exports.reactivateProductCtrl = exports.pauseProductCtrl = exports.getUserBuysCtrl = exports.getUserSalesCtrl = exports.getSaleCtrl = exports.buyProductCtrl = exports.listPFavoriteCtrl = exports.addPFavoriteCtrl = exports.updateViewsCtrl = exports.editProductCtrl = exports.getProductCtrl = exports.listProductOfferCtrl = exports.listPTypeCtrl = exports.listPCategoryCtrl = exports.listPUserCtrl = exports.listPBrandCtrl = exports.listPStatusCtrl = exports.listProductsCtrl = exports.createProductCtrl = void 0;
const product_serv_1 = require("../../services/product/product.serv");
/**====================== CREATE PRODUCT ===========================**/
function createProductCtrl(req, res) {
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
            const product = yield (0, product_serv_1.createProductServ)(tokenData, data);
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
        }
        catch (e) {
            return res.status(500).json({ status: 500, msg: e.message });
        }
    });
}
exports.createProductCtrl = createProductCtrl;
/**====================== LIST PRODUCTS ===========================**/
function listProductsCtrl(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // query parameters:
            const page = parseInt(req.query.page);
            const size = parseInt(req.query.size);
            //service:
            const list = yield (0, product_serv_1.listProductsServ)(page, size);
            if (!list)
                return res.status(500).json({ status: 500, msg: "SERVER_ERROR" });
            //return:
            return res.json({ status: 200, msg: "OK", data: list });
        }
        catch (e) {
            return res.status(500).json({ status: 500, msg: e.message });
        }
    });
}
exports.listProductsCtrl = listProductsCtrl;
/**====================== LIST PRODUCTS BY STATUS ===========================**/
function listPStatusCtrl(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            //data:
            const { status } = req.params;
            // query parameters:
            const page = parseInt(req.query.page);
            const size = parseInt(req.query.size);
            //Service:
            const list = yield (0, product_serv_1.listPStatusServ)(status, page, size);
            if (!list)
                return res.status(500).json({ status: 500, msg: "SERVER_ERROR" });
            //return:
            return res.json({ status: 200, msg: "OK", data: list });
        }
        catch (e) {
            return res.status(500).json({ status: 500, msg: e.message });
        }
    });
}
exports.listPStatusCtrl = listPStatusCtrl;
/**====================== LIST PRODUCTS BY BRAND ===========================**/
function listPBrandCtrl(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            //data:
            const { brand } = req.params;
            // query parameters:
            const page = parseInt(req.query.page);
            const size = parseInt(req.query.size);
            //Service:
            const list = yield (0, product_serv_1.listPBrandServ)(brand, page, size);
            if (!list)
                return res.status(500).json({ status: 500, msg: "SERVER_ERROR" });
            //return:
            return res.json({ status: 200, msg: "OK", data: list });
        }
        catch (e) {
            return res.status(500).json({ status: 500, msg: e.message });
        }
    });
}
exports.listPBrandCtrl = listPBrandCtrl;
/**====================== LIST PRODUCTS BY USER ===========================**/
function listPUserCtrl(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            //data:
            const { id } = req.params;
            // query parameters:
            const page = parseInt(req.query.page);
            const size = parseInt(req.query.size);
            //Service:
            const list = yield (0, product_serv_1.listPUserServ)(id, page, size);
            //return:
            if (!list)
                return res.status(500).json({ status: 500, msg: "SERVER_ERROR" });
            else if (list === "USER_NOT_FOUND")
                return res.status(404).json({ status: 404, msg: list });
            //Ok:
            return res.json({ status: 200, msg: "OK", data: list });
        }
        catch (e) {
            return res.status(500).json({ status: 500, msg: e.message });
        }
    });
}
exports.listPUserCtrl = listPUserCtrl;
/**====================== LIST PRODUCTS BY CATEGORY ===========================**/
function listPCategoryCtrl(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            //data:
            const { id } = req.params;
            // query parameters:
            const page = parseInt(req.query.page);
            const size = parseInt(req.query.size);
            //service:
            const list = yield (0, product_serv_1.listPCategoryServ)(id, page, size);
            if (!list)
                return res.status(500).json({ status: 500, msg: "SERVER_ERROR" });
            //return:
            return res.json({ status: 200, msg: "OK", data: list });
        }
        catch (e) {
            return res.status(500).json({ status: 500, msg: e.message });
        }
    });
}
exports.listPCategoryCtrl = listPCategoryCtrl;
/**====================== LIST PRODUCTS BY TYPE  ===========================**/
function listPTypeCtrl(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            //data:
            const { id } = req.params;
            // query parameters:
            const page = parseInt(req.query.page);
            const size = parseInt(req.query.size);
            //Service:
            const list = yield (0, product_serv_1.listPTypeServ)(id, page, size);
            if (!list)
                return res.status(500).json({ status: 500, msg: "SERVER_ERROR" });
            //return:
            return res.json({ status: 200, msg: "OK", data: list });
        }
        catch (e) {
            return res.status(500).json({ status: 500, msg: e.message });
        }
    });
}
exports.listPTypeCtrl = listPTypeCtrl;
/**====================== LIST PRODUCTS BY OFFER  ===========================**/
function listProductOfferCtrl(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // query parameters:
            const page = parseInt(req.query.page);
            const size = parseInt(req.query.size);
            //Service:
            const list = yield (0, product_serv_1.listProductOfferServ)(page, size);
            //Return:
            if (!list)
                return res.status(500).json({ status: 500, msg: "SERVER_ERROR" });
            return res.json({ status: 200, msg: "OK", data: list });
        }
        catch (e) {
            return res.status(500).json({ status: 500, msg: e.message });
        }
    });
}
exports.listProductOfferCtrl = listProductOfferCtrl;
/**====================== GET PRODUCT BY ID ===========================**/
function getProductCtrl(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            //data:
            const { id } = req.params;
            //Service:
            const product = yield (0, product_serv_1.getProductServ)(id);
            //return:
            if (!product)
                return res.status(404).json({ status: 404, msg: "PRODUCT_NOT_FOUND" });
            return res.json({ status: 200, msg: "OK", data: product });
        }
        catch (e) {
            return res.status(500).json({ status: 500, msg: e.message });
        }
    });
}
exports.getProductCtrl = getProductCtrl;
/**====================== EDIT PRODUCT ===========================**/
function editProductCtrl(req, res) {
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
            const updatedProduct = yield (0, product_serv_1.editProductServ)(tokenData, data);
            //Return:
            if (!updatedProduct)
                return res.status(500).json({ status: 500, msg: "SERVER_ERROR" });
            else if (updatedProduct === "PRODUCT_NOT_FOUND" ||
                updatedProduct === "ADDRESS_NOT_FOUND")
                return res.status(404).json({ status: 404, msg: updatedProduct });
            else if (updatedProduct === "UNAUTHORIZED_ACTION")
                return res.status(401).json({ status: 401, msg: updatedProduct });
            else if (updatedProduct === "INVALID_PRODUCT_OFFER" ||
                updatedProduct === "INVALID_USER_ADDRESS")
                return res.status(400).json({ status: 400, msg: updatedProduct });
            //Ok:
            return res.json({ status: 200, msg: "OK", data: updatedProduct });
        }
        catch (e) {
            return res.status(500).json({ status: 500, msg: e.message });
        }
    });
}
exports.editProductCtrl = editProductCtrl;
/**====================== UPDATE VIEWS ===========================**/
function updateViewsCtrl(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            //data:
            const { id } = req.params;
            //Service:
            const product = yield (0, product_serv_1.updateViewsServ)(id);
            //return:
            if (!product)
                return res.status(500).json({ status: 500, msg: "SERVER_ERROR" });
            else if (product === "PRODUCT_NOT_FOUND")
                return res.status(404).json({ status: 404, msg: product });
            else if (product === "VIEWS_UPDATED")
                return res.json({ status: 200, msg: "OK", data: product });
        }
        catch (e) {
            return res.status(500).json({ status: 500, msg: e.message });
        }
    });
}
exports.updateViewsCtrl = updateViewsCtrl;
/** ============================= ADD FAVORITE PRODUCT ============================== **/
function addPFavoriteCtrl(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            //Data:
            const { user, product } = req.body;
            const tokenID = { uid: req.uid, rol: req.rol };
            //Service:
            const favorite = yield (0, product_serv_1.addPFavoriteServ)(tokenID, user, product);
            //return:
            if (favorite === "USER_NOT_FOUND" || favorite === "PRODUCT_NOT_FOUND")
                return res.status(404).json({ status: 404, msg: favorite });
            else if (favorite === "IS_YOUR_PRODUCT" ||
                favorite === "UNAUTHORIZED_ACTION")
                return res.status(400).json({ status: 400, msg: favorite });
            //ok:
            else if (favorite === "FAVORITE_ADDED")
                return res.json({ status: 201, msg: favorite });
            else if (favorite === "FAVORITE_ELIMINATED")
                return res.json({ status: 200, msg: favorite });
        }
        catch (e) {
            return res.status(500).json({ status: 500, msg: e.message });
        }
    });
}
exports.addPFavoriteCtrl = addPFavoriteCtrl;
/** ============================= LIST FAVORITE PRODUCT ============================== **/
function listPFavoriteCtrl(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            //Data:
            const { id } = req.params;
            // query parameters:
            const page = parseInt(req.query.page);
            const size = parseInt(req.query.size);
            //Service:
            const list = yield (0, product_serv_1.listPFavoriteServ)(id, page, size);
            //Return:
            if (!list)
                return res.status(500).json({ status: 500, msg: "SERVER_ERROR" });
            else if (list === "USER_NOT_FOUND")
                return res.status(404).json({ status: 404, msg: list });
            //ok:
            return res.json({ status: 200, msg: "OK", data: list });
        }
        catch (e) {
            return res.status(500).json({ status: 500, msg: e.message });
        }
    });
}
exports.listPFavoriteCtrl = listPFavoriteCtrl;
/** ============================= BUY PRODUCT ============================== **/
function buyProductCtrl(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
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
            const sale = yield (0, product_serv_1.buyProductServ)(tokenData, bodySale);
            //Return:
            if (!sale)
                return res.status(500).json({ status: 500, msg: "SERVER_ERROR" });
            else if (sale === "USER_NOT_FOUND" ||
                sale === "CREDITCARD_NOT_FOUND" ||
                sale === "PRODUCT_NOT_FOUND")
                return res.status(404).json({ status: 404, msg: sale });
            else if (sale === "ERROR_CREATING" ||
                sale === "NO_STOCK" ||
                sale === "INVALID_CREDITCARD" ||
                sale === "INCORRECT_SELLER" ||
                sale === "SELLER_CANT_BUY_OWN_PRODUCT")
                return res.status(400).json({ status: 400, msg: sale });
            else if (sale === "UNAUTHORIZED_ACTION")
                return res.status(401).json({ status: 401, msg: sale });
            //Ok:
            return res.json({ status: 200, msg: "OK", data: sale });
        }
        catch (e) {
            return res.status(500).json({ status: 500, msg: e.message });
        }
    });
}
exports.buyProductCtrl = buyProductCtrl;
/** ============================= GET SALE  ============================== **/
function getSaleCtrl(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            //Data:
            const { id } = req.params;
            //Service:
            const sale = yield (0, product_serv_1.getSaleServ)(id);
            //Return:
            if (!sale)
                return res.status(404).json({ status: 404, msg: "SALE_NOT_FOUND" });
            //Ok:
            return res.json({ status: 200, msg: "OK", data: sale });
        }
        catch (e) {
            return res.status(500).json({ status: 500, msg: e.message });
        }
    });
}
exports.getSaleCtrl = getSaleCtrl;
/** ============================= LIST USER SALES  ============================== **/
function getUserSalesCtrl(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            //Data:
            const { id } = req.params;
            const tokenID = { uid: req.uid, rol: req.rol };
            // query parameters:
            const page = parseInt(req.query.page);
            const size = parseInt(req.query.size);
            //Service:
            const list = yield (0, product_serv_1.getUserSalesServ)(tokenID, id, page, size);
            //Return:
            if (!list)
                return res.status(500).json({ status: 500, msg: "SERVER_ERROR" });
            else if (list === "UNAUTHORIZED_ACTION")
                return res.status(401).json({ status: 401, msg: list });
            else if (list === "USER_NOT_FOUND")
                return res.status(404).json({ status: 404, msg: list });
            //Ok:
            return res.json({ status: 200, msg: "OK", data: list });
        }
        catch (e) {
            return res.status(500).json({ status: 500, msg: e.message });
        }
    });
}
exports.getUserSalesCtrl = getUserSalesCtrl;
/** ============================= LIST USER BUYS  ============================== **/
function getUserBuysCtrl(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            //Data:
            const { id } = req.params;
            const tokenID = { uid: req.uid, rol: req.rol };
            // query parameters:
            const page = parseInt(req.query.page);
            const size = parseInt(req.query.size);
            //Service:
            const list = yield (0, product_serv_1.getUserBuysServ)(tokenID, id, page, size);
            //Return:
            if (!list)
                return res.status(500).json({ status: 500, msg: "SERVER_ERROR" });
            else if (list === "UNAUTHORIZED_ACTION")
                return res.status(401).json({ status: 401, msg: list });
            else if (list === "USER_NOT_FOUND")
                return res.status(404).json({ status: 404, msg: list });
            //Ok:
            return res.json({ status: 200, msg: "OK", data: list });
        }
        catch (e) {
            return res.status(500).json({ status: 500, msg: e.message });
        }
    });
}
exports.getUserBuysCtrl = getUserBuysCtrl;
/** ============================= PAUSE PRODUCT  ============================== **/
function pauseProductCtrl(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            //Data:
            const { id } = req.params;
            const tokenID = { uid: req.uid, rol: req.rol };
            //Service:
            const resPause = yield (0, product_serv_1.pauseProductServ)(tokenID, id);
            //Return:
            if (!resPause)
                return res.status(500).json({ status: 500, msg: "SERVER_ERROR" });
            else if (resPause === "PRODUCT_NOT_FOUND")
                return res.status(404).json({ status: 404, msg: resPause });
            else if (resPause === "UNAUTHORIZED_ACTION")
                return res.status(401).json({ status: 401, msg: resPause });
            //Ok:
            return res.json({ status: 200, msg: "PRODUCT_PAUSED" });
        }
        catch (e) {
            return res.status(500).json({ status: 500, msg: e.message });
        }
    });
}
exports.pauseProductCtrl = pauseProductCtrl;
/** ============================= REACTIVATE PRODUCT  ============================== **/
function reactivateProductCtrl(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            //Data:
            const { id } = req.params;
            const tokenID = { uid: req.uid, rol: req.rol };
            //Service:
            const reactivate = yield (0, product_serv_1.reactivateProductServ)(tokenID, id);
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
        }
        catch (e) {
            return res.status(500).json({ status: 500, msg: e.message });
        }
    });
}
exports.reactivateProductCtrl = reactivateProductCtrl;
/** ============================= DELETE PRODUCT  ============================== **/
function deleteProductCtrl(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            //Data:
            const { id } = req.params;
            const tokenID = { uid: req.uid, rol: req.rol };
            //Service:
            const resDelete = yield (0, product_serv_1.deleteProductServ)(tokenID, id);
            //Return:
            if (!resDelete)
                return res.status(500).json({ status: 500, msg: "SERVER_ERROR" });
            else if (resDelete === "PRODUCT_NOT_FOUND")
                return res.status(404).json({ status: 404, msg: resDelete });
            else if (resDelete === "UNAUTHORIZED_ACTION")
                return res.status(401).json({ status: 401, msg: resDelete });
            //Ok:
            return res.json({ status: 200, msg: "PRODUCT_DELETED" });
        }
        catch (e) {
            return res.status(500).json({ status: 500, msg: e.message });
        }
    });
}
exports.deleteProductCtrl = deleteProductCtrl;
/** ============================= SEARCH QUERY PRODUCT  ============================== **/
function listQueryProductCtrl(req, res) {
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
            const list = yield (0, product_serv_1.listQueryProductServ)(search, page, size, status, category, type, pmin, pmax);
            //Return:
            if (!list)
                return res.status(500).json({ status: 500, msg: "SERVER_ERROR" });
            return res.json({ status: 200, msg: "OK", data: list });
        }
        catch (e) {
            return res.status(500).json({ status: 500, msg: e.message });
        }
    });
}
exports.listQueryProductCtrl = listQueryProductCtrl;
