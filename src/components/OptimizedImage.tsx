import type { ImgHTMLAttributes } from "react";

type OptimizedImageProps = ImgHTMLAttributes<HTMLImageElement> & {
  avifSrc: string;
};

const OptimizedImage = ({ avifSrc, ...imageProps }: OptimizedImageProps) => (
  <picture>
    <source srcSet={avifSrc} type="image/avif" />
    <img {...imageProps} />
  </picture>
);

export default OptimizedImage;
