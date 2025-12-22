const express = require('express');
const router = express.Router();
const Video = require('../models/Video');
const auth = require('../middleware/auth');

// Public: get all videos
router.get('/', async (req, res) => {
  try {
    const videos = await Video.find().sort({ createdAt: -1 });
    res.json(videos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Public: featured videos
router.get('/featured', async (req, res) => {
  try {
    const videos = await Video.find({ featured: true })
      .sort({ createdAt: -1 })
      .limit(6);
    res.json(videos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Admin: create video
router.post('/', auth, async (req, res) => {
  try {
    const video = new Video(req.body);
    await video.save();
    res.status(201).json(video);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Admin: update video
router.put('/:id', auth, async (req, res) => {
  try {
    const video = await Video.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!video) {
      return res.status(404).json({ message: 'Video not found' });
    }
    res.json(video);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Admin: delete video
router.delete('/:id', auth, async (req, res) => {
  try {
    const video = await Video.findByIdAndDelete(req.params.id);
    if (!video) {
      return res.status(404).json({ message: 'Video not found' });
    }
    res.json({ message: 'Video deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;


