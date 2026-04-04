import Joi from 'joi';

/**
 * Validation schema for the login form.
 */
export const loginSchema = Joi.object({
  email: Joi.string().email({ tlds: false }).required().messages({
    'string.base': 'Email is required',
    'string.empty': 'Email is required',
    'string.email': 'Please enter a valid email address',
    'any.required': 'Email is required',
  }),

  password: Joi.string().required().messages({
    'string.base': 'Password is required',
    'string.empty': 'Password is required',
    'any.required': 'Password is required',
  }),
});
