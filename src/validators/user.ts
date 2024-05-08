import Joi from "joi";

export const userValidationSchema = Joi.object({
    first_name: Joi.string().min(2).max(30).required().messages({
        'string.base': `First name should be a type of 'text'`,
        'string.min': `First name should have a minimum length of {#limit} characters`,
        'string.max': `First name should have a maximu length of {#limit} characters`,
        'any.required': `First name  is a required field`
      }),
    last_name: Joi.string().min(2).max(30).required().messages({
        'string.base': `Last name should be a type of 'text'`,
        'string.min': `Last name should have a minimum length of {#limit} characters`,
        'string.max': `Last name should have a maximu length of {#limit} characters`,
        'any.required': `Last name  is a required field`
      }),
    email: Joi.string().email().required().messages({
        'string.email': `Provide a valid email`,
        'any.required': `Email is required`,
      }),
    phone: Joi.string().length(13).message( 'Invalid number'),
})