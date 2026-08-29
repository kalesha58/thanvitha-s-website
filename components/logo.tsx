import Image from "next/image";
import Link from "next/link";

export function Logo() {
  return (
    <Link href="/" className="group flex items-center" data-testid="link-logo" aria-label="Thanvita’s Fit Fuel Kitchen home">
      <Image
        src="/brand/logo-mark.png"
        alt="TF² Kitchen"
        width={112}
        height={112}
        priority
        className="h-12 w-12 rounded-full object-cover ring-1 ring-lime/50 transition duration-300 group-hover:ring-lime sm:h-14 sm:w-14"
      />
    </Link>
  );
}
