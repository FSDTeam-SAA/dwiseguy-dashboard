
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";


export async function middleware(req: NextRequest) {
    const token = await getToken({
        req,
        secret: process.env.NEXTAUTH_SECRET,
    });

    const { pathname } = req.nextUrl;

    // Define public routes that don't require authentication
    const publicRoutes = new Set([
        "/login",
        "/register",
        "/verify-otp",
        "/reset-password",
        "/newpassword",
        "/create-your-account",
        "/change-password",
        "/create-new-password",
    ]);

    // 1. Redirect guests (no token) to login if they try to access ANY non-public route
    if (!token) {
        if (!publicRoutes.has(pathname)) {
            return NextResponse.redirect(new URL("/login", req.url));
        }
        return NextResponse.next();
    }

    // 2. Authenticated user (token exists) logic:

    // For admins, any public route or the root should go to /dashboard
    if (pathname === "/" || publicRoutes.has(pathname)) {
        return NextResponse.redirect(new URL("/dashboard", req.url));
    }

    // Role check for dashboard routes
    if (pathname.startsWith("/dashboard")) {
        if (token.role !== "ADMIN") {
            return NextResponse.redirect(new URL("/login", req.url));
        }
        return NextResponse.next();
    }

    // Fallback for any other path (like /abc) for authenticated users - redirect to dashboard
    return NextResponse.redirect(new URL("/dashboard", req.url));
}


export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - api (API routes)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         * - images, music, no-image.jpg (public assets)
         */
        "/((?!api|_next/static|_next/image|favicon.ico|images|music|no-image.jpg).*)",
        "/"
    ],
};

