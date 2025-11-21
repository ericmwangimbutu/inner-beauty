import { ctaTiles } from '../data/fallbackData'

const accentMap = {
  blush: 'from-blush-500/20 to-blush-400/10',
  golden: 'from-golden-400/20 to-golden-300/10',
  ink: 'from-ink-700/40 to-ink-900/10',
}

export function CTATiles() {
  return (
    <section className="grid gap-6 md:grid-cols-3">
      {ctaTiles.map((tile) => (
        <article
          key={tile.title}
          className={`rounded-3xl border border-white/10 bg-gradient-to-br ${accentMap[tile.accent]} p-6`}
        >
          <p className="text-xs uppercase tracking-[0.35em] text-white/80">
            {tile.title}
          </p>
          <p className="mt-3 text-lg text-white">{tile.description}</p>
          <a
            href="#bookings"
            className="mt-4 inline-flex text-sm font-semibold uppercase tracking-[0.3em] text-white/80 transition hover:text-white"
          >
            Plan &rarr;
          </a>
        </article>
      ))}
    </section>
  )
}

