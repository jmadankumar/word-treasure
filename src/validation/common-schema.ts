import Joi from "joi";

export const ALLOW_EMPTY = "";
export const ALLOW_NULL = null;

export const email = Joi.string()
  .email({
    tlds: { allow: false },
  })
  .required()
  .messages({
    "string.empty": "Email is required",
  });

export const password = Joi.string().required().messages({
  "string.empty": "Password is required",
});
