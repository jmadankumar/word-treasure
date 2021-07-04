import Joi from "joi";
import { WordFormData } from "../types";
import { ALLOW_EMPTY, ALLOW_NULL } from "./common-schema";

const translationSchema = Joi.object({
  ta: Joi.string().required(),
  hi: Joi.string().allow(ALLOW_EMPTY),
});

export const wordSchema = Joi.object<WordFormData>({
  id: Joi.string().allow(ALLOW_EMPTY),
  category: Joi.string().required(),
  topic: Joi.string().allow(ALLOW_EMPTY),
  text: Joi.string().required(),
  description: Joi.string().allow(ALLOW_EMPTY),
  image_url: Joi.string().required(),
  translation: translationSchema,
  deleted: Joi.boolean().allow(),
  tags: Joi.array().allow(),
  created_time: Joi.date().allow(ALLOW_EMPTY, ALLOW_NULL),
  updated_time: Joi.date().allow(ALLOW_EMPTY, ALLOW_NULL),
});
