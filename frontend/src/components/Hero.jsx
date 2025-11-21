export function Hero() {
  return (
    <section
      id="top"
      className="relative overflow-hidden rounded-3xl bg-hero-gradient px-6 pt-32 pb-16 text-white shadow-glow md:px-12"
    >
      <div className="mx-auto flex max-w-5xl flex-col gap-10 md:flex-row md:items-center">
        <div className="space-y-6 md:flex-1">
          <p className="inline-flex items-center gap-2 rounded-full border border-white/20 px-4 py-1 text-xs uppercase tracking-[0.2em]">
            Wedding-ready · Remote stylists · Beauty atelier
          </p>
          <h1 className="font-display text-4xl leading-tight text-white md:text-5xl">
            Inner Beauty Salon
            <span className="text-blush-300"> Portfolio & Atelier</span>
          </h1>
          <p className="max-w-xl text-lg text-slate-200">
            Manicure, pedicure, facials, protective styles, and curated beauty
            products crafted for modern muses and timeless brides — available in
            studio or wherever you are.
          </p>
          <div className="flex flex-wrap gap-3">
            <a
              href="#bookings"
              className="rounded-full bg-blush-500 px-6 py-3 text-sm font-semibold uppercase tracking-widest transition hover:bg-blush-400"
            >
              Book an Immersion
            </a>
            <a
              href="#services"
              className="rounded-full border border-white/40 px-6 py-3 text-sm font-semibold uppercase tracking-widest text-white transition hover:bg-white/10"
            >
              Explore Services
            </a>
          </div>
        </div>
        <div className="glass relative flex-1 rounded-3xl p-6">
          <div className="space-y-4">
            <p className="text-sm uppercase tracking-[0.3em] text-slate-300">
              Signature pairings
            </p>
            <div className="grid gap-3 text-sm">
              <ServiceHighlight
                title="Chrome Manicure + Gel Overlay"
                subtitle="Nail couture · 45 min"
              />
              <ServiceHighlight
                title="Full Facial + Sculpting Massage"
                subtitle="Skin respiration · 75 min"
              />
              <ServiceHighlight
                title="Knotless Ghanaian Braids"
                subtitle="Protective artistry · 3 hrs"
              />
              <ServiceHighlight
                title="Sisterlocks Restoration"
                subtitle="Retighten & retire service"
              />
            </div>
          </div>
          <div className="mt-6 rounded-2xl border border-white/10 p-4 text-sm text-slate-200">
            <p className="font-semibold text-white">Ready for destination vows.</p>
            <p>Remote trials, beauty concierge, and product sourcing worldwide.</p>
          </div>
        </div>
      </div>
    </section>
  )
}

function ServiceHighlight({ title, subtitle }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
      <p className="text-sm font-semibold text-white">{title}</p>
      <p className="text-xs text-slate-300">{subtitle}</p>
    </div>
  )
}

