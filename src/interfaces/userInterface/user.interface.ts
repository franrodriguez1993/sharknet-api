import { Model } from "sequelize";
import { rolBodyIF } from "./rol.interface";

export interface userBodyIF {
  user_id?: string;
  user_name?: string;
  user_lastname?: string;
  user_username?: string;
  user_password?: string;
  user_mail?: string;
  user_dni?: string;
  user_phone?: string;
  user_status?: string;
  rol_id?: string;
  Rol?: rolBodyIF;
  user_image?: string;
}

export interface userObjectIF extends userBodyIF, Model<userBodyIF> {}
