import Link from "next/link";
import RemoteImage from "@/components/uniconvtor/RemoteImage";
import SlideIn from "@/components/animations/SlideIn";

interface InnerNavItem {
  href: string;
  title: string;
  icon: string;
}

interface InnerNavProps {
  items: InnerNavItem[];
  activeHref?: string;
}

export default function InnerNav({ items, activeHref }: InnerNavProps) {
  return (
    <SlideIn direction="up" distance={30}>
      <nav className="clone-inner-nav" aria-label="Section navigation">
      {items.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={`clone-inner-nav-item ${
            activeHref === item.href ? "is-active" : ""
          }`}
        >
          <span className="clone-inner-nav-icon">
            <RemoteImage src={item.icon} alt="" width={30} height={30} />
          </span>
          <span className="clone-inner-nav-title">{item.title}</span>
        </Link>
      ))}
      </nav>
    </SlideIn>
  );
}
