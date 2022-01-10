import Joi from "joi";
import { WordFormData } from "../types";
import { ALLOW_EMPTY, ALLOW_NULL } from "./common-schema";

export const wordSchema = Joi.object<WordFormData>({
  id: Joi.string().allow(ALLOW_EMPTY),
  text: Joi.string().required(),
  created_time: Joi.date().allow(ALLOW_EMPTY, ALLOW_NULL),
  updated_time: Joi.date().allow(ALLOW_EMPTY, ALLOW_NULL),
  last_revised: Joi.date().allow(ALLOW_EMPTY, ALLOW_NULL),
  revise: Joi.bool(),
});
