"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Minus, Plus, Trash2 } from "lucide-react";
import { EmptyState } from "@/components/empty-state";
import { DELIVERY_FEE, FREE_DELIVERY_MIN } from "@/data/site";
import { useCart } from "@/lib/cart-context";
import { money } from "@/lib/money";

export function CartPage() {
  const { cart, remove, update } = useCart();
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const delivery = subtotal >= FREE_DELIVERY_MIN ? 0 : cart.length ? DELIVERY_FEE : 0;

  return (
    <div className="mx-auto min-h-[70vh] max-w-[1100px] px-5 py-12 lg:py-20">
      <p className="mb-3 text-xs font-bold uppercase tracking-[.18em] text-teal">Your bag</p>
      <h1 className="display-font text-5xl font-bold sm:text-7xl">
        Ready when
        <br />
        <span className="text-coral">you are.</span>
      </h1>
      {cart.length ? (
        <div className="mt-12 grid gap-8 lg:grid-cols-[1.2fr_.8fr]">
          <div className="space-y-3">
            {cart.map((item) => (
              <div
                key={`${item.id}-${item.portion}-${item.addOn}`}
                className="flex gap-4 rounded-[22px] border border-line bg-card p-3 sm:p-4"
                data-testid={`row-cart-${item.id}`}
              >
                <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-[16px] sm:h-28 sm:w-28">
                  <Image src={item.image} alt={item.name} fill sizes="112px" className="object-cover" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex justify-between gap-3">
                    <div>
                      <h2 className="font-bold">{item.name}</h2>
                      <p className="mt-1 text-xs text-muted-foreground">
                        {item.portion} · {item.addOn}
                      </p>
                    </div>
                    <button
                      className="text-ink/35 transition hover:text-coral"
                      onClick={() => remove(item.id)}
                      aria-label={`Remove ${item.name}`}
                      data-testid={`button-remove-${item.id}`}
                    >
                      <Trash2 size={17} />
                    </button>
                  </div>
                  <div className="mt-5 flex items-center justify-between">
                    <div className="flex items-center gap-3 rounded-full border border-line px-2 py-1">
                      <button
                        onClick={() => update(item.id, item.quantity - 1)}
                        aria-label={`Decrease ${item.name} quantity`}
                        data-testid={`button-decrease-${item.id}`}
                      >
                        <Minus size={14} />
                      </button>
                      <span className="w-4 text-center text-sm font-bold">{item.quantity}</span>
                      <button
                        onClick={() => update(item.id, item.quantity + 1)}
                        aria-label={`Increase ${item.name} quantity`}
                        data-testid={`button-increase-${item.id}`}
                      >
                        <Plus size={14} />
                      </button>
                    </div>
                    <strong className="text-teal">{money(item.price * item.quantity)}</strong>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <aside className="h-fit rounded-[24px] bg-ink p-6 text-cream lg:sticky lg:top-28">
            <h2 className="display-font text-2xl font-bold">The numbers</h2>
            <div className="mt-7 space-y-4 border-b border-cream/10 pb-5 text-sm">
              <div className="flex justify-between text-cream/60">
                <span>Subtotal</span>
                <span className="text-cream">{money(subtotal)}</span>
              </div>
              <div className="flex justify-between text-cream/60">
                <span>Delivery</span>
                <span className="text-cream">{delivery ? money(delivery) : "Free"}</span>
              </div>
            </div>
            <div className="flex justify-between py-5 font-bold">
              <span>Total</span>
              <span className="text-sun">{money(subtotal + delivery)}</span>
            </div>
            <Link
              href="/checkout"
              className="flex h-13 items-center justify-center gap-2 rounded-full bg-sun font-bold text-ink transition hover:bg-cream"
              data-testid="link-checkout"
            >
              Go to checkout <ArrowRight size={17} />
            </Link>
            <p className="mt-4 text-center text-[11px] text-cream/40">
              {subtotal < FREE_DELIVERY_MIN
                ? `Add ${money(FREE_DELIVERY_MIN - subtotal)} for free delivery`
                : "Free delivery unlocked"}
            </p>
          </aside>
        </div>
      ) : (
        <EmptyState
          title="Your bag is empty."
          copy="A good meal is only a few taps away."
          action="Explore the menu"
          href="/menu"
        />
      )}
    </div>
  );
}
