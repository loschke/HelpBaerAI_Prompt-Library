// Diese Datei gehört ins Root-Verzeichnis: /middleware.ts (neben auth.ts)
import { auth } from "./auth"

export default auth((req) => {
  // Erlaube Zugriff auf öffentliche Routen
  const publicRoutes = ["/auth/login", "/auth/register", "/auth/password-reset"]
  if (publicRoutes.includes(req.nextUrl.pathname)) {
    return null
  }

  // Prüfe Auth für geschützte Routen
  if (!req.auth) {
    const url = new URL("/auth/login", req.url)
    return Response.redirect(url)
  }
})

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}
