"use client";

import { useState, type FormEvent, type ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  ChevronRight,
  MessageCircle,
  ShieldCheck,
  Store,
  Truck,
  Wallet,
} from "lucide-react";
import { DELIVERY_FEE, FREE_DELIVERY_MIN } from "@/data/site";
import { useCart } from "@/lib/cart-context";
import { money } from "@/lib/money";
import { buildWhatsAppHref } from "@/lib/whatsapp";

function Field({
  label,
  value,
  placeholder,
  onChange,
  testId,
  type = "text",
  required = label !== "Note for the kitchen (optional)",
}: {
  label: string;
  value: string;
  placeholder: string;
  onChange: (v: string) => void;
  testId: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-[11px] font-bold uppercase tracking-[.16em] text-ink/45">{label}</span>
      <input
        required={required}
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className="h-12 w-full rounded-2xl border border-line bg-white px-4 text-sm outline-none transition placeholder:text-ink/30 focus:border-lime focus:ring-4 focus:ring-lime/15"
        data-testid={testId}
      />
    </label>
  );
}

function Choice({
  active,
  onClick,
  testId,
  icon,
  title,
  hint,
}: {
  active: boolean;
  onClick: () => void;
  testId: string;
  icon: ReactNode;
  title: string;
  hint: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      data-testid={testId}
      className={`flex items-start gap-3 rounded-2xl border p-4 text-left transition ${
        active
          ? "border-lime bg-lime/10 shadow-[0_0_0_3px_rgba(139,195,74,.18)]"
          : "border-line bg-white hover:border-lime/50"
      }`}
    >
      <span className={`mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-full ${active ? "bg-lime text-black" : "bg-muted text-ink/50"}`}>
        {icon}
      </span>
      <span>
        <span className={`block text-sm font-bold ${active ? "text-ink" : "text-ink/80"}`}>{title}</span>
        <span className="mt-0.5 block text-[11px] text-ink/45">{hint}</span>
      </span>
    </button>
  );
}

