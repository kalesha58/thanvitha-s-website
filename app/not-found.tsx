import Link from "next/link";
import { ArrowRight, Leaf } from "lucide-react";

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[70vh] max-w-[640px] flex-col items-center justify-center px-5 py-20 text-center">
      <span className="grid h-16 w-16 place-items-center rounded-full bg-sun text-ink">
        <Leaf size={26} />
      </span>
      <p className="mt-6 text-xs font-bold uppercase tracking-[.18em] text-teal">404</p>
      <h1 className="display-font mt-3 text-5xl font-bold sm:text-6xl">
        This plate
        <br />
        <span className="text-coral">isn’t on the menu.</span>
      </h1>
      <p className="mt-5 max-w-[400px] text-sm leading-6 text-muted-foreground">
        That page doesn’t exist. Head back to the kitchen and pick your next meal.
      </p>
      <Link
        href="/menu"
        className="mt-8 inline-flex items-center gap-2 rounded-full bg-teal px-6 py-3.5 text-sm font-bold text-cream"
      >
        Browse the menu <ArrowRight size={16} />
      </Link>
    </div>
  );
}
