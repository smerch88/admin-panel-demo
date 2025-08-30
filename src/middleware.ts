import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Публічні маршрути, які не потребують авторизації
  const publicRoutes = ["/login"];

  // Перевіряємо чи це публічний маршрут
  if (publicRoutes.includes(pathname)) {
    return NextResponse.next();
  }

  // Для всіх інших маршрутів перевіряємо авторизацію
  // Оскільки токен зберігається в httpOnly cookies,
  // ми не можемо перевірити його в middleware
  // Тому перенаправлення буде оброблятися в ProtectedRoute компоненті

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
