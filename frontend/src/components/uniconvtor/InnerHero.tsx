import Link from "next/link";
import RemoteImage from "@/components/uniconvtor/RemoteImage";

interface InnerHeroProps {
  title: string;
  subtitle: string;
  image: string;
  current?: string;
}

export default function InnerHero({
  title,
  subtitle,
  image,
  current = title,
}: InnerHeroProps) {
  return (
    <section className="clone-inner-hero">
      <RemoteImage
        src={image}
        alt={title}
        fill
        priority
        sizes="100vw"
        className="clone-inner-hero-image"
      />
      <div className="clone-inner-hero-text">
        <h1>{title}</h1>
        <p>{subtitle}</p>
      </div>
      <div className="clone-breadcrumb">
        <span>Position:</span>
        <Link href="/">FrontPage</Link>
        <span>&gt;</span>
        <span>{current}</span>
      </div>
    </section>
  );
}
