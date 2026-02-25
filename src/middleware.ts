import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";
import { Role } from "@prisma/client";

export async function middleware(request: NextRequest) {
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });

  const { pathname } = request.nextUrl;

  // Rotas públicas
  const publicRoutes = ["/login", "/register"];

  if (publicRoutes.includes(pathname)) {
    return NextResponse.next();
  }

  // Se não estiver autenticado
  if (!token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  const userRole = token.role as Role;

  // Proteção por Role
  if (pathname.startsWith("/admin") && userRole !== "ADMIN") {
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (
    pathname.startsWith("/support") &&
    userRole !== "SUPPORT" &&
    userRole !== "ADMIN"
  ) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/admin/:path*",
    "/support/:path*",
    "/dashboard/:path*",
  ],
};