export function CheckoutPage() {
  const { cart, clear } = useCart();
  const [submitted, setSubmitted] = useState(false);
  const [orderWhatsApp, setOrderWhatsApp] = useState("");
  const [form, setForm] = useState({
    name: "",
    phone: "",
    address: "",
    note: "",
    payment: "UPI",
    fulfillment: "Delivery",
  });
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const deliveryFee = form.fulfillment === "Pickup" || subtotal >= FREE_DELIVERY_MIN ? 0 : DELIVERY_FEE;
  const total = subtotal + deliveryFee;

  const buildOrderHref = () =>
    buildWhatsAppHref(
      `Hi Fit Fuel Kitchen! I'd like to order:\n${cart.map((i) => `${i.quantity}x ${i.name} (${i.portion})`).join("\n")}\nTotal: ${money(total)}\nFulfilment: ${form.fulfillment}\nPayment: ${form.payment}\nName: ${form.name}\n${form.fulfillment === "Delivery" ? `Delivery: ${form.address}` : "Pickup: Fit Fuel Kitchen counter, Mangalagiri"}${form.note ? `\nNote: ${form.note}` : ""}`,
    );

  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.phone || (form.fulfillment === "Delivery" && !form.address)) return;
    setOrderWhatsApp(buildOrderHref());
    setSubmitted(true);
    clear();
  };

  if (submitted) {
    return (
      <div className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(139,195,74,.18),transparent_55%)]" />
        <div className="relative mx-auto flex min-h-[70vh] max-w-[640px] flex-col items-center justify-center px-5 py-20 text-center">
          <span className="grid h-20 w-20 place-items-center rounded-full bg-lime text-black shadow-[0_0_40px_rgba(139,195,74,.35)]">
            <Check size={36} />
          </span>
          <p className="mt-7 text-[11px] font-bold uppercase tracking-[.2em] text-lime">Order received</p>
          <h1 className="display-font mt-3 text-5xl font-bold sm:text-6xl">
            You’re all
            <br />
            <span className="text-lime">fuelled up.</span>
          </h1>
          <p className="mt-5 max-w-[440px] text-sm leading-6 text-ink/55">
            Your kitchen crew has the signal. Confirm the order on WhatsApp and we’ll start prepping.
          </p>
          <a
            href={orderWhatsApp}
            target="_blank"
            rel="noreferrer"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-black px-7 py-3.5 text-sm font-bold text-lime transition hover:bg-ink"
            data-testid="link-confirm-whatsapp"
          >
            Confirm on WhatsApp <ArrowUpRight size={16} />
          </a>
          <Link href="/track" className="mt-4 text-sm font-bold text-ink/60 hover:text-lime" data-testid="link-view-track">
            View order tracking
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-72 bg-[radial-gradient(ellipse_at_top,rgba(139,195,74,.12),transparent_60%)]" />
      <div className="relative mx-auto max-w-[1180px] px-5 py-10 lg:px-10 lg:py-16">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <Link
            href="/cart"
            className="inline-flex items-center gap-2 text-sm font-bold text-ink/55 transition hover:text-lime"
            data-testid="link-back-cart"
          >
            <ChevronRight className="rotate-180" size={16} /> Back to bag
          </Link>
          <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[.14em] text-ink/35">
            <span>Bag</span>
            <span className="h-px w-6 bg-ink/20" />
            <span className="text-lime">Details</span>
            <span className="h-px w-6 bg-ink/20" />
            <span>Confirm</span>
          </div>
        </div>

        <div className="grid items-start gap-8 lg:grid-cols-[1.15fr_.85fr] lg:gap-12">
          <div>
            <p className="mb-3 text-[11px] font-bold uppercase tracking-[.2em] text-lime">Almost there</p>
            <h1 className="display-font text-5xl font-bold tracking-[-.04em] sm:text-6xl">
              Delivery
              <br />
              <span className="text-lime">details.</span>
            </h1>
            <p className="mt-4 max-w-[420px] text-sm leading-6 text-ink/50">
              Tell us where this plate is headed. We’ll pack it fresh in Mangalagiri.
            </p>

            <form onSubmit={submit} className="mt-10 space-y-7">
              <section className="rounded-[28px] border border-line bg-white/80 p-5 shadow-xs sm:p-6">
                <p className="mb-4 text-[11px] font-bold uppercase tracking-[.16em] text-ink/40">Fulfilment</p>
                <div className="grid gap-3 sm:grid-cols-2">
                  <Choice
                    active={form.fulfillment === "Delivery"}
                    onClick={() => setForm({ ...form, fulfillment: "Delivery" })}
                    testId="button-fulfillment-delivery"
                    icon={<Truck size={17} />}
                    title="Delivery"
                    hint={`₹${DELIVERY_FEE} · free over ${money(FREE_DELIVERY_MIN)}`}
                  />
                  <Choice
                    active={form.fulfillment === "Pickup"}
                    onClick={() => setForm({ ...form, fulfillment: "Pickup" })}
                    testId="button-fulfillment-pickup"
                    icon={<Store size={17} />}
                    title="Pickup"
                    hint="Ready in 20–30 min · free"
                  />
                </div>
              </section>

              <section className="rounded-[28px] border border-line bg-white/80 p-5 shadow-xs sm:p-6">
                <p className="mb-4 text-[11px] font-bold uppercase tracking-[.16em] text-ink/40">Your details</p>
                <div className="space-y-4">
                  <Field
                    label="Your name"
                    value={form.name}
                    placeholder="How should we call you?"
                    onChange={(v) => setForm({ ...form, name: v })}
                    testId="input-checkout-name"
                  />
                  <Field
                    label="Phone number"
                    value={form.phone}
                    placeholder="98x xxx xxxx"
                    onChange={(v) => setForm({ ...form, phone: v })}
                    testId="input-checkout-phone"
                    type="tel"
                  />
                  {form.fulfillment === "Delivery" && (
                    <Field
                      label="Delivery address"
                      value={form.address}
                      placeholder="Building, street, area"
                      onChange={(v) => setForm({ ...form, address: v })}
                      testId="input-checkout-address"
                      required
                    />
                  )}
                  {form.fulfillment === "Pickup" && (
                    <div className="flex items-center gap-3 rounded-2xl bg-lime/10 p-4 text-sm">
                      <Store size={18} className="text-lime" />
                      <span>
                        <strong>Fit Fuel Kitchen counter</strong>
                        <span className="mt-1 block text-xs text-ink/50">Ready in 20–30 minutes · Mangalagiri</span>
                      </span>
                    </div>
                  )}
                  <Field
                    label="Note for the kitchen (optional)"
                    value={form.note}
                    placeholder="Extra sauce? Leave at reception?"
                    onChange={(v) => setForm({ ...form, note: v })}
                    testId="input-checkout-note"
                  />
                </div>
              </section>

              <section className="rounded-[28px] border border-line bg-white/80 p-5 shadow-xs sm:p-6">
                <p className="mb-4 text-[11px] font-bold uppercase tracking-[.16em] text-ink/40">Payment</p>
                <div className="grid gap-3 sm:grid-cols-2">
                  <Choice
                    active={form.payment === "UPI"}
                    onClick={() => setForm({ ...form, payment: "UPI" })}
                    testId="button-payment-promptpay"
                    icon={<Wallet size={17} />}
                    title="UPI"
                    hint="Pay on delivery / pickup"
                  />
                  <Choice
                    active={form.payment === "Cash"}
                    onClick={() => setForm({ ...form, payment: "Cash" })}
                    testId="button-payment-cash"
                    icon={<Wallet size={17} />}
                    title="Cash"
                    hint="Pay at the door"
                  />
                </div>
              </section>

              <div className="grid gap-3">
                <button
                  type="submit"
                  disabled={!cart.length}
                  className="flex h-14 w-full items-center justify-center gap-2 rounded-full bg-black text-sm font-bold text-lime shadow-[0_12px_40px_rgba(0,0,0,.18)] transition hover:bg-ink disabled:cursor-not-allowed disabled:opacity-40"
                  data-testid="button-place-order"
                >
                  Place order · {money(total)} <ArrowRight size={17} />
                </button>
                <a
                  href={buildOrderHref()}
                  target="_blank"
                  rel="noreferrer"
                  className="flex h-12 w-full items-center justify-center gap-2 rounded-full border border-lime bg-white font-bold text-ink transition hover:bg-lime/10"
                  data-testid="link-checkout-whatsapp"
                >
                  <MessageCircle size={17} className="text-[#1e9b60]" /> Send order via WhatsApp
                </a>
              </div>
            </form>
          </div>

          <aside className="overflow-hidden rounded-[32px] bg-black text-white shadow-lg lg:sticky lg:top-28">
            <div className="flex items-center justify-between border-b border-white/10 px-6 py-5">
              <h2 className="text-sm font-bold tracking-wide">Order summary</h2>
              <Link href="/cart" className="text-xs font-bold text-lime" data-testid="link-edit-cart">
                Edit
              </Link>
            </div>
            <div className="space-y-4 px-6 py-5">
              {cart.length ? (
                cart.map((item) => (
                  <div className="flex gap-3" key={`${item.id}-${item.portion}-${item.addOn}`}>
                    <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-2xl bg-white/10">
                      <Image src={item.image} alt={item.name} fill sizes="56px" className="object-cover" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-bold">{item.name}</p>
                      <p className="mt-0.5 text-[11px] text-white/40">
                        {item.quantity} × {item.portion}
                      </p>
                    </div>
                    <strong className="text-sm">{money(item.price * item.quantity)}</strong>
                  </div>
                ))
              ) : (
                <p className="text-sm text-white/45">Your bag is empty.</p>
              )}
            </div>
            <div className="space-y-3 border-t border-white/10 px-6 py-5 text-sm">
              <div className="flex justify-between text-white/50">
                <span>Subtotal</span>
                <span className="text-white">{money(subtotal)}</span>
              </div>
              <div className="flex justify-between text-white/50">
                <span>{form.fulfillment}</span>
                <span className="text-white">{deliveryFee ? money(deliveryFee) : "Free"}</span>
              </div>
              <div className="flex justify-between pt-2 text-lg font-bold">
                <span>Total</span>
                <span className="text-lime">{money(total)}</span>
              </div>
            </div>
            <div className="m-5 mt-0 flex items-start gap-2 rounded-2xl bg-white/10 p-4 text-xs leading-5 text-white/55">
              <ShieldCheck size={16} className="mt-0.5 shrink-0 text-lime" /> Your details are only used to deliver this
              order.
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
