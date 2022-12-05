import { object, array, string, number, ref } from "yup";

import {
  BRAND_COLOR_OPTION_VALUES,
  JOB_EXPIRE_OPTION_VALUES,
  JOB_TYPES_OPTION_VALUES,
} from "../constants";

function nullableNumberTransformer(currentValue, originalValue) {
  return isNaN(currentValue) ? null : currentValue;
}

const ERROR_MESSAGES = {
  required: "This field is required!",

  type: "Invalid type!",
  option: "Invalid option!",

  email: "Please enter a valid email!",
  url: "Please enter a valid URL!",

  positive: "Please enter a positive value!",
  integer: "Value must be an integer!",

  min: function (X) {
    return `Should be minimum ${X}!`;
  },
  max: function (X) {
    return `Maximum ${X} are allowed!`;
  },

  lessThanX: function (X) {
    return `The value should be less than ${X}!`;
  },
  moreThanX: function (X) {
    return `The value should be more than ${X}!`;
  },
};

export const emailSchema = string()
  .typeError(ERROR_MESSAGES.type)
  .email(ERROR_MESSAGES.email)
  .required(ERROR_MESSAGES.required);

export const batchSchema = object({
  email: string()
    .typeError(ERROR_MESSAGES.type)
    .email(ERROR_MESSAGES.email)
    .required(ERROR_MESSAGES.required),
  website: string()
    .typeError(ERROR_MESSAGES.type)
    // .url(ERROR_MESSAGES.url)
    .required(ERROR_MESSAGES.required),

  name: string()
    .typeError(ERROR_MESSAGES.type)
    .required(ERROR_MESSAGES.required),
  description: string().typeError(ERROR_MESSAGES.type).nullable(),

  logoURL: string()
    .typeError(ERROR_MESSAGES.type)
    // .url(ERROR_MESSAGES.url)
    .nullable(),
  color: string()
    .typeError(ERROR_MESSAGES.type)
    .oneOf(BRAND_COLOR_OPTION_VALUES, ERROR_MESSAGES.option)
    .nullable(),

  expiresAfter: string()
    .typeError(ERROR_MESSAGES.type)
    .oneOf(JOB_EXPIRE_OPTION_VALUES, ERROR_MESSAGES.option)
    .required(ERROR_MESSAGES.required),

  postCount: number()
    .typeError(ERROR_MESSAGES.type)
    .positive(ERROR_MESSAGES.positive)
    .integer(ERROR_MESSAGES.integer)
    .min(1, ERROR_MESSAGES.min(1))
    .max(10, ERROR_MESSAGES.max(10))
    .required(ERROR_MESSAGES.required),
});

export const postSchema = object({
  title: string()
    .typeError(ERROR_MESSAGES.type)
    .required(ERROR_MESSAGES.required),
  type: string()
    .typeError(ERROR_MESSAGES.type)
    .oneOf(JOB_TYPES_OPTION_VALUES, ERROR_MESSAGES.option)
    .required(ERROR_MESSAGES.required),
  location: string()
    .typeError(ERROR_MESSAGES.type)
    .required(ERROR_MESSAGES.required),

  salaryStart: number()
    .typeError(ERROR_MESSAGES.type)
    .positive(ERROR_MESSAGES.positive)
    .integer(ERROR_MESSAGES.integer)
    .max(ref("salaryEnd"), ERROR_MESSAGES.lessThanX("ending salary"))
    .required(ERROR_MESSAGES.required),
  salaryEnd: number()
    .typeError(ERROR_MESSAGES.type)
    .positive(ERROR_MESSAGES.positive)
    .integer(ERROR_MESSAGES.integer)
    .min(ref("salaryStart"), ERROR_MESSAGES.moreThanX("starting salary"))
    .required(ERROR_MESSAGES.required),

  applyLink: string()
    .typeError(ERROR_MESSAGES.type)
    // .url(ERROR_MESSAGES.url)
    .nullable(),
  applyEmail: string()
    .typeError(ERROR_MESSAGES.type)
    .email(ERROR_MESSAGES.email)
    .nullable(),

  description: string().typeError(ERROR_MESSAGES.type).nullable(),
  tags: array()
    .typeError(ERROR_MESSAGES.type)
    .of(string())
    .max(6, ERROR_MESSAGES.max(6))
    .nullable(),
});

export async function getValidationErrors(schema, toValidate) {
  try {
    await schema.validate(toValidate, {
      abortEarly: false,
    });

    return {};
  } catch (validationErrors) {
    const inner = validationErrors.inner;

    const errors = {};

    for (const key in inner) {
      errors[inner[key].path] = inner[key].errors[0];
    }

    return errors;
  }
}
