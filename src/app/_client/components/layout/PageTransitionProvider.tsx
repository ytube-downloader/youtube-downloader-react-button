"use client"
import { usePathname } from '@/i18n/routing'
import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { useRouter } from '@/i18n/routing'

interface PageTransitionProviderProps {
  children: React.ReactNode
}

export const PageTransitionProvider = ({ children }: PageTransitionProviderProps) => {
  const pathname = usePathname()
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [hasMounted, setHasMounted] = useState(false)

  // Handle hydration
  useEffect(() => {
    setHasMounted(true)
  }, [])

  // Listen for route changes
  useEffect(() => {
    const handleStart = () => setIsLoading(true)
    const handleComplete = () => setIsLoading(false)

    // Since we're using Next.js App Router, we'll handle this differently
    // We'll use a timeout to simulate the loading state
    if (isLoading) {
      const timer = setTimeout(() => {
        setIsLoading(false)
      }, 300)
      return () => clearTimeout(timer)
    }
  }, [pathname, isLoading])

  // Don't render transitions on server-side
  if (!hasMounted) {
    return <div className="min-h-screen">{children}</div>
  }

  const pageVariants = {
    initial: {
      opacity: 0,
      y: 20,
      scale: 0.98
    },
    in: {
      opacity: 1,
      y: 0,
      scale: 1
    },
    out: {
      opacity: 0,
      y: -20,
      scale: 0.98
    }
  }

  const pageTransition = {
    type: "tween",
    ease: "anticipate",
    duration: 0.4
  }

  const loadingVariants = {
    initial: { width: "0%" },
    animate: { width: "100%" },
    exit: { width: "100%" }
  }

  return (
    <>
      {/* Loading Bar */}
      <AnimatePresence>
        {isLoading && (
          <motion.div
            className="fixed top-0 left-0 right-0 z-50 h-1 bg-gradient-to-r from-purple_main via-blue-500 to-purple_main"
            initial="initial"
            animate="animate"
            exit="exit"
            variants={loadingVariants}
            transition={{ duration: 0.3 }}
          />
        )}
      </AnimatePresence>

      {/* Page Content with Transitions */}
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={pathname}
          initial="initial"
          animate="in"
          exit="out"
          variants={pageVariants}
          transition={pageTransition}
          className="min-h-screen"
        >
          {children}
        </motion.div>
      </AnimatePresence>

      {/* Loading Overlay */}
      <AnimatePresence>
        {isLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-body dark:bg-dark_body bg-opacity-50 backdrop-blur-sm flex items-center justify-center"
          >
            <div className="bg-white dark:bg-dark_heading rounded-2xl p-8 shadow-2xl">
              <div className="flex items-center gap-4">
                <div className="w-8 h-8 border-4 border-purple_main border-t-transparent rounded-full animate-spin"></div>
                <span className="text-heading_main dark:text-dark_heading_main font-medium">
                  Loading...
                </span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}