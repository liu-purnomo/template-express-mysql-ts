import { encrypt } from "../../helpers";
import { IUserRegister } from "../../interfaces";
const { User } = require("../../models");

export class AuthService {
  static async register({ email, name, password }: IUserRegister){

    const userCreated = await User.create({
      email,
      name,
      password,
    });

    const accessToken = encrypt({
      id: userCreated.id,
    });

    return accessToken;
  }
}
