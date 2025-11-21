export function Gallery({ gallery }) {
  return (
    <section id="gallery" className="space-y-6">
      <div className="flex flex-col gap-3">
        <p className="text-xs uppercase tracking-[0.35em] text-blush-100">
          Gallery
        </p>
        <h2 className="font-display text-3xl text-white">Textures & finishes</h2>
      </div>
      <div className="grid gap-6 md:grid-cols-3">
        {gallery.map((item) => (
          <figure
            key={item.id}
            className="group overflow-hidden rounded-3xl border border-white/5"
          >
            <img
              src={item.image}
              alt={item.caption}
              className="h-64 w-full object-cover transition duration-500 group-hover:scale-105"
            />
            <figcaption className="p-4 text-sm text-slate-200">
              {item.caption}
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  )
}

