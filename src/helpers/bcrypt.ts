const bcrypt = require("bcrypt");

const saltRounds = 10;
const salt = bcrypt.genSaltSync(saltRounds);

export const hashPassword = (plainPassword: string): string => {
  return bcrypt.hashSync(plainPassword, salt);
};

export const comparePassword = (
  plainPassword: string,
  hashedPassword: string
): boolean => {
  return bcrypt.compareSync(plainPassword, hashedPassword);
};
