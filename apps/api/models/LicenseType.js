const mongoose = require('mongoose');
const Joi = require('joi');

const LicenseTypeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      enum: ['Personal', 'Commercial', 'Extended'],
    },
    slug: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      lowercase: true,
      enum: ['personal', 'commercial', 'extended'],
    },
    priceMultiplier: {
      type: Number,
      required: true,
      min: 1,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    features: [{
      type: String,
      trim: true,
    }],
    restrictions: [{
      type: String,
      trim: true,
    }],
    supportDuration: {
      type: Number,
      required: true,
      min: 0,
      default: 6,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
    collection: 'licenseTypes',
  },
);

const LicenseType = mongoose.model('LicenseType', LicenseTypeSchema);

const validateCreateLicenseType = (obj) => {
  const schema = Joi.object({
    name: Joi.string().valid('Personal', 'Commercial', 'Extended').required(),
    slug: Joi.string().valid('personal', 'commercial', 'extended').required(),
    priceMultiplier: Joi.number().min(1).required(),
    description: Joi.string().trim().required(),
    features: Joi.array().items(Joi.string().trim()),
    restrictions: Joi.array().items(Joi.string().trim()),
    supportDuration: Joi.number().min(0).default(6),
    isActive: Joi.boolean().default(true),
  });
  const { error } = schema.validate(obj);
  return error;
};

const validateUpdateLicenseType = (obj) => {
  const schema = Joi.object({
    name: Joi.string().valid('Personal', 'Commercial', 'Extended'),
    slug: Joi.string().valid('personal', 'commercial', 'extended'),
    priceMultiplier: Joi.number().min(1),
    description: Joi.string().trim(),
    features: Joi.array().items(Joi.string().trim()),
    restrictions: Joi.array().items(Joi.string().trim()),
    supportDuration: Joi.number().min(0),
    isActive: Joi.boolean(),
  });
  const { error } = schema.validate(obj);
  return error;
};

module.exports = { LicenseType, validateCreateLicenseType, validateUpdateLicenseType };
