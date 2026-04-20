import { NextRequest, NextResponse } from "next/server";
import * as contactService from "@/services/contactService";
import type { ApiResponse, ContactSubmission } from "@/types";

/**
 * Contact Controller - Xử lý HTTP requests cho contact
 */

// POST /api/contact - Gửi form liên hệ
export async function submitContact(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate input
    if (!body.name || !body.email || !body.message) {
      const response: ApiResponse<null> = {
        status: 400,
        message: "Vui lòng điền đầy đủ thông tin bắt buộc (name, email, message)",
        data: null,
        timestamp: new Date().toISOString(),
      };

      return NextResponse.json(response, { status: 400 });
    }

    const submission = await contactService.createContactSubmission(body);

    const response: ApiResponse<ContactSubmission> = {
      status: 201,
      message: "Gửi liên hệ thành công",
      data: submission,
      timestamp: new Date().toISOString(),
    };

    return NextResponse.json(response, { status: 201 });
  } catch (error) {
    console.error("Lỗi khi gửi liên hệ:", error);
    
    const response: ApiResponse<null> = {
      status: 500,
      message: error instanceof Error ? error.message : "Lỗi server khi gửi liên hệ",
      data: null,
      timestamp: new Date().toISOString(),
    };

    return NextResponse.json(response, { status: 500 });
  }
}
