import * as uploadController from "@/controllers/uploadController";

/**
 * GET /api/upload - Kiểm tra trạng thái cấu hình Cloudinary
 */
export const GET = uploadController.checkCloudinaryStatus;

/**
 * POST /api/upload - Upload ảnh lên Cloudinary
 * Body: { file: string (base64), folder?: string } hoặc { files: string[], folder?: string }
 */
export const POST = uploadController.uploadImages;
