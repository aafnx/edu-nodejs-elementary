function reqBody(schema) {
  return (req, res, next) => {
    const validate = schema.validate(req.body);

    if (validate.error) {
      return res.status(400).send(validate.error.details);
    }
    next();
  };
}

function reqParams(schema) {
  return (req, res, next) => {
    const validate = schema.validate(req.params);

    if (validate.error) {
      return res.status(400).send(validate.error.details);
    }

    next();
  };
}

module.exports = { reqBody, reqParams };
