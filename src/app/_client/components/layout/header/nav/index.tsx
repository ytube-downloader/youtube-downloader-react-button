"use client"
import { CloseIcon } from "../../../svgs/icons/close"
import { Link, usePathname } from '@/i18n/routing'
import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'

type HeaderNavProps = {
  onClose?: VoidFunction
  onNavigate?: () => void
}

const links = [
  {
    label: "Youtube Video Downloader",
    link: "/",
    icon: "🎥"
  },
  {
    label: "4k Video Downloader",
    link: "/4k-video-downloader",
    icon: "🎬"
  },
  {
    label: "Youtube to MP3",
    link: "/youtube-to-mp3",
    icon: "🎵"
  },
  {
    label: "Youtube Playlist Downloader",
    link: "/youtube-playlist-downloader",
    icon: "📋"
  },
  {
    label: "Youtube to WAV",
    link: "/youtube-to-wav",
    icon: "🔊"
  },
  {
    label: "Youtube 1080p Downloader",
    link: "/youtube-1080p-downloader",
    icon: "📺"
  }
]

export const HeaderNav = ({ onClose, onNavigate }: HeaderNavProps) => {
  const pathname = usePathname()
  const [hoveredLink, setHoveredLink] = useState<string | null>(null)
  const [isNavigating, setIsNavigating] = useState(false)

  const handleLinkClick = (href: string) => {
    if (href !== pathname) {
      setIsNavigating(true)
      // Trigger loading state
      if (onNavigate) {
        onNavigate()
      }
      // Close mobile menu
      if (onClose) {
        setTimeout(onClose, 100)
      }
    }
  }

  const renderLinks = () => {
    const mappedLinks = links.map((link, index) => {
      const isActive = pathname === link.link
      const isHovered = hoveredLink === link.link
      
      return (
        <motion.li
          key={link.link}
          className="mb-6 lg:mb-0 relative"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1, duration: 0.3 }}
        >
          <Link 
            href={link.link}
            className={`group relative block px-4 py-3 lg:px-3 lg:py-2 rounded-xl font-medium transition-all duration-300 ${
              isActive 
                ? "text-purple_main bg-purple_main bg-opacity-10 lg:bg-transparent" 
                : "text-heading_main dark:text-dark_heading_main hover:text-purple_main"
            }`}
            onMouseEnter={() => setHoveredLink(link.link)}
            onMouseLeave={() => setHoveredLink(null)}
            onClick={() => handleLinkClick(link.link)}
          >
            <div className="flex items-center gap-3 lg:justify-center">
              <span className="text-lg lg:hidden">{link.icon}</span>
              <span className="relative">
                {link.label}
                
                {/* Active indicator */}
                {isActive && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-purple_main rounded-full lg:block hidden"
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                )}
                
                {/* Hover effect */}
                <AnimatePresence>
                  {isHovered && !isActive && (
                    <motion.div
                      initial={{ scaleX: 0, opacity: 0 }}
                      animate={{ scaleX: 1, opacity: 1 }}
                      exit={{ scaleX: 0, opacity: 0 }}
                      className="absolute -bottom-1 left-0 right-0 h-0.5 bg-purple_main bg-opacity-50 rounded-full hidden lg:block"
                      transition={{ duration: 0.2 }}
                    />
                  )}
                </AnimatePresence>
              </span>
            </div>

            {/* Mobile hover background */}
            <AnimatePresence>
              {isHovered && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="absolute inset-0 bg-purple_main bg-opacity-5 rounded-xl lg:hidden"
                  transition={{ duration: 0.2 }}
                />
              )}
            </AnimatePresence>

            {/* Ripple effect on click */}
            <div className="absolute inset-0 rounded-xl overflow-hidden">
              <div className="absolute inset-0 bg-purple_main opacity-0 group-active:opacity-10 transition-opacity duration-150" />
            </div>
          </Link>
        </motion.li>
      )
    })

    return mappedLinks
  }

  return (
    <nav className="w-screen bg-header_bg dark:bg-dark_heading lg:bg-transparent p-4 lg:min-h-min lg:w-auto lg:p-0 relative">
      {/* Mobile header */}
      <div className="flex items-center justify-between lg:hidden mb-6">
        <motion.h2 
          className="text-xl font-bold text-heading_main dark:text-dark_heading_main"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
        >
          Navigation
        </motion.h2>
        <motion.button
          className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          onClick={onClose ? onClose : () => {}}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0, rotate: -90 }}
          animate={{ opacity: 1, rotate: 0 }}
          transition={{ duration: 0.3 }}
        >
          <CloseIcon />
        </motion.button>
      </div>

      {/* Navigation Links */}
      <ul className="font-light text-center lg:flex lg:items-center lg:font-medium lg:gap-x-2 border-b-2 lg:border-none pb-8 lg:pb-0 mb-10 lg:mb-0 border-b-gray-200 dark:border-b-gray-800">
        {renderLinks()}
        
        {/* Contact Link (Mobile Only) */}
        <motion.li
          className="mb-6 lg:hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: links.length * 0.1, duration: 0.3 }}
        >
          <Link 
            href="/contact"
            className="group relative block px-4 py-3 rounded-xl font-medium text-heading_main dark:text-dark_heading_main hover:text-purple_main transition-all duration-300"
            onMouseEnter={() => setHoveredLink('/contact')}
            onMouseLeave={() => setHoveredLink(null)}
          >
            <div className="flex items-center gap-3">
              <span className="text-lg">📧</span>
              <span>Contact</span>
            </div>
            
            {/* Hover background */}
            <AnimatePresence>
              {hoveredLink === '/contact' && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="absolute inset-0 bg-purple_main bg-opacity-5 rounded-xl"
                  transition={{ duration: 0.2 }}
                />
              )}
            </AnimatePresence>
          </Link>
        </motion.li>
      </ul>

      {/* Loading indicator */}
      <AnimatePresence>
        {isNavigating && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-white dark:bg-dark_heading bg-opacity-50 backdrop-blur-sm flex items-center justify-center lg:hidden"
          >
            <div className="bg-purple_main bg-opacity-10 rounded-2xl p-4">
              <div className="w-6 h-6 border-2 border-purple_main border-t-transparent rounded-full animate-spin"></div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Background decoration for mobile */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-purple_main to-blue-500 opacity-5 rounded-bl-full lg:hidden" />
    </nav>
  )
}