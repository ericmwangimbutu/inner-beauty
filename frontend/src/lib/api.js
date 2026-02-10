const API_BASE =
  import.meta.env.VITE_API_BASE_URL ||
  'http://localhost:8000/api'

const headers = {
  'Content-Type': 'application/json',
}

async function request(path, options = {}) {
  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), 8000)

  try {
    const response = await fetch(`${API_BASE}${path}`, {
      headers,
      signal: controller.signal,
      ...options,
    })

    if (!response.ok) {
      throw new Error(`Request failed: ${response.status}`)
    }
    return await response.json()
  } finally {
    clearTimeout(timeout)
  }
}

export async function getServices(fallback) {
  try {
    return await request('/services')
  } catch {
    return fallback
  }
}

export async function getProducts(fallback) {
  try {
    return await request('/products')
  } catch {
    return fallback
  }
}

export async function getTestimonials(fallback) {
  try {
    return await request('/testimonials')
  } catch {
    return fallback
  }
}

export async function submitBooking(data) {
  return request('/bookings', {
    method: 'POST',
    body: JSON.stringify(data),
  })
}

