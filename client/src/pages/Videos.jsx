import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { FaPlay, FaYoutube } from 'react-icons/fa'
import api from '../utils/api'
import SEO from '../components/SEO'

const Videos = () => {
  const [videos, setVideos] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedVideo, setSelectedVideo] = useState(null)

  useEffect(() => {
    api.get('/videos')
      .then(res => {
        const videoData = res.data && res.data.length > 0 ? res.data : getSampleVideos()
        setVideos(videoData)
        setLoading(false)
      })
      .catch(err => {
        console.error(err)
        // Use sample data if API fails
        setVideos(getSampleVideos())
        setLoading(false)
      })
  }, [])

  const getSampleVideos = () => {
    return [
      {
        _id: 'sample-video-1',
        title: 'Cinematic Wedding Film - Traditional Indian Wedding',
        description: 'A beautiful cinematic wedding film capturing all the emotions and moments of a traditional Indian wedding ceremony.',
        videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
        thumbnailUrl: 'https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg',
        category: 'wedding'
      },
      {
        _id: 'sample-video-2',
        title: 'Pre-Wedding Cinematic Video',
        description: 'Romantic pre-wedding cinematic video showcasing the couple\'s love story in a beautiful outdoor setting.',
        videoUrl: 'https://www.youtube.com/watch?v=jNQXAC9IVRw',
        thumbnailUrl: 'https://img.youtube.com/vi/jNQXAC9IVRw/maxresdefault.jpg',
        category: 'pre-wedding'
      },
      {
        _id: 'sample-video-3',
        title: 'Wedding Highlights - Baraat & Ceremony',
        description: 'Complete wedding highlights including vibrant baraat procession and traditional ceremony moments.',
        videoUrl: 'https://www.youtube.com/watch?v=9bZkp7q19f0',
        thumbnailUrl: 'https://img.youtube.com/vi/9bZkp7q19f0/maxresdefault.jpg',
        category: 'wedding'
      },
      {
        _id: 'sample-video-4',
        title: 'Engagement Ceremony Cinematic Video',
        description: 'Beautifully captured engagement ceremony with emotional moments and celebrations.',
        videoUrl: 'https://www.youtube.com/watch?v=kJQP7kiw5Fk',
        thumbnailUrl: 'https://img.youtube.com/vi/kJQP7kiw5Fk/maxresdefault.jpg',
        category: 'engagement'
      },
      {
        _id: 'sample-video-5',
        title: 'Wedding Reception Cinematic Film',
        description: 'Elegant wedding reception captured with cinematic style, showcasing dance performances and celebrations.',
        videoUrl: 'https://www.youtube.com/watch?v=fJ9rUzIMcZQ',
        thumbnailUrl: 'https://img.youtube.com/vi/fJ9rUzIMcZQ/maxresdefault.jpg',
        category: 'wedding'
      },
      {
        _id: 'sample-video-6',
        title: 'Mehendi & Sangeet Ceremony Video',
        description: 'Colorful mehendi and sangeet ceremony captured with vibrant colors and joyful moments.',
        videoUrl: 'https://www.youtube.com/watch?v=OPf0YbXqDm0',
        thumbnailUrl: 'https://img.youtube.com/vi/OPf0YbXqDm0/maxresdefault.jpg',
        category: 'wedding'
      }
    ]
  }

  const getVideoId = (url) => {
    if (!url) return null
    // Extract YouTube video ID from various URL formats
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/
    const match = url.match(regExp)
    return (match && match[2].length === 11) ? match[2] : null
  }

  const getThumbnailUrl = (videoUrl) => {
    const videoId = getVideoId(videoUrl)
    if (videoId) {
      return `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`
    }
    return null
  }

  return (
    <>
      <SEO 
        title="Wedding Videos - Cinematography Gallery | RS Photography"
        description="Watch our stunning wedding cinematography videos and wedding films captured by RS Photography in Balaghat and Katangi."
        keywords="wedding videos, wedding cinematography, wedding films, wedding videography"
      />
      <div className="pt-20 bg-wedding-black text-white">
        {/* Hero Section */}
        <section className="relative h-60 flex items-center justify-center text-white overflow-hidden">
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: 'url(https://i.pinimg.com/736x/2e/dc/88/2edc885cae7bca92ace48a0a1a767b67.jpg)' }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-wedding-black/80 to-wedding-gold/60" />
          <div className="absolute inset-0 bg-black/50" />
          <div className="relative z-10 text-center px-4">
            <h1 className="text-5xl md:text-6xl font-elegant font-bold mb-4">
              Wedding Videos
            </h1>
            <p className="text-xl text-wedding-gold">
              Cinematic Wedding Films
            </p>
          </div>
        </section>

        {/* Videos Grid */}
        <section className="py-20 bg-gradient-to-b from-wedding-black via-[#050509] to-wedding-black">
          <div className="container mx-auto px-4">
            {loading ? (
              <div className="text-center py-20">
                <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-wedding-gold mx-auto mb-4"></div>
                <p className="text-wedding-light-gray">Loading videos...</p>
              </div>
            ) : videos.length === 0 ? (
              <div className="text-center py-20">
                <h2 className="text-3xl font-elegant font-bold mb-4 text-white">
                  No Videos Yet
                </h2>
                <p className="text-wedding-light-gray text-lg mb-6">
                  Check back soon for our wedding cinematography videos!
                </p>
                <a
                  href="https://youtube.com/@rs__photography?si=-dbc30qn6M_6xVQH"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-wedding-gold to-wedding-soft-gold text-wedding-black px-6 py-3 rounded-full font-semibold hover:shadow-lg hover:shadow-wedding-gold/50 transition-all"
                >
                  <FaYoutube className="text-red-600" /> Visit Our YouTube Channel
                </a>
              </div>
            ) : (
              <>
                <motion.div
                  className="text-center mb-12"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <p className="text-xs md:text-sm tracking-[0.25em] uppercase text-wedding-light-gray mb-2">
                    Cinematic Stories
                  </p>
                  <h2 className="text-4xl md:text-5xl font-elegant font-bold mb-3 text-wedding-gold">
                    Our Wedding Films
                  </h2>
                  <p className="text-wedding-light-gray text-sm md:text-base max-w-2xl mx-auto">
                    Experience the magic of RS Photography wedding cinematography from Balaghat, Katangi and beyond.
                  </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {videos.map((video, index) => {
                    const thumbnailUrl = video.thumbnailUrl || getThumbnailUrl(video.videoUrl)
                    return (
                      <motion.div
                        key={video._id}
                        className="relative group overflow-hidden rounded-2xl shadow-xl border border-wedding-gold/25 bg-wedding-black/80 backdrop-blur-sm hover:border-wedding-gold/60 hover:-translate-y-2 transition-all duration-300"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <div className="aspect-video relative overflow-hidden bg-black">
                          {thumbnailUrl ? (
                            <img
                              src={thumbnailUrl}
                              alt={video.title}
                              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                            />
                          ) : (
                            <div className="w-full h-full bg-gradient-to-br from-wedding-black to-wedding-gold flex items-center justify-center">
                              <FaYoutube className="text-white text-6xl" />
                            </div>
                          )}
                          <div className="absolute inset-0 bg-black/30 group-hover:bg-black/60 transition-colors flex items-center justify-center">
                            <button
                              onClick={() => setSelectedVideo(video)}
                              className="bg-gradient-to-r from-wedding-gold to-wedding-soft-gold text-wedding-black rounded-full p-4 shadow-lg hover:shadow-wedding-gold/60 transition-all transform group-hover:scale-110"
                            >
                              <FaPlay size={32} />
                            </button>
                          </div>
                          <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/85 to-transparent">
                            <h3 className="text-white font-elegant font-bold text-base md:text-lg mb-1 line-clamp-2">
                              {video.title}
                            </h3>
                            {video.description && (
                              <p className="text-wedding-light-gray text-xs md:text-sm line-clamp-2">
                                {video.description}
                              </p>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    )
                  })}
                </div>
              </>
            )}
          </div>
        </section>

        {/* YouTube Channel CTA */}
        <section className="py-20 bg-wedding-black text-white">
          <div className="container mx-auto px-4 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <FaYoutube className="text-red-600 text-6xl mx-auto mb-6" />
              <h2 className="text-4xl md:text-5xl font-elegant font-bold mb-6 text-wedding-gold">
                Subscribe to Our YouTube Channel
              </h2>
              <p className="text-xl mb-8 text-gray-300">
                Watch more wedding videos and stay updated with our latest work
              </p>
              <a
                href="https://youtube.com/@rs__photography?si=-dbc30qn6M_6xVQH"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-wedding-gold text-white px-8 py-4 rounded-lg font-semibold hover:bg-gold-400 transition-all"
              >
                <FaYoutube className="text-red-600" /> Subscribe Now
              </a>
            </motion.div>
          </div>
        </section>

        {/* Video Modal */}
        {selectedVideo && (
          <div 
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedVideo(null)}
          >
            <div className="relative w-full max-w-4xl">
              <button
                onClick={() => setSelectedVideo(null)}
                className="absolute -top-12 right-0 text-white text-2xl hover:text-wedding-gold"
              >
                ✕
              </button>
              <div className="aspect-video">
                <iframe
                  src={`https://www.youtube.com/embed/${getVideoId(selectedVideo.videoUrl)}?autoplay=1`}
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  )
}

export default Videos
