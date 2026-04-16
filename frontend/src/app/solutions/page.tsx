import Link from "next/link";
import InnerHero from "@/components/uniconvtor/InnerHero";
import InnerNav from "@/components/uniconvtor/InnerNav";
import RemoteImage from "@/components/uniconvtor/RemoteImage";
import SectionTitle from "@/components/uniconvtor/SectionTitle";
import { innerBanners, solutionNav, solutions } from "@/data/uniconvtor";

export default function SolutionsPage() {
  return (
    <>
      <InnerHero
        title="Solution"
        subtitle="Multiple working modes, can flexibly respond to various scenarios!"
        image={innerBanners.solutions}
      />
      <InnerNav items={solutionNav} />

      <section className="clone-case-list">
        <SectionTitle
          title="Solution"
          subtitle="Multiple working modes, can flexibly respond to various scenarios!"
        />
        {solutions.map((solution) => (
          <article key={solution.slug} className="clone-case-item">
            <div className="clone-case-copy">
              <h2>
                <RemoteImage src={solution.iconHover} alt="" width={52} height={52} />
                {solution.title}
              </h2>
              <p>{solution.description}</p>
              <Link href={`/solutions/${solution.slug}`} className="clone-case-btn">
                MORE
              </Link>
            </div>
            <div className="clone-case-image">
              <RemoteImage
                src={solution.image}
                alt={solution.title}
                width={560}
                height={330}
                sizes="(max-width: 900px) 90vw, 560px"
              />
            </div>
          </article>
        ))}
      </section>
    </>
  );
}
