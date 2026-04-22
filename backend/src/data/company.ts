import type { CompanyInfo } from "@/types";

export const companySeed: CompanyInfo = {
  id: "company",
  name: "SolarTech Energy Co., Ltd.",
  slogan: "Powering the Future with Clean Energy",
  description:
    "SolarTech Energy is a leading manufacturer of solar inverters and energy storage systems. With over 15 years of experience in the renewable energy industry, we deliver innovative, reliable, and efficient solutions for residential, commercial, and utility-scale solar installations worldwide.",
  founded: 2011,
  headquarters: "Ho Chi Minh City, Vietnam",
  employees: "500+",
  globalPresence: "30+ countries",
  totalCapacity: "10 GW+ shipped globally",
  certifications: [
    "ISO 9001:2015",
    "ISO 14001:2015",
    "IEC 62109-1/2",
    "IEC 62619",
    "UL 1741",
    "CE",
    "TÜV Rheinland",
  ],
  values: [
    {
      title: "Innovation",
      description: "Continuously pushing the boundaries of solar technology with cutting-edge R&D.",
    },
    {
      title: "Quality",
      description: "Rigorous testing and quality control ensure every product meets the highest standards.",
    },
    {
      title: "Sustainability",
      description: "Committed to a cleaner planet through renewable energy solutions.",
    },
    {
      title: "Customer Focus",
      description: "Dedicated technical support and service for every customer worldwide.",
    },
  ],
  contact: {
    address: "123 Green Energy Boulevard, District 7, Ho Chi Minh City, Vietnam",
    phone: "+84 28 1234 5678",
    email: "info@solartech-energy.com",
    website: "www.solartech-energy.com",
  },
  socialMedia: {
    facebook: "https://facebook.com/solartechenergy",
    linkedin: "https://linkedin.com/company/solartechenergy",
    youtube: "https://youtube.com/solartechenergy",
    twitter: "https://twitter.com/solartechenergy",
  },
};
