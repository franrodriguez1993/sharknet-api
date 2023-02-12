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
exports.daoSaleSQL = void 0;
const __1 = require("../../..");
const Sale_model_1 = __importDefault(require("../../../../models/sql/productsModel/Sale.model"));
const SaleProduct_models_1 = __importDefault(require("../../../../models/sql/productsModel/SaleProduct.models"));
const base_container_1 = __importDefault(require("../../../base/base.container"));
const uuid_1 = require("uuid");
const product_model_1 = __importDefault(require("../../../../models/sql/productsModel/product.model"));
const User_model_1 = __importDefault(require("../../../../models/sql/usersModel/User.model"));
const paginationfunction_1 = require("../../../../utils/paginationfunction");
const repuUser_model_1 = __importDefault(require("../../../../models/sql/reputationModel/repuUser.model"));
const repuProduct_model_1 = __importDefault(require("../../../../models/sql/reputationModel/repuProduct.model"));
class daoSaleSQL extends base_container_1.default {
    constructor() {
        super(Sale_model_1.default);
    }
    /** ---------------------------------- BUY PRODUCT  ----------------------------- **/
    Buy(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                //Function to get quantity in the map function:
                function getQuantity(id) {
                    let p = data.sale_product.find((p) => p.pid === id);
                    return p.quantity;
                }
                //Check products:
                function checkProducts(products) {
                    return __awaiter(this, void 0, void 0, function* () {
                        const productList = yield Promise.all(products.map((p) => __awaiter(this, void 0, void 0, function* () {
                            return yield __1.daoProduct.getProduct(p.pid, true);
                        })));
                        //Return an array of booleans
                        const checkValues = productList.map((p) => p !== null
                            ? p.product_condition === "active" &&
                                p.product_stock > getQuantity(p.product_id) &&
                                p.user_id !== data.sale_buyer
                            : false);
                        //We return an array with the products and an array with the booleans:
                        return { productList, checkValues };
                    });
                }
                const { productList, checkValues } = yield checkProducts(data.sale_product);
                if (checkValues.some((i) => i === false)) {
                    return "INVALID_PRODUCTS";
                }
                //Calculating price:
                const prices = productList.map((p) => p.product_offer !== 0
                    ? (p.product_price *
                        getQuantity(p.product_id) *
                        (100 - p.product_offer)) /
                        100
                    : p.product_price * getQuantity(p.product_id));
                const sale_price = prices.reduce((a, b) => a + b);
                //Creating sale:
                const sale = yield Sale_model_1.default.create({
                    sale_id: data.sale_id,
                    sale_buyer: data.sale_buyer,
                    sale_amount: sale_price,
                    sale_instalments: data.sale_instalments,
                    cc_id: data.cc_id,
                });
                if (!sale)
                    return "ERROR_CREATING";
                //create sale products:
                const productsSale = yield Promise.all(data.sale_product.map((p) => __awaiter(this, void 0, void 0, function* () {
                    return yield SaleProduct_models_1.default.create({
                        sp_id: `${(0, uuid_1.v4)()}`,
                        sp_quantity: p.quantity,
                        product_id: p.pid,
                        user_id: p.uid,
                        sale_id: data.sale_id,
                    });
                })));
                Promise.all(productList.map((p) => __awaiter(this, void 0, void 0, function* () {
                    p.product_stock = p.product_stock - getQuantity(p.product_id);
                    yield p.save();
                })));
                //everything ok:
                return { sale, productsSale };
            }
            catch (e) {
                throw new Error(e.message);
            }
        });
    }
    /** ---------------------------------- GET SALE  ----------------------------- **/
    getSale(sale_id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield Sale_model_1.default.findOne({
                    where: { sale_id },
                    attributes: { exclude: ["sale_buyer"] },
                    include: [
                        {
                            model: SaleProduct_models_1.default,
                            attributes: ["sp_id", "sp_quantity"],
                            include: [
                                {
                                    model: product_model_1.default,
                                    attributes: [
                                        "product_id",
                                        "product_name",
                                        "product_brand",
                                        "product_price",
                                    ],
                                },
                            ],
                        },
                        {
                            model: User_model_1.default,
                            as: "buyer",
                            attributes: ["user_username", "user_mail", "user_id"],
                        },
                    ],
                });
            }
            catch (e) {
                throw new Error(e.message);
            }
        });
    }
    /** ---------------------------------- LIST USER SALES ----------------------------- **/
    listSales(user_id, page = 0, size = 0) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                //Paginatión:
                const { limit, offset } = (0, paginationfunction_1.getPagination)(page, size);
                const data = yield Sale_model_1.default.findAndCountAll({
                    where: { sale_buyer: user_id },
                    limit,
                    offset,
                    order: [["createdAt", "DESC"]],
                    attributes: { exclude: ["sale_buyer"] },
                    include: [
                        {
                            model: SaleProduct_models_1.default,
                            attributes: ["sp_id", "sp_quantity"],
                            include: [
                                {
                                    model: product_model_1.default,
                                    attributes: [
                                        "product_id",
                                        "product_name",
                                        "product_brand",
                                        "product_price",
                                        "product_thumbnail",
                                        "user_id",
                                    ],
                                },
                            ],
                        },
                        { model: repuUser_model_1.default },
                        { model: repuProduct_model_1.default },
                    ],
                });
                return (0, paginationfunction_1.getPaginationSales)(data, page, limit);
            }
            catch (e) {
                throw new Error(e.message);
            }
        });
    }
    /**  GET PRODUCTS SOLD  **/
    getProductSold(user_id, page = 0, size = 0) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                //Paginatión:
                const { limit, offset } = (0, paginationfunction_1.getPagination)(page, size);
                const data = yield SaleProduct_models_1.default.findAndCountAll({
                    where: { user_id },
                    attributes: { exclude: ["product_id", "user_id", "updatedAt"] },
                    limit,
                    offset,
                    order: [["createdAt", "DESC"]],
                    include: [
                        { model: product_model_1.default },
                        {
                            model: Sale_model_1.default,
                            attributes: ["sale_id", "sale_buyer"],
                            include: [{ model: repuUser_model_1.default }],
                        },
                    ],
                });
                //return:
                return (0, paginationfunction_1.getPaginationSales)(data, page, limit);
            }
            catch (e) {
                throw new Error(e.message);
            }
        });
    }
    /** ---------------------------------- DELETE SALE  ----------------------------- **/
    deleteSale(sale_id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield Sale_model_1.default.destroy({ where: { sale_id } });
            }
            catch (e) {
                throw new Error(e.message);
            }
        });
    }
    /** ---------------------------------- CREATE SALE PRODUCT  ----------------------------- **/
    addSaleProduct(sp_id, sp_quantity, product_id, sale_id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                //Check product:
                const product = yield __1.daoProduct.getProduct(product_id);
                if (!product)
                    return "PRODUCT_NOT_FOUND";
                if (product.product_stock < sp_quantity)
                    return "NO_STOCK";
                //create sp:
                const sale_product = yield SaleProduct_models_1.default.create({
                    sp_id,
                    sp_quantity,
                    product_id,
                    sale_id,
                });
                //update product stock:
                product.product_stock = product.product_stock - sp_quantity;
                yield product.save();
                //Calculating price and return:
                if (product.product_offer !== 0) {
                    let sale_price = (product.product_price * sp_quantity * product.product_offer) / 100;
                    return { sale_product, sale_price };
                }
                else {
                    let sale_price = product.product_price * sp_quantity;
                    return { sale_product, sale_price };
                }
            }
            catch (e) {
                throw new Error(e.message);
            }
        });
    }
}
exports.daoSaleSQL = daoSaleSQL;
