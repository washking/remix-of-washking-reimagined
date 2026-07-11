export const backgroundImageSet = (
  avifSource: string,
  fallbackSource: string,
  fallbackType = "image/jpeg",
) =>
  `image-set(url("${avifSource}") type("image/avif"), url("${fallbackSource}") type("${fallbackType}"))`;
