import Joi from "joi";

const translationSchema = Joi.object({
  en: Joi.string().required(),
  ta: Joi.string().required(),
  hi: Joi.string().allow(""),
});

export const wordSchema = Joi.object({
  id: Joi.string().allow(""),
  text: Joi.string().required(),
  category: Joi.string().required(),
  image_url: Joi.string().required(),
  translation: translationSchema,
  deleted: Joi.boolean().allow(),
  tags: Joi.array().allow(),
  created_time: Joi.date().allow(),
  updated_time: Joi.date().allow(),
});
