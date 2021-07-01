import Joi from "joi";
import { email, password } from "./common-schema";

export const loginSchema = Joi.object({
  email,
  password
});
