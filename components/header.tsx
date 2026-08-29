"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Heart, ShoppingBag } from "lucide-react";
import { Logo } from "@/components/logo";
import { useCart } from "@/lib/cart-context";

const navItems = [
  ["/", "Home"],
  ["/menu", "Build your plate"],
  ["/track", "Track order"],
] as const;

export function Header() {
  const pathname = usePathname();
  const { cartCount } = useCart();

  return (
    <header className="sticky top-0 z-20 border-b border-white/10 bg-black/90 backdrop-blur-xl">
      <div className="mx-auto flex h-[84px] max-w-[1440px] items-center justify-between px-5 lg:px-10">
        <Logo />
        <nav className="app-desktop-nav items-center gap-9 text-[12px] font-bold tracking-[.14em] uppercase">
          {navItems.map(([href, label]) => {
            const active = href === "/menu" ? pathname.startsWith("/menu") : pathname === href;
            return (
              <Link
                key={href}
                href={href}
                className={`relative py-1 transition-colors hover:text-lime ${active ? "text-lime" : "text-white/70"}`}
                data-testid={`link-nav-${label.toLowerCase().replaceAll(" ", "-")}`}
              >
                {label}
                {active && <span className="absolute inset-x-0 -bottom-1 h-px bg-lime" />}
              </Link>
            );
          })}
        </nav>
        <div className="flex items-center gap-2.5">
          <Link
            href="/favorites"
            aria-label="View favorites"
            className="grid h-10 w-10 place-items-center rounded-full border border-white/15 bg-white/5 text-white transition hover:border-lime hover:text-lime"
            data-testid="link-favorites"
          >
            <Heart size={18} strokeWidth={2} />
          </Link>
          <Link
            href="/cart"
            className="relative flex h-10 items-center gap-2 rounded-full bg-lime px-4 text-sm font-bold text-black transition hover:bg-[#9ad45a]"
            data-testid="link-header-cart"
          >
            <ShoppingBag size={16} />
            <span className="hidden sm:inline">Bag</span>
            {cartCount > 0 && (
              <span className="grid h-5 min-w-5 place-items-center rounded-full bg-black px-1 text-[11px] text-lime">
                {cartCount}
              </span>
            )}
          </Link>
        </div>
      </div>
    </header>
  );
}
