import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { home, show, site } from "@/lib/site";

export const alt = `${site.name} — ${home.hero.eyebrow}. ${show.title}, ${show.venue} ${show.city}, ${show.day}. ${show.month} ${show.year}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  const [mark, display, body] = await Promise.all([
    readFile(join(process.cwd(), "src/app/icon.png")),
    readFile(join(process.cwd(), "src/lib/fonts/BigShoulders-ExtraBold.ttf")),
    readFile(join(process.cwd(), "src/lib/fonts/Onest-Medium.ttf")),
  ]);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          background: "#100d0a",
          color: "#e3ddd2",
          paddingLeft: 80,
          paddingRight: 72,
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            width: 720,
          }}
        >
          <div
            style={{
              display: "flex",
              fontFamily: "Onest",
              fontSize: 22,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "#c2410c",
            }}
          >
            {home.hero.eyebrow}
          </div>
          <div
            style={{
              display: "flex",
              fontFamily: "Shoulders",
              fontSize: 128,
              lineHeight: 0.86,
              letterSpacing: "-0.02em",
              textTransform: "uppercase",
              marginTop: 28,
            }}
          >
            Tafi
          </div>
          <div
            style={{
              display: "flex",
              fontFamily: "Shoulders",
              fontSize: 128,
              lineHeight: 0.86,
              letterSpacing: "-0.02em",
              textTransform: "uppercase",
            }}
          >
            Michel
          </div>
          <div
            style={{
              display: "flex",
              fontFamily: "Onest",
              fontSize: 28,
              marginTop: 40,
            }}
          >
            {show.title}
          </div>
          <div
            style={{
              display: "flex",
              fontFamily: "Onest",
              fontSize: 22,
              color: "rgba(227,221,210,0.62)",
              marginTop: 10,
            }}
          >
            {`${show.day}. ${show.month} ${show.year} · ${show.venue} ${show.city}`}
          </div>
        </div>
        <img
          src={`data:image/png;base64,${mark.toString("base64")}`}
          width={300}
          height={276}
        />
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Shoulders", data: display, weight: 800, style: "normal" },
        { name: "Onest", data: body, weight: 500, style: "normal" },
      ],
    },
  );
}
