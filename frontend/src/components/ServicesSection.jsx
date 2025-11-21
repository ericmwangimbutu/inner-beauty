import { useMemo, useState } from 'react'

export function ServicesSection({ services }) {
  const [category, setCategory] = useState('all')

  const filtered = useMemo(() => {
    if (category === 'all') return services
    return services.filter((service) => service.category === category)
  }, [category, services])

  return (
    <section id="services" className="space-y-8">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.35em] text-blush-200">
            Services
          </p>
          <h2 className="font-display text-3xl text-white md:text-4xl">
            Nails · Skin · Hair Atelier
          </h2>
        </div>
        <div className="flex gap-2 rounded-full border border-white/10 p-1 text-xs font-semibold uppercase tracking-widest text-white">
          {['all', 'nails', 'skin', 'hair'].map((option) => (
            <button
              key={option}
              type="button"
              className={`rounded-full px-4 py-2 transition ${
                category === option
                  ? 'bg-white/90 text-ink-900'
                  : 'text-white/70 hover:text-white'
              }`}
              onClick={() => setCategory(option)}
            >
              {option}
            </button>
          ))}
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {filtered.map((service) => (
          <article
            key={service.id}
            className="glass rounded-3xl border border-white/10 p-6 transition hover:-translate-y-1 hover:border-blush-400/40"
          >
            <div className="flex items-center justify-between">
              <p className="text-sm uppercase tracking-[0.35em] text-blush-200">
                {service.category}
              </p>
              <span className="text-sm text-slate-300">{service.duration}</span>
            </div>
            <h3 className="mt-4 text-2xl font-semibold text-white">{service.name}</h3>
            <p className="mt-2 text-slate-300">{service.description}</p>
            <div className="mt-4 flex flex-wrap gap-2 text-xs uppercase tracking-widest text-slate-200">
              {service.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-white/10 px-3 py-1 text-white/80"
                >
                  {tag}
                </span>
              ))}
            </div>
            <div className="mt-5 flex items-center justify-between">
              <p className="text-lg font-semibold text-blush-200">{service.price}</p>
              <a
                href="#bookings"
                className="text-sm font-semibold uppercase tracking-[0.25em] text-white transition hover:text-blush-200"
              >
                Book
              </a>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

