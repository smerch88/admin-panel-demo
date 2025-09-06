"use client";

import { LoginLayout } from "@/components/common";
import { LoginForm } from "./components";

export default function LoginView() {
  return (
    <LoginLayout
      title="Вхід в систему"
      subtitle="Введіть ваші облікові дані для доступу"
    >
      <LoginForm />
    </LoginLayout>
  );
}
