import InnerHero from "@/components/uniconvtor/InnerHero";
import InnerNav from "@/components/uniconvtor/InnerNav";
import RemoteImage from "@/components/uniconvtor/RemoteImage";
import SectionTitle from "@/components/uniconvtor/SectionTitle";
import { innerBanners, rndNav } from "@/data/uniconvtor";

const researchStats = [
  ["2", "Doctoral degree"],
  ["17+", "Master's degree"],
  ["100+", "Patent"],
  ["10+", "Power electronics industry experience"],
  ["5+", "Standard"],
];

const produceStats = [
  ["400+", "The laboratory area is over 400 square meters"],
  ["30KW", "Development of hybrid inverter products of 30kW and below"],
  ["630KW", "Development of PCS products of 630kW and below"],
  ["110KW", "Development of products with specifications of 110kW and below"],
];

const workshopImages = [
  "/static/upload/image/20240723/1721723513538560.jpg",
  "/static/upload/image/20240723/1721723476312335.jpg",
  "/static/upload/image/20240723/1721723465926138.jpg",
  "/static/upload/image/20240723/1721723296458698.png",
  "/static/upload/image/20240723/1721723249229423.png",
  "/static/upload/image/20240723/1721723196249863.png",
];

const qualityItems = [
  {
    title: "R&D guarantee",
    text: "Senior electronics engineers with over 10 years of field experience lead the R&D team and ensure high-quality standards in development, production, and testing.",
  },
  {
    title: "After-sale services",
    text: "A comprehensive after-sales service system covers technical support, repair services, and spare parts supply.",
  },
  {
    title: "Quality Inspection",
    text: "Strict quality management monitors raw material procurement, production process control, and final product inspection.",
  },
  {
    title: "Production Quality control",
    text: "The intelligent workshop uses advanced production facilities and processes to ensure stable quality.",
  },
];

export default function RndPage() {
  return (
    <>
      <InnerHero
        title="R&D and Manufacturing"
        subtitle="Always regard quality as the core of survival and development."
        image={innerBanners.rnd}
      />
      <InnerNav items={rndNav} activeHref="/rnd#research" />

      <section id="research" className="clone-rnd-research">
        <SectionTitle
          title="R&D Capabilities"
          subtitle="The R&D team of UNC consists of more than 30 senior experts"
        />
        <p>
          The UNC R&D team covers software, hardware, algorithms, structure, and
          electrical design. The team has successfully developed energy storage
          converters and PV inverters while continuously investing in laboratory
          equipment and product reliability verification.
        </p>
        <div className="clone-rnd-ring">
          <div className="clone-rnd-stats">
            {researchStats.map(([value, label]) => (
              <div key={label}>
                <strong>{value}</strong>
                <span>{label}</span>
              </div>
            ))}
          </div>
          <div className="clone-rnd-center">
            <RemoteImage
              src="/template/default/esimg/img/research-yuanhuan.png"
              alt="R&D capability ring"
              width={340}
              height={340}
            />
            <RemoteImage
              src="/template/default/esimg/img/research-yuanxin.png"
              alt="R&D capability core"
              width={130}
              height={130}
            />
          </div>
        </div>
      </section>

      <section id="produce" className="clone-rnd-produce">
        <SectionTitle
          title="Batch Production Capabilities"
          subtitle="Advanced production facilities efficiently support and guarantee manufacturing capability."
        />
        <p>
          UNC has independent integrated assembly production lines for energy
          storage products, residential hybrid inverters, and self-developed 3S
          systems: PCS, BMS, and EMS.
        </p>
        <div className="clone-rnd-produce-grid">
          {produceStats.map(([value, label]) => (
            <div key={label}>
              <strong>{value}</strong>
              <span>{label}</span>
            </div>
          ))}
        </div>
        <div className="clone-workshop-grid">
          {workshopImages.map((image) => (
            <RemoteImage
              key={image}
              src={image}
              alt="UNC production workshop"
              width={360}
              height={230}
              sizes="(max-width: 900px) 90vw, 360px"
            />
          ))}
        </div>
      </section>

      <section id="quality" className="clone-rnd-quality">
        <SectionTitle
          title="Quality Assurance"
          subtitle="UNC has obtained ISO9001 and ISO14001 certifications."
        />
        <p>
          Quality is the core of the company&apos;s survival and sustainable
          development. UNC has established a rigorous and efficient quality
          management system and product certification portfolio.
        </p>
        <RemoteImage
          src="/template/default/esimg/img/research-renzheng.png"
          alt="UNC certifications"
          width={980}
          height={220}
          sizes="90vw"
        />
        <div className="clone-quality-main">
          <div>
            {qualityItems.map((item) => (
              <article key={item.title}>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </article>
            ))}
          </div>
          <RemoteImage
            src="/template/default/esimg/img/research-pinzhi.png"
            alt="UNC quality assurance"
            width={420}
            height={420}
          />
        </div>
      </section>
    </>
  );
}
