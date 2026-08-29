"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  ChevronDown,
  Clock3,
  Flame,
  Leaf,
  Sparkles,
  Star,
  Zap,
} from "lucide-react";
import { BuildBowl } from "@/components/build-bowl";
import { ProductCard } from "@/components/product-card";
import { products } from "@/data/products";
import {
  editorialImages,
  faqs,
  howItWorks,
  testimonials,
  trainingLanes,
  whyFitFuel,
} from "@/data/site";
import { useCart } from "@/lib/cart-context";
import { useProductActions } from "@/lib/product-actions";

export function HomePage() {
  const { add } = useProductActions();
  const { favorites, toggleFavorite } = useCart();
  const [faq, setFaq] = useState(0);

  return (
    <>
      <section className="relative overflow-hidden bg-black text-cream">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-24 left-1/4 h-[520px] w-[520px] rounded-full bg-lime/20 blur-[140px]" />
          <div className="absolute -right-20 bottom-0 h-[420px] w-[420px] rounded-full bg-lime/10 blur-[120px]" />
          <div className="absolute inset-0 opacity-[.12] [background-image:linear-gradient(rgba(255,255,255,.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.08)_1px,transparent_1px)] [background-size:48px_48px]" />
        </div>
        <div className="relative mx-auto grid min-h-[720px] max-w-[1440px] items-center gap-12 px-5 py-16 lg:grid-cols-[.95fr_1.05fr] lg:px-10 lg:py-24">
          <div className="relative z-10 max-w-[620px]">
            <div className="animate-rise mb-7 inline-flex items-center gap-2 rounded-full border border-lime/40 bg-lime/10 px-3.5 py-2 text-[11px] font-bold uppercase tracking-[.18em] text-lime">
              <Sparkles size={14} /> Thanvita’s Fit Fuel Kitchen
            </div>
            <p className="delay-1 animate-rise mb-4 text-[11px] font-bold uppercase tracking-[.28em] text-white/45">
              Eat healthy. Stay fit.
            </p>
            <h1 className="display-font delay-1 animate-rise text-[clamp(3.6rem,9vw,7.4rem)] font-bold leading-[.86] tracking-[-.075em]">
              EAT
              <br />
              <span className="text-lime">HEALTHY.</span>
              <br />
              STAY FIT.
            </h1>
            <p className="delay-2 animate-rise mt-8 max-w-[440px] text-[16px] leading-7 text-white/65">
              Protein-packed meals for people who train hard, work late, and still care what’s on their plate.
            </p>
            <div className="delay-3 animate-rise mt-9 flex flex-wrap items-center gap-3">
              <Link
                href="/menu"
                className="inline-flex items-center gap-3 rounded-full bg-lime px-7 py-3.5 text-sm font-bold text-black shadow-[0_0_40px_rgba(139,195,74,.35)] transition hover:bg-[#9ad45a]"
                data-testid="link-hero-menu"
              >
                Build your plate <ArrowRight size={17} />
              </Link>
              <span className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2.5 text-xs text-white/70">
                <Clock3 size={15} className="text-lime" /> Delivery in 45–60 min
              </span>
            </div>
            <div className="delay-4 animate-rise mt-10 grid max-w-[460px] grid-cols-3 gap-2">
              {[
                ["30g+", "Avg protein"],
                ["Daily", "Fresh prep"],
                ["MGR", "Mangalagiri"],
              ].map(([value, label]) => (
                <div key={label} className="rounded-2xl border border-white/10 bg-white/5 px-3 py-3.5">
                  <p className="display-font text-xl font-bold text-lime">{value}</p>
                  <p className="mt-1 text-[10px] font-bold uppercase tracking-wider text-white/40">{label}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="animate-fade relative mx-auto w-full max-w-[640px] lg:-mr-2">
            <div className="absolute -inset-3 rounded-[42px] bg-gradient-to-br from-lime/50 via-transparent to-lime/10 blur-sm" />
            <div className="relative aspect-square overflow-hidden rounded-[36px] border border-lime/25 bg-black shadow-[0_30px_80px_rgba(0,0,0,.55)]">
              <Image
                src={editorialImages.hero}
                alt="Colorful nourishing bowl with greens and grilled protein"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 640px"
                className="object-cover opacity-95"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-black/50 via-transparent to-lime/15" />
            </div>
            <div className="absolute -top-6 -left-2 overflow-hidden rounded-full ring-2 ring-lime/70 shadow-lg sm:-left-6">
              <Image
                src="/brand/logo-mark.png"
                alt=""
                width={92}
                height={92}
                className="h-[72px] w-[72px] object-cover sm:h-[88px] sm:w-[88px]"
              />
            </div>
            <div className="absolute -bottom-5 -left-3 rounded-[18px] border border-white/10 bg-black/80 p-4 text-white shadow-lg backdrop-blur-md sm:-left-8">
              <p className="text-[10px] font-bold uppercase tracking-[.16em] text-white/45">Today&apos;s signal</p>
              <p className="mt-1 flex items-center gap-2 text-sm font-bold">
                <span className="h-2 w-2 rounded-full bg-lime" /> 38g protein / bowl
              </p>
            </div>
            <div className="absolute -right-2 top-10 rounded-full bg-lime px-4 py-3 text-xs font-bold text-black shadow-lg sm:-right-5">
              No sad desk lunches.
            </div>
          </div>
        </div>
      </section>
      <div className="overflow-hidden border-b border-line bg-sun py-3 text-center text-[11px] font-bold uppercase tracking-[.22em] text-ink">
        <div className="whitespace-nowrap">
          High protein · Fresh ingredients · Mangalagiri delivery · No Maida · No Junk · High protein · Fresh ingredients · Mangalagiri delivery · No Maida · No Junk
        </div>
      </div>

      <section className="mx-auto max-w-[1440px] px-5 py-20 lg:px-10 lg:py-28">
        <div className="mb-10 flex items-end justify-between gap-5">
          <div>
            <p className="mb-3 text-xs font-bold uppercase tracking-[.18em] text-teal">The regulars</p>
            <h2 className="display-font text-4xl font-bold leading-none sm:text-5xl">
              Your new
              <br />
              <span className="text-coral">usual.</span>
            </h2>
          </div>
          <Link
            href="/menu"
            className="hidden items-center gap-2 text-sm font-bold text-teal sm:flex"
            data-testid="link-featured-menu"
          >
            See full menu <ArrowUpRight size={16} />
          </Link>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {products.slice(0, 4).map((p, i) => (
            <div className={`delay-${i + 1}`} key={p.id}>
              <ProductCard
                product={p}
                onAdd={() => add(p)}
                favorite={favorites.includes(p.id)}
                onFavorite={() => toggleFavorite(p.id)}
              />
            </div>
          ))}
        </div>
        <Link
          href="/menu"
          className="mt-6 flex items-center justify-center gap-2 text-sm font-bold text-teal sm:hidden"
          data-testid="link-featured-menu-mobile"
        >
          See full menu <ArrowUpRight size={16} />
        </Link>
      </section>

      <section className="bg-[#dfead6] px-5 py-20 lg:px-10 lg:py-28">
        <div className="mx-auto grid max-w-[1440px] items-center gap-12 lg:grid-cols-[.8fr_1.2fr]">
          <div>
            <p className="mb-3 text-xs font-bold uppercase tracking-[.18em] text-teal">Not a meal plan</p>
            <h2 className="display-font max-w-[520px] text-4xl font-bold leading-[.95] sm:text-6xl">
              Good food.
              <br />
              <span className="text-coral">Better momentum.</span>
            </h2>
            <p className="mt-6 max-w-[450px] leading-7 text-ink/65">
              We do the prep math so you can focus on the thing you’re actually here to do. Every box arrives with the
              numbers on the side and the flavor turned up.
            </p>
            <Link
              href="/menu"
              className="mt-7 inline-flex items-center gap-3 rounded-full bg-ink px-6 py-3.5 text-sm font-bold text-cream transition hover:bg-teal"
              data-testid="link-editorial-menu"
            >
              Find your fuel <ArrowRight size={17} />
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-3 sm:gap-5">
            <div className="relative mt-12 aspect-[.8] overflow-hidden rounded-[28px]">
              <Image
                src={editorialImages.salad}
                alt="Fresh salad ingredients"
                fill
                sizes="(max-width: 1024px) 50vw, 400px"
                className="object-cover"
              />
            </div>
            <div className="relative aspect-[.8] overflow-hidden rounded-[28px]">
              <Image
                src={editorialImages.meal}
                alt="Prepared healthy meal"
                fill
                sizes="(max-width: 1024px) 50vw, 400px"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="soft-grid px-5 py-20 lg:px-10 lg:py-28">
        <div className="mx-auto max-w-[1440px]">
          <div className="mb-12 max-w-[560px]">
            <p className="mb-3 text-xs font-bold uppercase tracking-[.18em] text-coral">How it works</p>
            <h2 className="display-font text-4xl font-bold leading-none sm:text-5xl">
              A better routine,
              <br />
              in three taps.
            </h2>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {howItWorks.map(([n, title, copy]) => (
              <div key={n} className="rounded-[24px] border border-line bg-card p-6 shadow-xs">
                <span className="display-font text-5xl font-bold text-sun">{n}</span>
                <h3 className="mt-8 text-lg font-bold">{title}</h3>
                <p className="mt-3 text-sm leading-6 text-muted-foreground">{copy}</p>
                <ArrowUpRight className="mt-8 text-teal" size={21} />
              </div>
            ))}
          </div>
        </div>
      </section>

      <BuildBowl />

      <section className="mx-auto max-w-[1440px] px-5 py-20 lg:px-10 lg:py-28">
        <div className="grid gap-12 lg:grid-cols-[.75fr_1.25fr]">
          <div>
            <p className="mb-3 text-xs font-bold uppercase tracking-[.18em] text-teal">Choose your lane</p>
            <h2 className="display-font text-4xl font-bold leading-[.95] sm:text-6xl">
              What are you
              <br />
              <span className="text-coral">training for?</span>
            </h2>
            <p className="mt-5 max-w-[360px] text-sm leading-6 text-muted-foreground">
              No perfect plan required. Start with the kind of fuel your day is asking for.
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {trainingLanes.map(([title, desc], i) => (
              <Link
                href="/menu"
                className={`group flex items-end justify-between rounded-[22px] p-5 ${i === 0 ? "bg-teal text-cream" : i === 1 ? "bg-sun text-ink" : i === 2 ? "bg-[#f2d7c6] text-ink" : "bg-[#dfead6] text-ink"}`}
                key={title}
                data-testid={`link-category-${title.toLowerCase().replaceAll(" ", "-")}`}
              >
                <div>
                  <p className="text-lg font-bold">{title}</p>
                  <p className="mt-1 text-xs opacity-65">{desc}</p>
                </div>
                <ArrowUpRight className="transition group-hover:-translate-y-1 group-hover:translate-x-1" size={20} />
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#f2d7c6] px-5 py-20 lg:px-10 lg:py-28">
        <div className="mx-auto grid max-w-[1440px] gap-12 lg:grid-cols-[1fr_1fr] lg:items-center">
          <div>
            <p className="mb-3 text-xs font-bold uppercase tracking-[.18em] text-coral">Know what’s on your plate</p>
            <h2 className="display-font text-4xl font-bold leading-none sm:text-6xl">
              Macros without
              <br />
              <span className="text-teal">the spreadsheet.</span>
            </h2>
            <p className="mt-6 max-w-[450px] text-sm leading-7 text-ink/65">
              Every Fit Fuel Kitchen meal puts protein, calories, carbs, and fat where you can see them. Because
              confidence tastes better when it comes with context.
            </p>
            <div className="mt-8 grid max-w-[480px] grid-cols-3 gap-2">
              <div className="rounded-2xl bg-cream p-4">
                <Flame className="text-coral" size={19} />
                <p className="display-font mt-5 text-3xl font-bold">30g</p>
                <p className="mt-1 text-[10px] font-bold uppercase tracking-wider text-ink/45">Avg protein</p>
              </div>
              <div className="rounded-2xl bg-cream p-4">
                <Zap className="text-teal" size={19} />
                <p className="display-font mt-5 text-3xl font-bold">380</p>
                <p className="mt-1 text-[10px] font-bold uppercase tracking-wider text-ink/45">Avg kcal</p>
              </div>
              <div className="rounded-2xl bg-cream p-4">
                <Leaf className="text-teal" size={19} />
                <p className="display-font mt-5 text-3xl font-bold">22</p>
                <p className="mt-1 text-[10px] font-bold uppercase tracking-wider text-ink/45">Menu items</p>
              </div>
            </div>
          </div>
          <div className="rounded-[26px] bg-ink p-7 text-cream sm:p-10">
            <p className="text-xs font-bold uppercase tracking-[.17em] text-sun">Why Fit Fuel</p>
            <div className="mt-8 space-y-7">
              {whyFitFuel.map(([n, title, copy]) => (
                <div className="flex gap-4 border-b border-cream/10 pb-6 last:border-0 last:pb-0" key={n}>
                  <span className="display-font text-2xl font-bold text-sun">{n}</span>
                  <div>
                    <h3 className="font-bold">{title}</h3>
                    <p className="mt-2 text-sm leading-6 text-cream/55">{copy}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1440px] px-5 py-20 lg:px-10 lg:py-28">
        <div className="flex items-end justify-between gap-5">
          <div>
            <p className="mb-3 text-xs font-bold uppercase tracking-[.18em] text-coral">The word on the street</p>
            <h2 className="display-font text-4xl font-bold leading-none sm:text-5xl">
              Good fuel
              <br />
              <span className="text-teal">gets noticed.</span>
            </h2>
          </div>
          <Star className="hidden fill-sun text-sun sm:block" size={34} />
        </div>
        <div className="mt-10 grid gap-3 md:grid-cols-3">
          {testimonials.map(([quote, name, detail], i) => (
            <div className={`rounded-[22px] p-6 ${i === 1 ? "bg-teal text-cream" : "border border-line bg-card"}`} key={name}>
              <div className="flex gap-1 text-sun">
                <Star size={13} fill="currentColor" />
                <Star size={13} fill="currentColor" />
                <Star size={13} fill="currentColor" />
                <Star size={13} fill="currentColor" />
                <Star size={13} fill="currentColor" />
              </div>
              <p className="mt-7 text-lg font-bold leading-7">{quote}</p>
              <p className={`mt-8 text-xs font-bold ${i === 1 ? "text-cream/55" : "text-muted-foreground"}`}>
                {name} · {detail}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-[#dfead6] px-5 py-20 lg:px-10 lg:py-28">
        <div className="mx-auto grid max-w-[900px] gap-12 md:grid-cols-[.7fr_1.3fr]">
          <div>
            <p className="mb-3 text-xs font-bold uppercase tracking-[.18em] text-teal">Questions, answered</p>
            <h2 className="display-font text-4xl font-bold leading-none sm:text-5xl">
              Before you
              <br />
              <span className="text-coral">dig in.</span>
            </h2>
          </div>
          <div className="divide-y divide-ink/10">
            {faqs.map(([question, answer], i) => (
              <div key={question}>
                <button
                  onClick={() => setFaq(faq === i ? -1 : i)}
                  aria-expanded={faq === i}
                  className="flex w-full items-center justify-between gap-5 py-5 text-left font-bold"
                  data-testid={`button-faq-${i}`}
                >
                  <span>{question}</span>
                  <ChevronDown className={`shrink-0 transition ${faq === i ? "rotate-180 text-coral" : "text-teal"}`} size={18} />
                </button>
                {faq === i && <p className="max-w-[600px] pb-5 text-sm leading-6 text-ink/60">{answer}</p>}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-sun px-5 py-14 text-center lg:px-10">
        <h2 className="display-font text-3xl font-bold sm:text-5xl">Fuel Your Body. Feed Your Goals.</h2>
        <p className="mx-auto mt-3 max-w-[450px] text-sm text-ink/65">Your next good decision is ready when you are.</p>
        <Link
          href="/menu"
          className="mt-6 inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3.5 text-sm font-bold text-cream"
          data-testid="link-final-menu"
        >
          Start with the menu <ArrowRight size={16} />
        </Link>
      </section>
    </>
  );
}
