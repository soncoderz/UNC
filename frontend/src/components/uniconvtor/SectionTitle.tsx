import SlideIn from "@/components/animations/SlideIn";

interface SectionTitleProps {
  title: string;
  subtitle?: string;
  align?: "left" | "center";
}

export default function SectionTitle({
  title,
  subtitle,
  align = "center",
}: SectionTitleProps) {
  return (
    <SlideIn direction="up" distance={30} duration={0.6} className={`clone-section-title clone-section-title-${align}`}>
      <h2>{title}</h2>
      {subtitle ? <p>{subtitle}</p> : null}
    </SlideIn>
  );
}
