const mongoose = require('mongoose');

const downloadSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    template: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Template',
      required: true,
    },
    order: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Order',
      required: true,
    },
    downloadCount: {
      type: Number,
      default: 0,
    },
    lastDownloadDate: {
      type: Date,
    },
    downloadLimit: {
      type: Number,
      default: 10, // Default download limit per template
    },
  },
  {
    timestamps: true,
  }
);

// Ensure one download entry per user per template per order
downloadSchema.index({ user: 1, template: 1, order: 1 }, { unique: true });

module.exports = mongoose.model('Download', downloadSchema);
