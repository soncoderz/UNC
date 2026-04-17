import InnerHero from "@/components/uniconvtor/InnerHero";
import InnerNav from "@/components/uniconvtor/InnerNav";
import RemoteImage from "@/components/uniconvtor/RemoteImage";
import SectionTitle from "@/components/uniconvtor/SectionTitle";
import {
  afterSaleImages,
  innerBanners,
  serviceSystem,
  supportNav,
  supportServices,
} from "@/data/uniconvtor";

const serviceSystemPositions = [
  "left1",
  "left2",
  "right1",
  "right2",
  "bottom",
] as const;

export default function SupportPage() {
  return (
    <>
      <InnerHero
        title="Technical Support"
        subtitle="With multiple working modes, Younengchuang Energy Storage can fiexibly respond to various sceoariosl"
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
          UNC&apos;s technical support process follows the principles of
          &quot;rapid response, professional handling, and full tracking.&quot;
          When customers encounter technical issues, we promptly initiate the
          support process, quickly organizing an expert team for analysis and
          resolution.
          <br />
          With our deep industry background, extensive technical experience, and
          professional team, UNC is committed to offering efficient and precise
          technical support services to our customers.
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
          The after-sales service team at UNC is composed of a group of
          experienced and highly skilled engineers who are very professional in
          the features and functionalities of UNC&apos;s products. They can respond
          swiftly to customer needs, providing timely and effective after-sales
          support guarantee.
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
            className="clone-service-system-bg"
          />
          {serviceSystem.map((item, index) => (
            <article
              key={item.title}
              className={`clone-service-system-card is-${serviceSystemPositions[index]}`}
            >
              <div>
                <h4>{item.title}</h4>
                <p>{item.text}</p>
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
