import { useState } from 'react'
import { motion } from 'framer-motion'
import { FaChevronDown, FaChevronUp } from 'react-icons/fa'

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null)

  const faqs = [
    {
      question: 'How far in advance should I book?',
      answer: 'We recommend booking at least 6-12 months in advance, especially for peak wedding season (October to March). However, we do accept last-minute bookings subject to availability.'
    },
    {
      question: 'What is included in the wedding photography package?',
      answer: 'Our packages include professional photographers, high-resolution edited images, online gallery access, and USB drive delivery. Specific deliverables vary by package - please check our Packages page for detailed information.'
    },
    {
      question: 'How long does it take to receive the photos?',
      answer: 'Typically, you will receive a preview gallery within 2-3 weeks after your wedding. The complete edited gallery will be delivered within 6-8 weeks. Rush delivery options are available for an additional fee.'
    },
    {
      question: 'Do you travel for weddings?',
      answer: 'Yes! We serve Balaghat and surrounding areas in Madhya Pradesh. We also travel to other cities across India. Travel charges may apply for destinations outside our base location.'
    },
    {
      question: 'What is your payment policy?',
      answer: 'We require a 50% advance payment to confirm your booking, with the remaining 50% due 7 days before your wedding date. We accept cash, bank transfer, and UPI payments.'
    },
    {
      question: 'Can I customize my package?',
      answer: 'Absolutely! All our packages can be customized to suit your specific needs. Contact us to discuss your requirements and we will create a personalized package for you.'
    },
    {
      question: 'Do you provide raw/unedited photos?',
      answer: 'We provide professionally edited high-resolution images. Raw files are not included in our standard packages but can be provided upon request for an additional fee.'
    },
    {
      question: 'What happens if it rains on my wedding day?',
      answer: 'We are experienced in shooting in various weather conditions. We always have backup plans and can work with indoor venues. We recommend having a backup indoor location for outdoor ceremonies.'
    },
    {
      question: 'Do you shoot both traditional and candid photos?',
      answer: 'Yes! We specialize in both traditional posed photography and candid moments. We capture all the important rituals and ceremonies while also documenting spontaneous, emotional moments throughout the day.'
    },
    {
      question: 'Can I see samples of your work before booking?',
      answer: 'Of course! You can view our portfolio on this website, and we would be happy to show you full wedding galleries during a consultation. Contact us to schedule a meeting.'
    },
    {
      question: 'Do you offer engagement and pre-wedding shoots?',
      answer: 'Yes, we offer both engagement and pre-wedding photography services. These can be included in our packages or booked separately. Check our Services page for more details.'
    },
    {
      question: 'What equipment do you use?',
      answer: 'We use professional-grade cameras, lenses, and lighting equipment from leading brands. We also have backup equipment to ensure nothing is missed on your special day.'
    }
  ]

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="relative h-96 flex items-center justify-center bg-gradient-to-r from-wedding-black to-wedding-gold text-white">
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 text-center px-4">
          <h1 className="text-5xl md:text-6xl font-elegant font-bold mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-xl text-wedding-gold">
            Everything you need to know about our services
          </p>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                className="border border-gray-200 rounded-lg overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full px-6 py-4 text-left flex items-center justify-between bg-white hover:bg-gray-50 transition-colors"
                >
                  <span className="font-semibold text-lg text-wedding-black">
                    {faq.question}
                  </span>
                  {openIndex === index ? (
                    <FaChevronUp className="text-wedding-gold flex-shrink-0" />
                  ) : (
                    <FaChevronDown className="text-wedding-gold flex-shrink-0" />
                  )}
                </button>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="px-6 py-4 bg-gray-50"
                  >
                    <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-wedding-black text-white">
        <div className="container mx-auto px-4 text-center">
          <motion.h2
            className="text-4xl md:text-5xl font-elegant font-bold mb-6"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Still Have Questions?
          </motion.h2>
          <motion.p
            className="text-xl mb-8 text-gray-300"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            We're here to help! Contact us and we'll get back to you as soon as possible.
          </motion.p>
          <motion.a
            href="/contact"
            className="inline-block bg-wedding-gold text-wedding-black px-8 py-4 rounded-lg font-semibold hover:bg-gold-400 transition-all"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            Contact Us
          </motion.a>
        </div>
      </section>
    </div>
  )
}

export default FAQ




