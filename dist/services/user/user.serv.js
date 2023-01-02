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
exports.deleteCreditCardServ = exports.addCreditCardServ = exports.deleteAddressServ = exports.addAddressServ = exports.addBirthdayServ = exports.changePassServ = exports.changeEmailServ = exports.editProfileServ = exports.getUserMailServ = exports.getUserIdServ = exports.refreshSessionServ = exports.loginUserServ = exports.registerUserServ = void 0;
//uuid:
const uuid_1 = require("uuid");
// BcryptJS:
const bcryptHandler_1 = require("../../utils/bcryptHandler");
//Json Web Token:
const jwtHandler_1 = require("../../utils/jwtHandler");
// DAOs:
const containers_1 = require("../../containers");
/**============================= REGISTER USER ==================================**/
function registerUserServ(data) {
    return __awaiter(this, void 0, void 0, function* () {
        //Check email:
        const isEmail = yield containers_1.daoUser.getUser("mail", data.user_mail, true);
        if (isEmail)
            return "MAIL_IN_USE";
        //Check username:
        const isUsername = yield containers_1.daoUser.getUser("username", data.user_username, true);
        if (isUsername)
            return "USERNAME_IN_USE";
        //Register data:
        const user_id = (0, uuid_1.v4)();
        const hashpass = yield (0, bcryptHandler_1.encrypt)(data.user_password);
        const user = yield containers_1.daoUser.registerUser(Object.assign(Object.assign({}, data), { user_password: hashpass, user_id }));
        return user;
    });
}
exports.registerUserServ = registerUserServ;
/**============================= LOGIN USER ==================================**/
function loginUserServ(mail, password) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = yield containers_1.daoUser.getUser("mail", mail);
        //User not found:
        if (!user)
            return "USER_NOT_FOUND";
        //Check user status:
        if (user.user_status === "suspended")
            return "USER_SUSPENDED";
        if (user.user_status === "deleted")
            return "USER_DELETED";
        //Verify pass:
        const comparePass = yield (0, bcryptHandler_1.verified)(password, user.user_password);
        if (!comparePass)
            return "INVALID_CREDENTIALS";
        //Return tokens:
        const token = (0, jwtHandler_1.generateToken)(user.user_id);
        const refreshToken = (0, jwtHandler_1.generateRefreshToken)(user.user_id);
        return { token, refreshToken, uid: user.user_id };
    });
}
exports.loginUserServ = loginUserServ;
/**============================= REFRESH SESSION ==================================**/
function refreshSessionServ(uid) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = yield containers_1.daoUser.getUser("id", uid, true);
        if (!user)
            return "USER_NOT_FOUND";
        else if (user.user_status === "suspended")
            return "USER_SUSPENDED";
        else if (user.user_status === "deleted")
            return "USER_DELETED";
        const token = (0, jwtHandler_1.generateToken)(uid);
        return { token, uid };
    });
}
exports.refreshSessionServ = refreshSessionServ;
/**============================= GET USER BY ID ==================================**/
//getUser
function getUserIdServ(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = yield containers_1.daoUser.getUser("id", id);
        if (!user)
            return "USER_NOT_FOUND";
        return user;
    });
}
exports.getUserIdServ = getUserIdServ;
/**============================= GET USER BY MAIL ==================================**/
/*
 METHOD: "POST" its more secure to send a mail.
 */
