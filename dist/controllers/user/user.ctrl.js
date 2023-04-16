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
//Services:
const user_serv_1 = __importDefault(require("../../services/user/user.serv"));
const service = new user_serv_1.default();
class userController {
    /**==================== REGISTER USER =========================**/
    registerUserCtrl(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                //Body data:
                const data = {
                    user_username: req.body.username,
                    user_mail: req.body.mail,
                    user_password: req.body.password,
                };
                //Service:
                const user = yield service.registerUserServ(data);
                //Response:
                if (!user)
                    return res.json({ status: 500, msg: "SERVER_ERROR" });
                if (user === "MAIL_IN_USE" || user === "USERNAME_IN_USE") {
                    return res.json({ status: 400, msg: user });
                }
                else if (user === "USER_REGISTERED") {
                    return res.status(201).json({ status: 201, msg: user });
                }
            }
            catch (e) {
                logger_1.default.error(e.message);
                return res.json({ status: 500, msg: e.message });
            }
        });
    }
    /**======================= LOGIN USER ===========================**/
    loginUserCtrl(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                //Data:
                const { mail, password } = req.body;
                //Service:
                const login = yield service.loginUserServ(mail, password);
                //Return:
                if (login === "USER_NOT_FOUND")
                    return res.status(404).json({ status: 404, msg: login });
                else if (login === "USER_DELETED" || login === "USER_SUSPENDED") {
                    return res.status(403).json({ status: 403, msg: login });
                }
                else if (login === "INVALID_CREDENTIALS")
                    return res.status(400).json({ status: 400, msg: login });
                //ok:
                return res.json({ status: 200, msg: "LOGIN", data: login });
            }
            catch (e) {
                logger_1.default.error(e.message);
                return res.json({ status: 500, msg: e.message });
            }
        });
    }
    /**========================= REFRESH SESSION ==========================**/
    refreshSessionCtrl(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                //Data:
                const uid = req.uid;
                //Service:
                const session = yield service.refreshSessionServ(uid);
                //Return:
                if (session === "USER_NOT_FOUND")
                    return res.status(404).json({ status: 404, msg: session });
                else if (session === "USER_DELETED" || session === "USER_SUSPENDED")
                    return res.status(403).json({ status: 403, msg: session });
                //Ok:
                return res.json({ status: 200, msg: "OK", data: session });
            }
            catch (e) {
                logger_1.default.error(e.message);
                return res.json({ status: 500, msg: e.message });
            }
        });
    }
    /**======================= GET USER BY ID ==========================**/
    getUserIdCtrl(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const resService = yield service.getUserIdServ(id);
                if (resService === "USER_NOT_FOUND" || resService === "INVALID_USER_ID")
                    return res.json({ status: 400, msg: resService });
                return res.json({ status: 200, msg: "OK", data: resService });
            }
            catch (e) {
                logger_1.default.error(e.message);
                return res.json({ status: 500, msg: e.message });
            }
        });
    }
    /**====================== GET USER BY MAIL ============================**/
    getUserMailCtrl(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { mail } = req.body;
                const user = yield service.getUserMailServ(mail);
                if (user === "USER_NOT_FOUND")
                    return res.json({ status: 404, msg: user });
                return res.json({ status: 200, msg: "OK", data: user });
            }
            catch (e) {
                logger_1.default.error(e.message);
                return res.json({ status: 500, msg: e.message });
            }
        });
    }
    /**======================= EDIT PROFILE USER ==========================**/
    editProfileCtrl(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                //Data body:
                const { id } = req.params;
                const tokenID = req.uid;
                const data = {
                    user_id: id,
                    user_username: req.body.username,
                    user_name: req.body.name,
                    user_lastname: req.body.lastname,
                    user_dni: req.body.dni,
                    user_phone: req.body.phone,
                };
                //Service:
                const resService = yield service.editProfileServ(data, tokenID);
                //Response:
                if (!resService)
                    return res.status(500).json({ status: 500, msg: "SERVER_ERROR" });
                else if (resService === "USER_NOT_FOUND")
                    return res.status(404).json({ status: 404, msg: resService });
                else if (resService === "UNAUTHORIZED_ACTION")
                    return res.status(401).json({ status: 401, msg: resService });
                else if (resService === "USERNAME_IN_USE" ||
                    resService === "INVALID_USER_ID")
                    return res.status(400).json({ status: 400, msg: resService });
                else if (resService === "USER_UPDATED")
                    return res.json({ status: 200, msg: resService });
            }
            catch (e) {
                logger_1.default.error(e.message);
                return res.json({ status: 500, msg: e.message });
            }
        });
    }
    /**======================= CHANGE EMAIL ============================**/
    changeEmailCtrl(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                //body data:
                const { id } = req.params;
                const { mail } = req.body;
                //service:
                const resService = yield service.changeEmailServ(id, mail);
                //Return:
                if (resService === "USER_NOT_FOUND")
                    return res.json({ status: 404, msg: resService });
                else if (resService === "MAIL_IN_USE" || resService === "INVALID_USER_ID")
                    return res.json({ status: 400, msg: resService });
                //Ok:
                return res.json({ status: 200, msg: "EMAIL_UPDATED" });
            }
            catch (e) {
                logger_1.default.error(e.message);
                return res.json({ status: 500, msg: e.message });
            }
        });
    }
    /**======================= CHANGE PASSWORD ===========================**/
    changePassCtrl(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                //Data request:
                const { id } = req.params;
                const { password } = req.body;
                //Service:
                const resService = yield service.changePassServ(id, password);
                //Response:
                if (resService === "USER_NOT_FOUND")
                    return res.json({ status: 404, msg: resService });
                else if (resService === "INVALID_USER_ID") {
                    return res.json({ status: 400, msg: resService });
                }
                return res.json({ status: 200, msg: "PASSWORD_UPDATED" });
            }
            catch (e) {
                logger_1.default.error(e.message);
                return res.status(500).json({ status: 500, msg: e.message });
            }
        });
    }
    /** ======================== ADD BIRTHDAY ========================= **/
    addBirthdayCtrl(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                //data:
                const { id } = req.params;
                const data = {
                    user_id: id,
                    birthday_day: req.body.day,
                    birthday_month: req.body.month,
                    birthday_year: req.body.year,
                };
                //Service:
                const resService = yield service.addBirthdayServ(data);
                //Return:
                if (!resService)
                    return res.status(500).json({ status: 500, msg: "SERVER_ERROR" });
                else if (resService === "INVALID_USER_ID") {
                    return res.status(400).json({ status: 400, msg: resService });
                }
                else if (resService === "USER_NOT_FOUND")
                    return res.status(404).json({ status: 404, msg: resService });
                else if (resService === "BIRTHDAY_UPDATED" ||
                    resService === "BIRTHDAY_CREATED")
                    return res.json({ status: 201, msg: resService });
            }
            catch (e) {
                logger_1.default.error(e.message);
                return res.status(500).json({ status: 500, msg: e.message });
            }
        });
    }
    /** ========================= ADD ADDRESS ============================ **/
    addAddressCtrl(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                //data:
                const { id } = req.params;
                const data = {
                    address_street: req.body.street,
                    address_number: req.body.number,
                    address_floor: req.body.floor,
                    address_apartment: req.body.apartment,
                    address_city: req.body.city,
                    address_state: req.body.state,
                    user_id: id,
                };
                //Service:
                const resService = yield service.addAddressServ(data);
                //Return:
                if (!resService)
                    return res.status(500).json({ status: 500, msg: "SERVER_ERROR" });
                else if (resService === "MAX_LIMIT" || resService === "INVALID_USER_ID")
                    return res.json({ status: 400, msg: resService });
                else if (resService === "USER_NOT_FOUND")
                    return res.json({ status: 404, msg: resService });
                else if (resService === "ADDRESS_CREATED")
                    return res.json({ status: 201, msg: resService });
            }
            catch (e) {
                logger_1.default.error(e.message);
                return res.status(500).json({ status: 500, msg: e.message });
            }
        });
    }
    /** ======================= DELETE ADDRESS =========================== **/
    deleteAddressCtrl(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                //data:
                const { id } = req.params;
                //Service:
                const resDelete = yield service.deleteAddressServ(id);
                //Return:
                if (!resDelete)
                    return res.status(500).json({ status: 500, msg: "SERVER_ERROR" });
                else if (resDelete === "INVALID_ADDRESS_ID") {
                    return res.status(400).json({ status: 400, msg: resDelete });
                }
                else
                    return res.json({ status: 200, msg: "ADDRESS_DELETED" });
            }
            catch (e) {
                logger_1.default.error(e.message);
                return res.status(500).json({ status: 500, msg: e.message });
            }
        });
    }
    /**==================== PROFILE IMAGE =========================**/
    uploadProfileImage(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                //Data:
                const { file } = req;
                const { id } = req.params;
                if (!file)
                    return res.status(400).json({ status: 400, msg: "IMAGE_REQUIRED" });
                //Service:
                const resUpdate = yield service.uploadImageProfile(id, file.buffer);
                if (resUpdate === "ERROR_UPLOADING_IMAGE") {
                    return res.status(500).json({ status: 500, msg: resUpdate });
                }
                else if (resUpdate === "INVALID_USER_ID") {
                    return res.status(400).json({ status: 400, msg: resUpdate });
                }
                else if (resUpdate === "USER_NOT_FOUND") {
                    return res.status(404).json({ status: 404, msg: resUpdate });
                }
                else if (resUpdate === "IMAGE_UPDATED") {
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
exports.default = userController;
