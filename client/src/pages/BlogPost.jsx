import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FaCalendar, FaUser, FaArrowLeft } from 'react-icons/fa'
import api from '../utils/api'

const BlogPost = () => {
  const { id } = useParams()
  const [blog, setBlog] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Try by ID first, then by slug if needed
    api.get(`/blogs/${id}`)
      .then(res => {
        setBlog(res.data)
        setLoading(false)
      })
      .catch(err => {
        // Fallback to slug if ID doesn't work
        api.get(`/blogs/slug/${id}`)
          .then(res => {
            setBlog(res.data)
            setLoading(false)
          })
          .catch(err => {
            console.error(err)
            setLoading(false)
          })
      })
  }, [id])

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
  }

  if (loading) {
    return (
      <div className="pt-20 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-wedding-gold mx-auto mb-4"></div>
          <p className="text-gray-600">Loading blog post...</p>
        </div>
      </div>
    )
  }

  if (!blog) {
    return (
      <div className="pt-20 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">Blog Post Not Found</h1>
          <Link to="/blog" className="text-wedding-gold hover:underline">
            ← Back to Blog
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="pt-20">
      {/* Hero Section */}
      {blog.featuredImage && (
        <section className="relative h-96 flex items-center justify-center overflow-hidden">
          <img
            src={blog.featuredImage}
            alt={blog.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/50" />
        </section>
      )}

      {/* Blog Content */}
      <article className="py-20 bg-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-wedding-gold hover:underline mb-8"
          >
            <FaArrowLeft /> Back to Blog
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-4xl md:text-5xl font-elegant font-bold mb-6">
              {blog.title}
            </h1>

            <div className="flex items-center gap-6 mb-8 text-gray-600">
              <div className="flex items-center gap-2">
                <FaUser />
                <span>{blog.author}</span>
              </div>
              <div className="flex items-center gap-2">
                <FaCalendar />
                <span>{formatDate(blog.createdAt)}</span>
              </div>
            </div>

            <div
              className="prose prose-lg max-w-none"
              dangerouslySetInnerHTML={{ __html: blog.content }}
            />
          </motion.div>
        </div>
      </article>
    </div>
  )
}

export default BlogPost

