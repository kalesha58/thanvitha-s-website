import type { Metadata } from "next";
import { AdminPage } from "@/components/admin-page";

export const metadata: Metadata = {
  title: "Kitchen dashboard",
};

export default function Page() {
  return <AdminPage />;
}
