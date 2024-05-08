import Joi from "joi";

export const swarmValidationSchema = Joi.object({
    title: Joi.string().min(10).max(200).required().messages({
        'string.base': `Title should be a text`,
        'string.min': `Title cannot be less that {#limit} characters`,
        'string.max': `Title cannot be more than {#limit} characters`,
        'string.required': 'Title cannot be blank',
    }),
    description: Joi.string().min(100).required().messages({
        'string.base': `Description should be a text`,
        'string.min': `Description cannot be less that {#limit} characters`,
        'string.required': 'Description cannot be blank',
    }),
    category: Joi.string().required().messages({
        'string.base': 'Category must be letters or a mixture of letters and numbers',
        'string.required': 'Category cannot be blank',
    }),
    status: Joi.string().required().messages({
        'string.base': 'Status can only be In Progress',
        'string.required': 'Swarm status is required',
    }),
    visibility: Joi.string().required().messages({
        'string.base': 'Visisbility can only be Private or Public',
        'string.required': 'Visisbility status is required'
    }),
})