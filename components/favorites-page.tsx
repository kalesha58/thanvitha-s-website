"use client";

import { EmptyState } from "@/components/empty-state";
import { ProductCard } from "@/components/product-card";
import { products } from "@/data/products";
import { useCart } from "@/lib/cart-context";
import { useProductActions } from "@/lib/product-actions";

export function FavoritesPage() {
  const { add } = useProductActions();
  const { favorites, toggleFavorite } = useCart();
  const saved = products.filter((p) => favorites.includes(p.id));

  return (
    <div className="mx-auto min-h-[70vh] max-w-[1440px] px-5 py-12 lg:px-10 lg:py-20">
      <p className="mb-3 text-xs font-bold uppercase tracking-[.18em] text-coral">Your shortlist</p>
      <h1 className="display-font text-5xl font-bold sm:text-7xl">
        Saved
        <br />
        <span className="text-teal">for later.</span>
      </h1>
      <p className="mt-5 max-w-[430px] text-sm leading-6 text-muted-foreground">
        The meals you come back to when the decision needs to be easy.
      </p>
      {saved.length ? (
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {saved.map((p) => (
            <ProductCard
              key={p.id}
              product={p}
              onAdd={() => add(p)}
              favorite
              onFavorite={() => toggleFavorite(p.id)}
            />
          ))}
        </div>
      ) : (
        <EmptyState
          title="Your shortlist is quiet."
          copy="Tap the heart on anything that looks like your kind of fuel."
          action="Browse the menu"
          href="/menu"
        />
      )}
    </div>
  );
}
