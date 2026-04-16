# SolarTech Energy - Website

Website công ty SolarTech Energy - nhà sản xuất biến tần năng lượng mặt trời và hệ thống lưu trữ năng lượng.

## 📁 Cấu trúc dự án

```
Project_Dev_Web/
├── backend/                  # Next.js API Server (Port 3001)
│   ├── src/
│   │   ├── app/
│   │   │   ├── route.js              # Root API - Health check
│   │   │   └── api/
│   │   │       ├── products/
│   │   │       │   ├── route.js      # GET /api/products
│   │   │       │   └── [id]/route.js # GET /api/products/:id
│   │   │       ├── news/
│   │   │       │   ├── route.js      # GET /api/news
│   │   │       │   └── [id]/route.js # GET /api/news/:id
│   │   │       ├── contact/
│   │   │       │   └── route.js      # POST /api/contact
│   │   │       └── company/
│   │   │           └── route.js      # GET /api/company
│   │   ├── data/                     # Dữ liệu tĩnh JSON
│   │   │   ├── products.json
│   │   │   └── news.json
│   │   ├── services/                 # Business logic
│   │   │   ├── productService.js
│   │   │   └── newsService.js
│   │   └── utils/
│   │       └── helpers.js
│   ├── next.config.mjs               # CORS config
│   └── package.json
│
├── frontend/                 # Next.js Frontend (Port 3000)
│   ├── src/
│   │   ├── app/                      # Next.js App Router (Pages)
│   │   │   ├── layout.js             # Root layout (Navbar + Footer)
│   │   │   ├── globals.css           # Tailwind CSS + Design System
│   │   │   ├── page.js               # Trang chủ
│   │   │   ├── company/page.js       # Về công ty
│   │   │   ├── products/
│   │   │   │   ├── page.js           # Danh sách sản phẩm
│   │   │   │   └── [id]/page.js      # Chi tiết sản phẩm
│   │   │   ├── news/page.js          # Tin tức
│   │   │   ├── support/page.js       # Hỗ trợ kỹ thuật
│   │   │   └── contact/page.js       # Liên hệ
│   │   ├── components/
│   │   │   ├── common/               # Button, Input, Modal, Badge
│   │   │   ├── layout/               # Navbar, Footer
│   │   │   ├── products/             # ProductCard, ProductSpecs, ProductFilter
│   │   │   └── home/                 # HeroSection, CompanyIntro, FeaturedProducts
│   │   ├── constants/navigation.js   # Menu items, categories
│   │   ├── context/LanguageContext.js # Đa ngôn ngữ (EN/VI/ZH)
│   │   ├── hooks/                    # useFetch, useScrollPosition
│   │   ├── services/api.js           # API client
│   │   ├── utils/formatters.js       # Hàm tiện ích
│   │   └── assets/                   # Images, Icons
│   ├── .env.local                    # API URL config
│   └── package.json
│
└── README.md
```

## 🚀 Cách chạy

> Dự án đã được chuyển sang TypeScript. Source frontend/backend dùng `.ts` và `.tsx`.

### 0. MongoDB

Backend dùng MongoDB khi có biến môi trường `MONGODB_URI`. Nếu chưa cấu hình MongoDB, API sẽ tự fallback về dữ liệu seed JSON trong `backend/src/data` để bạn vẫn chạy demo được.

Tạo file `backend/.env.local`:

```env
MONGODB_URI=mongodb://127.0.0.1:27017
MONGODB_DB=solartech_energy
FRONTEND_URL=http://localhost:3000
AUTO_SEED_MONGODB=true
```

Khi MongoDB trống, backend sẽ tự seed `products`, `news`, và `company` vào database ở lần gọi API đầu tiên.

Tạo file `frontend/.env.local`:

```env
NEXT_PUBLIC_API_URL=http://localhost:3001
```

### 1. Backend (API Server)

```bash
cd backend
npm install
npm run dev
# → Chạy trên http://localhost:3001
```

### 2. Frontend (Giao diện)

```bash
cd frontend
npm install
npm run dev
# → Chạy trên http://localhost:3000
```

## 📡 API Endpoints

| Method | Endpoint              | Mô tả                          |
|--------|-----------------------|---------------------------------|
| GET    | `/api`                | Health check                    |
| GET    | `/api/products`       | Danh sách sản phẩm             |
| GET    | `/api/products?category=pv-inverters` | Lọc theo danh mục  |
| GET    | `/api/products?featured=true` | Sản phẩm nổi bật         |
| GET    | `/api/products/:id`   | Chi tiết sản phẩm              |
| GET    | `/api/news`           | Danh sách tin tức               |
| GET    | `/api/news/:id`       | Chi tiết tin tức                |
| GET    | `/api/company`        | Thông tin công ty               |
| POST   | `/api/contact`        | Gửi form liên hệ               |

## 🛠 Tech Stack

- **Backend**: Next.js 16 + TypeScript + MongoDB
- **Frontend**: Next.js 16 + TypeScript + Tailwind CSS v4
- **Fonts**: Inter, Outfit (Google Fonts)
- **Đa ngôn ngữ**: EN / VI / ZH
