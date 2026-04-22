import { NextRequest, NextResponse } from "next/server";
import * as companyService from "@/services/companyService";
import type { ApiResponse, CompanyInfo } from "@/types";

/**
 * Company Controller - Xử lý HTTP requests cho company
 */

// GET /api/company - Lấy thông tin công ty
export async function getCompanyInfo(request: NextRequest) {
  try {
    const company = await companyService.getCompanyInfo();

    const response: ApiResponse<CompanyInfo> = {
      status: 200,
      message: "Lấy thông tin công ty thành công",
      data: company,
      timestamp: new Date().toISOString(),
    };

    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    console.error("Lỗi khi lấy thông tin công ty:", error);
    
    const response: ApiResponse<null> = {
      status: 500,
      message: "Lỗi server khi lấy thông tin công ty",
      data: null,
      timestamp: new Date().toISOString(),
    };

    return NextResponse.json(response, { status: 500 });
  }
}
