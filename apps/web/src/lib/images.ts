const SANITY_IMAGE_HOST = "cdn.sanity.io";

const isSanityImageUrl = (src?: string) => {
  if (!src) return false;
  try {
    return new URL(src).hostname === SANITY_IMAGE_HOST;
  } catch {
    return false;
  }
};

export function optimizedImageUrl(src: string, width: number) {
  if (!isSanityImageUrl(src)) return src;

  const url = new URL(src);
  url.searchParams.set("auto", "format");
  url.searchParams.set("fit", "max");
  url.searchParams.set("w", String(width));
  return url.href;
}

export function imageSrcSet(src?: string, widths = [480, 768, 1024, 1440]) {
  if (!src || !isSanityImageUrl(src)) return undefined;
  return widths.map((width) => `${optimizedImageUrl(src, width)} ${width}w`).join(", ");
}
