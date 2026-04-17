import type { NewsArticle, Product } from "@/types/api";

export function asset(path: string) {
  if (path.startsWith("http://") || path.startsWith("https://")) {
    return path;
  }

  return `/uniconvtor${path}`;
}

export const homeHeroSlides = [
  "/static/upload/image/20240712/1720767465897307.jpg",
  "/static/upload/image/20240712/1720767484276473.jpg",
];

export const homeHeroMobileSlides = [
  "/static/upload/image/20240712/1720767499927564.jpg",
  "/static/upload/image/20240712/1720767511219332.jpg",
];

export const innerBanners = {
  about: "/static/upload/image/20240718/1721281513711263.jpg",
  solutions: "/static/upload/image/20240716/1721096159468693.png",
  products: "/static/upload/image/20240723/1721724635435388.jpg",
  rnd: "/static/upload/image/20240717/1721207842621504.jpg",
  support: "/static/upload/image/20240718/1721266040843391.jpg",
  download: "/static/upload/image/20240718/1721279542202026.jpg",
  contact: "/static/upload/image/20240718/1721289158220263.jpg",
  news: "/static/upload/image/20240718/1721281513711263.jpg",
};

export const companyStats = [
  {
    icon: "/static/upload/image/20240715/1721024516289362.png",
    value: "10",
    suffix: "+",
    label: "Over 10 years of experience in power and energy field",
  },
  {
    icon: "/static/upload/image/20240715/1721024531435348.png",
    value: "40",
    suffix: "+",
    label: "Annual production capacity exceeds 400,000 units",
  },
  {
    icon: "/static/upload/image/20240715/1721024545308286.png",
    value: "30",
    suffix: "+",
    label: "Our footprint covers over 30 countries globally",
  },
  {
    icon: "/static/upload/image/20240715/1721024582111662.png",
    value: "10000",
    suffix: "+",
    label: "10000 square meters intelligent plant",
  },
  {
    icon: "/static/upload/image/20240715/1721024602683191.png",
    value: "10",
    suffix: "+",
    label: "Over 10,000 square meters intelligent manufacturing workshop",
  },
];

export const solutions = [
  {
    slug: "household",
    title: "Household Energy Storage Solutions",
    shortTitle: "Household Energy Storage",
    icon: "/static/upload/image/20240719/1721359815722915.png",
    iconHover: "/static/upload/image/20240715/1721010346532607.png",
    image: "/static/upload/image/20240716/1721097679251191.png",
    poster: "/static/upload/image/20240715/1721010314542105.jpg",
    video: "/static/upload/other/20240715/1721009048961098.mp4",
    description:
      "We offer a wide type of the hybrid inverters and household batteries, featuring high power density, high conversion efficiency, excellent self-protection functions, good reliability, intelligence, and stability, which can be flexibly applied to different application scenarios for household, such as energy saving, power supply for villas, balcony solar solution, energy saving for data centers, and remote islands without electricity.",
    systemTitle: "Scheme System Diagram",
    features: [
      "Hybrid inverter and household battery portfolio",
      "Flexible power supply for villas and remote sites",
      "Balcony solar and household energy saving scenarios",
      "Stable operation with reliable self-protection",
    ],
  },
  {
    slug: "commercial",
    title: "Industrial and Commercial Energy Storage",
    shortTitle: "Commercial Energy Storage",
    icon: "/static/upload/image/20240719/1721359835858992.png",
    iconHover: "/static/upload/image/20240715/1721020454312786.png",
    image: "/static/upload/image/20240716/1721097705259728.png",
    poster: "/static/upload/image/20240715/1721020164496498.jpg",
    video: "/static/upload/other/20240715/1721020237971021.mp4",
    description:
      "We provide modular energy storage converters with various of the power specifications, C&I energy storage converter and system , EMS and other key equipments and integrated solutions, to meet the needs of auxiliary service , peak-load shifting, demand side response, dynamic capacity expansion, etc.",
    systemTitle: "Scheme System Diagram",
    features: [
      "Modular energy storage converter architecture",
      "Peak-load shifting and demand-side response",
      "EMS integration and system-level operation",
      "Power specifications for C&I applications",
    ],
  },
  {
    slug: "photovoltaic",
    title: "Photovoltaic System Solutions",
    shortTitle: "Photovoltaic System",
    icon: "/static/upload/image/20240719/1721359995483757.png",
    iconHover: "/static/upload/image/20240715/1721021172408315.png",
    image: "/static/upload/image/20240716/1721097739949863.png",
    poster: "/static/upload/image/20240715/1721021147498170.jpg",
    video: "/static/upload/other/20240715/1721021152615661.mp4",
    description:
      "We offer PV inverters ranging from 10 to 110 kW, featuring high efficiency, intelligent stability, and reliable safety. These inverters are suitable for various scenarios, including residential, distributed, and large-scale photovoltaic power plants.",
    systemTitle: "Scheme System Diagram",
    features: [
      "PV inverter range from 10 kW to 110 kW",
      "High efficiency with intelligent remote monitoring",
      "Suitable for distributed and large-scale PV plants",
      "Reliable safety for complex grid environments",
    ],
  },
] as const;

