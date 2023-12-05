import { ModelValidateProps } from "../interfaces";

export const modelHelper = ({
  name,
  notNull = true,
  isUnique = false,
  min,
  max,
  len,
  isEmail,
}: ModelValidateProps) => {
  const output: any = {};

  if (notNull) {
    output.allowNull = false;
    output.validate = {
      notNull: {
        args: true,
        msg: `${name} is required`,
      },
      notEmpty: {
        arg: true,
        msg: `${name} is required`,
      },
    };
  }

  if (isUnique) {
    output.unique = {
      args: true,
      msg: `${name} already exists`,
    };
  }

  if (name === "Email" || isEmail) {
    output.validate.isEmail = {
      args: true,
      msg: "Email is not valid",
    };
  }

  if (min) {
    output.validate.min = {
      args: min,
      msg: `${name} minimal ${min} character`,
    };
  }

  if (max) {
    output.validate.max = {
      args: max,
      msg: `${name} minimal ${min} character`,
    };
  }

  if (len?.length === 2) {
    output.validate.len = {
      args: len,
      msg: `${name} min ${len[0]} character and max ${len[1]} character`,
    };
  }

  if (name === "Password") {
    output.validate.is = {
      args: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*\W)[a-zA-Z0-9\S]{6,}$/i,
      msg: "Password must contain at least 1 lowercase, 1 uppercase, 1 number, and 1 special character",
    };
  }

  return output;
};

export const paranoidFunction = (modelName: string, tableName: string) => {
  return {
    modelName,
    tableName,
    paranoid: true,
    deletedAt: "deleted_at",
    createdAt: "created_at",
    updatedAt: "updated_at",
  };
};
