import { NextResponse, type NextRequest } from "next/server";
import { connectDatabase } from "@/lib/dbConnection";
import { createContactSubmission } from "@/services/contactService";
import { formatError, formatResponse, isValidEmail } from "@/utils/helpers";
import type { ContactInput } from "@/types";

// Kết nối database được thực hiện trong mỗi handler

/**
 * POST /api/contact
 * Xử lý form liên hệ
 */
export async function OPTIONS() {
  return new NextResponse(null, { status: 204 });
}

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as Partial<ContactInput>;
    const { name, email, phone, subject, message } = body;

    // Validation
    if (!name || !email || !message) {
      return NextResponse.json(
        formatError("Name, email, and message are required", 400),
        { status: 400 }
      );
    }

    if (!isValidEmail(email)) {
      return NextResponse.json(
        formatError("Invalid email format", 400),
        { status: 400 }
      );
    }

    const contactData = await createContactSubmission({
      name,
      email,
      phone,
      subject,
      message,
    });

    return NextResponse.json(
      formatResponse(contactData, "Contact form submitted successfully"),
      { status: 201 }
    );
  } catch (error) {
    console.error("Error processing contact form:", error);
    return NextResponse.json(
      formatError("Failed to process contact form"),
      { status: 500 }
    );
  }
}