export type SolutionSlug = (typeof solutions)[number]["slug"];

export const solutionNav = solutions.map((solution) => ({
  href: `/solutions/${solution.slug}`,
  title: solution.title,
  icon: solution.icon,
}));

export const aboutNav = [
  {
    href: "/company#milestone",
    title: "Milestone",
    icon: "/static/upload/image/20240723/1721699258990495.png",
  },
  {
    href: "/company#honor",
    title: "Honor",
    icon: "/static/upload/image/20240712/1720776229326161.png",
  },
  {
    href: "/company#intro",
    title: "Company Introduction",
    icon: "/static/upload/image/20240712/1720776191144877.png",
  },
  {
    href: "/news",
    title: "Corporate News",
    icon: "/static/upload/image/20240712/1720776250982571.png",
  },
];

export const rndNav = [
  {
    href: "/rnd#research",
    title: "R&D Capabilities",
    icon: "/static/upload/image/20240712/1720775954614173.png",
  },
  {
    href: "/rnd#produce",
    title: "Batch Production Capabilities",
    icon: "/static/upload/image/20240712/1720775993260221.png",
  },
  {
    href: "/rnd#quality",
    title: "Quality Assurance",
    icon: "/static/upload/image/20240712/1720776018424590.png",
  },
];

export const supportNav = [
  {
    href: "/support#technical",
    title: "Technical Support",
    icon: "/static/upload/image/20240712/1720776053470539.png",
  },
  {
    href: "/support#afterSales",
    title: "After sale services",
    icon: "/static/upload/image/20240712/1720776076901428.png",
  },
  {
    href: "/support#download",
    title: "Data Download",
    icon: "/static/upload/image/20240712/1720776098536302.png",
  },
];

export const productNav = [
  {
    href: "/products?category=hybrid-inverters",
    title: "Household Energy Storage",
    icon: "/static/upload/image/20240712/1720775819120419.png",
  },
  {
    href: "/products?category=energy-storage",
    title: "Industrial and Commercial Energy Storage",
    icon: "/static/upload/image/20240712/1720775844288168.png",
  },
  {
    href: "/products?category=pv-inverters",
    title: "Photovoltaic System",
    icon: "/static/upload/image/20240712/1720775904101349.png",
  },
];

