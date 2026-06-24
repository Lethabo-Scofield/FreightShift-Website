import { useEffect } from "react";
import { SITE, type SeoMeta } from "@/lib/seo";

function setMeta(attr: "name" | "property", key: string, value: string) {
  if (!value) return;
  let el = document.head.querySelector<HTMLMetaElement>(
    `meta[${attr}="${key}"]`,
  );
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", value);
}

function setLink(rel: string, href: string) {
  if (!href) return;
  let el = document.head.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`);
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", rel);
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
}

function setJsonLd(id: string, data: object | null) {
  const existing = document.getElementById(id);
  if (existing) existing.remove();
  if (!data) return;
  const script = document.createElement("script");
  script.type = "application/ld+json";
  script.id = id;
  script.text = JSON.stringify(data);
  document.head.appendChild(script);
}

type Props = SeoMeta & {
  /** Optional JSON-LD payload to attach for this route. */
  jsonLd?: object | object[];
};

export function Seo({
  title,
  description,
  path,
  image,
  noindex,
  jsonLd,
}: Props) {
  useEffect(() => {
    const url = `${SITE.url}${path}`;
    const ogImage = `${SITE.url}${image ?? SITE.ogImage}`;

    document.title = title;

    setMeta("name", "description", description);
    setMeta("name", "robots", noindex ? "noindex, nofollow" : "index, follow");
    setLink("canonical", url);

    // Open Graph
    setMeta("property", "og:type", "website");
    setMeta("property", "og:site_name", SITE.name);
    setMeta("property", "og:title", title);
    setMeta("property", "og:description", description);
    setMeta("property", "og:url", url);
    setMeta("property", "og:image", ogImage);
    setMeta("property", "og:image:alt", title);
    setMeta("property", "og:image:width", "1280");
    setMeta("property", "og:image:height", "720");
    setMeta("property", "og:locale", "en_ZA");

    // Twitter
    setMeta("name", "twitter:card", "summary_large_image");
    setMeta("name", "twitter:title", title);
    setMeta("name", "twitter:description", description);
    setMeta("name", "twitter:image", ogImage);
    setMeta("name", "twitter:image:alt", title);

    if (jsonLd) {
      const items = Array.isArray(jsonLd) ? jsonLd : [jsonLd];
      items.forEach((item, i) => setJsonLd(`seo-jsonld-${path}-${i}`, item));
    }

    return () => {
      if (jsonLd) {
        const items = Array.isArray(jsonLd) ? jsonLd : [jsonLd];
        items.forEach((_item, i) => setJsonLd(`seo-jsonld-${path}-${i}`, null));
      }
    };
  }, [title, description, path, image, noindex, jsonLd]);

  return null;
}
