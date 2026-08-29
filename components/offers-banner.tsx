"use client";

import { Tag, Gift, Calendar, Zap } from "lucide-react";

const offers = [
  {
    id: "first-order",
    icon: Gift,
    badge: "New Customer",
    title: "10% Off Your First Order",
    description: "Use code FITFIRST at checkout",
    bg: "bg-gradient-to-br from-[#1a4731] to-[#2d7a52]",
    badgeBg: "bg-[#f0faf5] text-[#1a4731]",
    highlight: "text-[#7effc3]",
  },
  {
    id: "buy-two-salads",
    icon: Tag,
    badge: "Combo Deal",
    title: "Buy 2 Salads, Get Dressing FREE",
    description: "Any 2 protein salads + complimentary lemon dressing",
    bg: "bg-gradient-to-br from-[#7c2d0e] to-[#d4541e]",
    badgeBg: "bg-[#fff5f0] text-[#7c2d0e]",
    highlight: "text-[#ffd5b8]",
  },
  {
    id: "weekly-subscription",
    icon: Calendar,
    badge: "Best Value",
    title: "Weekly Subscription – Save 10%",
    description: "Mon–Sat lunch & dinner bowls delivered fresh daily",
    bg: "bg-gradient-to-br from-[#3b3000] to-[#9a7e00]",
    badgeBg: "bg-[#fffbeb] text-[#3b3000]",
    highlight: "text-[#ffe066]",
  },
];

export function OffersBanner() {
  return (
    <section className="px-5 py-14 lg:px-10">
      <div className="mx-auto max-w-[1440px]">
        <div className="mb-8 flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-coral/10">
            <Zap size={18} className="text-coral" />
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-[.18em] text-coral">
              Limited Offers
            </p>
            <h2 className="display-font text-3xl font-bold leading-tight sm:text-4xl">
              Save more, eat{" "}
              <span className="text-teal">clean.</span>
            </h2>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {offers.map(({ id, icon: Icon, badge, title, description, bg, badgeBg, highlight }) => (
            <div
              key={id}
              className={`group relative overflow-hidden rounded-[24px] p-6 text-white transition duration-300 hover:-translate-y-1 hover:shadow-xl ${bg}`}
            >
              {/* Decorative circle */}
              <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-white/5 transition duration-500 group-hover:scale-150" />
              <div className="absolute -bottom-6 -left-6 h-24 w-24 rounded-full bg-white/5" />

              <div className="relative z-10">
                <span
                  className={`inline-block rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-[.12em] ${badgeBg}`}
                >
                  {badge}
                </span>

                <div className="mt-4 flex h-11 w-11 items-center justify-center rounded-2xl bg-white/15 backdrop-blur">
                  <Icon size={20} className="text-white" />
                </div>

                <h3 className={`mt-4 text-xl font-bold leading-snug ${highlight}`}>
                  {title}
                </h3>
                <p className="mt-2 text-sm leading-6 text-white/70">
                  {description}
                </p>

                <a
                  href={`https://wa.me/917702285153?text=Hi! I'd like to know more about the offer: ${title}`}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-5 inline-flex items-center gap-2 rounded-full bg-white/20 px-4 py-2 text-xs font-bold text-white backdrop-blur transition hover:bg-white/30"
                >
                  Claim on WhatsApp →
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
