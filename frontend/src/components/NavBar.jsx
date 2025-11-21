const links = [
  { label: 'Services', href: '#services' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Products', href: '#products' },
  { label: 'Remote', href: '#remote' },
  { label: 'Book', href: '#bookings' },
]

export function NavBar() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 bg-ink-900/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <a href="#top" className="text-lg font-semibold tracking-[0.35em] uppercase">
          Inner <span className="text-blush-400">Beauty</span>
        </a>
        <nav className="hidden gap-8 text-sm font-medium text-slate-200 md:flex">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="transition hover:text-blush-200"
            >
              {link.label}
            </a>
          ))}
        </nav>
        <a
          href="#bookings"
          className="rounded-full border border-blush-200/70 px-4 py-2 text-sm font-semibold text-blush-100 transition hover:bg-blush-500 hover:text-white"
        >
          Request Booking
        </a>
      </div>
    </header>
  )
}