export const cloneProducts: Product[] = [
  {
    id: "single-phase-hybrid-3-6kw",
    name: "Single-phase Hybrid Inverter(grid-connected) 3-6kW",
    category: "hybrid-inverters",
    subcategory: "Household Energy Storage | Hybrid Inverter",
    power: "3-6kW",
    description:
      "Up to 120A max charge/discharge current, high-power solar panel support, diesel generator off-grid application, UPS-level switching time, and flexible charge/discharge scheduling.",
    features: [
      "Up to 120A charge/discharge current",
      "UPS level switching time under 10ms",
      "Supports diesel generator off-grid application",
      "Flexible charge and discharge schedule",
    ],
    specs: {
      Power: "3-6kW",
      Application: "Household energy storage",
      Type: "Single-phase hybrid inverter",
      Protection: "Grid-connected with critical load support",
    },
    image: "/static/upload/image/20240722/1721618009896094.png",
    price: null,
    isNew: false,
    isFeatured: true,
  },
  {
    id: "three-phase-hybrid-8-12kw",
    name: "Three Phase Hybrid Inverter(on-grid) 8-12kW",
    category: "hybrid-inverters",
    subcategory: "Household Energy Storage | Hybrid Inverter",
    power: "8-12kW",
    description:
      "UPS-level switching, three-phase imbalance support on backup output, IP66 protection, 2 MPPT and 4 DC input with max 26A DC input current.",
    features: [
      "UPS level switching time under 10ms",
      "Three-phase imbalance support",
      "IP66 protection",
      "2 MPPT and 4 DC input",
    ],
    specs: {
      Power: "8-12kW",
      MPPT: "2 MPPT",
      DCInput: "4 DC input, max 26A",
      Protection: "IP66",
    },
    image: "/static/upload/image/20240722/1721630495375856.png",
    price: null,
    isNew: false,
    isFeatured: true,
  },
  {
    id: "three-phase-hybrid-15-20kw",
    name: "Three Phase Hybrid Inverter(on-grid) 15-20kW",
    category: "hybrid-inverters",
    subcategory: "Household Energy Storage | Hybrid Inverter",
    power: "15-20kW",
    description:
      "Up to 50A charge/discharge current, IP66 high ingress protection, backup output imbalance support, parallel operation, and pure off-grid application with generator.",
    features: [
      "Up to 50A charge/discharge current",
      "Supports up to 16 parallel machines",
      "Pure off-grid generator application",
      "IP66 ingress protection",
    ],
    specs: {
      Power: "15-20kW",
      Parallel: "Up to 16 units",
      Protection: "IP66",
      Application: "On-grid and pure off-grid",
    },
    image: "/static/upload/image/20240722/1721632843627327.png",
    price: null,
    isNew: false,
    isFeatured: true,
  },
  {
    id: "single-phase-hybrid-off-grid-4-10kw",
    name: "Single Phase Hybrid Inverter (off grid) 4-10.2kW",
    category: "hybrid-inverters",
    subcategory: "Household Energy Storage | Hybrid Inverter",
    power: "4-10.2kW",
    description:
      "Pure sine wave solar inverter for off-grid usage with power factor 1.0, battery-free running capability, lithium battery activation, and high PV input voltage range.",
    features: [
      "Pure sine wave solar inverter",
      "Power factor 1.0",
      "Runs without battery",
      "High PV input voltage range",
    ],
    specs: {
      Power: "4-10.2kW",
      Mode: "Off-grid",
      PowerFactor: "1.0",
      PVInput: "90-500VDC",
    },
    image: "/static/upload/image/20250219/1739945037984895.png",
    price: null,
    isNew: false,
    isFeatured: true,
  },
  {
    id: "single-phase-hybrid-low-voltage-10-12kw",
    name: "Single-phase Hybrid Inverter Low Voltage / Forced Air Cooling 10-12kW",
    category: "hybrid-inverters",
    subcategory: "Household Energy Storage | Hybrid Inverter",
    power: "10-12kW",
    description:
      "IP66 high protection level, 60V low-voltage startup, 2x rated overload capacity, 10ms off-grid switching, and up to 12 units in parallel.",
    features: [
      "IP66 high protection",
      "60V low-voltage startup",
      "2x rated overload capacity",
      "Supports 12 units in parallel",
    ],
    specs: {
      Power: "10-12kW",
      Startup: "60V low voltage",
      Switching: "10ms off-grid",
      Parallel: "Up to 12 units",
    },
    image: "/static/upload/image/20260330/1774859132153475.png",
    price: null,
    isNew: true,
    isFeatured: true,
  },
  {
    id: "single-phase-hybrid-low-voltage-4-8-6-6kw",
    name: "Single-phase Hybrid Inverter Low Voltage / Forced Air Cooling 4.8-6.6kW",
    category: "hybrid-inverters",
    subcategory: "Household Energy Storage | Hybrid Inverter",
    power: "4.8-6.6kW",
    description:
      "IP66 high protection level, 60V low voltage startup, 2x rated overload capacity, 10ms off-grid switching, supports up to 12 units in parallel, and can start without battery.",
    features: [
      "IP66 high protection",
      "60V low voltage startup",
      "2x rated overload capacity",
      "Supports up to 12 units in parallel",
    ],
    specs: {
      Power: "4.8-6.6kW",
      Startup: "60V low voltage",
      Switching: "10ms off-grid",
      Parallel: "Up to 12 units",
    },
    image: "/static/upload/image/20260401/1775023282222564.png",
    price: null,
    isNew: true,
    isFeatured: true,
  },
  {
    id: "pv-battery-all-in-one",
    name: "PV and Battery All-In-One",
    category: "energy-storage",
    subcategory: "Household Energy Storage | Optical Storage Integrated Machine",
    power: "All-in-one",
    description:
      "Integrated photovoltaic and battery system for residential energy storage with compact deployment and simplified operation.",
    features: [
      "PV and battery integrated design",
      "Compact installation",
      "Residential energy storage",
      "Simplified operation",
    ],
    specs: {
      Type: "Optical storage integrated machine",
      Application: "Household energy storage",
      Installation: "All-in-one",
      Mode: "PV + battery",
    },
    image: "/static/upload/image/20240722/1721611367331588.png",
    price: null,
    isNew: false,
    isFeatured: true,
  },
  {
    id: "ci-energy-storage-module",
    name: "C&I Energy Storage Converter Module",
    category: "energy-storage",
    subcategory: "Industrial and Commercial Energy Storage | Energy Storage Integrated Cabinet",
    power: "C&I",
    description:
      "Three-level modular design, bidirectional energy conversion, on-demand allocation, peak shaving, valley filling, and modular N+1 redundancy.",
    features: [
      "Three-level modular design",
      "Bidirectional energy conversion",
      "N+1 redundancy",
      "Peak shaving and valley filling",
    ],
    specs: {
      Application: "Commercial and industrial",
      Design: "Modular converter module",
      Operation: "Bidirectional conversion",
      Redundancy: "N+1 modular",
    },
    image: "/static/upload/image/20240724/1721784660784196.png",
    price: null,
    isNew: false,
    isFeatured: true,
  },
  {
    id: "ci-energy-storage-converter",
    name: "C&I Energy Storage Converter",
    category: "energy-storage",
    subcategory: "Industrial and Commercial Energy Storage | Energy Storage Inverter",
    power: "C&I",
    description:
      "On-grid/off-grid switching under 20ms, maximum efficiency above 99.1%, parallel operation, diesel-electric connection, and weak-grid support.",
    features: [
      "On/off grid switching under 20ms",
      "Maximum efficiency above 99.1%",
      "Supports parallel operation",
      "Weak-grid connection support",
    ],
    specs: {
      Switching: "<20ms",
      Efficiency: ">99.1%",
      Mode: "On-grid and off-grid",
      Application: "C&I energy storage",
    },
    image: "/static/upload/image/20240723/1721698113355814.png",
    price: null,
    isNew: false,
    isFeatured: true,
  },
  {
    id: "three-phase-pv-10-25kw",
    name: "Three-phase Photovoltaic Inverter 10-25K",
    category: "pv-inverters",
    subcategory: "Photovoltaic System | Household Three-Phase Photovoltaic Inverter",
    power: "10-25K",
    description:
      "IP66 high protection level, 32A MPPT current for high-power modules, adaptive complex grid, intelligent remote monitoring, and anti-backflow control.",
    features: [
      "IP66 high protection",
      "32A MPPT current",
      "Adaptive complex grid",
      "Anti-backflow control",
    ],
    specs: {
      Power: "10-25K",
      MPPTCurrent: "32A",
      Protection: "IP66",
      Monitoring: "Remote monitoring",
    },
    image: "/static/upload/image/20240717/1721203071201008.png",
    price: null,
    isNew: false,
    isFeatured: true,
  },
  {
    id: "three-phase-pv-25-50kw",
    name: "Three-phase Photovoltaic Inverter 25-50K",
    category: "pv-inverters",
    subcategory: "Photovoltaic System | Industrial And Commercial Three-Phase Photovoltaic Inverter",
    power: "25-50K",
    description:
      "Maximum MPPT current 40A, PID repair function, IP66 protection, quick-plug terminal design, and OTA online firmware remote upgrade.",
    features: [
      "40A max MPPT current",
      "Built-in PID repair",
      "Quick-plug terminal design",
      "OTA firmware upgrade",
    ],
    specs: {
      Power: "25-50K",
      MPPTCurrent: "40A",
      Protection: "IP66",
      Upgrade: "OTA online firmware",
    },
    image: "/static/upload/image/20240719/1721350881510199.png",
    price: null,
    isNew: false,
    isFeatured: true,
  },
  {
    id: "three-phase-pv-80-110kw",
    name: "Three-phase Photovoltaic Inverter 80-110K",
    category: "pv-inverters",
    subcategory: "Photovoltaic System | Industrial And Commercial Three-Phase Photovoltaic Inverter",
    power: "80-110K",
    description:
      "Maximum efficiency 98.7%, ultra-low starting voltage, ultra-wide voltage range, 1.5x DC over-capacity, intelligent air cooling, and weak-grid adaptability.",
    features: [
      "Maximum efficiency 98.7%",
      "1.5x DC over-capacity",
      "IP66 intelligent air cooling",
      "Weak-grid adaptability",
    ],
    specs: {
      Power: "80-110K",
      Efficiency: "98.7%",
      Protection: "IP66",
      Cooling: "Intelligent air cooling",
    },
    image: "/static/upload/image/20241008/1728370802854039.png",
    price: null,
    isNew: false,
    isFeatured: true,
  },
  {
    id: "wall-mounted-battery-pack",
    name: "Battery Pack(Wall-Mounted)",
    category: "energy-storage",
    subcategory: "Household Energy Storage | Battery Pack",
    power: "Battery",
    description:
      "Wall-mounted installation saves space, supports parallel expansion, automatic addressing, LCD status display, communication protocol, and more than 5000 cycles.",
    features: [
      "Wall-mounted installation",
      "Parallel expansion",
      "LCD status display",
      "Cycle life exceeds 5000 times",
    ],
    specs: {
      Type: "Battery pack",
      Installation: "Wall-mounted",
      CycleLife: ">5000 cycles",
      Expansion: "Multiple parallel machines",
    },
    image: "/static/upload/image/20250219/1739945430740650.png",
    price: null,
    isNew: false,
    isFeatured: true,
  },
];

