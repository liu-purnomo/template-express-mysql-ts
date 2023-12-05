import { NextFunction, Request, Response } from "express";
import { errorList } from "../constants";
import { decrypt } from "../helpers";
const { User } = require("../models");

interface Payload {
  id: string;
  iat: number;
  exp: number;
}

const isLoggedIn = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { authorization } = req.headers;
    if (!authorization) throw errorList.accessTokenNotFound;
    const token = authorization?.split(" ") || [];
    const textToken = token[0];
    if (textToken !== process.env.SECRET_TOKEN) throw errorList.invalidAccessToken;
    const accessToken = token[1];

    const payload = decrypt(accessToken as string) as Payload;

    const user = await User.findByPk(payload.id);

    if (!user) throw errorList.invalidAccessToken;

    (req as any).user = {
      id: user.id,
    };
    next();
  } catch (err) {
    next(err);
  }
};

export default isLoggedIn;
