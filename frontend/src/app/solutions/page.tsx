import Link from "next/link";
import InnerHero from "@/components/uniconvtor/InnerHero";
import RemoteImage from "@/components/uniconvtor/RemoteImage";
import { innerBanners, solutions } from "@/data/uniconvtor";

export default function SolutionsPage() {
  return (
    <>
      <InnerHero
        title="Solution"
        subtitle="Multiple working modes, can flexibly respond to various scenarios!"
        image={innerBanners.solutions}
      />

      <section className="clone-case-list" style={{ marginTop: '0', paddingTop: '60px', paddingBottom: '120px' }}>
        {solutions.map((solution) => (
          <Link href={`/solutions/${solution.slug}`} key={solution.slug} className="block outline-none" style={{ cursor: 'pointer' }}>
            <article className="clone-case-item hover:shadow-lg transition-shadow duration-300">
              <div className="clone-case-copy">
                <h2>
                  <RemoteImage src={solution.iconHover} alt="" width={42} height={42} />
                  {solution.title}
                </h2>
                <p>{solution.description}</p>
                {/* Omitted the MORE button as it doesn't appear in the image design */}
              </div>
              <div className="clone-case-image pr-8">
                <RemoteImage
                  src={solution.image}
                  alt={solution.title}
                  width={560}
                  height={330}
                  sizes="(max-width: 900px) 90vw, 560px"
                />
              </div>
            </article>
          </Link>
        ))}
      </section>
    </>
  );
}
