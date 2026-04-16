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
    <div className={`clone-section-title clone-section-title-${align}`}>
      <h2>{title}</h2>
      {subtitle ? <p>{subtitle}</p> : null}
    </div>
  );
}
