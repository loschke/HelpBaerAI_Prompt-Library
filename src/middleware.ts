import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { auth } from "./app/api/auth/[...nextauth]/route";

export async function middleware(request: NextRequest) {
  const session = await auth();
  const path = request.nextUrl.pathname;

  // Public routes - allow access
  if (
    path.startsWith("/auth") ||
    path === "/" ||
    path.startsWith("/api/auth") ||
    path.startsWith("/_next") ||
    path.includes("favicon.ico")
  ) {
    return NextResponse.next();
  }

  // Check if user is authenticated
  if (!session?.user) {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  // Admin routes protection
  if (path.startsWith("/admin") || path.startsWith("/api/admin")) {
    if (session.user.role !== "ADMIN" && session.user.role !== "SUPER_ADMIN") {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  // Super Admin routes protection
  if (path.startsWith("/super-admin")) {
    if (session.user.role !== "SUPER_ADMIN") {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  // Partner routes protection
  if (path.startsWith("/partner")) {
    if (
      session.user.role !== "PARTNER" && 
      session.user.role !== "ADMIN" && 
      session.user.role !== "SUPER_ADMIN"
    ) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  // Premium content protection
  if (path.startsWith("/premium")) {
    const userRole = session.user.role;
    const currentPlan = (session.user as any).currentPlan;

    if (
      currentPlan !== "PREMIUM" && 
      currentPlan !== "PARTNER_LIFETIME" && 
      userRole !== "ADMIN" && 
      userRole !== "SUPER_ADMIN"
    ) {
      return NextResponse.redirect(new URL("/pricing", request.url));
    }
  }

  return NextResponse.next();
}

// Specify which routes should be protected
export const config = {
  matcher: [
    // Protected routes
    "/dashboard/:path*",
    "/admin/:path*",
    "/super-admin/:path*",
    "/partner/:path*",
    "/premium/:path*",
    "/api/admin/:path*",
    "/api/partner/:path*",
    "/api/user/:path*",
    // Exclude auth routes and public assets
    "/((?!auth|_next/static|_next/image|favicon.ico).*)",
  ],
};
