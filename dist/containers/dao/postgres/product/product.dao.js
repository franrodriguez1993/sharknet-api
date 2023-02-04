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
exports.daoProductSQL = void 0;
const base_container_1 = __importDefault(require("../../../base/base.container"));
const sequelize_1 = __importDefault(require("sequelize"));
const Op = sequelize_1.default.Op;
//Models:
const product_model_1 = __importDefault(require("../../../../models/sql/productsModel/product.model"));
const PType_models_1 = __importDefault(require("../../../../models/sql/productsModel/PType.models"));
const User_model_1 = __importDefault(require("../../../../models/sql/usersModel/User.model"));
const Address_model_1 = __importDefault(require("../../../../models/sql/usersModel/Address.model"));
const PCategory_models_1 = __importDefault(require("../../../../models/sql/productsModel/PCategory.models"));
const PFavorite_models_1 = __importDefault(require("../../../../models/sql/productsModel/PFavorite.models"));
const ImageProd_model_1 = __importDefault(require("../../../../models/sql/imagesModel/ImageProd.model"));
const Rol_model_1 = __importDefault(require("../../../../models/sql/usersModel/Rol.model"));
//Utils:
const paginationfunction_1 = require("../../../../utils/paginationfunction");
/**------------------------------------------------------------------------**/
class daoProductSQL extends base_container_1.default {
    constructor() {
        super(product_model_1.default);
    }
    /**~~~~~~~~~~~~~~~~~ CREATE PRODUCT ~~~~~~~~~~~~~~~~~~~**/
    createProduct(product) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield product_model_1.default.create({
                    product_id: product.product_id,
                    pt_id: product.pt_id,
                    user_id: product.user_id,
                    product_name: product.product_name.toLowerCase(),
                    product_brand: product.product_brand,
                    product_price: product.product_price,
                    product_stock: product.product_stock,
                    product_description: product.product_description,
                    product_status: product.product_status,
                    product_warranty: product.product_warranty,
                    address_id: product.address_id,
                    pc_id: product.pc_id,
                });
            }
            catch (e) {
                throw new Error(e.message);
            }
        });
    }
    /**~~~~~~~~~~~~~~~~~ LIST PRODUCTS ~~~~~~~~~~~~~~~~~~~**/
    listProducts(filter = null, attribute = null, page = 0, size = 0) {
        return __awaiter(this, void 0, void 0, function* () {
            //Paginatión:
            const { limit, offset } = (0, paginationfunction_1.getPagination)(page, size);
            //Search options:
            const option = { where: {}, limit, offset };
            try {
                switch (filter) {
                    case "search": {
                        option.where = {
                            [Op.or]: {
                                product_name: { [Op.substring]: attribute },
                                product_brand: { [Op.substring]: attribute },
                            },
                            product_condition: "active",
                        };
                        break;
                    }
                    case "type": {
                        option.where = { pt_id: attribute, product_condition: "active" };
                        break;
                    }
                    case "seller": {
                        option.where = { user_id: attribute, product_condition: "active" };
                        break;
                    }
                    case "user": {
                        option.where = {
                            user_id: attribute,
                            product_condition: { [Op.ne]: "deleted" },
                        };
                        break;
                    }
                    case "brand": {
                        option.where = {
                            product_brand: attribute,
                            product_condition: "active",
                        };
                        break;
                    }
                    case "offer": {
                        option.where = {
                            product_offer: { [Op.ne]: 0 },
                        };
                        break;
                    }
                    case "status": {
                        option.where = {
                            product_status: attribute,
                            product_condition: "active",
                        };
                        break;
                    }
                    case "category": {
                        option.where = { pc_id: attribute, product_condition: "active" };
                    }
                    default:
                        option.where = { product_condition: "active" };
                }
                //Return:
                const data = yield product_model_1.default.findAndCountAll(Object.assign(Object.assign({}, option), { attributes: { exclude: ["address_id", "user_id", "pt_id", "pc_id"] }, order: [["createdAt", "DESC"]], include: [
                        { model: PType_models_1.default },
                        { model: User_model_1.default, attributes: ["user_username", "user_id"] },
                        { model: Address_model_1.default },
                        { model: ImageProd_model_1.default, attributes: ["ip_id", "ip_path"] },
                        { model: PCategory_models_1.default },
                    ] }));
                return (0, paginationfunction_1.getPaginationData)(data, page, limit);
            }
            catch (e) {
                throw new Error(e.message);
            }
        });
    }
    /** ~~~~~~~~~~~~~~~~~ SEARCHQUERYPRODUCTS ~~~~~~~~~~~~~~~~~~~**/
    searchQueryProducts(attribute = null, page = 0, size = 0, status, category, type, pmin, pmax) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                //Paginatión:
                const { limit, offset } = (0, paginationfunction_1.getPagination)(page, size);
                let options = { where: {} };
                if (status) {
                    options.where = Object.assign(Object.assign({}, options.where), { product_status: status });
                }
                if (category) {
                    options.where = Object.assign(Object.assign({}, options.where), { pc_id: category });
                }
                if (type) {
                    options.where = Object.assign(Object.assign({}, options.where), { pt_id: type });
                }
                options.where = Object.assign(Object.assign({}, options.where), { [Op.or]: {
                        product_name: { [Op.substring]: attribute },
                        product_brand: { [Op.substring]: attribute },
                    }, product_condition: "active", product_price: { [Op.between]: [pmin, pmax] } });
                const data = yield product_model_1.default.findAndCountAll(Object.assign(Object.assign({}, options), { limit,
                    offset, order: [["createdAt", "DESC"]], attributes: { exclude: ["address_id", "user_id", "pt_id", "pc_id"] }, include: [
                        { model: PType_models_1.default },
                        { model: User_model_1.default, attributes: ["user_username", "user_id"] },
                        { model: Address_model_1.default },
                        { model: ImageProd_model_1.default, attributes: ["ip_id", "ip_path"] },
                        { model: PCategory_models_1.default },
                    ] }));
                return (0, paginationfunction_1.getPaginationData)(data, page, limit);
            }
            catch (e) {
                throw new Error(e.message);
            }
        });
    }
    /**~~~~~~~~~~~~~~~~~ GET PRODUCT ~~~~~~~~~~~~~~~~~~~**/
    // "simple" is for light search just to check the product in db.
    getProduct(id, simple = false) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                //search options:
                const option = { parameters: {} };
                if (!simple) {
                    option.parameters = {
                        where: { product_id: id },
                        attributes: { exclude: ["address_id", "user_id", "pt_id"] },
                        include: [
                            { model: PType_models_1.default, include: [{ model: PCategory_models_1.default }] },
                            {
                                model: User_model_1.default,
                                attributes: ["user_username", "user_id", "user_image"],
                                include: [{ model: Rol_model_1.default }],
                            },
                            { model: Address_model_1.default },
                            { model: ImageProd_model_1.default, attributes: ["ip_id", "ip_path"] },
                        ],
                    };
                }
                else {
                    option.parameters = {
                        where: { product_id: id },
                        attributes: ["product_id", "user_id"],
                    };
                }
                return yield product_model_1.default.findOne(option.parameters);
            }
            catch (e) {
                throw new Error(e.message);
            }
        });
    }
    /**~~~~~~~~~~~~~~~~~ EDIT PRODUCT ~~~~~~~~~~~~~~~~~~~**/
    editProduct(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                //Find Product:
                const editProduct = yield product_model_1.default.findOne({
                    where: { product_id: data.product_id },
                });
                if (!editProduct)
                    return "PRODUCT_NOT_FOUND";
                //dinamic fields:
                let fields = {};
                if (data.product_name) {
                    fields = Object.assign(Object.assign({}, fields), { product_name: data.product_name });
                }
                if (data.product_brand) {
                    fields = Object.assign(Object.assign({}, fields), { product_brand: data.product_brand.toString().toLowerCase() });
                }
                if (data.product_price) {
                    fields = Object.assign(Object.assign({}, fields), { product_price: data.product_price });
                }
                if (data.product_stock) {
                    fields = Object.assign(Object.assign({}, fields), { product_stock: data.product_stock });
                }
                if (data.product_offer) {
                    fields = Object.assign(Object.assign({}, fields), { product_offer: data.product_offer });
                }
                if (data.product_description) {
                    fields = Object.assign(Object.assign({}, fields), { product_description: data.product_description });
                }
                if (data.product_status) {
                    fields = Object.assign(Object.assign({}, fields), { product_status: data.product_status.toString().toLowerCase() });
                }
                if (data.product_warranty) {
                    fields = Object.assign(Object.assign({}, fields), { product_warranty: data.product_warranty });
                }
                if (data.address_id) {
                    fields = Object.assign(Object.assign({}, fields), { address_id: data.address_id });
                }
                //Edit fields:
                editProduct.set(fields);
                //return:
                return yield editProduct.save();
            }
            catch (e) {
                throw new Error(e.message);
            }
        });
    }
    /**~~~~~~~~~~~~~~~~~ UPDATE VIEWS ~~~~~~~~~~~~~~~~~~~**/
    //use product id
    updateViews(product_id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                //check Product:
                const product = yield product_model_1.default.findOne({
                    where: { product_id },
                });
                if (!product)
                    return "PRODUCT_NOT_FOUND";
                //Update views:
                product.set({ product_views: (product.product_views += 1) });
                yield product.save();
                return "VIEWS_UPDATED";
            }
            catch (e) {
                throw new Error(e.message);
            }
        });
    }
    /** ---------------------------------- ADD FAVORITE PRODUCT   ----------------------------- **/
    addFavoriteProduct(pf_id, user_id, product_id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                //check if already exists:
                const isFavorite = yield PFavorite_models_1.default.findOne({
                    where: { user_id, product_id },
                });
                //Delete if exists, create if not.
                if (isFavorite) {
                    yield isFavorite.destroy();
                    return "FAVORITE_ELIMINATED";
                }
                else {
                    const added = yield PFavorite_models_1.default.create({
                        pf_id,
                        user_id,
                        product_id,
                    });
                    if (added)
                        return "FAVORITE_ADDED";
                }
            }
            catch (e) {
                throw new Error(e.message);
            }
        });
    }
    /** ---------------------------------- USER FAVORITE LIST   ----------------------------- **/
    listFavorite(uid, page = 0, size = 0) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                //Paginatión:
                const { limit, offset } = (0, paginationfunction_1.getPagination)(page, size);
                const data = yield PFavorite_models_1.default.findAndCountAll({
                    where: { user_id: uid },
                    limit,
                    offset,
                    order: [["createdAt", "DESC"]],
                    include: [
                        {
                            model: product_model_1.default,
                            attributes: { exclude: ["user_id", "pt_id", "address_id"] },
                            include: [{ model: PType_models_1.default }],
                        },
                    ],
                });
                return (0, paginationfunction_1.getPaginationData)(data, page, limit);
            }
            catch (e) {
                throw new Error(e.message);
            }
        });
    }
    /**~~~~~~~~~~~~~~~~~  PAUSE PRODUCT  ~~~~~~~~~~~~~~~~~~~**/
    pauseProduct(product_id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const product = yield product_model_1.default.findOne({
                    where: { product_id },
                });
                if (!product)
                    return "PRODUCT_NOT_FOUND";
                product.set({ product_condition: "paused" });
                return yield product.save();
            }
            catch (e) {
                throw new Error(e.message);
            }
        });
    }
    /**~~~~~~~~~~~~~~~~~  PAUSE PRODUCT  ~~~~~~~~~~~~~~~~~~~**/
    reactivateProduct(product_id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const product = yield product_model_1.default.findOne({
                    where: { product_id },
                });
                if (!product)
                    return "PRODUCT_NOT_FOUND";
                if (product.product_condition.toString() === "deleted")
                    return "PRODUCT_IS_DELETED";
                product.set({ product_condition: "paused" });
                return yield product.save();
            }
            catch (e) {
                throw new Error(e.message);
            }
        });
    }
    /**~~~~~~~~~~~~~~~~~  DELETE PRODUCT  ~~~~~~~~~~~~~~~~~~~**/
    deleteProduct(product_id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const product = yield product_model_1.default.findOne({
                    where: { product_id },
                });
                if (!product)
                    return "PRODUCT_NOT_FOUND";
                product.set({ product_condition: "deleted" });
                return yield product.save();
            }
            catch (e) {
                throw new Error(e.message);
            }
        });
    }
    /**~~~~~~~~~~~~~~~~~  IMAGE THUMBNAIL PRODUCT  ~~~~~~~~~~~~~~~~~~~**/
    updateThumbnail(product_id, path) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const product = yield product_model_1.default.findOne({
                    where: { product_id },
                });
                if (!product)
                    return "PRODUCT_NOT_FOUND";
                product.set({ product_thumbnail: path });
                yield product.save();
                return "THUMBNAIL_UPDATED";
            }
            catch (e) {
                throw new Error(e.message);
            }
        });
    }
}
exports.daoProductSQL = daoProductSQL;
