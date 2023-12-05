import jwt from "jsonwebtoken";

const SECRETKEY = process.env.SECRETKEY as string;
const EXPIRATION_TIME = process.env.EXPIRATION_TIME as string;

const encrypt = (payload: any): string => {
  return jwt.sign(payload, SECRETKEY, { expiresIn: EXPIRATION_TIME });
};

const decrypt = (token: string): any => {
  return jwt.verify(token, SECRETKEY);
};

export { decrypt, encrypt };
