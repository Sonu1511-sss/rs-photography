import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { FaPlay } from 'react-icons/fa'
import api from '../utils/api'

const Videos = () => {
  const [videos, setVideos] = useState([])
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const category = selectedCategory === 'all' ? '' : selectedCategory
    const url = category ? `/videos?category=${category}` : '/videos'
    
    api.get(url)
      .then(res => {
        setVideos(res.data)
        setLoading(false)
      })
      .catch(err => {
        console.error(err)
        setLoading(false)
      })
  }, [selectedCategory])

  const getVideoId = (url) => {
    if (url.includes('youtube.com/watch?v=')) {
      return url.split('v=')[1]?.split('&')[0]
    }
    if (url.includes('youtu.be/')) {
      return url.split('youtu.be/')[1]?.split('?')[0]
    }
    if (url.includes('vimeo.com/')) {
      return url.split('vimeo.com/')[1]?.split('?')[0]
    }
    return null
  }

  const getEmbedUrl = (url) => {
    const videoId = getVideoId(url)
    if (url.includes('youtube') || url.includes('youtu.be')) {
      return `https://www.youtube.com/embed/${videoId}`
    }
    if (url.includes('vimeo')) {
      return `https://player.vimeo.com/video/${videoId}`
    }
    return url
  }

  if (loading) {
    return (
      <div className="pt-20 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-wedding-gold mx-auto mb-4"></div>
          <p className="text-gray-600">Loading videos...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="relative h-96 flex items-center justify-center bg-gradient-to-r from-wedding-black to-wedding-gold text-white">
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 text-center px-4">
          <h1 className="text-5xl md:text-6xl font-elegant font-bold mb-4">
            Wedding Films
          </h1>
          <p className="text-xl text-wedding-gold">
            Cinematic wedding films that tell your love story
          </p>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-8 bg-white border-b">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-4">
            {['all', 'wedding-film', 'pre-wedding-film'].map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-2 rounded-lg font-semibold transition-all ${
                  selectedCategory === category
                    ? 'bg-wedding-gold text-wedding-black'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {category === 'all' ? 'All Videos' : category.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Videos Grid */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          {videos.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-gray-600 text-lg">No videos available yet. Check back soon!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {videos.map((video, index) => (
                <motion.div
                  key={video._id}
                  className="relative group overflow-hidden rounded-lg shadow-xl"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="aspect-video relative bg-wedding-black">
                    <iframe
                      src={getEmbedUrl(video.videoUrl)}
                      className="w-full h-full"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      title={video.title}
                    />
                  </div>
                  <div className="p-6 bg-white">
                    <h3 className="text-2xl font-elegant font-bold mb-2">{video.title}</h3>
                    {video.description && (
                      <p className="text-gray-600">{video.description}</p>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  )
}

export default Videos

