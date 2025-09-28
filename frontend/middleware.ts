import { jwtDecode } from "jwt-decode";
import { NextRequest, NextResponse } from "next/server";

const protectedRoutes = ["/account", "/account/:path*"];
const publicRoutes = ["/authenticate", "/"];

export default async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;
  const isProtectedRoute = protectedRoutes.some((p) => {
    // This is a simple regex check, you can also use `req.nextUrl.pathname.startsWith('/account')`
    const pattern = new RegExp(`^${p.replace(/\/\:path\*/, "/.*")}$`);
    return pattern.test(path);
  });
  const isPublicRoute = publicRoutes.includes(path);

  const token = req.cookies.get("authToken");

  let decoded;
  try {
    if (token) {
      decoded = jwtDecode(token.value);
    }
  } catch (error) {
    console.error("Invalid token:", error);
    decoded = null;
  }

  const isOctopusUser =
    decoded?.iss === "https://api.octopus.energy/v1/graphql/";

  if (isProtectedRoute && !isOctopusUser) {
    return NextResponse.redirect(new URL("/authenticate", req.nextUrl));
  }

  if (isPublicRoute && isOctopusUser) {
    return NextResponse.redirect(new URL("/account", req.nextUrl));
  }

  return NextResponse.next();
}

// Routes Middleware should not run on
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
