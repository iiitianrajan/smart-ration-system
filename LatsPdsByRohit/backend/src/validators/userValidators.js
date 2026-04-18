const Joi = require('joi');

const phoneSchema = Joi.string()
  .pattern(/^\d{10}$/)
  .required()
  .messages({
    'string.empty': 'Phone is required',
    'string.pattern.base': 'Phone must be a valid 10-digit mobile number',
  });

const passwordSchema = Joi.string()
  .min(6)
  .required()
  .messages({
    'string.empty': 'Password is required',
    'string.min': 'Password must be at least 6 characters long',
  });

const registerSchema = Joi.object({
  name: Joi.string().trim().min(2).max(100).required().messages({
    'string.empty': 'Name is required',
  }),
  phone: phoneSchema,
  password: passwordSchema,
  rationCardNumber: Joi.string().trim().min(5).max(30).optional(),
  aadharNumber: Joi.string().pattern(/^\d{12}$/).optional().messages({
    'string.pattern.base': 'Aadhar number must be exactly 12 digits',
  }),
});

const loginSchema = Joi.object({
  phone: phoneSchema,
  password: passwordSchema,
});

const refreshTokenSchema = Joi.object({
  refreshToken: Joi.string().trim().required().messages({
    'string.empty': 'Refresh token is required',
  }),
});

module.exports = {
  registerSchema,
  loginSchema,
  refreshTokenSchema,
};
