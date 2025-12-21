const express = require('express');
const router = express.Router();
const Comment = require('../models/Comment');
const auth = require('../middleware/auth');

// Create comment (Public)
router.post('/', async (req, res) => {
  try {
    const comment = new Comment(req.body);
    await comment.save();
    res.status(201).json({ message: 'Comment submitted successfully! It will be reviewed before publishing.', comment });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get all comments (Public - only approved)
router.get('/', async (req, res) => {
  try {
    const { serviceName } = req.query;
    const query = { approved: true };
    if (serviceName) {
      query.serviceName = serviceName;
    }
    const comments = await Comment.find(query).sort({ createdAt: -1 });
    res.json(comments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get all comments (Admin only - including unapproved)
router.get('/all', auth, async (req, res) => {
  try {
    const comments = await Comment.find().sort({ createdAt: -1 });
    res.json(comments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get single comment (Admin only)
router.get('/:id', auth, async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);
    if (!comment) {
      return res.status(404).json({ message: 'Comment not found' });
    }
    res.json(comment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update comment (Admin only)
router.put('/:id', auth, async (req, res) => {
  try {
    const comment = await Comment.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!comment) {
      return res.status(404).json({ message: 'Comment not found' });
    }
    res.json(comment);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete comment (Admin only)
router.delete('/:id', auth, async (req, res) => {
  try {
    const comment = await Comment.findByIdAndDelete(req.params.id);
    if (!comment) {
      return res.status(404).json({ message: 'Comment not found' });
    }
    res.json({ message: 'Comment deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Approve/Unapprove comment (Admin only)
router.patch('/:id/approve', auth, async (req, res) => {
  try {
    const comment = await Comment.findByIdAndUpdate(
      req.params.id,
      { approved: req.body.approved },
      { new: true }
    );
    if (!comment) {
      return res.status(404).json({ message: 'Comment not found' });
    }
    res.json(comment);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;

