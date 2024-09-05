import { type NextRequest, NextResponse, MiddlewareConfig } from "next/server";
import { verifySession } from "@/lib/sessions";

export default async function middlewaare(req: NextRequest) {
	// declare routes
	const protectedRoutes = ["/profile"];
	const restrictedRoutes = ["/login", "/signup"];

	const currentPath = req.nextUrl.pathname;
	const verifiedSession = await verifySession();

	// check if it a protected route
	if (protectedRoutes.includes(currentPath)) {
		if (verifiedSession === null) {
			return NextResponse.redirect(new URL("/login", req.nextUrl));
		}
	}

	// check if it a protected route
	if (restrictedRoutes.includes(currentPath)) {
		if (verifiedSession !== null) {
			return NextResponse.redirect(new URL("/profile", req.nextUrl));
		}
	}

	return NextResponse.next();
}

export const config: MiddlewareConfig = {};
