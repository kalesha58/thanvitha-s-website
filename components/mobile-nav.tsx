"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Heart, Home as HomeIcon, ShoppingBag, Utensils } from "lucide-react";
import { useCart } from "@/lib/cart-context";

const items = [
  ["/", "Home", HomeIcon],
  ["/menu", "Menu", Utensils],
  ["/favorites", "Saved", Heart],
  ["/cart", "Bag", ShoppingBag],
] as const;

export function MobileNav() {
  const pathname = usePathname();
  const { cartCount } = useCart();

  return (
    <nav className="app-mobile-nav fixed inset-x-0 bottom-0 z-30 items-center justify-around border-t border-line bg-cream/95 px-3 pb-[calc(env(safe-area-inset-bottom)+8px)] pt-2 backdrop-blur-xl">
      {items.map(([href, label, ActiveIcon]) => {
        const active = href === "/menu" ? pathname.startsWith("/menu") : pathname === href;
        return (
          <Link
            href={href}
            key={href}
            className={`relative flex min-w-[56px] flex-col items-center gap-1 py-1 text-[10px] font-bold ${active ? "text-teal" : "text-ink/45"}`}
            data-testid={`mobile-nav-${label}`}
          >
            <ActiveIcon size={20} strokeWidth={active ? 2.5 : 1.8} />
            {label === "Bag" && cartCount > 0 && (
              <span className="absolute right-1 top-[-2px] grid h-4 min-w-4 place-items-center rounded-full bg-coral px-1 text-[9px] text-white">
                {cartCount}
              </span>
            )}
            <span>{label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
