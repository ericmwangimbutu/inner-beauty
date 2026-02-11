import { motion } from 'framer-motion'
// Image in public folder
const heroImage = '/hero_image.png'

export function Hero() {
  return (
    <section
      id="top"
      className="relative overflow-hidden bg-cream px-6 pb-16 pt-32 md:px-12"
    >
      <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-[1.5fr_1fr] md:items-center">
        <div className="space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <p className="inline-flex items-center gap-2 rounded-full border border-charcoal/20 px-4 py-1 text-xs uppercase tracking-[0.2em] text-charcoal">
              Wedding-ready · Remote stylists · Beauty atelier
            </p>
          </motion.div>

          <motion.h1
            className="font-serif text-5xl leading-tight text-charcoal md:text-7xl tracking-tighter"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          >
            Inner Beauty Salon
            <span className="block text-blush-500">Portfolio & Atelier</span>
          </motion.h1>

          <motion.p
            className="max-w-xl text-lg text-charcoal/80 font-sans"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          >
            Manicure, pedicure, facials, protective styles, and curated beauty
            products crafted for modern muses and timeless brides — available in
            studio or wherever you are.
          </motion.p>

          <motion.div
            className="flex flex-wrap gap-4"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
          >
            <a
              href="#bookings"
              className="rounded-full bg-blush-500 px-8 py-4 text-sm font-semibold uppercase tracking-widest text-white transition hover:bg-blush-600"
            >
              Book an Immersion
            </a>
            <a
              href="#services"
              className="rounded-full border border-charcoal/20 px-8 py-4 text-sm font-semibold uppercase tracking-widest text-charcoal transition hover:bg-charcoal/5"
            >
              Explore Services
            </a>
          </motion.div>
        </div>

        <motion.div
          className="relative h-full min-h-[500px] w-full overflow-hidden rounded-3xl"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
        >
          <img
            src={heroImage}
            alt="Inner Beauty Salon Aesthetic"
            className="h-full w-full object-cover"
          />
        </motion.div>
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

