"use client";

import Image from "next/image";
import Link from "next/link";
import { Flame, Heart, MessageCircle, Plus } from "lucide-react";
import type { Product } from "@/lib/types";
import { money } from "@/lib/money";
import { buildWhatsAppHref } from "@/lib/whatsapp";

export function ProductCard({
  product,
  onAdd,
  favorite,
  onFavorite,
}: {
  product: Product;
  onAdd: () => void;
  favorite: boolean;
  onFavorite: () => void;
}) {
  const href = `/menu/${product.id}`;

  return (
    <article
      className="group animate-rise overflow-hidden rounded-[22px] border border-line bg-card shadow-xs transition duration-300 hover:-translate-y-1 hover:shadow-md"
      data-testid={`card-product-${product.id}`}
    >
      <div className="relative aspect-[1.12] overflow-hidden bg-muted">
        <Link href={href} className="absolute inset-0" aria-label={`View ${product.name}`}>
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            className="object-cover transition duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/35 to-transparent opacity-60" />
        </Link>
        {product.tag && (
          <span className="pointer-events-none absolute left-3 top-3 rounded-full bg-sun px-3 py-1 text-[10px] font-bold uppercase tracking-[.08em] text-ink">
            {product.tag}
          </span>
        )}
        <button
          className={`absolute right-3 top-3 z-10 grid h-9 w-9 place-items-center rounded-full backdrop-blur transition ${favorite ? "bg-coral text-white" : "bg-cream/85 text-ink hover:bg-cream"}`}
          onClick={onFavorite}
          aria-label={favorite ? `Remove ${product.name} from favorites` : `Save ${product.name}`}
          data-testid={`button-favorite-${product.id}`}
        >
          <Heart size={16} fill={favorite ? "currentColor" : "none"} />
        </button>
        <span className="pointer-events-none absolute bottom-3 left-3 z-10 flex items-center gap-1 rounded-full bg-cream/90 px-2.5 py-1 text-[11px] font-bold text-ink">
          <Flame size={13} className="text-coral" /> {product.protein}g protein
        </span>
      </div>
      <div className="p-4">
        <div className="flex items-start justify-between gap-2">
          <div>
            <Link href={href} data-testid={`button-open-${product.id}`}>
              <h3 className="font-bold leading-snug">{product.name}</h3>
              <p className="mt-1 text-xs text-muted-foreground">{product.category}</p>
            </Link>
            <a
              href={buildWhatsAppHref(`Hi Fit Fuel Kitchen! I’d like to order the ${product.name}.`)}
              target="_blank"
              rel="noreferrer"
              className="mt-2 flex items-center gap-1 text-[10px] font-bold text-teal/75 hover:text-teal"
              data-testid={`link-whatsapp-${product.id}`}
            >
              <MessageCircle size={12} /> Order on WhatsApp
            </a>
          </div>
          <span className="font-bold text-teal">{money(product.price)}</span>
        </div>
        <div className="mt-4 flex items-center justify-between">
          <span className="text-[11px] font-medium text-ink/45">
            {product.calories} kcal · {product.carbs}g carbs
          </span>
          <button
            onClick={onAdd}
            className="grid h-9 w-9 place-items-center rounded-full bg-teal text-cream transition hover:bg-teal-dark active:scale-90"
            aria-label={`Add ${product.name} to bag`}
            data-testid={`button-add-${product.id}`}
          >
            <Plus size={18} />
          </button>
        </div>
      </div>
    </article>
  );
}