export const recommendedProductGroups = [
  {
    title: "Household Energy Storage",
    icon: "/static/upload/image/20240716/1721118217135945.png",
    activeIcon: "/static/upload/image/20240716/1721118202320162.png",
    products: cloneProducts.filter((product) => product.category === "hybrid-inverters"),
  },
  {
    title: "Industrial and Commercial Energy Storage",
    icon: "/static/upload/image/20240717/1721188257624575.png",
    activeIcon: "/static/upload/image/20240717/1721188274813707.png",
    products: cloneProducts.filter(
      (product) =>
        product.id === "ci-energy-storage-module" || product.id === "ci-energy-storage-converter"
    ),
  },
  {
    title: "Photovoltaic System",
    icon: "/static/upload/image/20240717/1721188398128819.png",
    activeIcon: "/static/upload/image/20240717/1721188409100664.png",
    products: cloneProducts.filter((product) => product.category === "pv-inverters"),
  },
];

export const cultureItems = [
  {
    title: "Mission",
    text: "Continuous innovation, providing clean energy solutions and services",
    image: "/static/upload/image/20240718/1721282396412631.png",
  },
  {
    title: "Vision",
    text: "Product service global, becoming a pioneer in power electronic converters",
    image: "/static/upload/image/20240718/1721282452626020.png",
  },
  {
    title: "Values",
    text: "Customer centricity and win-win cooperation",
    image: "/static/upload/image/20240718/1721282485418092.png",
  },
  {
    title: "Business philosophy",
    text: "Integrity, Responsibility, Efficiency, and Innovation",
    image: "/static/upload/image/20240718/1721282512959078.png",
  },
  {
    title: "Quality Policy",
    text: "Integrity, Responsibility, Efficiency, and Innovation",
    image: "/static/upload/image/20240718/1721282534791953.png",
  },
];

