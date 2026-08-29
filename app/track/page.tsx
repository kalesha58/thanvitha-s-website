import type { Metadata } from "next";
import { TrackPage } from "@/components/track-page";

export const metadata: Metadata = {
  title: "Track order",
};

export default function Page() {
  return <TrackPage />;
}
