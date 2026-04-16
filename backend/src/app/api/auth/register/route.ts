import { NextResponse, type NextRequest } from "next/server";
import { register } from "@/services/authService";
import { formatError, formatResponse } from "@/utils/helpers";
import type { RegisterInput } from "@/types";

/**
 * POST /api/auth/register
 */
export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as RegisterInput;

    if (!body.email || !body.password || !body.name) {
      return NextResponse.json(
        formatError("Email, password, and name are required", 400),
        { status: 400 }
      );
    }

    if (body.password.length < 6) {
      return NextResponse.json(
        formatError("Password must be at least 6 characters", 400),
        { status: 400 }
      );
    }

    const result = await register(body.email, body.password, body.name);

    if (!result) {
      return NextResponse.json(
        formatError("Email already exists", 409),
        { status: 409 }
      );
    }

    return NextResponse.json(formatResponse(result, "Registration successful"), { status: 201 });
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json(formatError("Registration failed"), { status: 500 });
  }
}
