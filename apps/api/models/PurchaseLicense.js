const mongoose = require('mongoose');
const Joi = require('joi');

const PurchaseLicenseSchema = new mongoose.Schema(
  {
    purchaseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Order',
      required: true,
    },
    licenseTypeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'LicenseType',
      required: true,
    },
    templateId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Template',
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    licenseKey: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    expiryDate: {
      type: Date,
      required: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
    collection: 'purchaseLicenses',
  },
);

const PurchaseLicense = mongoose.model('PurchaseLicense', PurchaseLicenseSchema);

const validateCreatePurchaseLicense = (obj) => {
  const schema = Joi.object({
    purchaseId: Joi.string().hex().length(24).required(),
    licenseTypeId: Joi.string().hex().length(24).required(),
    templateId: Joi.string().hex().length(24).required(),
    userId: Joi.string().hex().length(24).required(),
    licenseKey: Joi.string().trim().required(),
    expiryDate: Joi.date().required(),
    isActive: Joi.boolean().default(true),
  });
  const { error } = schema.validate(obj);
  return error;
};

const validateUpdatePurchaseLicense = (obj) => {
  const schema = Joi.object({
    purchaseId: Joi.string().hex().length(24),
    licenseTypeId: Joi.string().hex().length(24),
    templateId: Joi.string().hex().length(24),
    userId: Joi.string().hex().length(24),
    licenseKey: Joi.string().trim(),
    expiryDate: Joi.date(),
    isActive: Joi.boolean(),
  });
  const { error } = schema.validate(obj);
  return error;
};

module.exports = { PurchaseLicense, validateCreatePurchaseLicense, validateUpdatePurchaseLicense };
