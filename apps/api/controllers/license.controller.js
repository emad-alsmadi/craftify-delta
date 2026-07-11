const asyncHandler = require('express-async-handler');
const crypto = require('crypto');
const {
  LicenseType,
  validateCreateLicenseType,
  validateUpdateLicenseType,
} = require('../models/LicenseType');
const {
  PurchaseLicense,
  validateCreatePurchaseLicense,
  validateUpdatePurchaseLicense,
} = require('../models/PurchaseLicense');
const Template = require('../models/Template');

/**
 * Get all active license types.
 *
 * @route GET /api/licenses
 * @access Public
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @returns {Promise<void>} JSON array of license types
 */
const getAllLicenseTypes = asyncHandler(async (req, res) => {
  const licenseTypes = await LicenseType.find({ isActive: true }).sort({
    priceMultiplier: 1,
  });
  res.status(200).json(licenseTypes);
});

/**
 * Get a specific license type by slug.
 *
 * @route GET /api/licenses/:slug
 * @access Public
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @returns {Promise<void>} JSON license type document
 */
const getLicenseTypeBySlug = asyncHandler(async (req, res) => {
  const licenseType = await LicenseType.findOne({
    slug: req.params.slug,
    isActive: true,
  });

  if (!licenseType) {
    return res.status(404).json({ message: 'License type not found' });
  }

  res.status(200).json(licenseType);
});

/**
 * Create a new license type (admin only).
 *
 * @route POST /api/licenses
 * @access Private (admin)
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @returns {Promise<void>} JSON created license type document
 */
const createLicenseType = asyncHandler(async (req, res) => {
  const error = validateCreateLicenseType(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  const licenseType = new LicenseType({
    name: req.body.name,
    slug: req.body.slug,
    priceMultiplier: req.body.priceMultiplier,
    description: req.body.description,
    features: req.body.features || [],
    restrictions: req.body.restrictions || [],
    supportDuration: req.body.supportDuration || 6,
    isActive: req.body.isActive !== false,
  });

  const result = await licenseType.save();
  res.status(201).json(result);
});

/**
 * Update a license type (admin only).
 *
 * @route PUT /api/licenses/:id
 * @access Private (admin)
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @returns {Promise<void>} JSON updated license type document
 */
const updateLicenseType = asyncHandler(async (req, res) => {
  const error = validateUpdateLicenseType(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  const licenseType = await LicenseType.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
      slug: req.body.slug,
      priceMultiplier: req.body.priceMultiplier,
      description: req.body.description,
      features: req.body.features,
      restrictions: req.body.restrictions,
      supportDuration: req.body.supportDuration,
      isActive: req.body.isActive,
    },
    { new: true },
  );

  if (!licenseType) {
    return res.status(404).json({ message: 'License type not found' });
  }

  res.status(200).json(licenseType);
});

/**
 * Deactivate a license type (admin only).
 *
 * @route DELETE /api/licenses/:id
 * @access Private (admin)
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @returns {Promise<void>} JSON confirmation message
 */
const deleteLicenseType = asyncHandler(async (req, res) => {
  const licenseType = await LicenseType.findByIdAndUpdate(
    req.params.id,
    { isActive: false },
    { new: true },
  );

  if (!licenseType) {
    return res.status(404).json({ message: 'License type not found' });
  }

  res.status(200).json({ message: 'License type has been deactivated' });
});

/**
 * Get user's purchased licenses.
 *
 * @route GET /api/licenses/purchases/:userId
 * @access Private
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @returns {Promise<void>} JSON array of purchased licenses
 */
const getUserLicenses = asyncHandler(async (req, res) => {
  const licenses = await PurchaseLicense.find({
    userId: req.params.userId,
    isActive: true,
  })
    .populate('licenseTypeId')
    .populate('templateId', ['title', 'cover', 'basePrice'])
    .populate('purchaseId')
    .sort({ createdAt: -1 });

  res.status(200).json(licenses);
});

/**
 * Validate a license key.
 *
 * @route POST /api/licenses/validate
 * @access Public
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @returns {Promise<void>} JSON validation result
 */
const validateLicense = asyncHandler(async (req, res) => {
  const { licenseKey, templateId } = req.body;

  if (!licenseKey) {
    return res.status(400).json({ message: 'License key is required' });
  }

  const query = { licenseKey, isActive: true };
  if (templateId) {
    query.templateId = templateId;
  }

  const license = await PurchaseLicense.findOne(query)
    .populate('licenseTypeId')
    .populate('templateId')
    .populate('userId');

  if (!license) {
    return res.status(404).json({ message: 'Invalid license key' });
  }

  if (license.expiryDate < new Date()) {
    return res.status(400).json({ message: 'License has expired' });
  }

  res.status(200).json({
    valid: true,
    license: {
      type: license.licenseTypeId.name,
      template: license.templateId,
      expiryDate: license.expiryDate,
    },
  });
});

/**
 * Calculate price for a template with specific license type.
 *
 * @route GET /api/licenses/calculate-price
 * @access Public
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @returns {Promise<void>} JSON calculated price
 */
const calculatePrice = asyncHandler(async (req, res) => {
  const { templateId, licenseSlug } = req.query;

  if (!templateId || !licenseSlug) {
    return res
      .status(400)
      .json({ message: 'Template ID and license slug are required' });
  }

  const [template, licenseType] = await Promise.all([
    Template.findById(templateId),
    LicenseType.findOne({ slug: licenseSlug, isActive: true }),
  ]);

  if (!template) {
    return res.status(404).json({ message: 'Template not found' });
  }

  if (!licenseType) {
    return res.status(404).json({ message: 'License type not found' });
  }

  const finalPrice = template.basePrice * licenseType.priceMultiplier;

  res.status(200).json({
    basePrice: template.basePrice,
    licenseType: licenseType.name,
    priceMultiplier: licenseType.priceMultiplier,
    finalPrice,
  });
});

/**
 * Generate a unique license key.
 *
 * @returns {string} Unique license key
 */
const generateLicenseKey = () => {
  return crypto.randomBytes(16).toString('hex').toUpperCase();
};

module.exports = {
  getAllLicenseTypes,
  getLicenseTypeBySlug,
  createLicenseType,
  updateLicenseType,
  deleteLicenseType,
  getUserLicenses,
  validateLicense,
  calculatePrice,
  generateLicenseKey,
};
