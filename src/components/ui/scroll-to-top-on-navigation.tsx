"use client"

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

export default function ScrollToTopOnNavigation() {
  const pathname = usePathname()

  useEffect(() => {
    // Po změně cesty scrolluj na začátek stránky
    window.scrollTo(0, 0)
  }, [pathname])

  return null // Tato komponenta nevrací žádné UI
}
