import type { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Inharmony Admin",
  description: "Admin panel for managing Inharmony platform",
};

export default function HomePage() {
  redirect("/collections");
}
