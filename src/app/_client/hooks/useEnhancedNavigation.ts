"use client"
import { useRouter, usePathname } from '@/i18n/routing'
import { useState, useCallback, useEffect } from 'react'

interface NavigationState {
  isNavigating: boolean
  currentPath: string
  targetPath: string | null
}

export const useEnhancedNavigation = () => {
  const router = useRouter()
  const pathname = usePathname()
  const [navigationState, setNavigationState] = useState<NavigationState>({
    isNavigating: false,
    currentPath: pathname,
    targetPath: null
  })

  // Reset navigation state when pathname changes
  useEffect(() => {
    if (navigationState.isNavigating && pathname === navigationState.targetPath) {
      setNavigationState({
        isNavigating: false,
        currentPath: pathname,
        targetPath: null
      })
    }
  }, [pathname, navigationState])

  const navigateWithTransition = useCallback(async (
    href: string, 
    options?: { 
      showGlobalLoader?: boolean
      delay?: number 
    }
  ) => {
    const { showGlobalLoader = false, delay = 100 } = options || {}

    // Don't navigate if already on the target page
    if (href === pathname) return

    // Set loading state
    setNavigationState({
      isNavigating: true,
      currentPath: pathname,
      targetPath: href
    })

    // Show global loader if requested
    if (showGlobalLoader) {
      const globalLoader = document.getElementById('global-loading')
      if (globalLoader) {
        globalLoader.classList.remove('hidden')
      }
    }

    // Add a small delay for visual feedback
    if (delay > 0) {
      await new Promise(resolve => setTimeout(resolve, delay))
    }

    try {
      // Trigger the navigation
      router.push(href)
    } catch (error) {
      console.error('Navigation error:', error)
      // Reset state on error
      setNavigationState({
        isNavigating: false,
        currentPath: pathname,
        targetPath: null
      })
      
      // Hide global loader
      if (showGlobalLoader) {
        const globalLoader = document.getElementById('global-loading')
        if (globalLoader) {
          globalLoader.classList.add('hidden')
        }
      }
    }
  }, [router, pathname])

  const prefetchRoute = useCallback((href: string) => {
    router.prefetch(href)
  }, [router])

  return {
    navigateWithTransition,
    prefetchRoute,
    isNavigating: navigationState.isNavigating,
    currentPath: navigationState.currentPath,
    targetPath: navigationState.targetPath
  }
}

// Navigation utilities for different types of transitions
export const navigationEffects = {
  // Quick transition for same-section navigation
  quick: { showGlobalLoader: false, delay: 50 },
  
  // Standard transition for most navigation
  standard: { showGlobalLoader: false, delay: 100 },
  
  // Heavy transition for major section changes
  heavy: { showGlobalLoader: true, delay: 200 },
  
  // Instant for emergency navigation
  instant: { showGlobalLoader: false, delay: 0 }
}

// Custom Link component with enhanced navigation
import { Link as NextIntlLink } from '@/i18n/routing'
import { ReactNode, forwardRef } from 'react'

interface EnhancedLinkProps {
  href: string
  children: ReactNode
  className?: string
  effect?: keyof typeof navigationEffects
  onNavigationStart?: () => void
  onNavigationComplete?: () => void
  [key: string]: any
}

export const EnhancedLink = forwardRef<HTMLAnchorElement, EnhancedLinkProps>(
  ({ 
    href, 
    children, 
    className, 
    effect = 'standard',
    onNavigationStart,
    onNavigationComplete,
    ...props 
  }, ref) => {
    const { navigateWithTransition, prefetchRoute } = useEnhancedNavigation()

    const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
      e.preventDefault()
      
      if (onNavigationStart) {
        onNavigationStart()
      }
      
      navigateWithTransition(href, navigationEffects[effect])
        .then(() => {
          if (onNavigationComplete) {
            onNavigationComplete()
          }
        })
    }

    const handleMouseEnter = () => {
      // Prefetch the route on hover for better performance
      prefetchRoute(href)
    }

    return (
      <NextIntlLink
        ref={ref}
        href={href}
        className={className}
        onClick={handleClick}
        onMouseEnter={handleMouseEnter}
        {...props}
      >
        {children}
      </NextIntlLink>
    )
  }
)

EnhancedLink.displayName = 'EnhancedLink'