import type { SiteSettings } from "./sanity";

type JsonLd = Record<string, unknown>;

type BreadcrumbItem = {
  name: string;
  url: string;
};

type FaqItem = {
  question?: string;
  answer?: string;
};

const toAbsoluteUrl = (url: string, siteUrl: string) => new URL(url, siteUrl).href;

export function localBusinessJsonLd(settings: SiteSettings, siteUrl: string): JsonLd {
  const sameAs = [settings.instagram, settings.facebook].filter(Boolean);
  const normalizedPhone = settings.phone?.replace(/\s+/g, " ");

  return {
    "@context": "https://schema.org",
    "@type": "HealthAndBeautyBusiness",
    "@id": toAbsoluteUrl("/#studio", siteUrl),
    name: "La Speziale",
    alternateName: "Studio Nutrizionista La Speziale Milano",
    url: toAbsoluteUrl("/", siteUrl),
    logo: toAbsoluteUrl(settings.logoUrl || "/assets/old-site/logo-la-speziale-pellini.png", siteUrl),
    image: toAbsoluteUrl(settings.seo?.imageUrl || settings.logoUrl || "/assets/old-site/logo-la-speziale-pellini.png", siteUrl),
    email: settings.email ? `mailto:${settings.email}` : undefined,
    telephone: normalizedPhone,
    priceRange: "€€",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Via San Giovanni sul Muro 13",
      postalCode: "20121",
      addressLocality: "Milano",
      addressRegion: "MI",
      addressCountry: "IT",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 45.4665897,
      longitude: 9.1813446,
    },
    hasMap: "https://www.google.com/maps/place/Studio+Nutrizionista+La+Speziale+Milano/@45.4664571,9.1809463,20z/data=!4m6!3m5!1s0x4786c6afe02fef15:0xe505ade915e2cc3c!8m2!3d45.4665897!4d9.1813446!16s%2Fg%2F1tfjpl38?hl=it&entry=ttu",
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "09:00",
        closes: "17:30",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: "Saturday",
        opens: "09:00",
        closes: "14:00",
      },
    ],
    sameAs,
  };
}

export function breadcrumbJsonLd(items: BreadcrumbItem[]): JsonLd | undefined {
  const validItems = items.filter((item) => item.name && item.url);
  if (validItems.length < 2) return undefined;

  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: validItems.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function faqPageJsonLd(faqs: FaqItem[]): JsonLd | undefined {
  const validFaqs = faqs.filter((faq) => faq.question?.trim() && faq.answer?.trim());
  if (!validFaqs.length) return undefined;

  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: validFaqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

export function compactJsonLd(items: Array<JsonLd | undefined | false | null>): JsonLd[] {
  return items.filter(Boolean) as JsonLd[];
}
