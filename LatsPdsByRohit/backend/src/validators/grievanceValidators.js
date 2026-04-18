const Joi = require('joi');

const createGrievanceSchema = Joi.object({
  subject: Joi.string().trim().min(3).max(150).required().messages({
    'string.empty': 'Subject is required',
  }),
  description: Joi.string().trim().min(10).max(2000).required().messages({
    'string.empty': 'Description is required',
    'string.min': 'Description must be at least 10 characters long',
  }),
});

module.exports = {
  createGrievanceSchema,
};
