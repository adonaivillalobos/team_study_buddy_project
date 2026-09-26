import { ImageResponse } from "next/og";

export const alt = "StudyBuddy | Organize your study schedule";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#F8FAFC",
          color: "#1F2937",
          fontSize: 72,
          fontWeight: 700,
        }}
      >
        <div style={{ color: "#375ECB" }}>StudyBuddy</div>
        <div style={{ fontSize: 32, fontWeight: 400, marginTop: 16, color: "#4B5563" }}>
          Organize your study schedule
        </div>
      </div>
    ),
    { ...size }
  );
}