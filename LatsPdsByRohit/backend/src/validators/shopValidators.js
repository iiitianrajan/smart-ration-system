const Joi = require('joi');

const assignDealerSchema = Joi.object({
  dealerId: Joi.string().trim().hex().length(24).required().messages({
    'string.empty': 'Dealer ID is required',
    'string.hex': 'Dealer ID must be a valid identifier',
    'string.length': 'Dealer ID must be a valid identifier',
  }),
});

module.exports = {
  assignDealerSchema,
};
