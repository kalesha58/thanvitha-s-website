"use client";

import { ArrowRight, BarChart3, Clock3, Flame, Heart, Zap } from "lucide-react";
import { adminOrders } from "@/data/site";

const stats = [
  ["Orders today", "47", "+12% vs last Tue", BarChart3],
  ["Revenue", "฿18,420", "+8.4% this week", Flame],
  ["Avg. prep time", "18 min", "2 min faster", Clock3],
  ["Repeat orders", "64%", "Healthy signal", Heart],
] as const;

export function AdminPage() {
  return (
    <div className="bg-[#f0f3e9]">
      <div className="mx-auto max-w-[1440px] px-5 py-10 lg:px-10 lg:py-16">
        <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <div>
            <p className="mb-3 text-xs font-bold uppercase tracking-[.18em] text-coral">Kitchen console</p>
            <h1 className="display-font text-5xl font-bold">
              Good morning,
              <br />
              <span className="text-teal">Thanvinta.</span>
            </h1>
          </div>
          <div className="flex items-center gap-2 text-sm font-bold text-ink/55">
            <span className="h-2 w-2 rounded-full bg-teal" /> Live · Tuesday, 24 Sep
          </div>
        </div>
        <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map(([label, value, sub, Icon]) => (
            <div key={label} className="rounded-[22px] border border-line bg-cream p-5">
              <div className="flex justify-between">
                <p className="text-xs font-bold uppercase tracking-[.13em] text-ink/45">{label}</p>
                <Icon size={17} className="text-teal" />
              </div>
              <p className="display-font mt-5 text-3xl font-bold">{value}</p>
              <p className="mt-2 text-xs font-bold text-teal">{sub}</p>
            </div>
          ))}
        </div>
        <div className="mt-8 grid gap-8 lg:grid-cols-[1.3fr_.7fr]">
          <div className="rounded-[24px] border border-line bg-cream p-5 sm:p-7">
            <div className="flex items-center justify-between">
              <h2 className="font-bold">Live orders</h2>
              <button
                className="text-xs font-bold text-teal"
                onClick={() => alert("Orders refreshed")}
                data-testid="button-refresh-orders"
              >
                Refresh
              </button>
            </div>
            <div className="mt-5 overflow-x-auto">
              <table className="w-full min-w-[620px] text-left text-sm">
                <thead className="border-b border-line text-[10px] uppercase tracking-[.14em] text-ink/40">
                  <tr>
                    <th className="pb-3">Order</th>
                    <th className="pb-3">Customer</th>
                    <th className="pb-3">Meal</th>
                    <th className="pb-3">Status</th>
                    <th className="pb-3 text-right">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {adminOrders.map((o) => (
                    <tr className="border-b border-line/70 last:border-0" key={o.id} data-testid={`row-admin-${o.id}`}>
                      <td className="py-4 font-bold text-teal">{o.id}</td>
                      <td className="py-4">{o.customer}</td>
                      <td className="py-4 text-ink/60">{o.meal}</td>
                      <td className="py-4">
                        <span
                          className={`rounded-full px-2.5 py-1 text-[10px] font-bold ${o.status === "Delivered" ? "bg-muted text-ink/50" : o.status === "Ready" ? "bg-sun text-ink" : "bg-teal/10 text-teal"}`}
                        >
                          {o.status}
                        </span>
                      </td>
                      <td className="py-4 text-right font-bold">{o.total}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className="rounded-[24px] bg-teal p-6 text-cream sm:p-7">
            <div className="flex items-center justify-between">
              <h2 className="font-bold">Today’s signal</h2>
              <Zap className="text-sun" size={19} />
            </div>
            <p className="display-font mt-10 text-6xl font-bold text-sun">82%</p>
            <p className="mt-2 text-sm text-cream/65">of your orders include 30g+ protein</p>
            <div className="mt-8 border-t border-cream/15 pt-5">
              <p className="text-xs leading-5 text-cream/65">
                The Green Goddess Bowl is moving 28% faster than last week. Keep it on the hero shelf.
              </p>
              <button
                onClick={() => alert("Menu spotlight updated")}
                className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-sun"
                data-testid="button-update-spotlight"
              >
                Update spotlight <ArrowRight size={15} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
