/* components/useSection.ts */
import { useEffect, useState } from 'react'

export function useSectionObserver(sectionIds: string[]) {
  const [active, setActive] = useState<string>('home')

  useEffect(() => {
    const opts = { rootMargin: '-40% 0px -50% 0px' } // middle of viewport
    const callback: IntersectionObserverCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) setActive(entry.target.id)
      })
    }
    const io = new IntersectionObserver(callback, opts)
    sectionIds.forEach((id) => {
      const el = document.getElementById(id)
      if (el) io.observe(el)
    })
    return () => io.disconnect()
  }, [sectionIds])

  return active
}
