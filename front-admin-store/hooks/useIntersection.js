import { useEffect, useState } from 'react'

export const useOnScreen = (threshold = 0.1) => {
  const [isVisible, setIsVisible] = useState(false)
  const [ref, setRef] = useState(null)

  useEffect(
    () => {
      let observer
      if (ref) {
        observer = new IntersectionObserver(
          ([entry]) => {
            setIsVisible(entry.isIntersecting)
          },
          {
            rootMargin: '250px',
            threshold
          }
        )
        observer.observe(ref)
      }

      return () => {
        if (ref && observer) observer.unobserve(ref)
      }
    },
    [ref, threshold]
  )

  return [setRef, isVisible]
}