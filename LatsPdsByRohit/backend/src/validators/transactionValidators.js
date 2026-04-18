const Joi = require('joi');
const { ITEM_TYPES } = require('./allocationValidators');

const transactionItemSchema = Joi.object({
  itemType: Joi.string().valid(...ITEM_TYPES).required().messages({
    'any.only': 'Item type must be one of Wheat, Rice, Sugar, or Kerosene',
    'string.empty': 'Item type is required',
  }),
  quantity: Joi.number().positive().required().messages({
    'number.base': 'Quantity must be a number',
    'number.positive': 'Quantity must be greater than zero',
    'any.required': 'Quantity is required',
  }),
});

const createTransactionSchema = Joi.object({
  userId: Joi.string().trim().hex().length(24).required().messages({
    'string.empty': 'User is required',
    'string.hex': 'User must be a valid identifier',
    'string.length': 'User must be a valid identifier',
  }),
  itemsCollected: Joi.array().items(transactionItemSchema).min(1).required().messages({
    'array.base': 'Items collected must be an array',
    'array.min': 'At least one collected item is required',
    'any.required': 'Items collected are required',
  }),
});

module.exports = {
  createTransactionSchema,
};
