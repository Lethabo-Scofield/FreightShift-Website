export const SITE = {
  name: "FreightShift International Logistics",
  shortName: "FreightShift",
  url: "https://freightshiftlogistics.co.za",
  description:
    "Full-service South African logistics company offering moving, storage, courier, freight transport and end-to-end logistics operations across Johannesburg and beyond.",
  email: "info@freightshiftlogistics.co.za",
  phone: "+27 10 011 3971",
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
      "Moving, Storage & Logistics in South Africa | FreightShift International Logistics",
    description:
      "Full-service South African logistics: moving, storage, courier, freight transport and logistics operations. A real team with real assets on the ground. Call 010 011 3971.",
    path: "/",
  },
  about: {
    title: "About FreightShift — South Africa's Trusted Logistics Partner",
    description:
      "FreightShift International Logistics is a full-service South African logistics company handling moving, storage, courier and freight transport. Meet the team behind the operation.",
    path: "/about",
  },
  services: {
    title:
      "Moving, Storage, Courier & Freight Services | FreightShift",
    description:
      "Moving services, storage, courier, freight transport and end-to-end logistics operations across South Africa. Reliable, operational and on the ground.",
    path: "/services",
  },
  contact: {
    title: "Contact FreightShift — Call 010 011 3971 | WhatsApp & Quote",
    description:
      "Get a logistics quote fast. Call 010 011 3971, WhatsApp us, or fill in the quick quote form. Full-service logistics in Johannesburg, South Africa.",
    path: "/contact",
  },
};