export const supportServices = [
  {
    title: "Installation and Commissioning Guidance",
    text: "Provide installation and commissioning guidance to ensure operation and optimal equipment performance.",
    image: "/static/upload/image/20240718/1721273971473709.png",
  },
  {
    title: "Technical Training and Guidance",
    text: "Provide technical training services to help customers understand equipment usage and maintenance.",
    image: "/static/upload/image/20240718/1721274015816206.png",
  },
  {
    title: "Technical Upgrades and Optimization",
    text: "Provide technical upgrades and optimization based on customer needs and market changes.",
    image: "/static/upload/image/20240718/1721274033167630.png",
  },
];

export const afterSaleImages = [
  "/static/upload/image/20240718/1721275001950419.png",
  "/static/upload/image/20240718/1721275012971235.png",
  "/static/upload/image/20240718/1721275022581870.png",
];

export const serviceSystem = [
  {
    title: "Tracking the Process",
    text: "UNC tracks customer after-sales service requests and the process to ensure issues are resolved.",
  },
  {
    title: "Continuous Improvement",
    text: "UNC regularly collects customer feedback and continuously improves after-sales service.",
  },
  {
    title: "After-Sales Consultation",
    text: "Provide consultation, operational advice, and maintenance guidance during customer usage.",
  },
  {
    title: "Quick Response",
    text: "UNC responds to customer after-sales service requests within 24 hours.",
  },
  {
    title: "Technical Support",
    text: "Provide technical support services and guidance for technical issues encountered during use.",
  },
];

