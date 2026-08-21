import type { APIRoute } from "astro";
import { getProducts, getPrograms, getTherapies } from "../lib/sanity";

const SITE = "https://www.laspeziale.it";
const retiredProgramSlugs = new Set([
  "nutrizione-integrata",
  "fitoterapia-erbe-officinali-nutraceutici",
  "consapevolezza-motivazione",
]);

const staticPages = [
  "/",
  "/il-metodo/",
  "/programmi/",
  "/altre-consulenze/",
  "/fitoterapia/",
  "/consapevolezza/",
  "/dicono-di-noi/",
  "/contatti/",
  "/prodotti/",
  "/privacy-policy/",
  "/cookie-policy/",
];

const escapeXml = (value: string) =>
  value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");

const normalizeUrl = (path: string) => new URL(path, SITE).href;

export const GET: APIRoute = async () => {
  const [programs, products, therapies] = await Promise.all([
    getPrograms(),
    getProducts(),
    getTherapies(),
  ]);

  const programPages = programs
    .filter((program) => !retiredProgramSlugs.has(program.slug) && !program.slug.includes("fitoterapia"))
    .map((program) => `/programmi/${program.slug}/`);

  const productPages = products.map((product) => `/prodotti/${product.slug}/`);
  const therapyPages = therapies.map((therapy) => `/fitoterapia/${therapy.slug}/`);
  const urls = Array.from(new Set([...staticPages, ...programPages, ...therapyPages, ...productPages]));
  const today = new Date().toISOString().slice(0, 10);

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (path) => `  <url>
    <loc>${escapeXml(normalizeUrl(path))}</loc>
    <lastmod>${today}</lastmod>
  </url>`,
  )
  .join("\n")}
</urlset>`;

  return new Response(body, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
    },
  });
};
