import { useState } from 'react';
import { motion } from 'framer-motion';
import SEO from '../components/SEO';
import api from '../utils/api';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    city: '',
    eventDate: '',
    message: '',
  });
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
    setSuccess('');
  };

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');
    setSuccess('');
    try {
      const submitData = new FormData();
      Object.keys(formData).forEach((key) => {
        submitData.append(key, formData[key]);
      });
      if (image) {
        submitData.append('image', image);
      }

      await api.post('/contact', submitData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setSuccess('Thank you for your enquiry! We will contact you soon.');
      setFormData({
        name: '',
        email: '',
        phone: '',
        city: '',
        eventDate: '',
        message: '',
      });
      setImage(null);
      setImagePreview(null);
      // Reset file input
      const fileInput = document.querySelector('input[type="file"]');
      if (fileInput) fileInput.value = '';
    } catch (err) {
      setError(
        err.response?.data?.message ||
          'Something went wrong. Please try again later.'
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <SEO
        title="Contact - RS Photography"
        description="Contact RS Photography for wedding photography, pre-wedding shoots, engagement shoots and wedding films in Balaghat and Katangi."
        keywords="contact rs photography, book wedding photographer, enquiry"
      />
      <div className="pt-20 min-h-screen bg-gradient-to-b from-wedding-black via-[#060712] to-wedding-black text-white">
        {/* Hero */}
        <section className="py-16">
          <div className="container mx-auto px-4 max-w-6xl text-center">
            <motion.h1
              className="text-4xl md:text-5xl font-elegant text-wedding-gold font-bold mb-3"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
            >
              CONTACT US
            </motion.h1>
            <motion.p
              className="text-sm md:text-base text-gray-300 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
            >
              Share a few details about your wedding or event and we&apos;ll get back to you
              with packages, availability and ideas to make your day unforgettable.
            </motion.p>
          </div>
        </section>

        {/* Main content: Get in touch + form card over dark background */}
        <section className="pb-16">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="grid gap-10 lg:grid-cols-[1.3fr,1.7fr]">
              {/* Left: Get in touch list */}
              <div>
                <h2 className="text-2xl md:text-3xl font-elegant font-bold mb-4">
                  Get In Touch
                </h2>
                <p className="text-sm md:text-base text-gray-300 mb-8">
                  We shoot weddings and events across Balaghat, Katangi (Kattangi) and nearby
                  cities. Call us directly or send a message – our team replies within 24 hours.
                </p>
                <div className="space-y-5">
                  <div className="flex items-start gap-4">
                    <div className="h-10 w-10 rounded-full bg-wedding-gold/15 flex items-center justify-center">
                      <span className="text-wedding-gold text-lg">📍</span>
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-white">
                        Tekadighat Sukdighat, Balaghat
                      </h3>
                      <p className="text-xs md:text-sm text-gray-300">
                        RS Photography Studio, Tekadighat Sukdighat, Balaghat, Madhya Pradesh.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="h-10 w-10 rounded-full bg-wedding-gold/15 flex items-center justify-center">
                      <span className="text-wedding-gold text-lg">📞</span>
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-white">Call / WhatsApp</h3>
                      <p className="text-xs md:text-sm text-gray-300">
                        +91 62646 20716
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="h-10 w-10 rounded-full bg-wedding-gold/15 flex items-center justify-center">
                      <span className="text-wedding-gold text-lg">@</span>
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-white">Email</h3>
                      <p className="text-xs md:text-sm text-gray-300">
                        info@rsphotography.com
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right: floating gradient form card */}
              <div className="relative">
                <div className="absolute inset-0 blur-3xl bg-gradient-to-br from-wedding-gold via-red-400 to-transparent opacity-60 pointer-events-none" />
                <div className="relative bg-gradient-to-br from-[#171628] via-[#111322] to-[#050611] rounded-3xl shadow-2xl border border-white/10 px-6 py-6 md:px-8 md:py-8">
                  <h2 className="text-lg md:text-xl font-elegant font-bold mb-4 text-white">
                    Your Details
                  </h2>

                  {success && (
                    <div className="mb-4 rounded bg-green-500/10 text-green-300 px-4 py-3 text-xs md:text-sm">
                      {success}
                    </div>
                  )}
                  {error && (
                    <div className="mb-4 rounded bg-red-500/10 text-red-300 px-4 py-3 text-xs md:text-sm">
                      {error}
                    </div>
                  )}

                  <form onSubmit={handleSubmit} className="grid gap-4 md:grid-cols-2 text-xs md:text-sm">
                    <div className="md:col-span-1">
                      <label className="block mb-1 font-semibold text-gray-200">
                        Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full bg-transparent border border-white/15 rounded-md px-3 py-2 text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-wedding-gold"
                        placeholder="Your Name"
                        required
                      />
                    </div>
                    <div className="md:col-span-1">
                      <label className="block mb-1 font-semibold text-gray-200">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full bg-transparent border border-white/15 rounded-md px-3 py-2 text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-wedding-gold"
                        placeholder="Your Email"
                        required
                      />
                    </div>
                    <div className="md:col-span-1">
                      <label className="block mb-1 font-semibold text-gray-200">
                        Phone *
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full bg-transparent border border-white/15 rounded-md px-3 py-2 text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-wedding-gold"
                        placeholder="Your Phone"
                        required
                      />
                    </div>
                    <div className="md:col-span-1">
                      <label className="block mb-1 font-semibold text-gray-200">
                        Event Date *
                      </label>
                      <input
                        type="date"
                        name="eventDate"
                        value={formData.eventDate}
                        onChange={handleChange}
                        className="w-full bg-transparent border border-white/15 rounded-md px-3 py-2 text-white focus:outline-none focus:ring-1 focus:ring-wedding-gold"
                        required
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block mb-1 font-semibold text-gray-200">
                        City *
                      </label>
                      <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        className="w-full bg-transparent border border-white/15 rounded-md px-3 py-2 text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-wedding-gold"
                        placeholder="City / Venue"
                        required
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block mb-1 font-semibold text-gray-200">
                        Comments / Questions *
                      </label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        className="w-full bg-transparent border border-white/15 rounded-md px-3 py-2 text-white placeholder-gray-500 h-28 resize-none focus:outline-none focus:ring-1 focus:ring-wedding-gold"
                        placeholder="Tell us about your wedding or event..."
                        required
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block mb-1 font-semibold text-gray-200">
                        Upload Image (Optional)
                      </label>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="w-full bg-transparent border border-white/15 rounded-md px-3 py-2 text-white text-xs file:mr-4 file:py-1 file:px-3 file:rounded-md file:border-0 file:text-xs file:font-semibold file:bg-wedding-gold/20 file:text-wedding-gold hover:file:bg-wedding-gold/30 focus:outline-none focus:ring-1 focus:ring-wedding-gold"
                      />
                      {imagePreview && (
                        <div className="mt-3">
                          <img
                            src={imagePreview}
                            alt="Preview"
                            className="max-w-xs rounded-lg border border-white/15"
                          />
                        </div>
                      )}
                    </div>
                    <div className="md:col-span-2 flex justify-end">
                      <button
                        type="submit"
                        disabled={submitting}
                        className="px-8 py-2 rounded-full bg-gradient-to-r from-wedding-gold to-wedding-soft-gold text-wedding-black font-semibold text-xs md:text-sm hover:shadow-lg hover:shadow-wedding-gold/50 disabled:opacity-60 shadow-md"
                      >
                        {submitting ? 'Sending...' : 'Send Message'}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Map full width strip (under content) */}
        <section className="bg-white">
          <div className="h-64 md:h-72 w-full">
            <iframe
              title="RS Photography Tekadighat Sukdighat Location Wide"
              src="https://www.google.com/maps?q=Tekadighat+Sukdighat,+Balaghat,+Madhya+Pradesh&output=embed"
              className="w-full h-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </section>
      </div>
    </>
  );
};

export default Contact;

