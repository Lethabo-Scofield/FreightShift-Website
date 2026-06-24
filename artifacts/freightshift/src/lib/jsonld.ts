import { SITE } from "./seo";

export const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: SITE.name,
  alternateName: SITE.shortName,
  url: SITE.url,
  logo: `${SITE.url}/favicon.png`,
  email: SITE.email,
  telephone: SITE.phone,
  description: SITE.description,
  address: {
    "@type": "PostalAddress",
    addressLocality: SITE.city,
    addressRegion: "Gauteng",
    addressCountry: SITE.region,
  },
  sameAs: [SITE.whatsapp],
};

export const localBusinessJsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": `${SITE.url}/#business`,
  name: SITE.name,
  url: SITE.url,
  image: `${SITE.url}${SITE.ogImage}`,
  telephone: SITE.phone,
  email: SITE.email,
  priceRange: "$$",
  description: SITE.description,
  address: {
    "@type": "PostalAddress",
    addressLocality: SITE.city,
    addressRegion: "Gauteng",
    addressCountry: SITE.region,
  },
  areaServed: [{ "@type": "Country", name: "South Africa" }],
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "08:00",
      closes: "17:00",
    },
  ],
};

export const servicesJsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  serviceType: "Logistics, moving and storage services",
  provider: {
    "@type": "Organization",
    name: SITE.name,
    url: SITE.url,
  },
  areaServed: [{ "@type": "Country", name: "South Africa" }],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Full-service logistics in South Africa",
    itemListElement: [
      {
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: "Moving Services" },
      },
      {
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: "Storage" },
      },
      {
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: "Courier Services" },
      },
      {
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: "Freight Transport" },
      },
      {
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: "Logistics Operations" },
      },
    ],
  },
};

export function faqJsonLd(
  items: Array<{ question: string; answer: string }>,
) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((q) => ({
      "@type": "Question",
      name: q.question,
      acceptedAnswer: { "@type": "Answer", text: q.answer },
    })),
  };
}

export function breadcrumbJsonLd(
  trail: Array<{ name: string; url: string }>,
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((t, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: t.name,
      item: t.url,
    })),
  };
}
