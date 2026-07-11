import { cleanup, render } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import OptimizedImage from "@/components/OptimizedImage";

afterEach(cleanup);

describe("OptimizedImage", () => {
  it("provides AVIF with a standard image fallback", () => {
    const { container } = render(
      <OptimizedImage
        avifSrc="/image.avif"
        src="/image.png"
        alt="Example"
        width={100}
        height={80}
        loading="lazy"
      />,
    );

    expect(container.querySelector('source[type="image/avif"]')).toHaveAttribute(
      "srcset",
      "/image.avif",
    );
    expect(container.querySelector("img")).toHaveAttribute("src", "/image.png");
    expect(container.querySelector("img")).toHaveAttribute("loading", "lazy");
  });
});
