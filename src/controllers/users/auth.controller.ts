import { NextFunction, Request, Response } from "express";
import { errorList } from "../../constants";
import { comparePassword, encrypt } from "../../helpers";
import { IUserRegister } from "../../interfaces";
import { AuthService, UserService } from "../../services";

export class AuthController {
  static async register(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password, name } = req.body;

      const token = await AuthService.register({
        email,
        password,
        name,
      } as IUserRegister);

      const response = {
        status: "success",
        message: "Registered success",
        token,
      };

      res.status(201).json(response);
    } catch (error) {
      next(error);
    }
  }

  static async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.body;
      const user = await UserService.findByEmail(email)
      if(!password) throw errorList.invalidLogin
      const isValidPassword = comparePassword(password, user.password)
      if(!isValidPassword) throw errorList.invalidLogin
      const token = encrypt({
        id: user.id
      })
      const response = {
        status: "success",
        message: "Login success",
        token,
      };
      res.status(201).json(response);
    } catch (error) {
      next(error);
    }
  }

}
