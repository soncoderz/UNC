import Link from "next/link";
import RemoteImage from "@/components/uniconvtor/RemoteImage";
import SlideIn from "@/components/animations/SlideIn";

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
      <SlideIn direction="down" distance={20} className="clone-inner-hero-text">
        <h1>{title}</h1>
        <p>{subtitle}</p>
      </SlideIn>
      <SlideIn direction="up" distance={20} delay={0.2} className="clone-breadcrumb">
        <RemoteImage
          src="/template/default/esimg/icon/weizhi.png"
          alt=""
          width={17}
          height={18}
        />
        <span>Position:</span>
        <Link href="/">FrontPage</Link>
        <span>&gt;</span>
        <Link href="#">{current}</Link>
      </SlideIn>
    </section>
  );
}
