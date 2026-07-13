import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

type Rgb = [number, number, number];

const css = readFileSync(resolve(process.cwd(), "src/index.css"), "utf8");

const token = (name: string) => {
  const match = css.match(new RegExp(`--${name}:\\s*(\\d+)\\s+(\\d+)%\\s+(\\d+)%`));
  if (!match) throw new Error(`Missing color token: ${name}`);
  return match.slice(1).map(Number) as [number, number, number];
};

const hslToRgb = ([hue, saturationValue, lightnessValue]: [number, number, number]): Rgb => {
  const saturation = saturationValue / 100;
  const lightness = lightnessValue / 100;
  const chroma = (1 - Math.abs(2 * lightness - 1)) * saturation;
  const x = chroma * (1 - Math.abs(((hue / 60) % 2) - 1));
  const offset = lightness - chroma / 2;
  const [red, green, blue] =
    hue < 60
      ? [chroma, x, 0]
      : hue < 120
        ? [x, chroma, 0]
        : hue < 180
          ? [0, chroma, x]
          : hue < 240
            ? [0, x, chroma]
            : hue < 300
              ? [x, 0, chroma]
              : [chroma, 0, x];
  return [red + offset, green + offset, blue + offset];
};

const luminance = (rgb: Rgb) =>
  rgb
    .map((channel) =>
      channel <= 0.04045
        ? channel / 12.92
        : ((channel + 0.055) / 1.055) ** 2.4,
    )
    .reduce((total, channel, index) => total + channel * [0.2126, 0.7152, 0.0722][index], 0);

const contrast = (left: Rgb, right: Rgb) => {
  const leftLuminance = luminance(left);
  const rightLuminance = luminance(right);
  return (
    (Math.max(leftLuminance, rightLuminance) + 0.05) /
    (Math.min(leftLuminance, rightLuminance) + 0.05)
  );
};

describe("accessibility guardrails", () => {
  it("keeps core text/background pairs at WCAG AA contrast", () => {
    const white: Rgb = [1, 1, 1];
    const sky = hslToRgb(token("washking-sky"));
    const brown = hslToRgb(token("washking-brown"));
    const red = hslToRgb(token("washking-red"));
    const yellow = hslToRgb(token("washking-yellow"));

    expect(contrast(sky, white)).toBeGreaterThanOrEqual(4.5);
    expect(contrast(brown, yellow)).toBeGreaterThanOrEqual(4.5);
    expect(contrast(red, white)).toBeGreaterThanOrEqual(4.5);
  });

  it("gives every rendered page a skip-link target", () => {
    const pages = [
      "Index.tsx",
      "LocationPage.tsx",
      "AboutPage.tsx",
      "ContactPage.tsx",
      "CustomerSurveyPage.tsx",
      "EmploymentPage.tsx",
      "PrivacyPage.tsx",
      "ThankYouPage.tsx",
      "NotFound.tsx",
    ];

    pages.forEach((page) => {
      expect(
        readFileSync(resolve(process.cwd(), "src/pages", page), "utf8"),
      ).toContain('id="main-content"');
    });
  });
});
