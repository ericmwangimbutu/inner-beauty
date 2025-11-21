import { remoteServices } from '../data/fallbackData'

export function RemoteServices() {
  return (
    <section
      id="remote"
      className="grid gap-6 rounded-3xl border border-white/10 bg-gradient-to-br from-ink-800 to-ink-900 p-8 md:grid-cols-2"
    >
      <div className="space-y-4">
        <p className="text-xs uppercase tracking-[0.35em] text-blush-100">
          Remote & Travel
        </p>
        <h2 className="font-display text-3xl text-white">
          Wedding bookings, destination glam, remote rituals
        </h2>
        <p className="text-slate-200">
          Inner Beauty dispatches mobile teams for ceremonies, hosts virtual
          facials, and curates products delivered to your suite — keeping every
          detail classic yet modern.
        </p>
        <ul className="space-y-4">
          {remoteServices.map((svc) => (
            <li key={svc.id} className="rounded-2xl border border-white/10 p-4">
              <p className="text-lg font-semibold text-white">{svc.title}</p>
              <p className="text-sm text-slate-300">{svc.description}</p>
            </li>
          ))}
        </ul>
      </div>
      <div className="glass space-y-6 rounded-3xl p-6">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-blush-100">
            Wedding Capsule
          </p>
          <h3 className="mt-2 text-2xl font-semibold text-white">
            Concierge Booking Window
          </h3>
          <p className="mt-2 text-slate-200">
            We hold limited wedding slots each season for brides, wedding
            parties, and editorials. Submit your date, location, and aesthetic to
            receive a couture proposal in under 48 hours.
          </p>
        </div>
        <div className="rounded-2xl border border-white/10 p-4 text-sm text-slate-200">
          <p className="font-semibold text-white">Remote Essentials</p>
          <ul className="mt-2 space-y-1 text-slate-300">
            <li>• Live video trials and maintenance education</li>
            <li>• Product drop shipping and refills</li>
            <li>• Travel-ready stylists for global destinations</li>
          </ul>
        </div>
      </div>
    </section>
  )
}

