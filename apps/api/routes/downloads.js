const express = require('express');
const router = express.Router();
const {
  getMyDownloads,
  getDownloadById,
  recordDownload,
  createDownload,
  deleteDownload,
} = require('../controllers/download.controller');
const { verfiyToken } = require('../middlewares/authMiddleware');

// All routes require authentication
router.use(verfiyToken);

router.route('/').post(createDownload);
router.route('/my').get(getMyDownloads);
router.route('/:id').get(getDownloadById).delete(deleteDownload);
router.route('/:id/download').post(recordDownload);

module.exports = router;
