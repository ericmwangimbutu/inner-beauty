export function ProductShowcase({ products }) {
  return (
    <section id="products" className="space-y-6">
      <div className="flex flex-col gap-3">
        <p className="text-xs uppercase tracking-[0.35em] text-blush-100">
          Beauty Bar
        </p>
        <h2 className="font-display text-3xl text-white">
          Curated cosmetics & care
        </h2>
      </div>
      <div className="grid gap-6 md:grid-cols-3">
        {products.map((product) => (
          <article
            key={product.id}
            className="rounded-3xl border border-white/10 bg-card-gradient p-6"
          >
            <p className="text-sm uppercase tracking-[0.3em] text-slate-300">
              Featured
            </p>
            <h3 className="mt-3 text-2xl font-semibold text-white">{product.name}</h3>
            <p className="mt-2 text-slate-300">{product.description}</p>
            <p className="mt-4 text-lg font-semibold text-blush-100">
              {product.price}
            </p>
            <button className="mt-5 rounded-full border border-white/15 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-white transition hover:border-blush-200 hover:text-blush-100">
              Shop concierge
            </button>
          </article>
        ))}
      </div>
    </section>
  )
}

