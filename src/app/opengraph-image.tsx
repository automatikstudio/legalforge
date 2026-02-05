import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "LegalForge — AI Legal Document Generator";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#0B0F1A",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "60px 80px",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "4px",
            background: "linear-gradient(90deg, #0D9488, #06B6D4)",
            display: "flex",
          }}
        />
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <div style={{ fontSize: "64px", fontWeight: 800, color: "#ffffff", letterSpacing: "-2px", display: "flex" }}>
            LegalForge
          </div>
          <div style={{ fontSize: "32px", fontWeight: 500, color: "#0D9488", display: "flex" }}>
            AI Legal Document Generator
          </div>
          <div style={{ fontSize: "24px", color: "#6B7280", maxWidth: "700px", lineHeight: 1.4, display: "flex" }}>
            Generate privacy policies, terms of service, and cookie policies by scanning your website.
          </div>
        </div>
        <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
          {["Privacy Policy", "Terms of Service", "Cookie Policy"].map((doc) => (
            <div key={doc} style={{ background: "#0D948820", border: "1px solid #0D948840", borderRadius: "8px", padding: "8px 20px", fontSize: "18px", color: "#0D9488", fontWeight: 600, display: "flex" }}>
              {doc}
            </div>
          ))}
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ fontSize: "18px", color: "#4B5563", display: "flex" }}>legalforge-chi.vercel.app</div>
          <div style={{ fontSize: "18px", color: "#4B5563", display: "flex" }}>automatik.studio</div>
        </div>
      </div>
    ),
    { ...size }
  );
}
