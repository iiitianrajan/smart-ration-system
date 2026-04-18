const Joi = require('joi');

const ITEM_TYPES = ['Wheat', 'Rice', 'Sugar', 'Kerosene'];
const monthYearSchema = Joi.alternatives().try(
  Joi.string().pattern(/^\d{4}-(0[1-9]|1[0-2])$/),
  Joi.string().pattern(/^[A-Z][a-z]{2} \d{4}$/)
).required().messages({
  'alternatives.match': 'Month must be in YYYY-MM or Mon YYYY format',
});

const createAllocationSchema = Joi.object({
  userId: Joi.string().trim().hex().length(24).required().messages({
    'string.empty': 'User is required',
    'string.hex': 'User must be a valid identifier',
    'string.length': 'User must be a valid identifier',
  }),
  itemType: Joi.string().valid(...ITEM_TYPES).required().messages({
    'any.only': 'Item type must be one of Wheat, Rice, Sugar, or Kerosene',
    'string.empty': 'Item type is required',
  }),
  totalQuantity: Joi.number().positive().required().messages({
    'number.base': 'Total quantity must be a number',
    'number.positive': 'Total quantity must be greater than zero',
    'any.required': 'Total quantity is required',
  }),
  monthYear: monthYearSchema,
});

module.exports = {
  createAllocationSchema,
  ITEM_TYPES,
  monthYearSchema,
};
