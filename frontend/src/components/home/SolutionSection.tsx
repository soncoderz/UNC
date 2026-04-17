"use client";

import { useState } from "react";
import Link from "next/link";
import RemoteImage from "@/components/uniconvtor/RemoteImage";
import { asset, solutions } from "@/data/uniconvtor";
import SlideIn from "@/components/animations/SlideIn";
import { StaggerContainer } from "@/components/animations/StaggerContainer";

export default function SolutionSection() {
  const [activeSolution, setActiveSolution] = useState(0);

  return (
    <section className="ind-programme" id="solutions">
      <SlideIn direction="up" distance={40} className="title1">
        <h3 className="text-4xl">Solution</h3>
        <h6 className="text-base">
          Multiple working modes, can flexibly respond to various scenarios!
        </h6>
      </SlideIn>

      <StaggerContainer className="ind-programmeUl" staggerChildren={0.15}>
        {solutions.map((solution, index) => (
          <article
            key={solution.slug}
            className={`ind-programmeLi ${
              activeSolution === index ? "ind-programmeLiActive" : ""
            }`}
            onMouseEnter={() => setActiveSolution(index)}
          >
            <div className="ind-programmeTitle">
              <RemoteImage src={solution.icon} alt="" width={60} height={60} />
              <h5 className="text-xl">{solution.title}</h5>
            </div>
            <div className="ind-programmeText">
              <p className="text-sm">{solution.description}</p>
              <Link href={`/solutions/${solution.slug}`} className="btn1 text-base">
                MORE
              </Link>
            </div>
            <div className="ind-programmeVideo">
              <RemoteImage
                src={solution.poster}
                alt=""
                width={900}
                height={600}
                className="wap"
              />
              <video
                autoPlay
                muted
                loop
                playsInline
                poster={asset(solution.poster)}
                className="pc"
              >
                <source src={asset(solution.video)} type="video/mp4" />
              </video>
            </div>
          </article>
        ))}
      </StaggerContainer>
    </section>
  );
}
