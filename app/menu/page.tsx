import type { Metadata } from "next";
import { MenuPage } from "@/components/menu-page";

export const metadata: Metadata = {
  title: "Menu",
  description: "Browse protein-packed bowls, plates, breakfast, and snacks from Thanvinta’s Fit Fuel Kitchen.",
};

export default function Page() {
  return <MenuPage />;
}
