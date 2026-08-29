import type { Metadata } from "next";
import { FavoritesPage } from "@/components/favorites-page";

export const metadata: Metadata = {
  title: "Saved meals",
};

export default function Page() {
  return <FavoritesPage />;
}
