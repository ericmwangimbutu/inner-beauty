import { highlights } from '../data/fallbackData'

export function Experience() {
  return (
    <section className="grid gap-6 rounded-3xl border border-white/10 p-8 md:grid-cols-4">
      {highlights.map((item) => (
        <div key={item.label} className="space-y-2 text-center md:text-left">
          <p className="text-4xl font-semibold text-white">{item.value}</p>
          <p className="text-xs uppercase tracking-[0.3em] text-slate-300">
            {item.label}
          </p>
        </div>
      ))}
      <div className="md:col-span-4">
        <p className="text-sm text-slate-300">
          Remote services, mobile glam teams, and bespoke product sourcing keep
          Inner Beauty clients ceremony ready from trial to vows.
        </p>
      </div>
    </section>
  )
}

