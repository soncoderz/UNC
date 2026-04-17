"use client";

import Link from "next/link";
import RemoteImage from "@/components/uniconvtor/RemoteImage";
import { companyStats } from "@/data/uniconvtor";

export default function RndSection() {
  return (
    <section className="main ind-manufacture" id="rnd">
      <div className="ind-manuContent">
        <div className="ind-manuTitle">
          <div className="title1">
            <h3 className="text-4xl">R&amp;D and Manufacturing</h3>
            <h6 className="text-base">
              Research and innovation, forging the future of electricity
            </h6>
          </div>
          <div className="ind-manuText text-base">
            Always regard quality as the core of survival and development.
            <br />
            Has passed the ISO900 international quality management system certification.
            <br />
            Multiple international certifications such as ISO 14001 environmental
            management system certification.
          </div>
          <Link href="/rnd" className="btn1 text-base">
            MORE
          </Link>
        </div>

        <div className="ind-manuImg">
          <RemoteImage
            src="/static/upload/image/20240715/1721025415175397.png"
            alt="R&D and manufacturing certificates"
            width={620}
            height={440}
            sizes="(max-width: 900px) 90vw, 620px"
          />
        </div>
      </div>

      <div className="ind-manuUl">
        {companyStats.map((stat) => (
          <div key={stat.label} className="ind-manuLi">
            <RemoteImage src={stat.icon} alt="" width={100} height={100} />
            <div>
              <span>{stat.value}</span>
              <i className="text-sm">{stat.label}</i>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
