import { Link } from 'react-router-dom'
import { FaInstagram, FaYoutube, FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-wedding-black text-white py-12 border-t border-gray-800">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About */}
          <div>
            <h3 className="text-2xl font-elegant font-bold text-wedding-gold mb-4">
              RS Photography
            </h3>
            <p className="text-gray-300 mb-4">
            RS Photography – Wedding Photography in Balaghat & Katangi.
            Weddings | Pre-Wedding | Engagements | Films 📸
            </p>
            <div className="flex space-x-4">
              <a
                href="https://www.instagram.com/rs____photography___/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-wedding-gold hover:text-white transition-colors"
                aria-label="Instagram"
              >
                <FaInstagram size={24} />
              </a>
              <a
                href="https://youtube.com/@rs__photography?si=-dbc30qn6M_6xVQH"
                target="_blank"
                rel="noopener noreferrer"
                className="text-red-700 hover:text-white transition-colors"
                aria-label="YouTube"
              >
                <FaYoutube size={24} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xl font-elegant font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="text-gray-300 hover:text-wedding-gold transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/portfolio" className="text-gray-300 hover:text-wedding-gold transition-colors">
                  Portfolio
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-gray-300 hover:text-wedding-gold transition-colors">
                  Services
                </Link>
              </li>
              <li>
                <Link to="/packages" className="text-gray-300 hover:text-wedding-gold transition-colors">
                  Packages
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-300 hover:text-wedding-gold transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-xl font-elegant font-semibold mb-4">Services</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/portfolio/weddings" className="text-gray-300 hover:text-wedding-gold transition-colors">
                  Wedding Photography
                </Link>
              </li>
              <li>
                <Link to="/portfolio/pre-wedding" className="text-gray-300 hover:text-wedding-gold transition-colors">
                  Pre-Wedding Shoots
                </Link>
              </li>
              <li>
                <Link to="/portfolio/engagement" className="text-gray-300 hover:text-wedding-gold transition-colors">
                  Engagement Shoots
                </Link>
              </li>
              <li>
                <Link to="/videos" className="text-gray-300 hover:text-wedding-gold transition-colors">
                  Wedding Films
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-xl font-elegant font-semibold mb-4">Contact Info</h4>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3">
                <FaMapMarkerAlt className="text-wedding-gold mt-1" />
                <span className="text-gray-300">Balaghat, Madhya Pradesh, India</span>
              </li>
              <li className="flex items-center space-x-3">
                <FaPhone className="text-wedding-gold" />
                <a href="tel:+916264620716" className="text-gray-300 hover:text-wedding-gold transition-colors">
                  +91 62646 20716
                </a>
              </li>
              <li className="flex items-center space-x-3">
                <FaEnvelope className="text-wedding-gold" />
                <a href="mailto:info@rsphotography.com" className="text-gray-300 hover:text-wedding-gold transition-colors">
                  info@rsphotography.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center">
          <p className="text-gray-400">
            © {currentYear} RS Photography. All rights reserved. |{' '}
            <Link to="/privacy-policy" className="hover:text-wedding-gold transition-colors">
              Privacy Policy
            </Link>
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer

