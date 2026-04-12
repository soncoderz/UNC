import Button from "@/components/common/Button";

export const metadata = {
  title: "About Us",
  description:
    "Learn about SolarTech Energy - 15+ years of innovation in solar inverters and energy storage systems.",
};

export default function CompanyPage() {
  const milestones = [
    { year: "2011", event: "Company founded in Ho Chi Minh City" },
    { year: "2014", event: "First 1 GW of inverters shipped globally" },
    { year: "2017", event: "Launched energy storage product line" },
    { year: "2019", event: "Achieved TÜV Rheinland certification" },
    { year: "2022", event: "Expanded to 30+ countries worldwide" },
    { year: "2025", event: "Surpassed 10 GW total global shipments" },
  ];

  const certifications = [
    "ISO 9001:2015",
    "ISO 14001:2015",
    "IEC 62109-1/2",
    "IEC 62619",
    "UL 1741",
    "CE Mark",
    "TÜV Rheinland",
    "UN 38.3",
  ];

  return (
    <>
      {/* Hero */}
      <section className="pt-28 pb-16 bg-gradient-to-br from-dark via-dark-light to-primary-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl font-heading font-extrabold text-white mb-4">
            About SolarTech Energy
          </h1>
          <p className="text-lg text-white/70 max-w-2xl mx-auto">
            15+ years of innovation in renewable energy, delivering
            world-class solar solutions trusted by partners worldwide.
          </p>
        </div>
      </section>

      {/* Company Story */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl font-heading font-bold text-dark mb-6">
                Our Story
              </h2>
              <p className="text-gray leading-relaxed mb-4">
                Founded in 2011, SolarTech Energy has grown from a small R&D
                team to a leading manufacturer of solar inverters and energy
                storage systems. Our commitment to innovation, quality, and
                sustainability has driven us to develop cutting-edge solutions
                that power millions of homes and businesses worldwide.
              </p>
              <p className="text-gray leading-relaxed mb-6">
                With over 500 employees, state-of-the-art manufacturing
                facilities, and a global presence spanning 30+ countries, we
                continue to push the boundaries of renewable energy technology.
              </p>
              <Button href="/contact" variant="primary">
                Partner With Us
              </Button>
            </div>
            <div className="bg-gradient-to-br from-primary/10 to-accent/10 rounded-2xl h-80 flex items-center justify-center">
              <span className="text-8xl opacity-30">🏭</span>
            </div>
          </div>
        </div>
      </section>

      {/* Milestones */}
      <section className="py-20 bg-light">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="section-title mb-12">Our Journey</h2>
          <div className="space-y-6">
            {milestones.map((milestone) => (
              <div
                key={milestone.year}
                className="flex items-center gap-6 group"
              >
                <div className="w-20 text-right">
                  <span className="font-heading font-bold text-xl text-primary">
                    {milestone.year}
                  </span>
                </div>
                <div className="w-4 h-4 rounded-full bg-primary group-hover:scale-125 transition-transform" />
                <div className="flex-1 bg-white rounded-xl p-4 border border-gray-light/50 group-hover:shadow-md group-hover:border-primary/30 transition-all">
                  <p className="text-dark font-medium">{milestone.event}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section id="certifications" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="section-title mb-4">Certifications & Standards</h2>
          <p className="section-subtitle">
            Our products meet the highest international safety and quality
            standards.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            {certifications.map((cert) => (
              <div
                key={cert}
                className="px-6 py-4 bg-light rounded-xl border border-gray-light/50 hover:border-primary/30 hover:shadow-md transition-all"
              >
                <span className="font-semibold text-dark">{cert}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
