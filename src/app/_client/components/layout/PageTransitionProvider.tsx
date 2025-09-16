"use client"
import { usePathname } from '@/i18n/routing'
import { useEffect, useState } from 'react'

interface PageTransitionProviderProps {
  children: React.ReactNode
}

export const PageTransitionProvider = ({ children }: PageTransitionProviderProps) => {
  const pathname = usePathname()
  const [hasMounted, setHasMounted] = useState(false)

  // Handle hydration
  useEffect(() => {
    setHasMounted(true)
  }, [])

  // Don't render on server-side
  if (!hasMounted) {
    return <div className="min-h-screen">{children}</div>
  }

  // Return children without any animations
  return (
    <>
      {/* No loading bar */}
      
      {/* Page Content without Transitions */}
      <div key={pathname}>
        {children}
      </div>
    </>
  )
}