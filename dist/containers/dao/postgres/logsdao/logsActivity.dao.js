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
exports.LogActivitySQL = void 0;
//uuid:
const uuid_1 = require("uuid");
const paginationfunction_1 = require("../../../../utils/paginationfunction");
//Models:
const superuseractivity_model_1 = __importDefault(require("../../../../models/sql/activityLogs/superuseractivity.model"));
const ALogUser_model_1 = __importDefault(require("../../../../models/sql/activityLogs/ALogUser.model"));
const User_model_1 = __importDefault(require("../../../../models/sql/usersModel/User.model"));
class LogActivitySQL {
    constructor() { }
    /** ----------- CREATE USER LOG ----------- **/
    createUserLog(superuser, targetuser, action, rol) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                //IDs:
                const alu_id = (0, uuid_1.v4)();
                const sa_id = (0, uuid_1.v4)();
                //Create userLog:
                const userLog = yield ALogUser_model_1.default.create({
                    alu_id,
                    user_id: targetuser,
                    alu_action: action,
                });
                if (!userLog)
                    return;
                else {
                    yield superuseractivity_model_1.default.create({
                        sa_id,
                        user_id: superuser,
                        su_rol: rol,
                        activity_event: alu_id,
                    });
                }
            }
            catch (e) {
                throw new Error(e.message);
            }
        });
    }
    /** ----------- LIST LOG ACTIVITY ----------- **/
    listLogActivity(user_id, page = 0, size = 0) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { limit, offset } = (0, paginationfunction_1.getPagination)(page, size);
                const list = yield superuseractivity_model_1.default.findAndCountAll({
                    where: { user_id },
                    limit,
                    offset,
                    order: [["createdAt", "DESC"]],
                    attributes: { exclude: ["activity_event"] },
                    include: [
                        {
                            model: ALogUser_model_1.default,
                            attributes: ["alu_action", "user_id"],
                            include: [
                                { model: User_model_1.default, attributes: ["user_mail", "user_username"] },
                            ],
                            as: "action",
                        },
                    ],
                });
                if (list) {
                    return (0, paginationfunction_1.getPaginationLogs)(list, page, limit);
                }
            }
            catch (e) {
                throw new Error(e.message);
            }
        });
    }
}
exports.LogActivitySQL = LogActivitySQL;
