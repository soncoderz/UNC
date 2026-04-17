"use client";

import { useState } from "react";
import Link from "next/link";
import RemoteImage from "@/components/uniconvtor/RemoteImage";
import { cloneNews } from "@/data/uniconvtor";
import SlideIn from "@/components/animations/SlideIn";
import { StaggerContainer } from "@/components/animations/StaggerContainer";

export default function NewsSection() {
  const [activePage, setActivePage] = useState(0);
  const newsPages = Array.from({ length: Math.ceil(cloneNews.length / 3) }, (_, index) =>
    cloneNews.slice(index * 3, index * 3 + 3)
  );
  const activeNews = newsPages[activePage] || newsPages[0] || [];

  return (
    <section className="main ind-new overflow-hidden" id="news">
      <SlideIn direction="up" distance={30} className="title1 title2">
        <h3 className="text-4xl">Corporate News</h3>
        <h6 className="text-base" />
      </SlideIn>

      <div className="swiper-new">
        <div className="swiper-wrapper">
          <StaggerContainer staggerChildren={0.15} className="swiper-slide">
            {activeNews.map((item) => (
              <article key={item.id} className="ind-newlist">
                <Link className="ind-newImg" href={`/news/${item.id}`}>
                  <RemoteImage
                    src={item.image}
                    alt={item.title}
                    width={420}
                    height={240}
                    sizes="(max-width: 900px) 100vw, 22vw"
                  />
                </Link>
                <div className="ind-newTime">
                  <RemoteImage
                    src="/template/default/esimg/icon/icon_time.png"
                    alt=""
                    width={19}
                    height={19}
                  />
                  <i className="text-xl">{item.date}</i>
                </div>
                <Link href={`/news/${item.id}`} className="text-xl ind-newText">
                  {item.title}
                </Link>
                <span className="text-base ind-newLabel">{item.category}</span>
              </article>
            ))}
          </StaggerContainer>
        </div>

        <div className="swiper-pagination pagination-home">
          {newsPages.map((_, index) => (
            <button
              key={index}
              type="button"
              aria-label={`Go to news page ${index + 1}`}
              className={`swiper-pagination-bullet ${
                activePage === index ? "swiper-pagination-bullet-active" : ""
              }`}
              onClick={() => setActivePage(index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