function getUserMailServ(mail) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = yield containers_1.daoUser.getUser("mail", mail);
        if (!user)
            return "USER_NOT_FOUND";
        return user;
    });
}
exports.getUserMailServ = getUserMailServ;
/**============================= EDIT PROFILE USER ==================================**/
function editProfileServ(data) {
    return __awaiter(this, void 0, void 0, function* () {
        if (data.user_username) {
            const check = yield containers_1.daoUser.getUser("username", data.user_username, true);
            if (check)
                return "USERNAME_IN_USE";
        }
        const user = yield containers_1.daoUser.updateProfile(data);
        return user;
    });
}
exports.editProfileServ = editProfileServ;
/**============================= CHANGE EMAIL ==================================**/
function changeEmailServ(uid, mail) {
    return __awaiter(this, void 0, void 0, function* () {
        //Find user:
        const user = yield containers_1.daoUser.getUser("id", uid, true);
        if (!user)
            return "USER_NOT_FOUND";
        //Checking mail:
        if (user.user_mail.toString() === mail.toString())
            return "CHANGE_MAIL";
        const isMail = yield containers_1.daoUser.getUser("mail", mail, true);
        if (isMail)
            return "MAIL_IN_USE";
        //Update mail:
        const updatedUser = yield containers_1.daoUser.changeFields(uid, "mail", mail);
        return updatedUser;
    });
}
exports.changeEmailServ = changeEmailServ;
/**============================= CHANGE PASSWORD ==================================**/
function changePassServ(uid, pass) {
    return __awaiter(this, void 0, void 0, function* () {
        //Find user:
        const user = yield containers_1.daoUser.getUser("id", uid, true);
        if (!user)
            return "USER_NOT_FOUND";
        //Hash pass:
        const hashpass = yield (0, bcryptHandler_1.encrypt)(pass);
        //Update pass:
        const updatedUser = yield containers_1.daoUser.changeFields(uid, "password", hashpass);
        return updatedUser;
    });
}
exports.changePassServ = changePassServ;
/** ============================= ADD BIRTHDAY ================================== **/
function addBirthdayServ(data) {
    return __awaiter(this, void 0, void 0, function* () {
        //Check User:
        const isUser = yield containers_1.daoUser.getUser("id", data.user_id, true);
        if (!isUser)
            return "USER_NOT_FOUND";
        //Create birthday:
        const birthday_id = (0, uuid_1.v4)();
        const birthday = yield containers_1.daoUser.addBirthday(Object.assign(Object.assign({}, data), { birthday_id }));
        //return data:
        return birthday;
    });
}
exports.addBirthdayServ = addBirthdayServ;
/** ============================= ADD ADDRESS ================================== **/
function addAddressServ(data) {
    return __awaiter(this, void 0, void 0, function* () {
        //Check user:
        const isUser = yield containers_1.daoUser.getUser("id", data.user_id, true);
        if (!isUser)
            return "USER_NOT_FOUND";
        //Create address:
        const address_id = (0, uuid_1.v4)();
        const address = yield containers_1.daoUser.addAddress(Object.assign(Object.assign({}, data), { address_id }));
        //Return data:
        return address;
    });
}
exports.addAddressServ = addAddressServ;
/** ============================= DELETE ADDRESS ================================== **/
function deleteAddressServ(aid) {
    return __awaiter(this, void 0, void 0, function* () {
        //Delete:
        const resDelete = yield containers_1.daoUser.deleteAddress(aid);
        //Return:
        return resDelete;
    });
}
exports.deleteAddressServ = deleteAddressServ;
/** ============================= ADD CREDITCARD ================================== **/
function addCreditCardServ(data) {
    return __awaiter(this, void 0, void 0, function* () {
        //checkUser:
        const isUser = yield containers_1.daoUser.getUser("id", data.user_id, true);
        if (!isUser)
            return "USER_NOT_FOUND";
        //Create:
        const cc_id = (0, uuid_1.v4)();
        const newCreditCard = yield containers_1.daoUser.addCreditCard(Object.assign(Object.assign({}, data), { cc_id }));
        //Return:
        return newCreditCard;
    });
}
exports.addCreditCardServ = addCreditCardServ;
/** ============================= DELETE CREDITCARD ================================== **/
function deleteCreditCardServ(ccid) {
    return __awaiter(this, void 0, void 0, function* () {
        //delete:
        const deleted = yield containers_1.daoUser.deleteCreditCard(ccid);
        //return:
        return deleted;
    });
}
exports.deleteCreditCardServ = deleteCreditCardServ;
