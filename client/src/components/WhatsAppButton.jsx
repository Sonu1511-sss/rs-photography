import { FaWhatsapp } from 'react-icons/fa'
import { motion } from 'framer-motion'

const WhatsAppButton = () => {
  const phoneNumber = '916264620716' // WhatsApp number
  const message = 'Hello! I am interested in booking RS Photography for my wedding.'

  const handleClick = () => {
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`
    window.open(url, '_blank')
  }

  return (
    <motion.button
      onClick={handleClick}
      className="fixed bottom-6 right-6 z-50 bg-green-500 hover:bg-green-600 text-white rounded-full p-4 shadow-2xl transition-all duration-300 flex items-center justify-center group"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1 }}
      aria-label="Contact on WhatsApp"
    >
      <FaWhatsapp size={28} />
      <span className="absolute right-full mr-3 px-3 py-1 bg-wedding-black text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
        Chat with us
      </span>
    </motion.button>
  )
}

export default WhatsAppButton














