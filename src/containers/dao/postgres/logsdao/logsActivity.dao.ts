//uuid:
import { v4 as uuidv4 } from "uuid";

import {
  getPagination,
  getPaginationLogs,
} from "../../../../utils/paginationfunction";

//Models:
import SuperuserActivity from "../../../../models/sql/activityLogs/superuseractivity.model";
import ActivityLogUser from "../../../../models/sql/activityLogs/ALogUser.model";
import User from "../../../../models/sql/usersModel/User.model";

export class LogActivitySQL {
  constructor() {}

  /** ----------- CREATE USER LOG ----------- **/
  async createUserLog(
    superuser: string,
    targetuser: string,
    action: string,
    rol: string
  ) {
    try {
      //IDs:
      const alu_id = uuidv4();
      const sa_id = uuidv4();
      //Create userLog:
      const userLog = await ActivityLogUser.create({
        alu_id,
        user_id: targetuser,
        alu_action: action,
      });

      if (!userLog) return;
      else {
        await SuperuserActivity.create({
          sa_id,
          user_id: superuser,
          su_rol: rol,
          activity_event: alu_id,
        });
      }
    } catch (e: any) {
      throw new Error(e.message);
    }
  }

  /** ----------- LIST LOG ACTIVITY ----------- **/
  async listLogActivity(user_id: string, page: number = 0, size: number = 0) {
    try {
      const { limit, offset } = getPagination(page, size);
      const list = await SuperuserActivity.findAndCountAll({
        where: { user_id },
        limit,
        offset,
        order: [["createdAt", "DESC"]],
        attributes: { exclude: ["activity_event"] },
        include: [
          {
            model: ActivityLogUser,
            attributes: ["alu_action", "user_id"],
            include: [
              { model: User, attributes: ["user_mail", "user_username"] },
            ],
            as: "action",
          },
        ],
      });
      if (list) {
        return getPaginationLogs(list, page, limit);
      }
    } catch (e: any) {
      throw new Error(e.message);
    }
  }
}
