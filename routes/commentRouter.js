const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Comment = require('../models/comment');

router.get('/', async (req, res) => {
  try {
    const { videoID } = req.query;
    if (!videoID) {
      return res.status(400).json({ success: false, error: 'videoID is required' });
    }

    if (!mongoose.isValidObjectId(videoID)) {
      return res.status(400).json({ success: false, error: 'Invalid videoID' });
    }

    const comments = await Comment.find({ videoId: videoID });
    res.status(200).json({ success: true, data: comments });
  } catch (err) {
    console.error('Error fetching comments:', err);
    res.status(500).json({ success: false, error: 'Internal server error' });
  }
});

router.post('/', async (req, res) => {
  try {
    const { username, comment, videoID } = req.body;
    if (!username || !comment || !videoID) {
      return res.status(400).json({ success: false, error: 'All fields are required' });
    }

    const newComment = new Comment({ username, comment, videoId: videoID });
    await newComment.save();
    res.status(200).json({ success: true, message: 'Comment submitted successfully' });
  } catch (err) {
    console.error('Error submitting comment:', err);
    res.status(400).json({ success: false, error: 'Failed to submit comment' });
  }
});

module.exports = router;
