const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Video = require('../models/video');

router.get('/', async (req, res) => {
  try {
    const { videoID } = req.query;
    if (!videoID) {
      return res.status(400).json({ success: false, error: 'videoID is required' });
    }

    if (!mongoose.isValidObjectId(videoID)) {
      return res.status(400).json({ success: false, error: 'Invalid videoID' });
    }

    const video = await Video.findById(videoID, 'title thumbnailUrl');
    if (!video) {
      return res.status(404).json({ success: false, error: 'Video not found' });
    }

    res.status(200).json({ success: true, data: video });
  } catch (err) {
    console.error('Error fetching video:', err);
    res.status(500).json({ success: false, error: 'Internal server error' });
  }
});

module.exports = router;