export const downloads = [
  {
    name: "UNC Product brochure",
    type: "pdf",
    size: "15160623",
    date: "2024-07-18",
    href: "/static/upload/file/20240918/1726636096811513.pdf",
  },
];

export const cloneNews: NewsArticle[] = [
  {
    id: "news-483",
    title: "Unleash Energy Independence with UNC Technology's All-in-One PV & Battery System!",
    slug: "unc-all-in-one-pv-battery-system",
    excerpt:
      "UNC Technology presents an integrated photovoltaic and battery system for residential clean energy independence.",
    content:
      "UNC Technology's all-in-one photovoltaic and battery system is designed to simplify household clean-energy deployment. The system combines PV generation, storage, and intelligent control to help customers improve self-consumption and continuity of power supply.",
    category: "Corporate News",
    date: "2025-07-07",
    author: "UNC Technology",
    image: "/static/upload/image/20250707/1751858367726322.png",
    isFeatured: true,
  },
  {
    id: "news-480",
    title: "UNC Unveils Energy Solutions at SNEC PV Power Expo 2025",
    slug: "unc-snec-pv-power-expo-2025",
    excerpt:
      "UNC showcased residential, commercial, and photovoltaic energy solutions at SNEC PV Power Expo 2025.",
    content:
      "At SNEC PV Power Expo 2025, UNC demonstrated its hybrid inverter, energy storage, and photovoltaic inverter portfolio for global partners and customers.",
    category: "Corporate News",
    date: "2025-06-24",
    author: "UNC Technology",
    image: "/static/upload/image/20250624/1750742402141149.jpg",
    isFeatured: true,
  },
  {
    id: "solar-inverter-74",
    title: "Technical Characteristics of Hybrid Solar Power Inverters",
    slug: "technical-characteristics-hybrid-solar-power-inverters",
    excerpt:
      "Hybrid solar power inverters integrate PV generation, battery storage, and grid interaction in one system.",
    content:
      "Hybrid solar power inverters support PV conversion, battery charge and discharge, backup output, and intelligent energy scheduling. These features make them suitable for household and commercial clean-energy scenarios.",
    category: "Corporate News",
    date: "2026-03-13",
    author: "UNC Technology",
    image: "/static/upload/image/20260313/1773381781972443.png",
    isFeatured: true,
  },
  {
    id: "central-pv-inverter-73",
    title: "Advantages and Disadvantages of Central PV Inverters",
    slug: "advantages-and-disadvantages-central-pv-inverters",
    excerpt:
      "Central PV inverters support large power conversion with centralized operation and maintenance.",
    content:
      "Central PV inverters are often used in large-scale power stations where centralized conversion can simplify operation. System design should also account for redundancy, maintenance, and site-level reliability.",
    category: "Corporate News",
    date: "2026-03-06",
    author: "UNC Technology",
    image: "/static/upload/image/20260306/1772775149745007.png",
    isFeatured: false,
  },
  {
    id: "off-grid-hybrid-inverter-72",
    title: "What are the Application Scenarios for Off Grid Hybrid Inverters?",
    slug: "application-scenarios-off-grid-hybrid-inverters",
    excerpt:
      "Off-grid hybrid inverters are suitable for remote sites, backup power, and energy independence.",
    content:
      "Off-grid hybrid inverters can combine PV generation, storage batteries, and generator support to provide stable power in remote islands, villas, and backup supply scenarios.",
    category: "Corporate News",
    date: "2026-02-28",
    author: "UNC Technology",
    image: "/static/upload/image/20260228/1772259108992744.png",
    isFeatured: false,
  },
  {
    id: "energy-storage-system-71",
    title: "Functions and Roles of Residential Energy Storage Systems",
    slug: "functions-roles-residential-energy-storage-systems",
    excerpt:
      "Residential energy storage systems improve self-consumption, backup capacity, and energy management.",
    content:
      "Residential energy storage systems store surplus PV generation and dispatch electricity when needed. They can reduce grid dependency, support critical loads, and improve household energy resilience.",
    category: "Corporate News",
    date: "2026-02-13",
    author: "UNC Technology",
    image: "/static/upload/image/20260213/1770946881431450.png",
    isFeatured: false,
  },
  {
    id: "solar-storage-companies-70",
    title: "Business Model and Technology Direction of Solar Storage Companies",
    slug: "business-model-technology-direction-solar-storage-companies",
    excerpt:
      "Solar storage companies combine energy storage products with system-level service capabilities.",
    content:
      "Solar storage companies continue to expand integrated products, intelligent monitoring, and service-oriented energy solutions for residential and commercial applications.",
    category: "Corporate News",
    date: "2026-02-06",
    author: "UNC Technology",
    image: "/static/upload/image/20260206/1770358573360352.png",
    isFeatured: false,
  },
  {
    id: "solar-charge-inverter-69",
    title: "What are the Different Types of Solar Charge Inverters?",
    slug: "different-types-solar-charge-inverters",
    excerpt:
      "Solar charge inverters vary by topology, power range, and grid interaction modes.",
    content:
      "Solar charge inverters can support off-grid, hybrid, and grid-connected scenarios, helping users adapt photovoltaic generation to different energy usage needs.",
    category: "Corporate News",
    date: "2026-01-30",
    author: "UNC Technology",
    image: "/static/upload/image/20260130/1769755794396762.png",
    isFeatured: false,
  },
  {
    id: "pv-panel-inverter-68",
    title: "Types and Characteristics of PV Panel Inverters",
    slug: "types-characteristics-pv-panel-inverters",
    excerpt:
      "PV panel inverters provide efficient conversion and monitoring for photovoltaic power generation.",
    content:
      "PV panel inverter selection depends on application size, MPPT range, protection level, and site operation requirements.",
    category: "Corporate News",
    date: "2026-01-23",
    author: "UNC Technology",
    image: "/static/upload/image/20260123/1769148756893581.png",
    isFeatured: false,
  },
];
