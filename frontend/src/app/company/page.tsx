import InnerHero from "@/components/uniconvtor/InnerHero";
import InnerNav from "@/components/uniconvtor/InnerNav";
import RemoteImage from "@/components/uniconvtor/RemoteImage";
import SectionTitle from "@/components/uniconvtor/SectionTitle";
import {
  aboutNav,
  companyStats,
  cultureItems,
  innerBanners,
} from "@/data/uniconvtor";

const milestones = [
  ["2021", "Qingdao Uni-Convtor Technology Co., Ltd was established."],
  ["2022", "Core R&D and manufacturing team expanded across power conversion fields."],
  ["2023", "Household hybrid inverter and energy storage products entered batch production."],
  ["2024", "Global product portfolio expanded across household, C&I, and photovoltaic systems."],
  ["2025", "UNC continued international certification and global market development."],
];

const certifications = [
  "ISO9001",
  "ISO14001",
  "CQC",
  "TUV",
  "RoHS",
  "CE",
  "IEC",
  "UN38.3",
];

export default function CompanyPage() {
  return (
    <>
      <InnerHero
        title="About Us"
        subtitle="UNC a new driving force for green energy"
        image={innerBanners.about}
      />
      <InnerNav items={aboutNav} activeHref="/company#intro" />

      <section id="intro" className="clone-about-intro">
        <SectionTitle title="Company Introduction" />
        <div className="clone-about-main">
          <div className="clone-about-copy">
            <p>
              Qingdao Uni-Convtor Technology Co., Ltd (UNC), established in 2021,
              has been deeply engaged in the renewable energy industry, focusing
              on R&D and application of power-supply conversion technology.
            </p>
            <p>
              Our product range covers household hybrid inverters, PV inverters,
              and energy storage PCS. These products are trusted in domestic and
              international markets and supported by experienced teams in design,
              R&D, manufacturing, quality control, marketing, and service.
            </p>
            <p>
              UNC has built an intelligent factory covering more than 10,000
              square meters. With intelligent production equipment and advanced
              production concepts, annual production capacity reaches up to
              400,000 sets.
            </p>
            <p>
              UNC upholds the principle of people-oriented and technology driven
              development, committed to becoming a leader in global power
              electronic converters.
            </p>
          </div>
          <div className="clone-about-image">
            <RemoteImage
              src="/static/upload/image/20240718/1721281765694056.png"
              alt="UNC company introduction"
              width={560}
              height={420}
              sizes="(max-width: 900px) 90vw, 560px"
            />
          </div>
        </div>

        <div className="clone-stat-grid clone-about-stats">
          {companyStats.map((stat) => (
            <div key={stat.label} className="clone-stat-card">
              <RemoteImage src={stat.icon} alt="" width={54} height={54} />
              <div>
                <strong>
                  {stat.value}
                  <sup>{stat.suffix}</sup>
                </strong>
                <p>{stat.label}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="clone-culture">
        <SectionTitle title="Corporate Culture" />
        <div className="clone-culture-grid">
          {cultureItems.map((item) => (
            <article key={item.title}>
              <RemoteImage src={item.image} alt="" width={76} height={76} />
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="milestone" className="clone-milestone">
        <SectionTitle title="Milestone" />
        <div className="clone-milestone-line">
          {milestones.map(([year, text]) => (
            <div key={year}>
              <strong>{year}</strong>
              <p>{text}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="honor" className="clone-honor">
        <SectionTitle
          title="Honor"
          subtitle="International quality and product certifications"
        />
        <div className="clone-honor-grid">
          {certifications.map((certification) => (
            <span key={certification}>{certification}</span>
          ))}
        </div>
      </section>
    </>
  );
}
