"use client";

import { useMemo, useState } from "react";
import { Search, Leaf, Drumstick } from "lucide-react";
import { EmptyState } from "@/components/empty-state";
import { ProductCard } from "@/components/product-card";
import { OffersBanner } from "@/components/offers-banner";
import { WeeklyMenuSection } from "@/components/weekly-menu-section";
import { categories, products } from "@/data/products";
import { useCart } from "@/lib/cart-context";
import { useProductActions } from "@/lib/product-actions";

export function MenuPage() {
  const { add } = useProductActions();
  const { favorites, toggleFavorite } = useCart();
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All fuel");
  const [vegFilter, setVegFilter] = useState<"all" | "veg" | "nonveg">("all");

  const visible = useMemo(
    () =>
      products.filter(
        (p) =>
          (category === "All fuel" || p.category === category) &&
          (vegFilter === "all" ||
            (vegFilter === "veg" && p.isVeg) ||
            (vegFilter === "nonveg" && !p.isVeg)) &&
          `${p.name} ${p.description}`.toLowerCase().includes(query.toLowerCase()),
      ),
    [category, query, vegFilter],
  );

  // Don't show weekly bowls in the main grid (they have their own section)
  const gridItems = useMemo(
    () => visible.filter((p) => p.category !== "Weekly Bowls"),
    [visible],
  );

  const showWeeklySection =
    category === "All fuel" || category === "Weekly Bowls";

  return (
    <>
      {/* Offers Banner */}
      <OffersBanner />

      <div className="mx-auto max-w-[1440px] px-5 py-12 lg:px-10 lg:py-16">
        <div className="flex flex-col justify-between gap-7 md:flex-row md:items-end">
          <div>
            <p className="mb-3 text-xs font-bold uppercase tracking-[.18em] text-teal">
              The menu
            </p>
            <h1 className="display-font text-5xl font-bold leading-[.9] sm:text-7xl">
              Find your
              <br />
              <span className="text-coral">next meal.</span>
            </h1>
          </div>
          <div className="max-w-[300px] text-sm leading-6 text-muted-foreground">
            Balanced, bold, and built to keep up. Every meal includes the macros you actually want to know.
          </div>
        </div>

        {/* Filters */}
        <div className="mt-12 flex flex-col gap-4 border-y border-line py-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex gap-2 overflow-x-auto pb-1">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setCategory(c)}
                className={`whitespace-nowrap rounded-full border px-4 py-2 text-xs font-bold transition ${category === c ? "border-teal bg-teal text-cream" : "border-line bg-card text-ink/60 hover:border-teal hover:text-teal"}`}
                data-testid={`button-filter-${c.toLowerCase().replaceAll(" ", "-")}`}
              >
                {c}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            {/* Veg / Non-veg toggle */}
            <div className="flex overflow-hidden rounded-full border border-line bg-card">
              {([["all", "All"], ["veg", "Veg 🌿"], ["nonveg", "Non-Veg 🍗"]] as const).map(
                ([val, label]) => (
                  <button
                    key={val}
                    onClick={() => setVegFilter(val)}
                    className={`px-3 py-2 text-xs font-bold transition ${vegFilter === val ? "bg-teal text-cream" : "text-ink/60 hover:text-teal"}`}
                  >
                    {label}
                  </button>
                ),
              )}
            </div>

            {/* Search */}
            <label className="relative block shrink-0 lg:w-52">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-ink/40" size={17} />
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search the menu"
                className="h-10 w-full rounded-full border border-line bg-card pr-4 pl-10 text-sm outline-none transition focus:border-teal"
                aria-label="Search menu"
                data-testid="input-menu-search"
              />
            </label>
          </div>
        </div>

        <div className="mt-8 mb-5 flex items-center justify-between text-sm">
          <span className="text-muted-foreground">
            {gridItems.length} meals to choose from
          </span>
          <button
            onClick={() => {
              setQuery("");
              setCategory("All fuel");
              setVegFilter("all");
            }}
            className="font-bold text-teal"
            data-testid="button-reset-menu"
          >
            Reset
          </button>
        </div>

        {/* Protein Salads + Add-ons Grid */}
        {gridItems.length ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {gridItems.map((p, i) => (
              <div className={`delay-${(i % 5) + 1}`} key={p.id}>
                <ProductCard
                  product={p}
                  onAdd={() => add(p)}
                  favorite={favorites.includes(p.id)}
                  onFavorite={() => toggleFavorite(p.id)}
                />
              </div>
            ))}
          </div>
        ) : (
          category !== "Weekly Bowls" && (
            <EmptyState
              title="No meals match that search."
              copy="Try another word or clear the filters."
              action="Clear filters"
              onAction={() => {
                setQuery("");
                setCategory("All fuel");
                setVegFilter("all");
              }}
            />
          )
        )}
      </div>

      {/* Weekly Menu Section */}
      {showWeeklySection && <WeeklyMenuSection />}
    </>
  );
}
