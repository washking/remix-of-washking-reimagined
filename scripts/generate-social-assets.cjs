const path = require("node:path");
const sharp = require("sharp");

const root = path.resolve(__dirname, "..");
const asset = (name) => path.join(root, "src", "assets", name);
const publicFile = (name) => path.join(root, "public", name);

const socialOverlay = Buffer.from(`
  <svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
    <path d="M0 0H575L520 630H0Z" fill="#F8C933"/>
    <path d="M555 0H575L520 630H500Z" fill="#287CAF"/>
    <text x="64" y="202" fill="#287CAF" font-family="Arial, Helvetica, sans-serif" font-size="42" font-weight="900">WASH</text>
    <text x="195" y="202" fill="#F28C18" font-family="Arial, Helvetica, sans-serif" font-size="42" font-weight="900">KING</text>
    <text x="65" y="232" fill="#472918" font-family="Arial, Helvetica, sans-serif" font-size="23" font-weight="900" letter-spacing="5">CAR WASH</text>
    <text x="62" y="325" fill="#472918" font-family="Arial, Helvetica, sans-serif" font-size="51" font-weight="800">
      <tspan x="62" dy="0">Where every car is</tspan>
      <tspan x="62" dy="56">treated like</tspan><tspan x="354" fill="#287CAF"> royalty.</tspan>
    </text>
    <text x="64" y="445" fill="#472918" font-family="Arial, Helvetica, sans-serif" font-size="24" font-weight="700">
      <tspan x="64" dy="0">Four New Jersey locations with single</tspan>
      <tspan x="64" dy="34">washes and unlimited plans.</tspan>
    </text>
    <rect x="64" y="552" width="42" height="7" rx="3.5" fill="#287CAF"/>
    <text x="121" y="568" fill="#472918" font-family="Arial, Helvetica, sans-serif" font-size="23" font-weight="800">washking.net</text>
    <rect x="815" y="532" width="340" height="58" rx="7" fill="#287CAF" stroke="#FFFFFF" stroke-width="3"/>
    <text x="985" y="568" text-anchor="middle" fill="#FFFFFF" font-family="Arial, Helvetica, sans-serif" font-size="20" font-weight="800">Unlimited plans from $24.99/mo</text>
  </svg>
`);

async function buildSocialPreview() {
  const photo = await sharp(asset("washking-wash-tunnel-hero.jpg"))
    .resize(1200, 630, { fit: "cover", position: "centre" })
    .png()
    .toBuffer();
  const logo = await sharp(asset("washking-logo.png"))
    .extract({ left: 0, top: 0, width: 500, height: 380 })
    .trim({ background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .resize(178, 150, {
      fit: "contain",
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    })
    .png()
    .toBuffer();

  await sharp(photo)
    .composite([
      { input: socialOverlay, top: 0, left: 0 },
      { input: logo, top: 10, left: 54 },
    ])
    .png({ compressionLevel: 9 })
    .toFile(publicFile("og-image-v2.png"));
}

async function buildAppleTouchIcon() {
  const mascot = await sharp(asset("washking-logo.png"))
    .extract({ left: 0, top: 0, width: 500, height: 380 })
    .trim({ background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .resize(164, 164, {
      fit: "contain",
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    })
    .flatten({ background: "#F8C933" })
    .png()
    .toBuffer();

  await sharp({
    create: { width: 180, height: 180, channels: 4, background: "#F8C933" },
  })
    .composite([{ input: mascot, gravity: "center" }])
    .png({ compressionLevel: 9 })
    .toFile(publicFile("apple-touch-icon.png"));
}

async function buildAppIcon(size) {
  const mascot = await sharp(asset("washking-logo.png"))
    .extract({ left: 0, top: 0, width: 500, height: 380 })
    .trim({ background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .resize(Math.round(size * 0.86), Math.round(size * 0.86), {
      fit: "contain",
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    })
    .png()
    .toBuffer();

  await sharp({
    create: { width: size, height: size, channels: 4, background: "#F8C933" },
  })
    .composite([{ input: mascot, gravity: "center" }])
    .png({ compressionLevel: 9 })
    .toFile(publicFile(`icon-${size}.png`));
}

Promise.all([
  buildSocialPreview(),
  buildAppleTouchIcon(),
  buildAppIcon(192),
  buildAppIcon(512),
]).catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
