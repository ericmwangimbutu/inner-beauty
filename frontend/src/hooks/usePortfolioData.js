import { useEffect, useState } from 'react'
import {
  services as fallbackServices,
  products as fallbackProducts,
  testimonials as fallbackTestimonials,
} from '../data/fallbackData'
import { getProducts, getServices, getTestimonials } from '../lib/api'

export function usePortfolioData() {
  const [services, setServices] = useState(fallbackServices)
  const [products, setProducts] = useState(fallbackProducts)
  const [testimonials, setTestimonials] = useState(fallbackTestimonials)
  const [status, setStatus] = useState('idle')

  useEffect(() => {
    let mounted = true
    ;(async () => {
      try {
        setStatus('loading')
        const [remoteServices, remoteProducts, remoteTestimonials] =
          await Promise.all([
            getServices(fallbackServices),
            getProducts(fallbackProducts),
            getTestimonials(fallbackTestimonials),
          ])

        if (mounted) {
          setServices(remoteServices)
          setProducts(remoteProducts)
          setTestimonials(remoteTestimonials)
          setStatus('ready')
        }
      } catch {
        if (mounted) {
          setStatus('offline')
        }
      }
    })()

    return () => {
      mounted = false
    }
  }, [])

  return { services, products, testimonials, status }
}

