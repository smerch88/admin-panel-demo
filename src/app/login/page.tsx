import type { Metadata } from "next";
import LoginView from "@/view/login/login.view";

export const metadata: Metadata = {
  title: "Login | Inharmony Admin",
  description: "Login to Inharmony admin panel",
};

export default function LoginPage() {
  return <LoginView />;
}
