import KingdomHeading from "@/components/KingdomHeading";
import OptimizedImage from "@/components/OptimizedImage";
import type { LocationPhoto } from "@/lib/locationMedia";

type LocationGalleryProps = {
  locationName: string;
  photos: readonly LocationPhoto[];
};

const LocationGallery = ({ locationName, photos }: LocationGalleryProps) => (
  <section className="bg-white py-12 lg:py-16" aria-label={`${locationName} photo gallery`}>
    <div className="container mx-auto px-4">
      <KingdomHeading
        eyebrow="See the wash"
        title={`Inside Wash King ${locationName}`}
        description={`A closer look at the wash experience and facility at ${locationName}.`}
        className="mb-9 lg:mb-12"
      />

      <div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-2">
        {photos.map((photo) => (
          <figure key={photo.label} className="overflow-hidden rounded-lg border border-washking-brown/15 bg-black shadow-md">
            <OptimizedImage
              avifSrc={photo.avifSrc}
              src={photo.src}
              alt={photo.alt}
              width={photo.width}
              height={photo.height}
              loading="lazy"
              decoding="async"
              className="block aspect-[3/2] h-auto w-full object-contain"
            />
            <figcaption className="bg-washking-yellow px-4 py-3 text-center font-body text-sm font-bold text-washking-brown">
              {photo.label}
            </figcaption>
          </figure>
        ))}
      </div>
    </div>
  </section>
);

export default LocationGallery;
