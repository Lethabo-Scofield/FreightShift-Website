export const SITE = {
  name: "FreightShift International Logistics",
  shortName: "FreightShift",
  url: "https://freightshiftlogistics.co.za",
  description:
    "South African freight forwarder specialising in the China to South Africa trade corridor. Sea, air and door-to-door logistics with full SARS customs clearance.",
  email: "info@freightshiftlogistics.co.za",
  phone: "+27 68 109 5543",
  whatsapp: "https://wa.me/message/EVTMLWYQY2OCG1",
  region: "ZA",
  city: "Johannesburg",
  ogImage: "/opengraph.jpg",
};

export type SeoMeta = {
  title: string;
  description: string;
  path: string;
  image?: string;
  noindex?: boolean;
};

export const PAGE_SEO: Record<string, SeoMeta> = {
  home: {
    title:
      "China to South Africa Freight Forwarding | FreightShift International Logistics",
    description:
      "Reliable freight forwarding from China to South Africa. Sea & air freight, SARS customs clearance, door-to-door delivery. Quote in 24 hours.",
    path: "/",
  },
  about: {
    title: "About FreightShift — Your Trusted China Trade Partner",
    description:
      "FreightShift is a South African freight forwarder built for transparent, reliable imports from China. Meet the team behind the Shenzhen-to-Joburg corridor.",
    path: "/about",
  },
  services: {
    title:
      "Freight, Customs & Delivery Services | China-SA Corridor | FreightShift",
    description:
      "Sea FCL/LCL, air freight, full SARS customs clearance, warehousing and door-to-door delivery between China and South Africa. Six active lanes, weekly departures.",
    path: "/services",
  },
  contact: {
    title: "Contact FreightShift — Quote in 24 Hours | WhatsApp & Phone",
    description:
      "Get a freight quote in 24 hours. WhatsApp 068 109 5543, call us, or fill in the quick quote form. China to South Africa logistics specialists in Johannesburg.",
    path: "/contact",
  },
};
