const Joi = require('joi');

const reqBody = Joi.object({
  firstName: Joi.string().min(1).required(),
  secondName: Joi.string().min(1).required(),
  age: Joi.number().min(1).max(150).required(),
  city: Joi.string().min(1),
});

const reqParams = Joi.object({
  id: Joi.number().min(1).required(),
});

module.exports = { reqBody, reqParams };
