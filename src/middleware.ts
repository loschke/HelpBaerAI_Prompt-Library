import { auth } from "@/auth";
import { NextRequest } from "next/server";

export default auth((req: NextRequest) => {
  // Erlaube Zugriff auf öffentliche Routen
  const publicRoutes = [
    "/",                    // Startseite
    "/auth/login", 
    "/auth/register", 
    "/auth/password-reset",
    "/auth/verify-email",
    "/auth/verify-email/success"
  ];

  // Prüfe ob aktuelle Route eine public Route ist
  if (publicRoutes.some(route => req.nextUrl.pathname.startsWith(route))) {
    return null;
  }

  // Prüfe Auth für geschützte Routen
  if (!req.auth) {
    const url = new URL("/auth/login", req.url);
    return Response.redirect(url);
  }
});

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
