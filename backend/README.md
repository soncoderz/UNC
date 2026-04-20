# SolarTech Energy - Backend API

Backend API cho hệ thống quản lý sản phẩm năng lượng mặt trời, được xây dựng với Next.js App Router.

## Tính năng

- ✅ Kết nối MongoDB với auto-fallback sang dữ liệu JSON
- ✅ Upload ảnh lên Cloudinary
- ✅ Auto-seed dữ liệu mẫu khi khởi động
- ✅ RESTful API cho Products, News, Company
- ✅ Authentication với JWT
- ✅ TypeScript support

## Cài đặt nhanh

### 1. Cài đặt dependencies:
```bash
npm install
```

### 2. Cấu hình môi trường:
Tạo file `.env` từ template:
```bash
cp .env.example .env
```

Cập nhật thông tin trong `.env`:
```env
# MongoDB (tùy chọn - nếu không có sẽ dùng dữ liệu JSON)
MONGODB_URI=mongodb://localhost:27017
MONGODB_DB=solartech_energy
AUTO_SEED_MONGODB=true

# Cloudinary (bắt buộc nếu muốn upload ảnh)
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# JWT Secret
JWT_SECRET=your-secret-key
```

### 3. Chạy development server:
```bash
npm run dev
```

Backend sẽ chạy tại: **http://localhost:3001**

## Cách hoạt động

### Dữ liệu tự động fallback:
- **Có MongoDB**: Tự động seed dữ liệu mẫu và sử dụng database
- **Không có MongoDB**: Tự động sử dụng dữ liệu từ file JSON trong `src/data/`

### Upload ảnh:
- **Có Cloudinary**: Ảnh được upload lên cloud
- **Không có Cloudinary**: API trả về lỗi với hướng dẫn cấu hình

## Hướng dẫn chi tiết

Xem file [SETUP.md](./SETUP.md) để biết hướng dẫn chi tiết về:
- Cài đặt MongoDB
- Cấu hình Cloudinary
- API endpoints
- Troubleshooting

## API Endpoints

### Products
- `GET /api/products` - Lấy tất cả sản phẩm
- `GET /api/products/:id` - Lấy sản phẩm theo ID
- `POST /api/products` - Tạo sản phẩm mới
- `PUT /api/products/:id` - Cập nhật sản phẩm
- `DELETE /api/products/:id` - Xóa sản phẩm

### News
- `GET /api/news` - Lấy tất cả tin tức
- `GET /api/news/:id` - Lấy tin tức theo ID

### Company
- `GET /api/company` - Lấy thông tin công ty

### Upload
- `GET /api/upload` - Kiểm tra trạng thái Cloudinary
- `POST /api/upload` - Upload ảnh lên Cloudinary

### Authentication
- `POST /api/auth/register` - Đăng ký tài khoản
- `POST /api/auth/login` - Đăng nhập
- `GET /api/auth/me` - Lấy thông tin user hiện tại

## Cấu trúc thư mục

```
backend/
├── src/
│   ├── app/
│   │   └── api/          # API routes
│   ├── data/             # Dữ liệu mẫu (JSON)
│   ├── lib/              # MongoDB & Cloudinary config
│   ├── services/         # Business logic
│   ├── utils/            # Helper functions
│   └── types.ts          # TypeScript types
├── .env                  # Environment variables
└── package.json
```

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Database**: MongoDB
- **Cloud Storage**: Cloudinary
- **Authentication**: JWT + bcryptjs
- **Language**: TypeScript

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [MongoDB Node.js Driver](https://www.mongodb.com/docs/drivers/node/)
- [Cloudinary Documentation](https://cloudinary.com/documentation)
