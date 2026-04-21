import { NextResponse } from "next/server";
import { connectDatabase } from "@/lib/dbConnection";
import { getCompanyInfo } from "@/services/companyService";
import { formatError, formatResponse } from "@/utils/helpers";

// Kết nối database được thực hiện trong mỗi handler

/**
 * GET /api/company
 * Thông tin công ty
 */
export async function GET() {
  try {
    await connectDatabase();
    const companyInfo = await getCompanyInfo();
    return NextResponse.json(formatResponse(companyInfo), { status: 200 });
  } catch (error) {
    console.error("Error fetching company info:", error);
    return NextResponse.json(formatError("Failed to fetch company info"), { status: 500 });
  }
}
