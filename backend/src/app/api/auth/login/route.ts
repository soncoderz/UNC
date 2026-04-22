import { NextResponse, type NextRequest } from "next/server";
import { login } from "@/services/authService";
import { formatError, formatResponse } from "@/utils/helpers";
import type { LoginInput } from "@/types";

/**
 * POST /api/auth/login
 */
export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as LoginInput;

    if (!body.email || !body.password) {
      return NextResponse.json(
        formatError("Email and password are required", 400),
        { status: 400 }
      );
    }

    const result = await login(body.email, body.password);

    if (!result) {
      return NextResponse.json(
        formatError("Invalid email or password", 401),
        { status: 401 }
      );
    }

    return NextResponse.json(formatResponse(result, "Login successful"), { status: 200 });
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(formatError("Login failed"), { status: 500 });
  }
}
