import { Optional } from "./default.interface";
import { DefaultSchemaInterface } from "./schema.interface";

export interface IUserSchema extends Optional<DefaultSchemaInterface> {
  name: string;
  email: string;
  password: string;
  status: "Active" | "Inactive" | "Banned" | "Pending";
  role: "Admin" | "User" | "Guest";
}

export interface IUserRegister extends Pick<IUserSchema, | "email" | "name" | "password"> {}

export interface IUserLogin extends Pick<IUserSchema, | "email" | "password"> {}

export interface IUserEditInterface extends Optional<IUserSchema> {}
