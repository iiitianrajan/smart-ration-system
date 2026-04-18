const validate = (schema) => (req, res, next) => {
  const { error, value } = schema.validate(req.body, {
    abortEarly: false,
    stripUnknown: true,
  });

  if (error) {
    res.status(400).json({
      message: error.details.map((detail) => detail.message).join(', '),
    });
    return;
  }

  req.body = value;
  next();
};

module.exports = validate;
