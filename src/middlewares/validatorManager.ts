import { NextFunction, Request, Response } from "express";
import { body, validationResult } from "express-validator";

const validatorManager = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res
      .status(400)
      .json({ status: 400, msg: "INVALID_BODY_REQUEST", data: errors.array() });
  }
  next();
};

/** ------------- Body Register User ------------- **/
export const validateBodyRegister = [
  body("username").isLength({ min: 3, max: 25 }).trim().escape(),
  body("mail").isEmail().normalizeEmail().escape(),
  body("password").isLength({ min: 6, max: 25 }).trim().escape(),
  validatorManager,
];
/**-------------------------------------------------**/

/** ------------- Body login User ------------- **/
export const validateBodyLogin = [
  body("mail").isEmail().normalizeEmail().escape(),
  body("password").isLength({ min: 6, max: 25 }).trim().escape(),
  validatorManager,
];
/**-------------------------------------------------**/

/** ------------- Body profile User ------------- **/
export const validateBodyProfile = [
  body("username").optional().isLength({ min: 3, max: 25 }).trim().escape(),
  body("mail").optional().isEmail().normalizeEmail().escape(),
  body("password").optional().isLength({ min: 6, max: 25 }).trim().escape(),
  body("name").optional().isLength({ min: 3, max: 25 }).trim().escape(),
  body("lastname").optional().isLength({ min: 3, max: 25 }).trim().escape(),
  body("dni").optional().isLength({ min: 7, max: 8 }).trim().escape(),
  body("phone").optional().isLength({ min: 12, max: 12 }).trim().escape(),
  validatorManager,
];
/**-------------------------------------------------**/

/** ------------- Body birthday User ------------- **/
export const validatorBirthdayUser = [
  body("day").notEmpty().isNumeric().escape(),
  body("year").notEmpty().isNumeric().escape(),
  body("month").notEmpty().isNumeric().escape(),
  validatorManager,
];
/**-------------------------------------------------**/

/** ------------- Body birthday User ------------- **/
export const validatorAddressUser = [
  body("street").notEmpty().isLength({ min: 3, max: 40 }).escape(),
  body("number").notEmpty().isLength({ min: 1, max: 5 }).escape(),
  body("floor").optional().escape(),
  body("apartment").optional().escape(),
  body("city").notEmpty().isLength({ min: 3, max: 40 }).escape(),
  body("state").notEmpty().isLength({ min: 3, max: 40 }).escape(),
  validatorManager,
];
/**-------------------------------------------------**/

/** ------------- Body credictCard User ------------- **/
export const validateCreditCard = [
  body("name").notEmpty().isLength({ min: 3, max: 40 }).escape(),
  body("number").notEmpty().isLength({ min: 16, max: 20 }).escape(),
  body("date").notEmpty().isLength({ min: 3, max: 8 }),
  body("code").notEmpty().isLength({ min: 3, max: 3 }).escape(),
  body("bank").notEmpty().isLength({ min: 3, max: 40 }).escape(),
  validatorManager,
];
/**-------------------------------------------------**/

/** ------------- Body Product ------------- **/
export const validatorProduct = [
  body("type").notEmpty().trim(),
  body("seller").notEmpty().trim(),
  body("name").notEmpty().isLength({ min: 3, max: 60 }).escape(),
  body("brand").optional().notEmpty().isLength({ min: 3, max: 60 }).escape(),
  body("price").isNumeric().notEmpty().escape(),
  body("stock").isNumeric().notEmpty().escape(),
  body("description").optional().notEmpty().isLength({ min: 3, max: 4000 }),
  body("status").notEmpty().escape(),
  body("warranty").optional().isNumeric().escape(),
  body("address").notEmpty().trim(),
  body("category").notEmpty().trim(),
  validatorManager,
];
/**-------------------------------------------------**/

/** ------------- Body edit Product ------------- **/
export const validatorEditProduct = [
  body("type").optional().notEmpty().trim(),
  body("name").optional().notEmpty().isLength({ min: 3, max: 60 }).escape(),
  body("brand").optional().notEmpty().isLength({ min: 3, max: 60 }).escape(),
  body("price").optional().isNumeric().notEmpty().escape(),
  body("stock").optional().isNumeric().notEmpty().escape(),
  body("description").optional().notEmpty().isLength({ min: 3, max: 4000 }),
  body("status").optional().notEmpty().escape(),
  body("warranty").optional().isNumeric().escape(),
  body("address").optional().notEmpty().trim(),
  body("offer").optional().isNumeric(),
  validatorManager,
];

/**-------------------------------------------------**/

/** ------------- Body qualify user ------------- **/
export const validatorQualifyUser = [
  body("qualifier").notEmpty().trim(),
  body("receiver").notEmpty().trim(),
  body("sale").notEmpty().trim(),
  body("rs_id").notEmpty().trim(),
  body("rol").notEmpty().trim(),
  body("description").notEmpty().isLength({ min: 3, max: 240 }).escape(),
  validatorManager,
];
/**-------------------------------------------------**/

/** ------------- Body comment  ------------- **/
export const validatorComment = [
  body("product").notEmpty().trim(),
  body("user").notEmpty().trim(),
  body("body").notEmpty().isLength({ min: 3, max: 250 }),
  validatorManager,
];
