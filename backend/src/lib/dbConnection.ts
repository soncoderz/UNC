import { getDb, isMongoConfigured } from "./mongodb";

let isConnected = false;

export async function connectDatabase() {
  if (isConnected) {
    return;
  }

  if (!isMongoConfigured()) {
    console.log("\n⚠️  MongoDB chưa được cấu hình");
    console.log("💡 Hệ thống sẽ sử dụng dữ liệu JSON fallback\n");
    return;
  }

  try {
    console.log("\n🔄 Đang kết nối MongoDB...");
    const db = await getDb();
    await db.command({ ping: 1 });
    
    console.log("✅ Kết nối MongoDB thành công!");
    console.log(`📊 Database: ${db.databaseName}`);
    
    // Liệt kê collections
    const collections = await db.listCollections().toArray();
    if (collections.length > 0) {
      console.log(`📁 Collections: ${collections.map(c => c.name).join(", ")}`);
    }
    console.log("");
    
    isConnected = true;
  } catch (error) {
    console.error("\n❌ Không thể kết nối MongoDB!");
    console.error(`⚠️  Lỗi: ${error instanceof Error ? error.message : "Unknown error"}`);
    console.log("💡 Hệ thống sẽ sử dụng dữ liệu JSON fallback\n");
  }
}

export function getConnectionStatus(): boolean {
  return isConnected;
}
