import { useState } from 'react'
import { motion } from 'framer-motion'
import { FaChevronDown, FaChevronUp, FaQuestionCircle } from 'react-icons/fa'
import SEO from '../components/SEO'

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null)

  const faqs = [
    {
      question: 'How far in advance should I book RS Photography?',
      answer: 'We recommend booking at least 3-6 months in advance, especially for peak wedding season (October to March). However, we do accept last-minute bookings based on availability. Contact us to check our availability for your date.'
    },
    {
      question: 'What areas do you cover?',
      answer: 'RS Photography primarily serves Balaghat, Katangi (Kattangi), and surrounding areas in Madhya Pradesh. We also travel to nearby cities and destinations. Travel charges may apply for locations beyond 50km from Balaghat.'
    },
    {
      question: 'Do you provide both photography and videography?',
      answer: 'Yes! We offer comprehensive wedding photography and videography services. Our packages include both still photography and cinematic wedding films. You can also book them separately based on your needs.'
    },
    {
      question: 'What is included in the photography package?',
      answer: 'Our packages include professional photographers, full-day coverage, high-resolution edited photos, online gallery access, and digital delivery. Premium packages also include physical albums, prints, and additional services like drone coverage.'
    },
    {
      question: 'How long does it take to receive the photos?',
      answer: 'Typically, you will receive a preview of selected photos within 24-48 hours. The complete edited gallery is usually delivered within 4-6 weeks after your wedding. Rush delivery options are available for an additional fee.'
    },
    {
      question: 'Do you shoot pre-wedding and engagement ceremonies?',
      answer: 'Absolutely! We specialize in pre-wedding shoots, engagement ceremonies, and all wedding-related events. We offer separate packages for these services or can include them in comprehensive wedding packages.'
    },
    {
      question: 'What equipment do you use?',
      answer: 'We use professional-grade cameras, lenses, and lighting equipment to ensure the highest quality images. We also have drone equipment for aerial photography and videography when included in your package.'
    },
    {
      question: 'Can I customize a package?',
      answer: 'Yes! All our packages can be customized to fit your specific needs and budget. Contact us to discuss your requirements, and we will create a tailored package just for you.'
    },
    {
      question: 'What is your cancellation policy?',
      answer: 'Cancellations made 30 days or more before the event date will receive a 50% refund of the advance payment. Cancellations made less than 30 days before the event are non-refundable. We understand emergencies happen, so please contact us to discuss your situation.'
    },
    {
      question: 'Do you require a deposit?',
      answer: 'Yes, we require a 50% advance payment to confirm your booking and secure your date. The remaining balance is due on or before your event date. We accept cash, bank transfers, and UPI payments.'
    },
    {
      question: 'Will you share raw/unedited photos?',
      answer: 'We provide professionally edited high-resolution photos. Raw files are not typically included, but we can discuss this option for an additional fee. Our editing process ensures your photos look their absolute best.'
    },
    {
      question: 'How many photographers will be at my wedding?',
      answer: 'The number of photographers depends on your chosen package. Basic packages include 1 photographer, Standard includes 2, Premium includes 3, and Luxury includes 4 photographers plus videographers. Additional photographers can be added to any package.'
    },
    {
      question: 'Do you provide same-day highlights?',
      answer: 'Yes! Our Premium and Luxury packages include same-day highlight reels. We can also add this service to other packages for an additional fee. Same-day highlights are perfect for sharing on social media immediately after your wedding.'
    },
    {
      question: 'What if the weather is bad on my wedding day?',
      answer: 'We are experienced in shooting in various weather conditions. We come prepared with backup equipment and can adapt to indoor venues if needed. We will work with you to ensure we capture beautiful moments regardless of weather conditions.'
    },
    {
      question: 'Can I see samples of your work before booking?',
      answer: 'Absolutely! You can browse our portfolio on this website, including galleries for weddings, pre-wedding shoots, and engagement ceremonies. We also offer in-person consultations where you can see more detailed samples and discuss your vision.'
    }
  ]

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <>
      <SEO
        title="FAQ - Frequently Asked Questions | RS Photography"
        description="Frequently asked questions about RS Photography wedding services, booking, packages, and more. Get answers to common questions about wedding photography in Balaghat and Katangi."
        keywords="wedding photography FAQ, photography questions, wedding photographer FAQ, RS photography FAQ, wedding photography balaghat"
      />
      <div className="pt-20">
        {/* Hero Section */}
        <section className="relative h-96 flex items-center justify-center text-white overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=1920&q=80)' }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-wedding-black/80 to-wedding-gold/60" />
          <div className="absolute inset-0 bg-black/50" />
          <div className="relative z-10 text-center px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <FaQuestionCircle className="text-6xl mx-auto mb-4 text-wedding-gold" />
              <h1 className="text-5xl md:text-6xl font-elegant font-bold mb-4">
                Frequently Asked Questions
              </h1>
              <p className="text-xl text-wedding-gold">
                Everything you need to know about our services
              </p>
            </motion.div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4 max-w-4xl">
            <motion.div
              className="space-y-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              {faqs.map((faq, index) => (
                <motion.div
                  key={index}
                  className="border border-gray-200 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <button
                    onClick={() => toggleFAQ(index)}
                    className="w-full px-6 py-4 text-left flex items-center justify-between bg-white hover:bg-gray-50 transition-colors"
                  >
                    <span className="font-elegant font-semibold text-lg text-wedding-black pr-4">
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
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
                        <p className="text-gray-700 leading-relaxed">
                          {faq.answer}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </motion.div>
              ))}
            </motion.div>

            {/* Contact CTA */}
            <motion.div
              className="mt-12 text-center bg-wedding-black text-white p-8 rounded-lg"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-elegant font-bold mb-4 text-wedding-gold">
                Still Have Questions?
              </h2>
              <p className="text-gray-300 mb-6">
                We're here to help! Contact us and we'll get back to you as soon as possible.
              </p>
              <a
                href="/contact"
                className="inline-block bg-wedding-gold text-wedding-black px-8 py-4 rounded-lg font-semibold hover:bg-gold-400 transition-all"
              >
                Contact Us
              </a>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  )
}

export default FAQ
