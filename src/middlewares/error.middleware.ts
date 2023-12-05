import { ErrorRequestHandler, NextFunction, Request, Response } from "express";
import { CustomError } from "../interfaces";
const ENV = process.env.NODE_ENV;

export const errorHandler: ErrorRequestHandler = async (
  err: CustomError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (ENV === "development") {
    console.log(req.path, "<<<<<< PATH");
    console.error(err, "<<<<<< ERROR");
    console.error(err.name, "<<<<<< ERROR NAME");
    console.error(err.message);
  }

  let code = err.status || 500;
  let msg = err.message || "Something went wrong";

  if (err.name === "SequelizeValidationError") {
    code = 400;
    msg =
      err.errors && err.errors.length > 0
        ? err.errors[0].message
        : "Validation error";
  }

  if (err.name === "SequelizeUniqueConstraintError") {
    code = 400;
    msg = (err.errors as any)[0].message;
  }

  if (
    err.name === "SequelizeDatabaseError" ||
    err.name === "SequelizeForeignKeyConstraintError"
  ) {
    code = 500;
    msg = err.message;
  }

  if (err.name === "JsonWebTokenError") {
    code = 403;
    msg = "invalid access token";
  }

  if (err.name === "TokenExpiredError") {
    code = 403;
    msg = "Token expired, please login again";
  }

  const response = {
    code: code,
    message: msg,
    path: req.path,
  } as any;

  res.status(code).json(response);
};
