import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FaInstagram, FaYoutube } from 'react-icons/fa'
import { HiMenu, HiX } from 'react-icons/hi'

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/about', label: 'About' },
    { 
      path: '/portfolio', 
      label: 'Portfolio',
      submenu: [
        { path: '/portfolio/weddings', label: 'Weddings' },
        { path: '/portfolio/pre-wedding', label: 'Pre-Wedding' },
        { path: '/portfolio/engagement', label: 'Engagement' }
      ]
    },
    { path: '/videos', label: 'Videos' },
    { path: '/services', label: 'Services' },
    { path: '/packages', label: 'Packages' },
    { path: '/blog', label: 'Blog' },
    { path: '/contact', label: 'Contact' }
  ]

  return (
    <motion.nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-wedding-black shadow-lg backdrop-blur-sm bg-opacity-95'
          : 'bg-wedding-black/80 backdrop-blur-sm'
      }`}
      style={{ height: '80px', margin: 0 }}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-4 h-full">
        <div className="flex items-center justify-between h-full">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-2xl md:text-3xl font-elegant font-bold text-wedding-gold">
              RS Photography
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center space-x-6">
            {navLinks.map((link) => (
              <div key={link.path} className="relative group">
                <Link
                  to={link.path}
                  className={`px-3 py-2 text-sm font-medium transition-colors ${
                    location.pathname === link.path
                      ? 'text-wedding-gold'
                      : isScrolled
                        ? 'text-white hover:text-wedding-gold'
                        : 'text-white hover:text-wedding-gold'
                  }`}
                >
                  {link.label}
                </Link>
                {link.submenu && (
                  <div className="absolute top-full left-0 mt-2 w-48 bg-wedding-black opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 shadow-xl rounded-lg overflow-hidden">
                    {link.submenu.map((sub) => (
                      <Link
                        key={sub.path}
                        to={sub.path}
                        className="block px-4 py-2 text-white hover:bg-wedding-gold hover:text-wedding-black transition-colors"
                      >
                        {sub.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
            
            {/* Social Icons */}
            <div className="flex items-center space-x-4 ml-4 pl-4 border-l border-wedding-gold/30">
              <a
                href="https://www.instagram.com/rs____photography___/"
                target="_blank"
                rel="noopener noreferrer"
                className={`transition-colors ${
                  isScrolled
                    ? 'text-white hover:text-wedding-gold'
                    : 'text-white hover:text-wedding-gold'
                }`}
                aria-label="Instagram"
              >
                <FaInstagram size={20} />
              </a>
              <a
                href="https://youtube.com/@rs__photography?si=-dbc30qn6M_6xVQH"
                target="_blank"
                rel="noopener noreferrer"
                className={`transition-colors ${
                  isScrolled
                    ? 'text-white hover:text-wedding-gold'
                    : 'text-white hover:text-wedding-gold'
                }`}
                aria-label="YouTube"
              >
                <FaYoutube size={20} />
              </a>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            className={`lg:hidden transition-colors ${
              isScrolled
                ? 'text-white'
                : 'text-white'
            }`}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <HiX size={28} /> : <HiMenu size={28} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <motion.div
            className="lg:hidden absolute top-full left-0 right-0 mt-0 pb-4 bg-wedding-black/95 rounded-lg mx-4"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
          >
            {navLinks.map((link) => (
              <div key={link.path}>
                <Link
                  to={link.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`block px-4 py-3 text-white hover:bg-wedding-gold hover:text-wedding-black transition-colors ${
                    location.pathname === link.path ? 'bg-wedding-gold/20 text-wedding-gold' : ''
                  }`}
                >
                  {link.label}
                </Link>
                {link.submenu && link.submenu.map((sub) => (
                  <Link
                    key={sub.path}
                    to={sub.path}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block px-8 py-2 text-white/80 hover:bg-wedding-gold/20 hover:text-wedding-gold transition-colors"
                  >
                    {sub.label}
                  </Link>
                ))}
              </div>
            ))}
            <div className="flex items-center justify-center space-x-4 mt-4 pt-4 border-t border-wedding-gold/30">
              <a
                href="https://www.instagram.com/rs____photography___/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-wedding-gold transition-colors"
              >
                <FaInstagram size={24} />
              </a>
              <a
                href="https://youtube.com/@rs__photography?si=-dbc30qn6M_6xVQH"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-wedding-gold transition-colors"
              >
                <FaYoutube size={24} />
              </a>
            </div>
          </motion.div>
        )}
      </div>
    </motion.nav>
  )
}

export default Navbar
