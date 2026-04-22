import { NextResponse, type NextRequest } from "next/server";
import { getUserFromToken } from "@/services/authService";
import { formatError, formatResponse } from "@/utils/helpers";

/**
 * GET /api/auth/me
 * Requires: Authorization: Bearer <token>
 */
export async function GET(request: NextRequest) {
  try {
    const authHeader = request.headers.get("Authorization");
    if (!authHeader?.startsWith("Bearer ")) {
      return NextResponse.json(
        formatError("No token provided", 401),
        { status: 401 }
      );
    }

    const token = authHeader.slice(7);
    const user = await getUserFromToken(token);

    if (!user) {
      return NextResponse.json(
        formatError("Invalid or expired token", 401),
        { status: 401 }
      );
    }

    return NextResponse.json(formatResponse(user, "User retrieved"), { status: 200 });
  } catch (error) {
    console.error("Auth check error:", error);
    return NextResponse.json(formatError("Authentication failed"), { status: 500 });
  }
}
