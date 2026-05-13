import { useLocation } from "wouter";

const green = "#12372A";
const cream = "#EEEAE3";
const fontDisplay = "'Outfit', sans-serif";
const fontSans = "'DM Sans', sans-serif";

function Avatar({ src, label }: { src: string; label: string }) {
  const base = import.meta.env.BASE_URL;
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "14px" }}>
      <div
        style={{
          width: "120px",
          height: "120px",
          borderRadius: "50%",
          overflow: "hidden",
          border: "3px solid rgba(238,234,227,0.25)",
          flexShrink: 0,
        }}
      >
        <img
          src={`${base}${src}`}
          alt={label}
          style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center top" }}
        />
      </div>
      <span
        style={{
          fontSize: "15px",
          fontWeight: 600,
          color: "rgba(238,234,227,0.7)",
          letterSpacing: "0.06em",
          textTransform: "uppercase",
          fontFamily: fontSans,
        }}
      >
        {label}
      </span>
    </div>
  );
}

export default function Matched() {
  const [, setLocation] = useLocation();

  return (
    <div
      style={{
        minHeight: "100vh",
        background: green,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "48px 32px",
        fontFamily: fontSans,
        textAlign: "center",
        boxSizing: "border-box",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Radial glow */}
      <div
        style={{
          position: "absolute",
          top: "30%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "600px",
          height: "600px",
          background: "radial-gradient(ellipse, rgba(238,234,227,0.06) 0%, transparent 65%)",
          pointerEvents: "none",
        }}
      />

      {/* Wordmark */}
      <p
        style={{
          position: "absolute",
          top: "28px",
          left: "50%",
          transform: "translateX(-50%)",
          margin: 0,
          fontSize: "18px",
          fontWeight: 700,
          color: "rgba(238,234,227,0.5)",
          letterSpacing: "-0.02em",
          fontFamily: fontDisplay,
          whiteSpace: "nowrap",
        }}
      >
        karo
      </p>

      {/* Avatars */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "24px",
          marginBottom: "56px",
          position: "relative",
          zIndex: 1,
        }}
      >
        <Avatar src="tanya.jpg" label="Tanya" />

        {/* Connector dots */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "8px", paddingBottom: "28px" }}>
          {[0, 1, 2].map(i => (
            <div
              key={i}
              style={{ width: "5px", height: "5px", borderRadius: "50%", background: "rgba(238,234,227,0.35)" }}
            />
          ))}
        </div>

        <Avatar src="alex.png" label="Alex" />
      </div>

      {/* Text */}
      <div style={{ position: "relative", zIndex: 1, maxWidth: "420px" }}>
        <p
          style={{
            fontSize: "13px",
            fontWeight: 600,
            color: "rgba(238,234,227,0.5)",
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            margin: "0 0 16px",
            fontFamily: fontSans,
          }}
        >
          This week's match
        </p>

        <h1
          style={{
            fontSize: "clamp(2.2rem, 7vw, 3.4rem)",
            fontWeight: 800,
            lineHeight: 1.05,
            letterSpacing: "-0.03em",
            fontFamily: fontDisplay,
            color: cream,
            margin: "0 0 14px",
          }}
        >
          Tanya, you've
          <br />
          been matched.
        </h1>

        <p
          style={{
            fontSize: "clamp(1.1rem, 3.5vw, 1.5rem)",
            fontWeight: 500,
            color: "rgba(238,234,227,0.65)",
            margin: "0 0 52px",
            fontFamily: fontDisplay,
            letterSpacing: "-0.01em",
          }}
        >
          Meet Alex →
        </p>

        {/* CTA */}
        <button
          onClick={() => setLocation("/chat")}
          style={{
            background: cream,
            color: green,
            border: "none",
            borderRadius: "8px",
            padding: "16px 36px",
            fontSize: "14px",
            fontWeight: 700,
            cursor: "pointer",
            letterSpacing: "0.05em",
            textTransform: "uppercase",
            fontFamily: fontSans,
            width: "100%",
            maxWidth: "280px",
          }}
        >
          Coordinate Karo
        </button>

        <p
          style={{
            marginTop: "20px",
            fontSize: "12px",
            color: "rgba(238,234,227,0.35)",
            letterSpacing: "0.04em",
          }}
        >
          Monday, March 30th · SoHo
        </p>
      </div>
    </div>
  );
}
