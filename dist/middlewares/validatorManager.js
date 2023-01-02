"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validatorComment = exports.validatorQualifyUser = exports.validatorEditProduct = exports.validatorProduct = exports.validateCreditCard = exports.validatorAddressUser = exports.validatorBirthdayUser = exports.validateBodyProfile = exports.validateBodyLogin = exports.validateBodyRegister = void 0;
const express_validator_1 = require("express-validator");
const validatorManager = (req, res, next) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return res
            .status(400)
            .json({ status: 400, msg: "INVALID_BODY_REQUEST", data: errors.array() });
    }
    next();
};
/** ------------- Body Register User ------------- **/
exports.validateBodyRegister = [
    (0, express_validator_1.body)("username").isLength({ min: 3, max: 25 }).trim().escape(),
    (0, express_validator_1.body)("mail").isEmail().normalizeEmail().escape(),
    (0, express_validator_1.body)("password").isLength({ min: 6, max: 25 }).trim().escape(),
    validatorManager,
];
/**-------------------------------------------------**/
/** ------------- Body login User ------------- **/
exports.validateBodyLogin = [
    (0, express_validator_1.body)("mail").isEmail().normalizeEmail().escape(),
    (0, express_validator_1.body)("password").isLength({ min: 6, max: 25 }).trim().escape(),
    validatorManager,
];
/**-------------------------------------------------**/
/** ------------- Body profile User ------------- **/
exports.validateBodyProfile = [
    (0, express_validator_1.body)("username").optional().isLength({ min: 3, max: 25 }).trim().escape(),
    (0, express_validator_1.body)("mail").optional().isEmail().normalizeEmail().escape(),
    (0, express_validator_1.body)("password").optional().isLength({ min: 6, max: 25 }).trim().escape(),
    (0, express_validator_1.body)("name").optional().isLength({ min: 3, max: 25 }).trim().escape(),
    (0, express_validator_1.body)("lastname").optional().isLength({ min: 3, max: 25 }).trim().escape(),
    (0, express_validator_1.body)("dni").optional().isLength({ min: 7, max: 8 }).trim().escape(),
    (0, express_validator_1.body)("phone").optional().isLength({ min: 12, max: 12 }).trim().escape(),
    validatorManager,
];
/**-------------------------------------------------**/
/** ------------- Body birthday User ------------- **/
exports.validatorBirthdayUser = [
    (0, express_validator_1.body)("day").notEmpty().isNumeric().escape(),
    (0, express_validator_1.body)("year").notEmpty().isNumeric().escape(),
    (0, express_validator_1.body)("month").notEmpty().isNumeric().escape(),
    validatorManager,
];
/**-------------------------------------------------**/
/** ------------- Body birthday User ------------- **/
exports.validatorAddressUser = [
    (0, express_validator_1.body)("street").notEmpty().isLength({ min: 3, max: 40 }).escape(),
    (0, express_validator_1.body)("number").notEmpty().isLength({ min: 1, max: 5 }).escape(),
    (0, express_validator_1.body)("floor").optional().escape(),
    (0, express_validator_1.body)("apartment").optional().escape(),
    (0, express_validator_1.body)("city").notEmpty().isLength({ min: 3, max: 40 }).escape(),
    (0, express_validator_1.body)("state").notEmpty().isLength({ min: 3, max: 40 }).escape(),
    validatorManager,
];
/**-------------------------------------------------**/
/** ------------- Body credictCard User ------------- **/
exports.validateCreditCard = [
    (0, express_validator_1.body)("name").notEmpty().isLength({ min: 3, max: 40 }).escape(),
    (0, express_validator_1.body)("number").notEmpty().isLength({ min: 16, max: 20 }).escape(),
    (0, express_validator_1.body)("date").notEmpty().isLength({ min: 3, max: 8 }),
    (0, express_validator_1.body)("code").notEmpty().isLength({ min: 3, max: 3 }).escape(),
    (0, express_validator_1.body)("bank").notEmpty().isLength({ min: 3, max: 40 }).escape(),
    validatorManager,
];
/**-------------------------------------------------**/
/** ------------- Body Product ------------- **/
exports.validatorProduct = [
    (0, express_validator_1.body)("type").notEmpty().trim(),
    (0, express_validator_1.body)("seller").notEmpty().trim(),
    (0, express_validator_1.body)("name").notEmpty().isLength({ min: 3, max: 60 }).escape(),
    (0, express_validator_1.body)("brand").optional().notEmpty().isLength({ min: 3, max: 60 }).escape(),
    (0, express_validator_1.body)("price").isNumeric().notEmpty().escape(),
    (0, express_validator_1.body)("stock").isNumeric().notEmpty().escape(),
    (0, express_validator_1.body)("description").optional().notEmpty().isLength({ min: 3, max: 4000 }),
    (0, express_validator_1.body)("status").notEmpty().escape(),
    (0, express_validator_1.body)("warranty").optional().isNumeric().escape(),
    (0, express_validator_1.body)("address").notEmpty().trim(),
    (0, express_validator_1.body)("category").notEmpty().trim(),
    validatorManager,
];
/**-------------------------------------------------**/
/** ------------- Body edit Product ------------- **/
exports.validatorEditProduct = [
    (0, express_validator_1.body)("type").optional().notEmpty().trim(),
    (0, express_validator_1.body)("name").optional().notEmpty().isLength({ min: 3, max: 60 }).escape(),
    (0, express_validator_1.body)("brand").optional().notEmpty().isLength({ min: 3, max: 60 }).escape(),
    (0, express_validator_1.body)("price").optional().isNumeric().notEmpty().escape(),
    (0, express_validator_1.body)("stock").optional().isNumeric().notEmpty().escape(),
    (0, express_validator_1.body)("description").optional().notEmpty().isLength({ min: 3, max: 4000 }),
    (0, express_validator_1.body)("status").optional().notEmpty().escape(),
    (0, express_validator_1.body)("warranty").optional().isNumeric().escape(),
    (0, express_validator_1.body)("address").optional().notEmpty().trim(),
    (0, express_validator_1.body)("offer").optional().isNumeric(),
    validatorManager,
];
/**-------------------------------------------------**/
/** ------------- Body qualify user ------------- **/
exports.validatorQualifyUser = [
    (0, express_validator_1.body)("qualifier").notEmpty().trim(),
    (0, express_validator_1.body)("receiver").notEmpty().trim(),
    (0, express_validator_1.body)("sale").notEmpty().trim(),
    (0, express_validator_1.body)("rs_id").notEmpty().trim(),
    (0, express_validator_1.body)("rol").notEmpty().trim(),
    (0, express_validator_1.body)("description").notEmpty().isLength({ min: 3, max: 240 }).escape(),
    validatorManager,
];
/**-------------------------------------------------**/
/** ------------- Body comment  ------------- **/
exports.validatorComment = [
    (0, express_validator_1.body)("product").notEmpty().trim(),
    (0, express_validator_1.body)("user").notEmpty().trim(),
    (0, express_validator_1.body)("body").notEmpty().isLength({ min: 3, max: 250 }),
    validatorManager,
];
