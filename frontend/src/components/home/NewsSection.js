import Image from "next/image";
import Link from "next/link";

/**
 * NewsSection - Noticias corporativas section giống UNC Energy
 * Hiển thị tin tức công ty
 */
export default function NewsSection() {
  const news = [
    {
      id: 1,
      image: "/news-product.png",
      date: "2024-02-15",
      title: "uneng ...",
      category: "Noticias corporativas",
      href: "/news/1",
    },
    {
      id: 2,
      image: "/news-exhibition.png",
      date: "2024-03-02",
      title: "New Upgrade, Deep Empowerment - Qingdao Youneng Chuang Debuts at the...",
      category: "Noticias corporativas",
      href: "/news/2",
    },
    {
      id: 3,
      image: "/news-certification.png",
      date: "2025-04-25",
      title: "UNC's Residential hybrid inverter obtained the TÜV Rheinland cert...",
      category: "Noticias corporativas",
      href: "/news/3",
    },
  ];

  return (
    <section className="py-20 lg:py-28 bg-white" id="news">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-dark">Noticias corporativas</h2>
        </div>

        {/* News Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {news.map((item) => (
            <Link key={item.id} href={item.href} className="news-card group">
              <div className="overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.title}
                  width={400}
                  height={250}
                  className="news-card-image group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="news-card-body">
                <div className="news-card-date">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10"/>
                    <polyline points="12,6 12,12 16,14"/>
                  </svg>
                  {item.date}
                </div>
                <h3 className="news-card-title">
                  {item.title}
                </h3>
                <div className="news-card-category">
                  {item.category}
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <Link href="/news" className="btn-blue">
            Más
          </Link>
        </div>
      </div>
    </section>
  );
}
