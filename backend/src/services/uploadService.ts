import cloudinary, { isCloudinaryConfigured } from "@/lib/cloudinary";

export interface UploadResult {
  url: string;
  publicId: string;
  width: number;
  height: number;
  format: string;
}

/**
 * Upload ảnh lên Cloudinary
 * @param file - File buffer hoặc base64 string
 * @param folder - Thư mục lưu trữ trên Cloudinary (mặc định: 'solartech')
 * @returns Thông tin ảnh đã upload
 */
export async function uploadImage(
  file: Buffer | string,
  folder: string = "solartech"
): Promise<UploadResult> {
  if (!isCloudinaryConfigured()) {
    throw new Error("Cloudinary chưa được cấu hình. Vui lòng kiểm tra file .env");
  }

  try {
    // Convert buffer to base64 nếu cần
    const fileStr = Buffer.isBuffer(file) 
      ? `data:image/jpeg;base64,${file.toString("base64")}`
      : file;

    const result = await cloudinary.uploader.upload(fileStr, {
      folder,
      resource_type: "auto",
      transformation: [
        { width: 1200, height: 1200, crop: "limit" },
        { quality: "auto:good" },
      ],
    });

    return {
      url: result.secure_url,
      publicId: result.public_id,
      width: result.width,
      height: result.height,
      format: result.format,
    };
  } catch (error) {
    console.error("Lỗi khi upload ảnh lên Cloudinary:", error);
    throw new Error("Không thể upload ảnh");
  }
}

/**
 * Xóa ảnh từ Cloudinary
 * @param publicId - Public ID của ảnh cần xóa
 */
export async function deleteImage(publicId: string): Promise<void> {
  if (!isCloudinaryConfigured()) {
    throw new Error("Cloudinary chưa được cấu hình");
  }

  try {
    await cloudinary.uploader.destroy(publicId);
  } catch (error) {
    console.error("Lỗi khi xóa ảnh từ Cloudinary:", error);
    throw new Error("Không thể xóa ảnh");
  }
}

/**
 * Upload nhiều ảnh cùng lúc
 */
export async function uploadMultipleImages(
  files: (Buffer | string)[],
  folder: string = "solartech"
): Promise<UploadResult[]> {
  const uploadPromises = files.map((file) => uploadImage(file, folder));
  return Promise.all(uploadPromises);
}
