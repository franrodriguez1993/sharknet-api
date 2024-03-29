import { addressBodyIF } from "../../../../interfaces/userInterface/address.Interface";
import { birthdayBodyIF } from "../../../../interfaces/userInterface/birthday.interface";

import { rolObjectIF } from "../../../../interfaces/userInterface/rol.interface";
import {
  userObjectIF,
  userBodyIF,
} from "../../../../interfaces/userInterface/user.interface";
import ProductFavorite from "../../../../models/sql/productsModel/PFavorite.models";
import Address from "../../../../models/sql/usersModel/Address.model";
import Birthday from "../../../../models/sql/usersModel/Birthday.model";

import Rol from "../../../../models/sql/usersModel/Rol.model";
import User from "../../../../models/sql/usersModel/User.model";
import basecontainer from "../../../base/base.container";

export class daoUserSQL extends basecontainer {
  constructor() {
    super(User);
  }

  /** ------------------------- REGISTER USER -------------------------- **/

  async registerUser(data: userBodyIF) {
    try {
      //Find user rol:
      const rolID: rolObjectIF = await Rol.findOne({
        where: { rol_name: "user" },
      });
      const user = await User.create({
        user_id: data.user_id,
        user_username: data.user_username,
        user_mail: data.user_mail,
        user_password: data.user_password,
        rol_id: rolID.rol_id,
      });
      if (user) return "USER_REGISTERED";
    } catch (e: any) {
      throw new Error(e.message);
    }
  }

  /** ---------------------------- GET USER  ------------------------------------ **/
  //Return full user data or just the simple data (to check functions)
  //If simple is true, return a reduced data version
  async getUser(field: string, attribute: string, simple: boolean = false) {
    const options = {
      where: {},
      include: [],
      attributes: { exclude: [] },
    };
    //Fields:
    if (field === "id") {
      options.where = { user_id: attribute };
      options.attributes.exclude = ["user_password"];
    } else if (field === "mail") {
      options.where = { user_mail: attribute };
    } else if (field === "username") {
      options.where = { user_username: attribute };
    }
    //Include:
    if (!simple) {
      options.include = [
        { model: Rol, attributes: ["rol_name"] },
        { model: Birthday, attributes: { exclude: ["user_id"] } },
        { model: Address, attributes: { exclude: ["user_id"] } },
        {
          model: ProductFavorite,
          attributes: ["product_id"],
        },
      ];
    }
    try {
      const user: userObjectIF = await User.findOne({
        ...options,
      });
      return user;
    } catch (e: any) {
      throw new Error(e.message);
    }
  }
  /** ---------------------------- GET USER ROL  ------------------------------------ **/
  async getUserRol(user_id: string) {
    try {
      return await User.findOne({
        where: { user_id },
        attributes: ["user_id"],
        include: [{ model: Rol, attributes: ["rol_name"] }],
      });
    } catch (e: any) {
      throw new Error(e.message);
    }
  }

  /** ---------------------------------- UPDATE USER   ----------------------------- **/
  async updateProfile(data: userBodyIF) {
    try {
      //Find user:
      const user: userObjectIF = await this.getUser("id", data.user_id);
      if (!user) return "USER_NOT_FOUND";
      let fields = {};
      if (data.user_name) {
        fields = { ...fields, user_name: data.user_name };
      }
      if (data.user_lastname) {
        fields = { ...fields, user_lastname: data.user_lastname };
      }
      if (data.user_username) {
        fields = { ...fields, user_username: data.user_username };
      }
      if (data.user_dni) {
        fields = { ...fields, user_dni: data.user_dni };
      }
      if (data.user_phone) {
        fields = { ...fields, user_phone: data.user_phone };
      }

      //Update data:
      user.set(fields);
      const updatedUser = await user.save();
      if (updatedUser) return "USER_UPDATED";
    } catch (e: any) {
      throw new Error(e.message);
    }
  }

  /** ---------------------------------- CHANGE FIELDS   ----------------------------- **/
  //Update specific fields (email,password)
  async changeFields(id: string, field: string, data: string) {
    try {
      //Find user:
      const user: userObjectIF = await this.getUser("id", id);
      if (!user) return "USER_NOT_FOUND";

      //Update specific field:
      if (field === "mail") {
        user.set({ user_mail: data });
      } else if (field === "password") {
        user.set({ user_password: data });
      }
      //Save and return:
      return await user.save();
    } catch (e: any) {
      throw new Error(e.message);
    }
  }

  /** --------------------------- ADD BIRTHDAY ---------------------------- **/
  async addBirthday(data: birthdayBodyIF) {
    try {
      //Check birthday:
      const dataBirthday = await Birthday.findOne({
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
        const updatedBithday = await dataBirthday.save();
        if (updatedBithday) return "BIRTHDAY_UPDATED";
      }
      //Create if doesn't exists:
      else {
        const birthday = await Birthday.create({
          birthday_id: data.birthday_id,
          user_id: data.user_id,
          birthday_day: data.birthday_day,
          birthday_month: data.birthday_month,
          birthday_year: data.birthday_year,
        });

        //return:
        if (birthday) return "BIRTHDAY_CREATED";
      }
    } catch (e: any) {
      throw new Error(e.message);
    }
  }

  /** --------------------------- ADD ADDRESS ---------------------------- **/
  async addAddress(data: addressBodyIF) {
    try {
      //Check limit:
      const limit = await Address.findAll({ where: { user_id: data.user_id } });
      if (limit.length >= 3) return "MAX_LIMIT";

      //Create address:
      const address = await Address.create({
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
      if (address) return "ADDRESS_CREATED";
    } catch (e: any) {
      throw new Error(e.message);
    }
  }
  /** --------------------------- GET ADDRESS ---------------------------- **/
  async getAddress(id: string) {
    try {
      return await Address.findOne({ where: { address_id: id } });
    } catch (e: any) {
      throw new Error(e.message);
    }
  }

  /** --------------------------- DELETE ADDRESS ---------------------------- **/
  //aid: address id
  async deleteAddress(aid: string) {
    try {
      // delete:
      const deleteAddress = await Address.destroy({
        where: { address_id: aid },
      });
      //return:
      return deleteAddress;
    } catch (e: any) {
      throw new Error(e.message);
    }
  }

  /** ------------------------- UPLOAD PROFILE IMAGE -------------------------- **/
  //img: image URL
  async uploadProfileImage(uid: string, img: string) {
    try {
      const user: userObjectIF = await User.findOne({
        where: { user_id: uid },
      });
      if (!user) return "USER_NOT_FOUND";

      user.set({ user_image: img });
      await user.save();
      return "IMAGE_UPDATED";
    } catch (e: any) {
      throw new Error(e.message);
    }
  }
}
