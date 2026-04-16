import InnerHero from "@/components/uniconvtor/InnerHero";
import InnerNav from "@/components/uniconvtor/InnerNav";
import RemoteImage from "@/components/uniconvtor/RemoteImage";
import SectionTitle from "@/components/uniconvtor/SectionTitle";
import {
  afterSaleImages,
  asset,
  downloads,
  innerBanners,
  serviceSystem,
  supportNav,
  supportServices,
} from "@/data/uniconvtor";

export default function SupportPage() {
  return (
    <>
      <InnerHero
        title="Technical Support"
        subtitle="With multiple working modes, UNC Energy Storage can flexibly respond to various scenarios!"
        image={innerBanners.support}
      />
      <InnerNav items={supportNav} activeHref="/support#technical" />

      <section id="technical" className="clone-support-tech">
        <SectionTitle title="Technical Support" />
        <div className="clone-support-shape">
          <RemoteImage
            src="/template/default/esimg/img/service-shape-bgs.png"
            alt="Technical support process"
            width={980}
            height={360}
            sizes="90vw"
          />
        </div>
        <p>
          UNC&apos;s technical support process follows rapid response, professional
          handling, and full tracking. When customers encounter technical
          issues, UNC promptly organizes an expert team for analysis and
          resolution.
        </p>
        <h3>Technical support services</h3>
        <div className="clone-support-service-grid">
          {supportServices.map((service) => (
            <article key={service.title}>
              <RemoteImage src={service.image} alt="" width={86} height={86} />
              <h4>{service.title}</h4>
              <p>{service.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="afterSales" className="clone-support-after">
        <SectionTitle title="After sale services" />
        <p>
          The after-sales service team at UNC is composed of experienced
          engineers who understand UNC products and respond swiftly to customer
          needs.
        </p>
        <div className="clone-after-images">
          {afterSaleImages.map((image) => (
            <RemoteImage
              key={image}
              src={image}
              alt="After sale service"
              width={360}
              height={230}
              sizes="(max-width: 900px) 90vw, 360px"
            />
          ))}
        </div>

        <div className="clone-service-system">
          <RemoteImage
            src="/template/default/esimg/img/service-tixi-bg.png"
            alt="After-sale service system"
            width={820}
            height={520}
            sizes="(max-width: 900px) 90vw, 820px"
          />
          <div className="clone-service-system-list">
            {serviceSystem.map((item) => (
              <article key={item.title}>
                <h4>{item.title}</h4>
                <p>{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="download" className="clone-download">
        <InnerHero
          title="Data Download"
          subtitle="With multiple working modes, UNC Energy Storage can flexibly respond to various scenarios!"
          image={innerBanners.download}
          current="Data Download"
        />
        <div className="clone-download-main">
          <SectionTitle title="Data Download" />
          <div className="clone-download-table">
            <div className="clone-download-row clone-download-head">
              <span>file name</span>
              <span>file type</span>
              <span>file size</span>
              <span>Release time</span>
              <span>Download</span>
            </div>
            {downloads.map((download) => (
              <div key={download.name} className="clone-download-row">
                <span>{download.name}</span>
                <span>{download.type}</span>
                <span>{download.size}</span>
                <span>{download.date}</span>
                <a href={asset(download.href)} target="_blank" rel="noreferrer">
                  Download
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
