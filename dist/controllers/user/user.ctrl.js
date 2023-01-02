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
exports.deleteCreditCardCtrl = exports.addCreditCardCtrl = exports.deleteAddressCtrl = exports.addAddressCtrl = exports.addBirthdayCtrl = exports.changePassCtrl = exports.changeEmailCtrl = exports.editProfileCtrl = exports.getUserMailCtrl = exports.getUserIdCtrl = exports.refreshSessionCtrl = exports.loginUserCtrl = exports.registerUserCtrl = void 0;
const user_serv_1 = require("../../services/user/user.serv");
/**============================= REGISTER USER ==================================**/
function registerUserCtrl(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            //Body data:
            const data = {
                user_username: req.body.username,
                user_mail: req.body.mail,
                user_password: req.body.password,
            };
            //Service:
            const user = yield (0, user_serv_1.registerUserServ)(data);
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
            console.log(e);
            return res.json({ status: 500, msg: e.message });
        }
    });
}
exports.registerUserCtrl = registerUserCtrl;
/**============================= LOGIN USER ==================================**/
function loginUserCtrl(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            //Data:
            const { mail, password } = req.body;
            //Service:
            const login = yield (0, user_serv_1.loginUserServ)(mail, password);
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
            console.log(e);
            return res.json({ status: 500, msg: e.message });
        }
    });
}
exports.loginUserCtrl = loginUserCtrl;
/**============================= REFRESH SESSION ==================================**/
function refreshSessionCtrl(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            //Data:
            const uid = req.uid;
            //Service:
            const session = yield (0, user_serv_1.refreshSessionServ)(uid);
            //Return:
            if (session === "USER_NOT_FOUND")
                return res.status(404).json({ status: 404, msg: session });
            else if (session === "USER_DELETED" || session === "USER_SUSPENDED")
                return res.status(403).json({ status: 403, msg: session });
            //Ok:
            return res.json({ status: 200, msg: "OK", data: session });
        }
        catch (e) {
            console.log(e);
            return res.json({ status: 500, msg: e.message });
        }
    });
}
exports.refreshSessionCtrl = refreshSessionCtrl;
/**============================= GET USER BY ID ==================================**/
function getUserIdCtrl(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { id } = req.params;
            const user = yield (0, user_serv_1.getUserIdServ)(id);
            if (user === "USER_NOT_FOUND")
                return res.json({ status: 400, msg: user });
            return res.json({ status: 200, msg: "OK", data: user });
        }
        catch (e) {
            return res.json({ status: 500, msg: e.message });
        }
    });
}
exports.getUserIdCtrl = getUserIdCtrl;
/**============================= GET USER BY MAIL ==================================**/
function getUserMailCtrl(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { mail } = req.body;
            const user = yield (0, user_serv_1.getUserMailServ)(mail);
            if (user === "USER_NOT_FOUND")
                return res.json({ status: 404, msg: user });
            return res.json({ status: 200, msg: "OK", data: user });
        }
        catch (e) {
            return res.json({ status: 500, msg: e.message });
        }
    });
}
exports.getUserMailCtrl = getUserMailCtrl;
/**============================= EDIT PROFILE USER ==================================**/
function editProfileCtrl(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            //Data body:
            const { id } = req.params;
            const data = {
                user_id: id,
                user_username: req.body.username,
                user_name: req.body.name,
                user_lastname: req.body.lastname,
                user_dni: req.body.dni,
                user_phone: req.body.phone,
            };
            //Service:
            const user = yield (0, user_serv_1.editProfileServ)(data);
            //Response:
            if (!user)
                return res.status(500).json({ status: 500, msg: "SERVER_ERROR" });
            else if (user === "USER_NOT_FOUND")
                return res.status(404).json({ status: 404, msg: user });
            else if (user === "USERNAME_IN_USE")
                return res.status(400).json({ status: 400, msg: user });
            else if (user === "USER_UPDATED")
                return res.json({ status: 200, msg: user });
        }
        catch (e) {
            return res.json({ status: 500, msg: e.message });
        }
    });
}
exports.editProfileCtrl = editProfileCtrl;
/**============================= CHANGE EMAIL ==================================**/
function changeEmailCtrl(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            //body data:
            const { id } = req.params;
            const { mail } = req.body;
            //service:
            const data = yield (0, user_serv_1.changeEmailServ)(id, mail);
            //Return:
            if (data === "USER_NOT_FOUND")
                return res.json({ status: 404, msg: data });
            else if (data === "CHANGE_EMAIL" || data === "MAIL_IN_USE")
                return res.json({ status: 400, msg: data });
            //Ok:
            return res.json({ status: 200, msg: "EMAIL_UPDATED" });
        }
        catch (e) {
            return res.json({ status: 500, msg: e.message });
        }
    });
}
exports.changeEmailCtrl = changeEmailCtrl;
/**============================= CHANGE PASSWORD ==================================**/
function changePassCtrl(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            //Data request:
            const { id } = req.params;
            const { password } = req.body;
            //Service:
            const user = yield (0, user_serv_1.changePassServ)(id, password);
            //Response:
            if (user === "USER_NOT_FOUND")
                return res.json({ status: 404, msg: user });
            return res.json({ status: 200, msg: "PASSWORD_UPDATED" });
        }
        catch (e) {
            return res.status(500).json({ status: 500, msg: e.message });
        }
    });
}
exports.changePassCtrl = changePassCtrl;
/** ============================= ADD BIRTHDAY ================================== **/
function addBirthdayCtrl(req, res) {
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
            const birthday = yield (0, user_serv_1.addBirthdayServ)(data);
            //Return:
            if (!birthday)
                return res.status(500).json({ status: 500, msg: "SERVER_ERROR" });
            else if (birthday === "USER_NOT_FOUND")
                return res.status(404).json({ status: 404, msg: birthday });
            else if (birthday === "BIRTHDAY_UPDATED" || birthday === "BIRTHDAY_CREATED")
                return res.json({ status: 201, msg: birthday });
        }
        catch (e) {
            return res.status(500).json({ status: 500, msg: e.message });
        }
    });
}
exports.addBirthdayCtrl = addBirthdayCtrl;
/** ============================= ADD ADDRESS ================================== **/
function addAddressCtrl(req, res) {
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
            const address = yield (0, user_serv_1.addAddressServ)(data);
            //Return:
            if (!address)
                return res.status(500).json({ status: 500, msg: "SERVER_ERROR" });
            else if (address === "MAX_LIMIT")
                return res.json({ status: 400, msg: address });
            else if (address === "USER_NOT_FOUND")
                return res.json({ status: 404, msg: address });
            else if (address === "ADDRESS_CREATED")
                return res.json({ status: 201, msg: address });
        }
        catch (e) {
            return res.status(500).json({ status: 500, msg: e.message });
        }
    });
}
exports.addAddressCtrl = addAddressCtrl;
/** ============================= DELETE ADDRESS ================================== **/
function deleteAddressCtrl(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            //data:
            const { id } = req.params;
            //Service:
            const resDelete = yield (0, user_serv_1.deleteAddressServ)(id);
            //Return:
            if (!resDelete)
                return res.status(500).json({ status: 500, msg: "SERVER_ERROR" });
            else
                return res.json({ status: 200, msg: "ADDRESS_DELETED" });
        }
        catch (e) {
            return res.status(500).json({ status: 500, msg: e.message });
        }
    });
}
exports.deleteAddressCtrl = deleteAddressCtrl;
/** ============================= ADD CREDITCARD ================================== **/
function addCreditCardCtrl(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            //data:
            const { id } = req.params;
            const data = {
                user_id: id,
                cc_name: req.body.name,
                cc_number: req.body.number,
                cc_date: req.body.date,
                cc_code: req.body.code,
                cc_bank: req.body.bank,
            };
            //Service:
            const newCreditCard = yield (0, user_serv_1.addCreditCardServ)(data);
            //Return:
            if (!newCreditCard)
                return res.status(500).json({ status: 500, msg: "SERVER_ERROR" });
            else if (newCreditCard === "USER_NOT_FOUND")
                return res.status(404).json({ status: 404, msg: newCreditCard });
            else if (newCreditCard === "MAX_LIMIT" ||
                newCreditCard === "CREDITCARD_IN_USE")
                return res.status(400).json({ status: 400, msg: newCreditCard });
            else if (newCreditCard === "CREDITCARD_REGISTERED")
                return res
                    .status(201)
                    .json({ status: 201, msg: "OK", data: newCreditCard });
        }
        catch (e) {
            return res.status(500).json({ status: 500, msg: e.message });
        }
    });
}
exports.addCreditCardCtrl = addCreditCardCtrl;
/** ============================= DELETE CREDITCARD ================================== **/
function deleteCreditCardCtrl(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            //data:
            const { id } = req.params;
            //Service:
            const deleted = yield (0, user_serv_1.deleteCreditCardServ)(id);
            //Return:
            if (!deleted)
                return res.status(500).json({ status: 500, msg: "SERVER_ERROR" });
            return res.json({ status: 200, msg: "CREDITCARD_DELETED" });
        }
        catch (e) {
            return res.status(500).json({ status: 500, msg: e.message });
        }
    });
}
exports.deleteCreditCardCtrl = deleteCreditCardCtrl;
