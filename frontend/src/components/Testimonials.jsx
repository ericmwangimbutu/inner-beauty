export function Testimonials({ testimonials }) {
  return (
    <section className="space-y-6">
      <div>
        <p className="text-xs uppercase tracking-[0.35em] text-blush-100">
          Clients
        </p>
        <h2 className="font-display text-3xl text-white">Kind words</h2>
      </div>
      <div className="grid gap-6 md:grid-cols-3">
        {testimonials.map((item) => (
          <article
            key={item.name}
            className="rounded-3xl border border-white/10 bg-card-gradient p-6"
          >
            <p className="text-lg text-white">“{item.quote}”</p>
            <p className="mt-6 text-sm font-semibold text-blush-200">{item.name}</p>
            <p className="text-xs uppercase tracking-[0.3em] text-slate-300">
              {item.title}
            </p>
          </article>
        ))}
      </div>
    </section>
  )
}

