"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronRight, Flame, Heart, MessageCircle, Plus } from "lucide-react";
import { ProductCard } from "@/components/product-card";
import { products } from "@/data/products";
import { useCart } from "@/lib/cart-context";
import { money } from "@/lib/money";
import { useProductActions } from "@/lib/product-actions";
import type { Product } from "@/lib/types";
import { buildWhatsAppHref } from "@/lib/whatsapp";

export function ProductDetailPage({ product }: { product: Product }) {
  const { add } = useProductActions();
  const { favorites, toggleFavorite } = useCart();
  const [portion, setPortion] = useState("Standard");
  const [addOn, setAddOn] = useState("No extras");
  const extraPrice =
    (portion.startsWith("Extra") ? 49 : 0) +
    (addOn === "Avocado +₹35" ? 35 : addOn === "Soft egg +₹25" ? 25 : addOn === "Crunchy seeds +₹20" ? 20 : 0);
  const favorite = favorites.includes(product.id);
  const related = products.filter((item) => item.category === product.category && item.id !== product.id).slice(0, 4);

  return (
    <div className="mx-auto max-w-[1440px] px-5 py-8 lg:px-10 lg:py-14">
      <Link
        href="/menu"
        className="mb-8 inline-flex items-center gap-2 text-sm font-bold text-teal"
        data-testid="link-back-menu"
      >
        <ChevronRight className="rotate-180" size={16} /> Back to menu
      </Link>

      <div className="grid gap-8 lg:grid-cols-[1.05fr_.95fr] lg:items-start lg:gap-14">
        <div className="relative aspect-[1.15] overflow-hidden rounded-[28px] bg-muted sm:aspect-[1.35]">
          <Image
            src={product.image}
            alt={product.name}
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 55vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/10 to-transparent" />
          {product.tag && (
            <span className="absolute left-5 top-5 rounded-full bg-sun px-3 py-1 text-[10px] font-bold uppercase tracking-[.08em] text-ink">
              {product.tag}
            </span>
          )}
          <button
            className={`absolute right-5 top-5 grid h-11 w-11 place-items-center rounded-full backdrop-blur transition ${favorite ? "bg-coral text-white" : "bg-cream/90 text-ink hover:bg-cream"}`}
            onClick={() => toggleFavorite(product.id)}
            aria-label={favorite ? `Remove ${product.name} from favorites` : `Save ${product.name}`}
            data-testid={`button-favorite-${product.id}`}
          >
            <Heart size={18} fill={favorite ? "currentColor" : "none"} />
          </button>
          <div className="absolute bottom-6 left-6 right-6 text-cream">
            <p className="mb-2 text-xs font-bold uppercase tracking-[.18em] text-sun">{product.category}</p>
            <h1 className="display-font text-4xl font-bold sm:text-5xl">{product.name}</h1>
          </div>
        </div>

        <div>
          {product.day && (
            <p className="mb-3 text-xs font-bold uppercase tracking-[.18em] text-coral">{product.day}</p>
          )}
          <p className="text-sm leading-7 text-ink/65">{product.description}</p>
          {product.portionInfo && (
            <p className="mt-3 text-xs font-medium text-ink/45">{product.portionInfo}</p>
          )}

          <div className="mt-6 grid grid-cols-3 gap-2 sm:grid-cols-4">
            {[
              ["Protein", `${product.protein}g`],
              ["Calories", `${product.calories}`],
              ["Carbs", `${product.carbs}g`],
              product.fiber != null ? ["Fiber", `${product.fiber}g`] : ["Fat", `${product.fat}g`],
            ].map(([label, val]) => (
              <div className="rounded-xl bg-muted p-3" key={label}>
                <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">{label}</p>
                <p className="mt-1 font-bold text-teal">{val}</p>
              </div>
            ))}
          </div>

          {product.ingredients && product.ingredients.length > 0 && (
            <div className="mt-7">
              <p className="mb-3 text-xs font-bold uppercase tracking-[.16em] text-ink/50">Ingredients</p>
              <div className="flex flex-wrap gap-2">
                {product.ingredients.map((item) => (
                  <span key={item} className="rounded-full border border-line bg-card px-3 py-1.5 text-xs font-medium text-ink/70">
                    {item}
                  </span>
                ))}
              </div>
            </div>
          )}

          <div className="mt-8">
            <p className="mb-3 text-xs font-bold uppercase tracking-[.16em] text-ink/50">Choose your portion</p>
            <div className="flex flex-wrap gap-2">
              {["Standard", "Extra protein +₹49"].map((value) => (
                <button
                  key={value}
                  onClick={() => setPortion(value)}
                  className={`rounded-full border px-4 py-2 text-xs font-bold transition ${portion === value ? "border-teal bg-teal text-cream" : "border-line bg-card hover:border-teal"}`}
                  data-testid={`button-portion-${value.slice(0, 3).toLowerCase()}`}
                >
                  {value}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-5">
            <p className="mb-3 text-xs font-bold uppercase tracking-[.16em] text-ink/50">Make it yours</p>
            <select
              value={addOn}
              onChange={(e) => setAddOn(e.target.value)}
              className="h-11 w-full rounded-xl border border-line bg-card px-3 text-sm font-medium text-ink"
              aria-label="Choose an add-on"
              data-testid="select-addon"
            >
              <option>No extras</option>
              <option>Avocado +₹35</option>
              <option>Soft egg +₹25</option>
              <option>Crunchy seeds +₹20</option>
            </select>
          </div>

          <div className="mt-8 grid gap-2 sm:grid-cols-[1fr_auto]">
            <button
              onClick={() => add(product, portion, addOn)}
              className="flex h-13 items-center justify-center gap-2 rounded-full bg-teal font-bold text-cream transition hover:bg-teal-dark"
              data-testid={`button-page-add-${product.id}`}
            >
              Add to bag · {money(product.price + extraPrice)}
              <Plus size={17} />
            </button>
            <a
              href={buildWhatsAppHref(
                `Hi Fit Fuel Kitchen! I’d like to order the ${product.name}. Portion: ${portion}. Extra: ${addOn}.`,
              )}
              target="_blank"
              rel="noreferrer"
              className="flex h-13 items-center justify-center gap-2 rounded-full border border-teal px-5 text-xs font-bold text-teal transition hover:bg-teal/10"
              data-testid={`link-page-whatsapp-${product.id}`}
            >
              <MessageCircle size={16} /> WhatsApp
            </a>
          </div>
          <p className="mt-4 flex items-center gap-1.5 text-xs font-medium text-ink/45">
            <Flame size={13} className="text-coral" /> {product.protein}g protein · {money(product.price)} base price
          </p>
        </div>
      </div>

      {related.length > 0 && (
        <section className="mt-16 lg:mt-24">
          <p className="mb-3 text-xs font-bold uppercase tracking-[.18em] text-teal">More in {product.category}</p>
          <h2 className="display-font text-3xl font-bold sm:text-4xl">Keep exploring</h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {related.map((item) => (
              <ProductCard
                key={item.id}
                product={item}
                onAdd={() => add(item)}
                favorite={favorites.includes(item.id)}
                onFavorite={() => toggleFavorite(item.id)}
              />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
