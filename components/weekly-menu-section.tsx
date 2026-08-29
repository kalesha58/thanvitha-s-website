"use client";

import { useState } from "react";
import Image from "next/image";
import { Flame, MessageCircle, Leaf, Drumstick, CalendarDays } from "lucide-react";
import { weeklyBowls } from "@/data/products";
import { money } from "@/lib/money";
import { buildWhatsAppHref } from "@/lib/whatsapp";

const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"] as const;
type Day = typeof DAYS[number];

const DAY_SHORT: Record<Day, string> = {
  Monday: "Mon",
  Tuesday: "Tue",
  Wednesday: "Wed",
  Thursday: "Thu",
  Friday: "Fri",
  Saturday: "Sat",
};

export function WeeklyMenuSection() {
  const [activeDay, setActiveDay] = useState<Day>("Monday");

  const dayBowls = weeklyBowls.filter((b) => b.day === activeDay);
  const nonVeg = dayBowls.filter((b) => !b.isVeg);
  const veg = dayBowls.filter((b) => b.isVeg);

  return (
    <section className="bg-ink px-5 py-16 text-cream lg:px-10 lg:py-24">
      <div className="mx-auto max-w-[1440px]">
        {/* Header */}
        <div className="mb-10 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="mb-3 flex items-center gap-2">
              <CalendarDays size={16} className="text-sun" />
              <p className="text-xs font-bold uppercase tracking-[.18em] text-sun">
                Mon – Sat · Freshly Prepared Daily
              </p>
            </div>
            <h2 className="display-font text-4xl font-bold leading-[.95] sm:text-5xl">
              Weekly Lunch
              <br />
              <span className="text-teal">&amp; Dinner Menu</span>
            </h2>
          </div>
          <p className="max-w-[280px] text-sm leading-6 text-cream/55">
            Every bowl: 150g Rice · 120g Protein · 100g Steamed Veggies. Balanced. Nutritious. Freshly made.
          </p>
        </div>

        {/* Day Tabs */}
        <div className="mb-8 flex gap-2 overflow-x-auto pb-1">
          {DAYS.map((day) => (
            <button
              key={day}
              onClick={() => setActiveDay(day)}
              className={`shrink-0 rounded-full border px-5 py-2.5 text-sm font-bold transition ${
                activeDay === day
                  ? "border-teal bg-teal text-cream"
                  : "border-cream/15 bg-cream/5 text-cream/60 hover:border-teal/50 hover:text-cream"
              }`}
            >
              <span className="hidden sm:inline">{day}</span>
              <span className="sm:hidden">{DAY_SHORT[day]}</span>
            </button>
          ))}
        </div>

        {/* Bowl Grid */}
        <div className="grid gap-5 sm:grid-cols-2">
          {/* Non-Veg */}
          {nonVeg.map((bowl) => (
            <BowlCard key={bowl.id} bowl={bowl} type="nonveg" />
          ))}
          {/* Veg */}
          {veg.map((bowl) => (
            <BowlCard key={bowl.id} bowl={bowl} type="veg" />
          ))}
        </div>

        {/* Nutrition Guide */}
        <div className="mt-10 rounded-[22px] border border-cream/10 bg-cream/5 p-5">
          <p className="mb-4 text-xs font-bold uppercase tracking-[.15em] text-sun">
            Every Meal Includes
          </p>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {[
              ["🍚", "150g", "Rice"],
              ["🍗", "120g", "Protein Source"],
              ["🥦", "100g", "Steamed Vegetables"],
              ["⚖️", "Balanced", "Nutrition"],
            ].map(([icon, val, label]) => (
              <div key={label} className="rounded-[16px] bg-cream/8 p-3 text-center">
                <p className="text-xl">{icon}</p>
                <p className="mt-1 text-base font-bold text-sun">{val}</p>
                <p className="mt-0.5 text-[10px] font-medium uppercase tracking-wider text-cream/45">
                  {label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function BowlCard({
  bowl,
  type,
}: {
  bowl: ReturnType<typeof weeklyBowls["filter"]>[0];
  type: "veg" | "nonveg";
}) {
  const isVeg = type === "veg";

  return (
    <article className="group overflow-hidden rounded-[22px] border border-cream/10 bg-cream/5 transition duration-300 hover:border-teal/40 hover:bg-cream/10">
      <div className="relative aspect-[2.2] overflow-hidden">
        <Image
          src={bowl.image}
          alt={bowl.name}
          fill
          sizes="(max-width: 640px) 100vw, 50vw"
          className="object-cover transition duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/80 to-transparent" />

        {/* Veg/Non-Veg badge */}
        <span
          className={`absolute left-3 top-3 flex items-center gap-1.5 rounded-full px-3 py-1 text-[10px] font-bold ${
            isVeg
              ? "bg-[#22c55e]/20 text-[#86efac] backdrop-blur"
              : "bg-coral/20 text-[#fca5a5] backdrop-blur"
          }`}
        >
          {isVeg ? <Leaf size={11} /> : <Drumstick size={11} />}
          {isVeg ? "Veg" : "Non-Veg"}
        </span>

        {bowl.tag && (
          <span className="absolute right-3 top-3 rounded-full bg-sun px-3 py-1 text-[10px] font-bold text-ink">
            {bowl.tag}
          </span>
        )}

        <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between">
          <h3 className="text-lg font-bold leading-snug text-cream">{bowl.name}</h3>
          <span className="rounded-full bg-teal px-3 py-1 text-sm font-bold text-cream">
            {money(bowl.price)}
          </span>
        </div>
      </div>

      <div className="p-4">
        {/* Macros */}
        <div className="mb-3 grid grid-cols-4 gap-2 text-center">
          {[
            { val: bowl.calories, label: "kcal" },
            { val: `${bowl.protein}g`, label: "Protein" },
            { val: `${bowl.carbs}g`, label: "Carbs" },
            { val: `${bowl.fat}g`, label: "Fat" },
          ].map(({ val, label }) => (
            <div key={label} className="rounded-[10px] bg-cream/8 p-2">
              <p className="text-sm font-bold text-cream">{val}</p>
              <p className="text-[9px] font-medium uppercase tracking-wider text-cream/40">{label}</p>
            </div>
          ))}
        </div>

        {bowl.portionInfo && (
          <p className="mb-3 flex items-center gap-1.5 text-[11px] text-cream/45">
            <Flame size={11} className="text-teal" />
            {bowl.portionInfo}
          </p>
        )}

        <p className="mb-4 text-xs leading-5 text-cream/60">{bowl.description}</p>

        <a
          href={buildWhatsAppHref(
            `Hi! I'd like to order the ${bowl.name} (${bowl.day}) - ${money(bowl.price)}`
          )}
          target="_blank"
          rel="noreferrer"
          className="flex w-full items-center justify-center gap-2 rounded-full border border-teal/40 bg-teal/10 py-2.5 text-xs font-bold text-teal transition hover:bg-teal hover:text-cream"
        >
          <MessageCircle size={14} />
          Order on WhatsApp
        </a>
      </div>
    </article>
  );
}
