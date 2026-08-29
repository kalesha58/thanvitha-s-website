"use client";

import { useState, type ReactNode } from "react";
import { Check, MessageCircle } from "lucide-react";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { MobileNav } from "@/components/mobile-nav";
import { CartProvider, useCart } from "@/lib/cart-context";
import { ProductActionsProvider } from "@/lib/product-actions";
import { defaultWhatsAppHref } from "@/lib/whatsapp";
import type { Product } from "@/lib/types";

function Shell({ children }: { children: ReactNode }) {
  const { add: addToCart } = useCart();
  const [toast, setToast] = useState("");

  const add = (product: Product, portion = "Standard", addOn = "No extras") => {
    addToCart(product, portion, addOn);
    setToast(`${product.name} added to your bag`);
    setTimeout(() => setToast(""), 2300);
  };

  return (
    <ProductActionsProvider value={{ add }}>
      <div className="grain min-h-[100dvh] bg-cream">
        <Header />
        <main>{children}</main>
        <Footer />
        <MobileNav />
        {toast && (
          <div
            className="fixed bottom-24 left-1/2 z-40 flex -translate-x-1/2 items-center gap-2 rounded-full bg-ink px-4 py-3 text-xs font-bold text-cream shadow-lg md:bottom-8"
            role="status"
            data-testid="status-cart-toast"
          >
            <span className="grid h-5 w-5 place-items-center rounded-full bg-sun text-ink">
              <Check size={13} />
            </span>
            {toast}
          </div>
        )}
        <a
          href={defaultWhatsAppHref}
          target="_blank"
          rel="noreferrer"
          className="z-25 fixed bottom-[86px] right-4 flex h-12 items-center gap-2 rounded-full bg-[#1e9b60] px-4 text-xs font-bold text-white shadow-lg transition hover:-translate-y-0.5 hover:bg-[#17844f] md:bottom-6 md:right-7"
          data-testid="link-floating-whatsapp"
        >
          <MessageCircle size={18} />
          <span className="hidden sm:inline">Chat with the kitchen</span>
        </a>
      </div>
    </ProductActionsProvider>
  );
}

export function SiteShell({ children }: { children: ReactNode }) {
  return (
    <CartProvider>
      <Shell>{children}</Shell>
    </CartProvider>
  );
}
