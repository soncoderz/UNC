"use client";

import { createContext, useContext, useState, useCallback } from "react";

/**
 * Language Context - Quản lý đa ngôn ngữ (EN/VI/ZH)
 */

const translations = {
  en: {
    nav: {
      home: "Home",
      products: "Products",
      company: "Company",
      news: "News",
      support: "Support",
      contact: "Contact",
    },
    home: {
      heroTitle: "Powering the Future with Clean Energy",
      heroSubtitle:
        "Leading manufacturer of high-efficiency solar inverters and energy storage systems",
      cta: "Explore Products",
      ctaSecondary: "Contact Us",
    },
    products: {
      title: "Our Products",
      subtitle: "Innovative solutions for every solar application",
      viewDetails: "View Details",
      allCategories: "All Categories",
    },
    company: {
      title: "About Us",
      subtitle: "15+ years of innovation in renewable energy",
    },
    contact: {
      title: "Contact Us",
      subtitle: "Get in touch with our team",
      name: "Full Name",
      email: "Email Address",
      phone: "Phone Number",
      subject: "Subject",
      message: "Message",
      send: "Send Message",
    },
    common: {
      learnMore: "Learn More",
      readMore: "Read More",
      download: "Download",
      loading: "Loading...",
    },
  },
  vi: {
    nav: {
      home: "Trang chủ",
      products: "Sản phẩm",
      company: "Công ty",
      news: "Tin tức",
      support: "Hỗ trợ",
      contact: "Liên hệ",
    },
    home: {
      heroTitle: "Kiến tạo tương lai với năng lượng sạch",
      heroSubtitle:
        "Nhà sản xuất hàng đầu biến tần năng lượng mặt trời và hệ thống lưu trữ năng lượng",
      cta: "Khám phá sản phẩm",
      ctaSecondary: "Liên hệ",
    },
    products: {
      title: "Sản phẩm",
      subtitle: "Giải pháp sáng tạo cho mọi ứng dụng năng lượng mặt trời",
      viewDetails: "Xem chi tiết",
      allCategories: "Tất cả danh mục",
    },
    company: {
      title: "Về chúng tôi",
      subtitle: "15+ năm đổi mới trong năng lượng tái tạo",
    },
    contact: {
      title: "Liên hệ",
      subtitle: "Liên hệ với đội ngũ của chúng tôi",
      name: "Họ và tên",
      email: "Email",
      phone: "Số điện thoại",
      subject: "Chủ đề",
      message: "Nội dung",
      send: "Gửi tin nhắn",
    },
    common: {
      learnMore: "Tìm hiểu thêm",
      readMore: "Đọc thêm",
      download: "Tải xuống",
      loading: "Đang tải...",
    },
  },
  zh: {
    nav: {
      home: "首页",
      products: "产品",
      company: "公司",
      news: "新闻",
      support: "支持",
      contact: "联系",
    },
    home: {
      heroTitle: "用清洁能源驱动未来",
      heroSubtitle: "高效太阳能逆变器和储能系统的领先制造商",
      cta: "探索产品",
      ctaSecondary: "联系我们",
    },
    products: {
      title: "产品",
      subtitle: "适用于各种太阳能应用的创新解决方案",
      viewDetails: "查看详情",
      allCategories: "所有类别",
    },
    company: {
      title: "关于我们",
      subtitle: "15年以上可再生能源创新",
    },
    contact: {
      title: "联系我们",
      subtitle: "联系我们的团队",
      name: "姓名",
      email: "电子邮件",
      phone: "电话",
      subject: "主题",
      message: "信息",
      send: "发送消息",
    },
    common: {
      learnMore: "了解更多",
      readMore: "阅读更多",
      download: "下载",
      loading: "加载中...",
    },
  },
};

const LanguageContext = createContext(undefined);

export function LanguageProvider({ children }) {
  const [locale, setLocale] = useState("en");

  const t = useCallback(
    (key) => {
      const keys = key.split(".");
      let value = translations[locale];
      for (const k of keys) {
        value = value?.[k];
      }
      return value || key;
    },
    [locale]
  );

  const switchLanguage = useCallback((lang) => {
    if (translations[lang]) {
      setLocale(lang);
    }
  }, []);

  return (
    <LanguageContext.Provider
      value={{ locale, t, switchLanguage, availableLocales: ["en", "vi", "zh"] }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}

export default LanguageContext;
