"use client";

import { ArrowUpRight, Check, MapPin, Utensils } from "lucide-react";
import { trackStages, WHATSAPP_URL } from "@/data/site";

export function TrackPage() {
  return (
    <div className="mx-auto max-w-[1000px] px-5 py-12 lg:py-20">
      <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
        <div>
          <p className="mb-3 text-xs font-bold uppercase tracking-[.18em] text-teal">Live order</p>
          <h1 className="display-font text-5xl font-bold sm:text-7xl">
            On the
            <br />
            <span className="text-coral">move.</span>
          </h1>
        </div>
        <div className="rounded-2xl bg-sun px-4 py-3 text-sm font-bold">
          <p className="text-[10px] uppercase tracking-widest text-ink/50">Order FFK-2841</p>
          <p className="mt-1">Arriving today · 11:20–11:45</p>
        </div>
      </div>
      <div className="mt-12 grid gap-8 md:grid-cols-[1fr_.65fr]">
        <div className="rounded-[26px] bg-ink p-6 text-cream sm:p-8">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-[.16em] text-sun">Kitchen status</p>
              <h2 className="display-font mt-2 text-3xl font-bold">Making it fresh.</h2>
            </div>
            <div className="grid h-14 w-14 place-items-center rounded-full bg-teal">
              <Utensils size={23} />
            </div>
          </div>
          <div className="mt-10 space-y-6">
            {trackStages.map((s, i) => (
              <div className="relative flex gap-4" key={s.label}>
                {i < trackStages.length - 1 && (
                  <span className={`absolute top-7 left-[11px] h-12 w-px ${i < 2 ? "bg-teal" : "bg-cream/15"}`} />
                )}
                <span
                  className={`relative z-10 grid h-6 w-6 shrink-0 place-items-center rounded-full border-2 ${i < 2 ? "border-teal bg-teal text-ink" : "border-cream/20 bg-ink"}`}
                >
                  {i < 2 && <Check size={13} />}
                </span>
                <div className="flex flex-1 justify-between gap-3">
                  <div>
                    <p className={`text-sm font-bold ${i < 2 ? "text-cream" : "text-cream/35"}`}>{s.label}</p>
                    <p className="mt-1 text-xs text-cream/45">{s.detail}</p>
                  </div>
                  <span className="text-xs text-cream/40">{s.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="space-y-3">
          <div className="rounded-[22px] border border-line bg-card p-5">
            <div className="flex items-center gap-3">
              <span className="grid h-10 w-10 place-items-center rounded-full bg-muted text-teal">
                <MapPin size={18} />
              </span>
              <div>
                <p className="text-xs text-muted-foreground">Delivering to</p>
                <p className="mt-1 text-sm font-bold">Sukhumvit 24, Bangkok</p>
              </div>
            </div>
            <button
              className="mt-5 flex w-full items-center justify-between border-t border-line pt-4 text-sm font-bold text-teal"
              onClick={() => alert("Your rider chat will be available when the order is picked up.")}
              data-testid="button-contact-rider"
            >
              Contact rider <ArrowUpRight size={15} />
            </button>
          </div>
          <div className="rounded-[22px] border border-line bg-[#dfead6] p-5">
            <p className="text-xs font-bold uppercase tracking-[.16em] text-teal">Good to know</p>
            <p className="mt-3 text-sm leading-6 text-ink/65">
              Need to change something? Message the kitchen before 11:00 and we’ll do our best.
            </p>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noreferrer"
              className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-teal"
              data-testid="link-track-whatsapp"
            >
              Message kitchen <ArrowUpRight size={15} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
