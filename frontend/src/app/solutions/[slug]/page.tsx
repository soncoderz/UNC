import Link from "next/link";
import { notFound } from "next/navigation";
import InnerHero from "@/components/uniconvtor/InnerHero";
import InnerNav from "@/components/uniconvtor/InnerNav";
import RemoteImage from "@/components/uniconvtor/RemoteImage";
import SectionTitle from "@/components/uniconvtor/SectionTitle";
import {
  asset,
  cloneProducts,
  innerBanners,
  solutionNav,
  solutions,
} from "@/data/uniconvtor";

interface SolutionDetailPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function SolutionDetailPage({ params }: SolutionDetailPageProps) {
  const { slug } = await params;
  const solution = solutions.find((item) => item.slug === slug);

  if (!solution) {
    notFound();
  }

  const currentHref = `/solutions/${solution.slug}`;
  const otherSolutions = solutions.filter((item) => item.slug !== solution.slug);
  const productCategory =
    solution.slug === "photovoltaic"
      ? "pv-inverters"
      : solution.slug === "commercial"
      ? "energy-storage"
      : "hybrid-inverters";
  const recommended = cloneProducts
    .filter((product) => product.category === productCategory)
    .slice(0, 3);

  return (
    <>
      <InnerHero
        title={solution.title}
        subtitle={solution.description}
        image={innerBanners.solutions}
        current={solution.title}
      />
      <InnerNav items={solutionNav} activeHref={currentHref} />

      <section className="clone-solution-detail">
        <SectionTitle title={solution.systemTitle} />
        <div className="clone-solution-video">
          <video autoPlay muted loop playsInline poster={asset(solution.poster)}>
            <source src={asset(solution.video)} type="video/mp4" />
          </video>
        </div>

        <div className="clone-solution-features">
          {solution.features.map((feature, index) => (
            <div key={feature}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <p>{feature}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="clone-case-products">
        <SectionTitle title="Recommended Products" />
        <div className="clone-case-product-grid">
          {recommended.map((product) => (
            <Link key={product.id} href={`/products/${product.id}`}>
              <RemoteImage
                src={product.image}
                alt={product.name}
                width={280}
                height={220}
                sizes="(max-width: 900px) 80vw, 280px"
              />
              <strong>{product.name}</strong>
              <span>MORE</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="clone-other-solutions">
        <SectionTitle title="Other Solutions" />
        <div className="clone-other-grid">
          {otherSolutions.map((item) => (
            <Link key={item.slug} href={`/solutions/${item.slug}`}>
              <RemoteImage
                src={item.image}
                alt={item.title}
                width={420}
                height={250}
                sizes="(max-width: 900px) 90vw, 420px"
              />
              <strong>{item.title}</strong>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}

export function generateStaticParams() {
  return solutions.map((solution) => ({ slug: solution.slug }));
}
