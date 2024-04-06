// import the Joi package to validate the request body object
import Joi from "joi";

// middleware function to validate the request body object
const addContact = (req, res, next) => {
  // define the schema for the user object
  const schema = Joi.object({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    email: Joi.string().email().required(),
    phoneNumber: Joi.object({
      countryCode: Joi.string().required(),
      number: Joi.string().required(),
    }).required(),
    address: Joi.object({
      street: Joi.string().required(),
      state: Joi.string().required(),
      country: Joi.string().required(),
      zipCode: Joi.string().required(),
      geocode: Joi.object({
        longitude: Joi.number().required(),
        latitude: Joi.number().required(),
      }).required(),
    }).required(),
  });

  // validate the request body object
  const { error } = schema.validate(req.body);

  // if there is an error, return a response with the error message
  if (error) {
    return res.status(400).json({
      success: false,
      message: error.details[0].message,
    });
  }

  // if there is no error, continue to the next middleware
  next();
};

const updateContact = (req, res, next) => {
  const schema = Joi.object({
    id: Joi.string().required(),
    firstName: Joi.string().optional(),
    lastName: Joi.string().optional(),
    email: Joi.string().email().optional(),
    phoneNumber: Joi.object({
      countryCode: Joi.string().required(),
      number: Joi.string().required(),
    }).optional(),
    address: Joi.object({
      street: Joi.string().optional(),
      state: Joi.string().optional(),
      country: Joi.string().optional(),
      zipCode: Joi.string().optional(),
      geocode: Joi.object({
        longitude: Joi.number().required(),
        latitude: Joi.number().required(),
      }).optional(),
    }).optional(),
  });

  const { error } = schema.validate({ id: req.params.id, ...req.body });

  if (error) {
    return res.status(400).json({
      success: false,
      message: error.details[0].message,
    });
  }

  next();
};

const deleteContact = (req, res, next) => {
  const schema = Joi.object({
    id: Joi.string().required(),
  });

  const { error } = schema.validate({ id: req.params.id });

  if (error) {
    return res.status(400).json({
      success: false,
      message: error.details[0].message,
    });
  }

  next();
};

const validation = {
  addContact,
  updateContact,
  deleteContact,
};

Object.freeze(validation);

export default validation;
