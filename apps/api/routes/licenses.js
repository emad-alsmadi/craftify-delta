const express = require('express');
const router = express.Router();
const { verfiyToken } = require('../middlewares/verfiyToken');
const { checkRolePermission } = require('../middlewares/checkRolePermission');

const {
  getAllLicenseTypes,
  getLicenseTypeBySlug,
  createLicenseType,
  updateLicenseType,
  deleteLicenseType,
  getUserLicenses,
  validateLicense,
  calculatePrice,
} = require('../controllers/license.controller');

// Public routes
router.get('/licenses', getAllLicenseTypes);
router.get('/licenses/:slug', getLicenseTypeBySlug);
router.get('/licenses/calculate-price', calculatePrice);
router.post('/licenses/validate', validateLicense);

// Admin only routes
router.post(
  '/licenses',
  verfiyToken,
  checkRolePermission('licenses:write'),
  createLicenseType,
);

router.put(
  '/licenses/:id',
  verfiyToken,
  checkRolePermission('licenses:write'),
  updateLicenseType,
);

router.delete(
  '/licenses/:id',
  verfiyToken,
  checkRolePermission('licenses:delete'),
  deleteLicenseType,
);

// Private routes
router.get('/licenses/purchases/:userId', verfiyToken, getUserLicenses);

module.exports = router;
