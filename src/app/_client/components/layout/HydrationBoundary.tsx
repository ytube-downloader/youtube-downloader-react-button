"use client"
import { useEffect, useState } from 'react'

interface HydrationBoundaryProps {
  children: React.ReactNode
  fallback?: React.ReactNode
}

export const HydrationBoundary = ({ 
  children, 
  fallback = null 
}: HydrationBoundaryProps) => {
  const [hasMounted, setHasMounted] = useState(false)

  useEffect(() => {
    setHasMounted(true)
  }, [])

  // Prevent hydration mismatch by not rendering on server
  if (!hasMounted) {
    return <>{fallback}</>
  }

  return <>{children}</>
}

// Hook to check if component is mounted (client-side)
export const useHasMounted = () => {
  const [hasMounted, setHasMounted] = useState(false)

  useEffect(() => {
    setHasMounted(true)
  }, [])

  return hasMounted
}