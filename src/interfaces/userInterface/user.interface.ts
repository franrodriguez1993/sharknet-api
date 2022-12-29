import { RolInterface } from "./rol.interface";

export interface UserInterface {
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
  Rol?: RolInterface;
}
