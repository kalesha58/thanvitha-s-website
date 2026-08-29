"use client";

import { useState } from "react";
import { MessageCircle, Plus, Utensils } from "lucide-react";
import { bowlBases, bowlExtras, bowlProteins, bowlSauces } from "@/data/bowl-options";
import { products } from "@/data/products";
import { useProductActions } from "@/lib/product-actions";
import { money } from "@/lib/money";
import { buildWhatsAppHref } from "@/lib/whatsapp";
import type { BowlOption, Product } from "@/lib/types";

function BowlChoices({
  title,
  options,
  value,
  onChange,
}: {
  title: string;
  options: BowlOption[];
  value: string;
  onChange: (id: string) => void;
}) {
  return (
    <div>
      <p className="mb-3 text-[11px] font-bold uppercase tracking-[.16em] text-ink/50">{title}</p>
      <div className="grid gap-2 sm:grid-cols-3">
        {options.map((option) => (
          <button
            key={option.id}
            onClick={() => onChange(option.id)}
            aria-pressed={value === option.id}
            className={`rounded-[14px] border p-3 text-left transition ${value === option.id ? "border-teal bg-teal text-cream shadow-sm" : "border-line bg-card hover:border-teal"}`}
            data-testid={`button-bowl-${option.id}`}
          >
            <span className="block text-sm font-bold">{option.name}</span>
            <span className={`mt-1 block text-[10px] ${value === option.id ? "text-cream/65" : "text-muted-foreground"}`}>
              {option.note}
            </span>
            <span className={`mt-2 block text-xs font-bold ${value === option.id ? "text-sun" : "text-teal"}`}>
              {option.price ? `+${money(option.price)}` : "Included"}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}

export function BuildBowl() {
  const { add } = useProductActions();
  const [base, setBase] = useState("jeera");
  const [protein, setProtein] = useState("chicken");
  const [sauce, setSauce] = useState("mint-yogurt");
  const [extra, setExtra] = useState("none");
  const selectedBase = bowlBases.find((option) => option.id === base)!;
  const selectedProtein = bowlProteins.find((option) => option.id === protein)!;
  const selectedSauce = bowlSauces.find((option) => option.id === sauce)!;
  const selectedExtra = bowlExtras.find((option) => option.id === extra)!;
  const total = selectedBase.price + selectedProtein.price + selectedSauce.price + selectedExtra.price;
  const totalProtein = selectedBase.protein + selectedProtein.protein + selectedSauce.protein + selectedExtra.protein;
  const totalCalories =
    selectedBase.calories + selectedProtein.calories + selectedSauce.calories + selectedExtra.calories;
  const customProduct: Product = {
    id: `perfect-bowl-${base}-${protein}-${sauce}-${extra}`,
    name: "My Perfect Bowl",
    category: "Custom Bowl",
    price: total,
    protein: totalProtein,
    calories: totalCalories,
    carbs: 44,
    fat: 18,
    color: "lime",
    description: `${selectedProtein.name}, ${selectedBase.name}, ${selectedSauce.name}, ${selectedExtra.name.toLowerCase()}.`,
    image: products[0].image,
  };
  const whatsapp = buildWhatsAppHref(
    `Hi Fit Fuel Kitchen! I’d like to order my Perfect Bowl:\nBase: ${selectedBase.name}\nProtein: ${selectedProtein.name}\nSauce: ${selectedSauce.name}\nExtra: ${selectedExtra.name}\nTotal: ${money(total)} · ${totalProtein}g protein · ${totalCalories} kcal`,
  );

  return (
    <section className="bg-ink px-5 py-20 text-cream lg:px-10 lg:py-28" id="build-your-bowl">
      <div className="mx-auto max-w-[1440px]">
        <div className="grid gap-10 lg:grid-cols-[.7fr_1.3fr] lg:gap-16">
          <div className="lg:sticky lg:top-28 lg:h-fit">
            <p className="mb-3 text-xs font-bold uppercase tracking-[.18em] text-sun">Your call</p>
            <h2 className="display-font text-4xl font-bold leading-[.92] sm:text-6xl">
              Build your
              <br />
              <span className="text-sun">perfect bowl.</span>
            </h2>
            <p className="mt-6 max-w-[370px] text-sm leading-6 text-cream/60">
              Choose your base, lock in the protein, and make lunch feel like a decision you’re proud of.
            </p>
            <div className="mt-8 flex flex-wrap gap-2">
              {[
                ["Price", money(total)],
                ["Protein", `${totalProtein}g`],
                ["Energy", `${totalCalories} kcal`],
              ].map(([label, value]) => (
                <div className="rounded-[16px] border border-cream/15 bg-cream/5 px-4 py-3" key={label}>
                  <p className="text-[10px] font-bold uppercase tracking-wider text-cream/40">{label}</p>
                  <p className="mt-1 font-bold text-sun">{value}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-[26px] bg-cream p-5 text-ink shadow-lg sm:p-8">
            <div className="mb-8 flex items-center justify-between border-b border-line pb-5">
              <div>
                <p className="text-xs font-bold uppercase tracking-[.15em] text-teal">Live builder</p>
                <h3 className="mt-1 text-xl font-bold">Make it yours</h3>
              </div>
              <span className="grid h-11 w-11 place-items-center rounded-full bg-sun">
                <Utensils size={19} />
              </span>
            </div>
            <div className="space-y-7">
              <BowlChoices title="01 / Pick a base" options={bowlBases} value={base} onChange={setBase} />
              <BowlChoices title="02 / Choose your protein" options={bowlProteins} value={protein} onChange={setProtein} />
              <BowlChoices title="03 / One good extra" options={bowlExtras} value={extra} onChange={setExtra} />
            </div>
            <div className="mt-8 grid gap-2 sm:grid-cols-2">
              <button
                onClick={() =>
                  add(
                    customProduct,
                    "Custom bowl",
                    `${selectedBase.name} · ${selectedProtein.name} · ${selectedSauce.name} · ${selectedExtra.name}`,
                  )
                }
                className="flex h-13 items-center justify-center gap-2 rounded-full bg-teal font-bold text-cream transition hover:bg-teal-dark"
                data-testid="button-add-perfect-bowl"
              >
                Add my bowl · {money(total)} <Plus size={17} />
              </button>
              <a
                href={whatsapp}
                target="_blank"
                rel="noreferrer"
                className="flex h-13 items-center justify-center gap-2 rounded-full border border-teal font-bold text-teal transition hover:bg-teal/10"
                data-testid="link-perfect-bowl-whatsapp"
              >
                <MessageCircle size={17} /> Send via WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
