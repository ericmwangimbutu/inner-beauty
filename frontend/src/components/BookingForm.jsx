import { useState } from 'react'
import { submitBooking } from '../lib/api'

const initialState = {
  name: '',
  email: '',
  date: '',
  service: '',
  location: '',
  notes: '',
}

export function BookingForm() {
  const [form, setForm] = useState(initialState)
  const [status, setStatus] = useState('idle')
  const [feedback, setFeedback] = useState('')

  const handleChange = (event) => {
    const { name, value } = event.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setStatus('loading')
    setFeedback('')
    try {
      await submitBooking(form)
      setStatus('success')
      setFeedback('We received your request — concierge will reply shortly.')
      setForm(initialState)
    } catch {
      setStatus('error')
      setFeedback('We are offline — please email concierge@innerbeauty.studio.')
    }
  }

  return (
    <section
      id="bookings"
      className="grid gap-8 rounded-3xl border border-white/10 p-8 md:grid-cols-2"
    >
      <div className="space-y-4">
        <p className="text-xs uppercase tracking-[0.35em] text-blush-100">
          Bookings
        </p>
        <h2 className="font-display text-3xl text-white">
          Reserve your Inner Beauty experience
        </h2>
        <p className="text-slate-300">
          Share your ceremony date, remote needs, or desired service menu.
          We craft itineraries for manicures, pedicures, facials, braided
          artistry, sisterlocks restoration, and dreadlocks retire ceremonies.
        </p>
        <div className="rounded-2xl border border-white/10 p-4 text-sm text-slate-200">
          <p className="font-semibold text-white">Concierge Hours</p>
          <p>Tuesday – Sunday · 8am – 9pm GMT</p>
          <p>Remote coverage: global</p>
        </div>
      </div>

      <form
        onSubmit={handleSubmit}
        className="space-y-4 rounded-3xl border border-white/5 bg-white/5 p-6"
      >
        <div className="grid gap-4 md:grid-cols-2">
          <Input
            label="Full Name"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
          />
          <Input
            label="Email"
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
          />
          <Input
            label="Event Date"
            type="date"
            name="date"
            value={form.date}
            onChange={handleChange}
          />
          <Input
            label="Location / Remote"
            name="location"
            value={form.location}
            onChange={handleChange}
            placeholder="Studio, on-site, or remote"
          />
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <Input
            label="Primary Service"
            name="service"
            value={form.service}
            onChange={handleChange}
            placeholder="Manicure, braids, wedding suite..."
          />
          <Input
            label="Add-ons"
            name="notes"
            value={form.notes}
            onChange={handleChange}
            placeholder="Products, travel, sisterlocks retire"
          />
        </div>
        <button
          type="submit"
          className="w-full rounded-full bg-blush-500 px-4 py-3 text-sm font-semibold uppercase tracking-[0.3em] text-white transition hover:bg-blush-400 disabled:cursor-not-allowed disabled:opacity-60"
          disabled={status === 'loading'}
        >
          {status === 'loading' ? 'Sending...' : 'Send Booking Request'}
        </button>
        {feedback && (
          <p
            className={`text-sm ${
              status === 'success' ? 'text-blush-100' : 'text-red-300'
            }`}
          >
            {feedback}
          </p>
        )}
      </form>
    </section>
  )
}

function Input({ label, ...rest }) {
  return (
    <label className="text-sm text-slate-200">
      <span className="mb-2 block text-xs uppercase tracking-[0.3em]">
        {label}
      </span>
      <input
        className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-white/40 focus:border-blush-200 focus:outline-none"
        {...rest}
      />
    </label>
  )
}

