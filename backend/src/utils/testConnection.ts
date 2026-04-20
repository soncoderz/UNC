/**
 * Script kiểm tra kết nối MongoDB và Cloudinary
 * Chạy: npx tsx src/utils/testConnection.ts
 */

import { isMongoConfigured, getDb } from "@/lib/mongodb";
import { isCloudinaryConfigured } from "@/lib/cloudinary";

async function testConnections() {
  console.log("🔍 Kiểm tra cấu hình...\n");

  // Kiểm tra MongoDB
  console.log("📦 MongoDB:");
  if (isMongoConfigured()) {
    try {
      const db = await getDb();
      await db.command({ ping: 1 });
      console.log("  ✅ Đã kết nối thành công!");
      console.log(`  📊 Database: ${db.databaseName}`);
      
      // Liệt kê collections
      const collections = await db.listCollections().toArray();
      console.log(`  📁 Collections: ${collections.map(c => c.name).join(", ") || "Chưa có"}`);
    } catch (error) {
      console.log("  ❌ Không thể kết nối!");
      console.log(`  ⚠️  Lỗi: ${error instanceof Error ? error.message : "Unknown error"}`);
      console.log("  💡 Hệ thống sẽ sử dụng dữ liệu JSON fallback");
    }
  } else {
    console.log("  ⚠️  Chưa cấu hình MONGODB_URI");
    console.log("  💡 Hệ thống sẽ sử dụng dữ liệu JSON fallback");
  }

  console.log("\n☁️  Cloudinary:");
  if (isCloudinaryConfigured()) {
    console.log("  ✅ Đã cấu hình!");
    console.log(`  🌐 Cloud Name: ${process.env.CLOUDINARY_CLOUD_NAME}`);
  } else {
    console.log("  ⚠️  Chưa cấu hình");
    console.log("  💡 Cần cấu hình để upload ảnh");
  }

  console.log("\n✨ Kiểm tra hoàn tất!\n");
}

// Chạy test
testConnections()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("❌ Lỗi:", error);
    process.exit(1);
  });
