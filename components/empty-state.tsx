import Link from "next/link";
import { ArrowRight, Leaf } from "lucide-react";

export function EmptyState({
  title,
  copy,
  action,
  href,
  onAction,
}: {
  title: string;
  copy: string;
  action: string;
  href?: string;
  onAction?: () => void;
}) {
  return (
    <div className="mt-12 flex flex-col items-center rounded-[26px] border border-dashed border-line bg-card/60 px-5 py-14 text-center">
      <span className="grid h-14 w-14 place-items-center rounded-full bg-sun text-ink">
        <Leaf size={23} />
      </span>
      <h2 className="mt-5 text-xl font-bold">{title}</h2>
      <p className="mt-2 max-w-[340px] text-sm leading-6 text-muted-foreground">{copy}</p>
      {href ? (
        <Link
          href={href}
          className="mt-6 inline-flex items-center gap-2 rounded-full bg-teal px-5 py-3 text-sm font-bold text-cream"
          data-testid="link-empty-action"
        >
          {action} <ArrowRight size={15} />
        </Link>
      ) : (
        <button
          onClick={onAction}
          className="mt-6 inline-flex items-center gap-2 rounded-full bg-teal px-5 py-3 text-sm font-bold text-cream"
          data-testid="button-empty-action"
        >
          {action} <ArrowRight size={15} />
        </button>
      )}
    </div>
  );
}
