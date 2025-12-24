import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import api from '../utils/api';
import SEO from '../components/SEO';

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [form, setForm] = useState({
    coupleName: '',
    rating: 5,
    review: '',
    weddingDate: '',
  });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    api
      .get('/testimonials')
      .then((res) => {
        setTestimonials(res.data || []);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const payload = {
        coupleName: form.coupleName,
        rating: Number(form.rating) || 5,
        review: form.review,
        weddingDate: form.weddingDate || new Date(),
        featured: false,
      };
      await api.post('/testimonials', payload);
      const res = await api.get('/testimonials');
      setTestimonials(res.data || []);
      setForm({ coupleName: '', rating: 5, review: '', weddingDate: '' });
      alert('Thank you for your feedback!');
    } catch (err) {
      alert('Failed to submit testimonial');
    } finally {
      setSubmitting(false);
    }
  };

  // Carousel navigation functions
  const nextSlide = () => {
    if (testimonials.length <= 3) return;
    setCurrentIndex((prev) => (prev + 1) % Math.max(1, testimonials.length - 2));
  };

  const prevSlide = () => {
    if (testimonials.length <= 3) return;
    setCurrentIndex((prev) => (prev - 1 + Math.max(1, testimonials.length - 2)) % Math.max(1, testimonials.length - 2));
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  // Get testimonials to display (3 at a time for desktop, 1 for mobile)
  const getDisplayTestimonials = () => {
    if (testimonials.length <= 3) {
      return testimonials;
    }
    // For desktop: show 3 cards (current, current+1, current+2)
    // For mobile: show only current
    const maxIndex = Math.max(0, testimonials.length - 3);
    const safeIndex = Math.min(currentIndex, maxIndex);
    return testimonials.slice(safeIndex, safeIndex + 3);
  };

  const displayTestimonials = getDisplayTestimonials();
  const totalSlides = Math.max(1, testimonials.length - 2);

  return (
    <>
      <SEO
        title="Client Testimonials - RS Photography"
        description="Read reviews and testimonials from couples who trusted RS Photography for their wedding memories."
        keywords="rs photography reviews, client testimonials, wedding photographer feedback"
      />
      <div className="pt-20 min-h-screen bg-wedding-black text-white">
        {/* Hero Section - Dark Theme */}
        <section className="relative py-20 md:py-24 overflow-hidden bg-gradient-to-br from-wedding-black via-[#0b0b0f] to-wedding-black">
           {/* Camera Lens Background Image */}
        <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-25 md:opacity-30"
          style={{ 
            backgroundImage: 'url(https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=1920&q=80)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
              filter: 'blur(2px)',
          }}
        />
          <div className="absolute inset-0 bg-gradient-to-br from-wedding-black/90 via-wedding-black/80 to-wedding-gold/10" />
          <div className="relative z-10 container mx-auto px-4 flex items-center justify-center">
            <motion.div
              className="w-full max-w-3xl text-center bg-wedding-black/70 border border-wedding-gold/30 rounded-3xl px-6 py-10 md:px-10 md:py-12 shadow-2xl backdrop-blur-md"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <p className="text-xs md:text-sm tracking-[0.25em] text-wedding-gold mb-4 uppercase">
                Client Stories
              </p>
              <h1 className="text-3xl md:text-5xl lg:text-6xl font-elegant font-bold mb-4 leading-tight">
                <span className="text-white">What Our </span>
                <span className="text-wedding-gold">Couples Say</span>
              </h1>
              <p className="text-wedding-light-gray text-sm md:text-lg max-w-2xl mx-auto">
                Real experiences from couples who trusted us to capture their most precious moments.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Testimonials Section - Dark Theme */}
        <section className="w-full py-12 pb-20 bg-gradient-to-br from-wedding-black via-gray-900 to-wedding-black">
          <div className="mx-auto px-4 max-w-7xl">

            {/* 3-card highlight layout */}
            {loading ? (
              <div className="text-center py-20">
                <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-wedding-gold mx-auto mb-4"></div>
                <p className="text-wedding-light-gray">Loading testimonials...</p>
              </div>
            ) : testimonials.length === 0 ? (
              <div className="text-center py-20 bg-wedding-black/80 backdrop-blur-sm rounded-3xl border-2 border-wedding-gold/30 shadow-xl p-12">
                <div className="text-6xl mb-4">💬</div>
                <h3 className="text-2xl font-elegant font-bold text-wedding-gold mb-2">
                  No Testimonials Yet
                </h3>
                <p className="text-wedding-light-gray text-lg">
                  Be the first to share your experience with RS Photography!
                </p>
              </div>
            ) : (
              <div className="bg-wedding-black/80 backdrop-blur-sm rounded-3xl shadow-2xl border-2 border-wedding-gold/20 px-4 md:px-10 py-12 relative overflow-hidden">
                {/* Decorative background elements */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-wedding-gold/5 rounded-full blur-3xl"></div>
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-wedding-gold/5 rounded-full blur-3xl"></div>
                {/* Navigation Arrows - Only show if more than 3 testimonials */}
                {testimonials.length > 3 && (
                  <>
                    <button
                      onClick={prevSlide}
                      className="hidden md:flex absolute left-4 top-1/2 -translate-y-1/2 z-20 h-12 w-12 rounded-full bg-wedding-black/80 hover:bg-wedding-gold/20 border-2 border-wedding-gold/40 hover:border-wedding-gold items-center justify-center text-wedding-gold text-2xl font-bold transition-all shadow-lg hover:scale-110"
                      aria-label="Previous testimonials"
                    >
                      ‹
                    </button>
                    <button
                      onClick={nextSlide}
                      className="hidden md:flex absolute right-4 top-1/2 -translate-y-1/2 z-20 h-12 w-12 rounded-full bg-wedding-black/80 hover:bg-wedding-gold/20 border-2 border-wedding-gold/40 hover:border-wedding-gold items-center justify-center text-wedding-gold text-2xl font-bold transition-all shadow-lg hover:scale-110"
                      aria-label="Next testimonials"
                    >
                      ›
                    </button>
                  </>
                )}
                
                <div className="grid gap-6 md:gap-8 md:grid-cols-3 relative z-10">
                  {displayTestimonials.map((t, displayIndex) => {
                    const isCenter = displayIndex === 1; // middle card highlight
                    const cardBase =
                      'rounded-3xl shadow-xl flex flex-col items-center text-center px-6 py-10 transition-all duration-300';
                    const primary =
                      'bg-gradient-to-br from-wedding-gold via-wedding-soft-gold to-wedding-gold text-wedding-black shadow-2xl scale-105 border-2 border-wedding-gold/50';
                    const secondary =
                      'bg-wedding-black/90 text-wedding-light-gray border-2 border-wedding-gold/20 hover:border-wedding-gold/50 hover:shadow-2xl';

                    return (
                      <motion.div
                        key={t._id || displayIndex}
                        className={`${cardBase} ${
                          isCenter ? primary : secondary
                        }`}
                        initial={{ opacity: 0, y: 30, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: isCenter ? 1.05 : 1 }}
                        transition={{ duration: 0.5, delay: displayIndex * 0.15 }}
                        whileHover={{ scale: isCenter ? 1.08 : 1.05 }}
                      >
                        {/* Avatar circle with colored border ring */}
                        <div className="mb-6 relative">
                          <div
                            className={`h-24 w-24 rounded-full border-4 flex items-center justify-center text-2xl font-bold overflow-hidden shadow-lg ${
                              isCenter
                                ? 'border-wedding-black/30 bg-gradient-to-br from-wedding-black/20 to-wedding-black/10 text-wedding-black'
                                : displayIndex === 0
                                ? 'border-wedding-gold/50 bg-gradient-to-br from-wedding-gold/20 to-wedding-soft-gold/10 text-wedding-charcoal'
                                : 'border-wedding-gold/50 bg-gradient-to-br from-wedding-gold/20 to-wedding-soft-gold/10 text-wedding-charcoal'
                            }`}
                          >
                            <span className="text-3xl">
                              {t.coupleName?.[0]?.toUpperCase() || t.name?.[0]?.toUpperCase() || 'R'}
                            </span>
                          </div>
                          {/* Decorative ring */}
                          {isCenter && (
                            <div className="absolute inset-0 rounded-full border-2 border-wedding-black/20 animate-pulse"></div>
                          )}
                        </div>

                        {/* Stars */}
                        <div className="flex justify-center mb-4 gap-1">
                          {[...Array(5)].map((_, i) => (
                            <span
                              key={i}
                              className={`text-xl ${
                                i < (t.rating || 5)
                                  ? isCenter
                                    ? 'text-wedding-black'
                                    : 'text-wedding-gold'
                                  : 'text-gray-300'
                              }`}
                            >
                              ★
                            </span>
                          ))}
                        </div>

                        {/* Name & role */}
                        <h3 className="text-lg md:text-xl font-elegant font-bold mb-1">
                          {t.coupleName || t.name || 'Happy Couple'}
                        </h3>
                        <p
                          className={`text-xs md:text-sm mb-4 font-medium ${
                            isCenter ? 'text-wedding-black/70' : 'text-wedding-light-gray'
                          }`}
                        >
                          {t.weddingDate ? new Date(t.weddingDate).getFullYear() + ' Wedding' : 'Wedding Client'}
                        </p>

                        {/* Quote icon */}
                        <div className="mb-3">
                          <span
                            className={`text-5xl md:text-6xl font-serif ${
                              isCenter ? 'text-wedding-black/20' : 'text-wedding-gold/20'
                            }`}
                          >
                            "
                          </span>
                        </div>

                        {/* Quote text */}
                        <p
                          className={`text-sm md:text-base leading-relaxed italic ${
                            isCenter ? 'text-wedding-black/90' : 'text-wedding-charcoal'
                          }`}
                        >
                          {t.review || t.message}
                        </p>
                      </motion.div>
                    );
                  })}
                </div>

                {/* Pagination Dots - Only show if more than 3 testimonials */}
                {testimonials.length > 3 && (
                  <div className="flex justify-center gap-3 mt-8 relative z-10">
                    {Array.from({ length: totalSlides }).map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => goToSlide(idx)}
                        className={`h-2.5 rounded-full transition-all duration-300 ${
                          currentIndex === idx
                            ? 'bg-wedding-gold w-10 shadow-lg shadow-wedding-gold/50'
                            : 'bg-wedding-light-gold/40 w-2.5 hover:bg-wedding-gold/50 hover:w-6'
                        }`}
                        aria-label={`Go to slide ${idx + 1}`}
                      />
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Share your experience form below slider */}
            <div className="max-w-4xl mx-auto mt-16">
              <motion.div
                className="bg-wedding-black/90 rounded-3xl shadow-2xl border-2 border-wedding-gold/30 p-8 md:p-12 relative overflow-hidden"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                {/* Decorative background */}
                <div className="absolute top-0 right-0 w-48 h-48 bg-wedding-gold/10 rounded-full blur-3xl"></div>
                <div className="absolute bottom-0 left-0 w-48 h-48 bg-wedding-gold/10 rounded-full blur-3xl"></div>
                
                <div className="relative z-10">
                  <div className="text-center mb-8">
                    <h2 className="text-2xl md:text-3xl font-elegant font-bold mb-3 text-white">
                      Share Your <span className="text-wedding-gold">Experience</span>
                    </h2>
                    <p className="text-wedding-light-gray text-base md:text-lg">
                      Your words help future couples trust our work. It only takes a minute.
                    </p>
                  </div>
                  <form
                    onSubmit={handleSubmit}
                    className="grid gap-5 md:grid-cols-2 text-sm md:text-base"
                  >
                  <div className="md:col-span-1">
                    <label className="block font-semibold mb-2 text-white">
                      Couple Name *
                    </label>
                    <input
                      type="text"
                      name="coupleName"
                      value={form.coupleName}
                      onChange={handleChange}
                      className="w-full bg-wedding-black/80 border-2 border-wedding-gold/30 rounded-lg px-4 py-3 text-white placeholder-wedding-light-gray focus:outline-none focus:ring-2 focus:ring-wedding-gold focus:border-wedding-gold transition-all"
                      placeholder="Enter couple name"
                      required
                    />
                  </div>
                  <div className="md:col-span-1">
                    <label className="block font-semibold mb-2 text-white">
                      Wedding Date
                    </label>
                    <input
                      type="date"
                      name="weddingDate"
                      value={form.weddingDate}
                      onChange={handleChange}
                      className="w-full bg-wedding-black/80 border-2 border-wedding-gold/30 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-wedding-gold focus:border-wedding-gold transition-all"
                    />
                  </div>
                  <div className="md:col-span-1">
                    <label className="block font-semibold mb-2 text-white">
                      Rating *
                    </label>
                    <select
                      name="rating"
                      value={form.rating}
                      onChange={handleChange}
                      className="w-full bg-wedding-black/80 border-2 border-wedding-gold/30 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-wedding-gold focus:border-wedding-gold transition-all"
                    >
                      {[5, 4, 3, 2, 1].map((r) => (
                        <option key={r} value={r} className="bg-wedding-black text-white">
                          {r} {r === 1 ? 'Star' : 'Stars'}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="md:col-span-2">
                    <label className="block font-semibold mb-2 text-white">
                      Your Review *
                    </label>
                    <textarea
                      name="review"
                      value={form.review}
                      onChange={handleChange}
                      className="w-full bg-wedding-black/80 border-2 border-wedding-gold/30 rounded-lg px-4 py-3 h-32 resize-none text-white placeholder-wedding-light-gray focus:outline-none focus:ring-2 focus:ring-wedding-gold focus:border-wedding-gold transition-all"
                      placeholder="Share your experience with RS Photography..."
                      required
                    />
                  </div>
                  <div className="md:col-span-2 flex justify-center mt-2">
                    <button
                      type="submit"
                      disabled={submitting}
                      className="px-10 py-4 rounded-full bg-gradient-to-r from-wedding-gold to-wedding-soft-gold text-wedding-black font-bold text-base md:text-lg hover:shadow-xl hover:shadow-wedding-gold/50 disabled:opacity-60 shadow-lg transition-all transform hover:scale-105 active:scale-95"
                    >
                      {submitting ? (
                        <span className="flex items-center gap-2">
                          <span className="animate-spin">⏳</span> Sending...
                        </span>
                      ) : (
                        'Submit Your Review'
                      )}
                    </button>
                  </div>
                  </form>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Testimonials;

