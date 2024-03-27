import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";

export async function middleware(req: NextRequest) {
    console.log("Middleware Hit");

    const res = NextResponse.next();
    const supabaseMiddlewareClient = createMiddlewareClient({ req, res });
    const response = await supabaseMiddlewareClient.auth.getUser();

    if (!response.data.user && req.nextUrl.pathname.startsWith("/dashboard")) {
        return Response.redirect(new URL("/login", req.url));
    }

    if (response.data.user && req.nextUrl.pathname.startsWith("/login")) {
        return Response.redirect(new URL("/dashboard", req.url));
    }

    if (response.data.user && req.nextUrl.pathname.startsWith("/register")) {
        return Response.redirect(new URL("/dashboard", req.url));
    }
}

export const config = {
    matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
}