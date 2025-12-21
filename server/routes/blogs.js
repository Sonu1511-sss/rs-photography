const express = require('express');
const router = express.Router();
const Blog = require('../models/Blog');
const auth = require('../middleware/auth');
const upload = require('../middleware/upload');

// Get all published blogs
router.get('/', async (req, res) => {
  try {
    const blogs = await Blog.find({ published: true }).sort({ createdAt: -1 });
    res.json(blogs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get all blogs (Admin only - includes unpublished)
router.get('/all', auth, async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 });
    res.json(blogs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get single blog by slug
router.get('/slug/:slug', async (req, res) => {
  try {
    const blog = await Blog.findOne({ slug: req.params.slug, published: true });
    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }
    res.json(blog);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get single blog by ID
router.get('/:id', async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }
    res.json(blog);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create blog (Admin only)
router.post('/', auth, upload.single('featuredImage'), async (req, res) => {
  try {
    console.log('Blog create request:', {
      body: req.body,
      file: req.file ? req.file.filename : 'no file'
    });

    const blogData = {
      title: req.body.title,
      content: req.body.content,
      excerpt: req.body.excerpt || '',
      published: req.body.published === 'true' || req.body.published === true
    };
    
    // If featured image is uploaded, use the uploaded file URL
    if (req.file) {
      blogData.featuredImage = `/uploads/${req.file.filename}`;
    }
    // If featuredImageUrl is provided in body (for URL input), use it
    else if (req.body.featuredImageUrl && req.body.featuredImageUrl.trim()) {
      blogData.featuredImage = req.body.featuredImageUrl.trim();
    }
    
    // Generate slug from title if not provided
    if (blogData.title) {
      blogData.slug = blogData.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');
    }
    
    console.log('Creating blog with data:', blogData);
    
    const blog = new Blog(blogData);
    await blog.save();
    console.log('Blog created successfully:', blog._id);
    res.status(201).json(blog);
  } catch (error) {
    console.error('Blog create error:', error);
    res.status(400).json({ message: error.message || 'Failed to create blog' });
  }
});

// Update blog (Admin only)
router.put('/:id', auth, upload.single('featuredImage'), async (req, res) => {
  try {
    // Get existing blog first
    const existingBlog = await Blog.findById(req.params.id);
    if (!existingBlog) {
      return res.status(404).json({ message: 'Blog not found' });
    }

    const blogData = { ...req.body };
    
    // If new featured image is uploaded, use the uploaded file URL
    if (req.file) {
      blogData.featuredImage = `/uploads/${req.file.filename}`;
    }
    // If featuredImageUrl is provided in body (for URL input), use it
    else if (req.body.featuredImageUrl) {
      blogData.featuredImage = req.body.featuredImageUrl;
    }
    // If no new image and no featuredImageUrl provided, keep existing featuredImage
    else {
      blogData.featuredImage = existingBlog.featuredImage;
    }
    
    // Convert published string to boolean if needed
    if (typeof blogData.published === 'string') {
      blogData.published = blogData.published === 'true';
    }
    
    // Update slug if title changed
    if (blogData.title && blogData.title !== existingBlog.title) {
      blogData.slug = blogData.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');
    } else {
      blogData.slug = existingBlog.slug;
    }
    
    blogData.updatedAt = Date.now();
    
    const blog = await Blog.findByIdAndUpdate(
      req.params.id,
      blogData,
      { new: true, runValidators: true }
    );
    res.json(blog);
  } catch (error) {
    console.error('Blog update error:', error);
    res.status(400).json({ message: error.message || 'Failed to update blog' });
  }
});

// Delete blog (Admin only)
router.delete('/:id', auth, async (req, res) => {
  try {
    const blog = await Blog.findByIdAndDelete(req.params.id);
    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }
    res.json({ message: 'Blog deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;





