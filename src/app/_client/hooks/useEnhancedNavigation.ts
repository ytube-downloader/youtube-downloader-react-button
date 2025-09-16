"use client"
import { useRouter, usePathname } from '@/i18n/routing'

export const useSimpleNavigation = () => {
  const router = useRouter()
  const pathname = usePathname()

  const navigateTo = (href: string) => {
    if (href !== pathname) {
      router.push(href)
    }
  }

  const prefetchRoute = (href: string) => {
    router.prefetch(href)
  }

  return {
    navigateTo,
    prefetchRoute,
    currentPath: pathname
  }
}