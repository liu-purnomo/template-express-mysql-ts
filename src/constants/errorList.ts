import { ErrorListInterface } from "../interfaces";

export const errorList: ErrorListInterface = {
  dd: {
    status: 400,
    message: "Die Dump",
  },
  accessTokenNotFound: {
    status: 403,
    message: "Access token not found",
  },
  invalidAccessToken: {
    status: 403,
    message: "Invalid access token",
  },
  invalidLogin: {
    status: 400,
    message: "Invalid mail or password"
  }
};
