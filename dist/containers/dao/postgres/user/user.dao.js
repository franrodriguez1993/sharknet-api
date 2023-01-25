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
exports.daoUserSQL = void 0;
const Address_model_1 = __importDefault(require("../../../../models/sql/usersModel/Address.model"));
const Birthday_model_1 = __importDefault(require("../../../../models/sql/usersModel/Birthday.model"));
const CreditCard_model_1 = __importDefault(require("../../../../models/sql/usersModel/CreditCard.model"));
const Rol_model_1 = __importDefault(require("../../../../models/sql/usersModel/Rol.model"));
const User_model_1 = __importDefault(require("../../../../models/sql/usersModel/User.model"));
const base_container_1 = __importDefault(require("../../../base/base.container"));
class daoUserSQL extends base_container_1.default {
    constructor() {
        super(User_model_1.default);
    }
    /** ------------------------- REGISTER USER -------------------------- **/
    registerUser(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                //Find user rol:
                const rolID = yield Rol_model_1.default.findOne({
                    where: { rol_name: "user" },
                });
                const user = yield User_model_1.default.create({
                    user_id: data.user_id,
                    user_username: data.user_username,
                    user_mail: data.user_mail,
                    user_password: data.user_password,
                    rol_id: rolID.rol_id,
                });
                if (user)
                    return "USER_REGISTERED";
            }
            catch (e) {
                throw new Error(e.message);
            }
        });
    }
    /** ---------------------------- GET USER  ------------------------------------ **/
    //Return full user data or just the simple data (to check functions)
    //If simple is true, return a reduced data version
    getUser(field, attribute, simple = false) {
        return __awaiter(this, void 0, void 0, function* () {
            const options = {
                where: {},
                include: [],
            };
            //Fields:
            if (field === "id") {
                options.where = { user_id: attribute };
            }
            else if (field === "mail") {
                options.where = { user_mail: attribute };
            }
            else if (field === "username") {
                options.where = { user_username: attribute };
            }
            //Include:
            if (!simple) {
                options.include = [
                    { model: Rol_model_1.default, attributes: ["rol_name"] },
                    { model: Birthday_model_1.default, attributes: { exclude: ["user_id"] } },
                    { model: Address_model_1.default, attributes: { exclude: ["user_id"] } },
                    { model: CreditCard_model_1.default, attributes: { exclude: ["user_id"] } },
                ];
            }
            try {
                const user = yield User_model_1.default.findOne(Object.assign({}, options));
                return user;
            }
            catch (e) {
                throw new Error(e.message);
            }
        });
    }
    /** ---------------------------- GET USER ROL  ------------------------------------ **/
    getUserRol(user_id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield User_model_1.default.findOne({
                    where: { user_id },
                    attributes: ["user_id"],
                    include: [{ model: Rol_model_1.default, attributes: ["rol_name"] }],
                });
            }
            catch (e) {
                throw new Error(e.message);
            }
        });
    }
    /** ---------------------------------- UPDATE USER   ----------------------------- **/
    updateProfile(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                //Find user:
                const user = yield this.getUser("id", data.user_id);
                if (!user)
                    return "USER_NOT_FOUND";
                let fields = {};
                if (data.user_name) {
                    fields = Object.assign(Object.assign({}, fields), { user_name: data.user_name });
                }
                if (data.user_lastname) {
                    fields = Object.assign(Object.assign({}, fields), { user_lastname: data.user_lastname });
                }
                if (data.user_username) {
                    fields = Object.assign(Object.assign({}, fields), { user_username: data.user_username });
                }
                if (data.user_dni) {
                    fields = Object.assign(Object.assign({}, fields), { user_dni: data.user_dni });
                }
                if (data.user_phone) {
                    fields = Object.assign(Object.assign({}, fields), { user_phone: data.user_phone });
                }
                //Update data:
                user.set(fields);
                const updatedUser = yield user.save();
                if (updatedUser)
                    return "USER_UPDATED";
            }
            catch (e) {
                throw new Error(e.message);
            }
        });
    }
    /** ---------------------------------- CHANGE FIELDS   ----------------------------- **/
    //Update specific fields (email,password)
    changeFields(id, field, data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                //Find user:
                const user = yield this.getUser("id", id);
                if (!user)
                    return "USER_NOT_FOUND";
                //Update specific field:
                if (field === "mail") {
                    user.set({ user_mail: data });
                }
                else if (field === "password") {
                    user.set({ user_password: data });
                }
                //Save and return:
                return yield user.save();
            }
            catch (e) {
                throw new Error(e.message);
            }
        });
    }
    /** --------------------------- ADD BIRTHDAY ---------------------------- **/
    addBirthday(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                //Check birthday:
                const dataBirthday = yield Birthday_model_1.default.findOne({
                    where: { user_id: data.user_id },
                });
                //edit if exists:
                if (dataBirthday) {
                    dataBirthday.set({
                        birthday_id: data.birthday_id,
                        user_id: data.user_id,
                        birthday_day: data.birthday_day,
                        birthday_month: data.birthday_month,
                        birthday_year: data.birthday_year,
                    });
                    const updatedBithday = yield dataBirthday.save();
                    if (updatedBithday)
                        return "BIRTHDAY_UPDATED";
                }
                //Create if doesn't exists:
                else {
                    const birthday = yield Birthday_model_1.default.create({
                        birthday_id: data.birthday_id,
                        user_id: data.user_id,
                        birthday_day: data.birthday_day,
                        birthday_month: data.birthday_month,
                        birthday_year: data.birthday_year,
                    });
                    //return:
                    if (birthday)
                        return "BIRTHDAY_CREATED";
                }
            }
            catch (e) {
                throw new Error(e.message);
            }
        });
    }
    /** --------------------------- ADD ADDRESS ---------------------------- **/
    addAddress(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                //Check limit:
                const limit = yield Address_model_1.default.findAll({ where: { user_id: data.user_id } });
                if (limit.length >= 3)
                    return "MAX_LIMIT";
                //Create address:
                const address = yield Address_model_1.default.create({
                    address_id: data.address_id,
                    user_id: data.user_id,
                    address_street: data.address_street,
                    address_number: data.address_number,
                    address_floor: data.address_floor,
                    address_apartment: data.address_apartment,
                    address_city: data.address_city,
                    address_state: data.address_state,
                });
                //Return data:
                if (address)
                    return "ADDRESS_CREATED";
            }
            catch (e) {
                throw new Error(e.message);
            }
        });
    }
    /** --------------------------- GET ADDRESS ---------------------------- **/
    getAddress(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield Address_model_1.default.findOne({ where: { address_id: id } });
            }
            catch (e) {
                throw new Error(e.message);
            }
        });
    }
    /** --------------------------- DELETE ADDRESS ---------------------------- **/
    //aid: address id
    deleteAddress(aid) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // delete:
                const deleteAddress = yield Address_model_1.default.destroy({
                    where: { address_id: aid },
                });
                //return:
                return deleteAddress;
            }
            catch (e) {
                throw new Error(e.message);
            }
        });
    }
    /** --------------------------- ADD CREDIT CARD ---------------------------- **/
    addCreditCard(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                //Check limit:
                const ccLimit = yield CreditCard_model_1.default.findAll({
                    where: { user_id: data.user_id },
                });
                if (ccLimit.length >= 3)
                    return "MAX_LIMIT";
                //check creditCard:
                const check = yield CreditCard_model_1.default.findOne({
                    where: { cc_number: data.cc_number, cc_name: data.cc_name },
                });
                if (check)
                    return "CREDITCARD_IN_USE";
                //Create:
                const creditCard = yield CreditCard_model_1.default.create({
                    cc_id: data.cc_id,
                    user_id: data.user_id,
                    cc_name: data.cc_name,
                    cc_number: data.cc_number,
                    cc_date: data.cc_date,
                    cc_code: data.cc_code,
                    cc_bank: data.cc_bank,
                });
                if (creditCard)
                    return "CREDITCARD_REGISTERED";
            }
            catch (e) {
                throw new Error(e.message);
            }
        });
    }
    /** --------------------------- DELETE CREDIT CARD ---------------------------- **/
    deleteCreditCard(ccid) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                //delete:
                const deleted = yield CreditCard_model_1.default.destroy({ where: { cc_id: ccid } });
                //return:
                return deleted;
            }
            catch (e) {
                throw new Error(e.message);
            }
        });
    }
    /** --------------------------- GET CREDIT CARD ---------------------------- **/
    getCreditCard(cc_id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield CreditCard_model_1.default.findOne({ where: { cc_id } });
            }
            catch (e) {
                throw new Error(e.message);
            }
        });
    }
    /** ------------------------- UPLOAD PROFILE IMAGE -------------------------- **/
    //img: image URL
    uploadProfileImage(uid, img) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield User_model_1.default.findOne({
                    where: { user_id: uid },
                });
                if (!user)
                    return "USER_NOT_FOUND";
                user.set({ user_image: img });
                yield user.save();
                return "IMAGE_UPDATED";
            }
            catch (e) {
                throw new Error(e.message);
            }
        });
    }
}
exports.daoUserSQL = daoUserSQL;
