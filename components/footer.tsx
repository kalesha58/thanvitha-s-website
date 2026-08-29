import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { WHATSAPP_URL } from "@/data/site";

export function Footer() {
  return (
    <footer className="bg-black px-5 pb-28 pt-16 text-cream md:pb-12 lg:px-10">
      <div className="mx-auto max-w-[1440px]">
        <div className="grid gap-12 md:grid-cols-[1.5fr_1fr_1fr] md:items-start">
          <div>
            <Link href="/" data-testid="link-logo" aria-label="Thanvita’s Fit Fuel Kitchen home">
              <Image
                src="/brand/logo-wordmark.png"
                alt="Thanvita’s Fit Fuel Kitchen — Eat healthy. Stay fit."
                width={720}
                height={240}
                className="h-auto w-full max-w-[380px]"
              />
            </Link>
            <p className="mt-6 max-w-[320px] text-sm leading-6 text-white/55">
              Food for the work. Big flavor, thoughtful macros, delivered across Bangkok.
            </p>
            <a
              className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-lime"
              href={WHATSAPP_URL}
              target="_blank"
              rel="noreferrer"
              data-testid="link-footer-whatsapp"
            >
              Chat with the kitchen <ArrowUpRight size={15} />
            </a>
          </div>
          <div>
            <p className="mb-5 text-[11px] font-bold uppercase tracking-[.2em] text-white/35">Explore</p>
            <div className="grid gap-3 text-sm text-white/70">
              <Link href="/menu" className="transition hover:text-lime" data-testid="link-footer-menu">
                Build your plate
              </Link>
              <Link href="/favorites" className="transition hover:text-lime" data-testid="link-footer-favorites">
                Saved meals
              </Link>
              <Link href="/track" className="transition hover:text-lime" data-testid="link-footer-track">
                Track an order
              </Link>
              <Link href="/admin" className="transition hover:text-lime" data-testid="link-footer-admin">
                Kitchen dashboard
              </Link>
            </div>
          </div>
          <div>
            <p className="mb-5 text-[11px] font-bold uppercase tracking-[.2em] text-white/35">Kitchen hours</p>
            <p className="text-sm leading-7 text-white/70">
              Mon – Sun
              <br />
              <strong className="text-white">10:30 — 21:30</strong>
              <br />
              Bangkok delivery zones
            </p>
          </div>
        </div>
        <div className="mt-14 flex flex-col justify-between gap-3 border-t border-white/10 pt-6 text-[11px] text-white/35 sm:flex-row">
          <span>© 2024 Thanvita’s Fit Fuel Kitchen</span>
          <span>Eat healthy. Stay fit.</span>
        </div>
      </div>
    </footer>
  );
}
