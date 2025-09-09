"use client"
import { Link } from '@/i18n/routing'
import { MenuIcon } from "../../svgs/icons/menu"
import { useEffect, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { HeaderNav } from "./nav"
import { Theming } from './theme'
import { useBetterMediaQuery } from '@/app/_client/libs/hooks/useBetterMediaQuery'

export const Header = () => {
  const [isExpanded, setIsExpanded] = useState(false)
  const [isNavigating, setIsNavigating] = useState(false)
  const matches = useBetterMediaQuery('(min-width: 1024px)')

  useEffect(() => {
    if (isExpanded) {
      window.document.body.classList.add("no-scroll")
    } else {
      window.document.body.classList.remove("no-scroll")
    }
  }, [isExpanded])

  const handleNavigate = () => {
    setIsNavigating(true)
    setTimeout(() => {
      setIsNavigating(false)
    }, 500)
  }

  const handleCloseNav = () => {
    setIsExpanded(false)
  }

  const mobileMenuVariants = {
    hidden: {
      opacity: 0,
      x: "100%",
      transition: {
        type: "tween",
        duration: 0.3
      }
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: "tween",
        duration: 0.3,
        staggerChildren: 0.1
      }
    }
  }

  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 }
  }

  return (
    <>
      <header className="sticky top-0 z-20 lg:pt-9 lg:px-5 lg:bg-body dark:bg-dark_body">
        <motion.div 
          className="bg-header_bg dark:bg-dark_heading p-5 shadow-sm flex justify-between items-center lg:rounded-3xl lg:px-10 relative overflow-hidden"
          whileHover={{ boxShadow: "0 10px 40px 0 rgba(108, 92, 231, 0.1)" }}
          transition={{ duration: 0.3 }}
        >
          {/* Background decoration */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-purple_main to-blue-500 opacity-5 rounded-bl-full transform translate-x-32 -translate-y-32" />
          
          {/* Logo with animation */}
          <Link
            className="text-purple_main font-bold text-base lg:text-[42px] lg:leading-normal relative z-10"
            href="/"
            onClick={handleNavigate}
          >
            <motion.span
              whileHover={{ 
                scale: 1.05,
                textShadow: "0 0 8px rgba(108, 92, 231, 0.3)"
              }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              VDA
            </motion.span>
          </Link>

          {/* Mobile menu button */}
          <motion.button
            className="lg:hidden relative z-10"
            onClick={() => setIsExpanded(true)}
            aria-expanded={isExpanded}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            animate={isExpanded ? { rotate: 180 } : { rotate: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="relative">
              <MenuIcon />
              
              {/* Ripple effect */}
              <motion.div
                className="absolute inset-0 bg-purple_main rounded-full opacity-0"
                whileTap={{ 
                  scale: [1, 1.5], 
                  opacity: [0.3, 0],
                  transition: { duration: 0.4 }
                }}
              />
            </div>
          </motion.button>

          {/* Desktop navigation */}
          {matches && (
            <motion.div 
              className='flex items-center'
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              <HeaderNav onNavigate={handleNavigate} />
              <div className="ml-4">
                <Theming />
              </div>
            </motion.div>
          )}

          {/* Loading indicator */}
          <AnimatePresence>
            {isNavigating && (
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                exit={{ scaleX: 0 }}
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-purple_main to-blue-500 origin-left"
                transition={{ duration: 0.5 }}
              />
            )}
          </AnimatePresence>
        </motion.div>
      </header>

      {/* Mobile Navigation Overlay */}
      <AnimatePresence>
        {isExpanded && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-30 lg:hidden"
              variants={backdropVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              onClick={handleCloseNav}
            />
            
            {/* Mobile Navigation */}
            <motion.div
              className="fixed top-0 right-0 bottom-0 w-full max-w-sm bg-header_bg dark:bg-dark_heading z-40 lg:hidden shadow-2xl"
              variants={mobileMenuVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
            >
              <div className="h-full flex flex-col">
                <HeaderNav onClose={handleCloseNav} onNavigate={handleNavigate} />
                
                {/* Theme selector */}
                <motion.div
                  className="px-4 pb-8"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.3 }}
                >
                  <div className="flex items-center justify-center">
                    <Theming />
                  </div>
                </motion.div>

                {/* Footer decoration */}
                <div className="mt-auto p-4">
                  <motion.div
                    className="h-1 bg-gradient-to-r from-purple_main to-blue-500 rounded-full"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ delay: 0.5, duration: 0.5 }}
                  />
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}