import { Link, useLocation } from 'react-router-dom'
import { useState } from 'react'
import { FaBars, FaTimes } from 'react-icons/fa'
import logo from '../pages/images/logo.png'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const location = useLocation()

  const isActive = (path) => location.pathname === path

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/about', label: 'About' },
    { path: '/portfolio', label: 'Portfolio' },
    { path: '/services', label: 'Services' },
    { path: '/packages', label: 'Packages' },
    { path: '/videos', label: 'Videos' },
    { path: '/blog', label: 'Blog' },
    { path: '/testimonials', label: 'Testimonials' },
    { path: '/contact', label: 'Contact' },
  ]

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-wedding-black shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <img 
              src={logo} 
              alt="RS Photography" 
              className="h-12 md:h-14 w-auto object-contain"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive(link.path)
                    ? 'text-wedding-gold border-b-2 border-wedding-gold'
                    : 'text-gray-300 hover:text-wedding-gold'
                }`}
              >
                {link.label}
              </Link>
            ))}

            {/* Small Admin button */}
            <Link
              to="/admin/login"
              className="ml-4 px-3 py-2 rounded-full text-xs font-semibold bg-wedding-gold text-wedding-black hover:bg-gold-400 transition-colors"
            >
              Admin
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden text-wedding-gold focus:outline-none"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-4">
            <div className="flex flex-col space-y-2">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className={`px-3 py-2 rounded-md text-base font-medium transition-colors ${
                    isActive(link.path)
                      ? 'text-wedding-gold bg-wedding-gold/10'
                      : 'text-gray-300 hover:text-wedding-gold hover:bg-wedding-gold/10'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <Link
                to="/admin/login"
                onClick={() => setIsOpen(false)}
                className="mt-2 px-3 py-2 rounded-md text-base font-semibold text-wedding-black bg-wedding-gold hover:bg-gold-400"
              >
                Admin
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar
