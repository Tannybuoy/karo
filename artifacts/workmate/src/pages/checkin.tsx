import { useState } from "react";
import { useLocation } from "wouter";

const S = {
  bg: "#EEEAE3",
  fg: "#1a1a1a",
  muted: "#888",
  border: "rgba(0,0,0,0.1)",
  surface: "rgba(0,0,0,0.04)",
  surfaceMid: "rgba(0,0,0,0.07)",
  accent: "#12372A",
  fontSans: "'DM Sans', sans-serif",
  fontDisplay: "'Outfit', sans-serif",
};

function UploadBox({
  label,
  size,
  uploaded,
  imageSrc,
  onUpload,
}: {
  label: string;
  size: "large" | "small";
  uploaded: boolean;
  imageSrc?: string;
  onUpload: () => void;
}) {
  const isLarge = size === "large";
  const base = import.meta.env.BASE_URL;
  return (
    <div
      onClick={!uploaded ? onUpload : undefined}
      style={{
        width: isLarge ? "100%" : "96px",
        height: isLarge ? "240px" : "128px",
        borderRadius: isLarge ? "10px" : "8px",
        background: uploaded ? "transparent" : S.surfaceMid,
        border: uploaded ? "none" : `1.5px dashed ${S.border}`,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "8px",
        cursor: uploaded ? "default" : "pointer",
        position: "relative",
        overflow: "hidden",
        transition: "all 0.2s",
        flexShrink: 0,
      }}
    >
      {uploaded ? (
        <>
          {/* Real photo */}
          {imageSrc && (
            <img
              src={`${base}${imageSrc}`}
              alt={label}
              style={{
                position: "absolute",
                inset: 0,
                width: "100%",
                height: "100%",
                objectFit: "cover",
                objectPosition: "center top",
              }}
            />
          )}
          <div
            style={{
              position: "absolute",
              bottom: "8px",
              left: "10px",
              fontSize: "10px",
              color: "rgba(255,255,255,0.9)",
              fontWeight: 600,
              letterSpacing: "0.04em",
              textTransform: "uppercase",
              background: "rgba(0,0,0,0.35)",
              padding: "3px 8px",
              borderRadius: "20px",
              zIndex: 1,
            }}
          >
            {label}
          </div>
          <div
            style={{
              position: "absolute",
              top: "10px",
              right: "10px",
              width: "22px",
              height: "22px",
              borderRadius: "50%",
              background: S.accent,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 1,
            }}
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>
        </>
      ) : (
        <>
          <svg width={isLarge ? 28 : 20} height={isLarge ? 28 : 20} viewBox="0 0 24 24" fill="none" stroke={S.muted} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
            <circle cx="12" cy="13" r="4" />
          </svg>
          <span style={{ fontSize: isLarge ? "12px" : "10px", color: S.muted, fontWeight: 500, textAlign: "center", lineHeight: 1.4 }}>
            {label}
          </span>
        </>
      )}
    </div>
  );
}

function Toggle({ on, onToggle, label, sub }: { on: boolean; onToggle: () => void; label: string; sub: string }) {
  return (
    <label
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "14px 16px",
        background: on ? S.fg : "rgba(255,255,255,0.5)",
        border: `1px solid ${on ? S.fg : S.border}`,
        borderRadius: "6px",
        cursor: "pointer",
        transition: "all 0.2s",
      }}
    >
      <div>
        <p style={{ margin: 0, fontSize: "14px", fontWeight: 600, color: on ? S.bg : S.fg }}>{label}</p>
        <p style={{ margin: "2px 0 0", fontSize: "12px", color: on ? "rgba(238,234,227,0.65)" : S.muted }}>{sub}</p>
      </div>
      <div
        onClick={onToggle}
        style={{
          width: "44px",
          height: "24px",
          borderRadius: "12px",
          background: on ? S.accent : "rgba(0,0,0,0.12)",
          position: "relative",
          transition: "background 0.2s",
          flexShrink: 0,
          marginLeft: "16px",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: "3px",
            left: on ? "23px" : "3px",
            width: "18px",
            height: "18px",
            borderRadius: "50%",
            background: "#fff",
            transition: "left 0.2s",
            boxShadow: "0 1px 3px rgba(0,0,0,0.2)",
          }}
        />
      </div>
    </label>
  );
}

export default function CheckIn() {
  const [bothArrived, setBothArrived] = useState(true);
  const [thirtyMinPassed, setThirtyMinPassed] = useState(true);
  const [frontUploaded, setFrontUploaded] = useState(true);
  const [backUploaded, setBackUploaded] = useState(true);
  const [submitted, setSubmitted] = useState(false);
  const [, setLocation] = useLocation();

  const canCheckIn = bothArrived && thirtyMinPassed;
  const bothUploaded = frontUploaded && backUploaded;

  if (submitted) {
    return (
      <div style={{ padding: "48px 24px", textAlign: "center" }}>
        <div
          style={{
            width: "64px",
            height: "64px",
            borderRadius: "50%",
            background: S.accent,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto 24px",
          }}
        >
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>
        <p style={{ fontSize: "clamp(1.6rem, 5vw, 2rem)", fontWeight: 700, letterSpacing: "-0.02em", fontFamily: S.fontDisplay, margin: "0 0 10px" }}>
          Session logged!
        </p>
        <p style={{ fontSize: "14px", color: S.muted, lineHeight: 1.6, margin: "0 0 36px" }}>
          Nice work. How did it go?
        </p>
        <button
          onClick={() => setLocation("/feedback")}
          style={{
            width: "100%",
            padding: "14px",
            background: S.fg,
            color: S.bg,
            border: "none",
            borderRadius: "6px",
            fontSize: "13px",
            fontWeight: 700,
            cursor: "pointer",
            letterSpacing: "0.06em",
            textTransform: "uppercase",
            fontFamily: S.fontSans,
          }}
        >
          Leave Feedback
        </button>
        <button
          onClick={() => setLocation("/app")}
          style={{
            width: "100%",
            marginTop: "12px",
            padding: "14px",
            background: "transparent",
            color: S.muted,
            border: `1px solid ${S.border}`,
            borderRadius: "6px",
            fontSize: "13px",
            fontWeight: 600,
            cursor: "pointer",
            fontFamily: S.fontSans,
          }}
        >
          Back to Match
        </button>
      </div>
    );
  }

  return (
    <div style={{ padding: "32px 24px 40px", fontFamily: S.fontSans, color: S.fg }}>
      <p style={{ fontSize: "11px", fontWeight: 600, color: S.muted, letterSpacing: "0.08em", textTransform: "uppercase", margin: "0 0 8px" }}>
        Session
      </p>
      <p style={{ fontSize: "clamp(1.6rem, 5vw, 2rem)", fontWeight: 700, letterSpacing: "-0.02em", fontFamily: S.fontDisplay, margin: "0 0 32px", lineHeight: 1.1 }}>
        Check-in
      </p>

      {/* Conditions */}
      <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginBottom: "28px" }}>
        <Toggle
          on={bothArrived}
          onToggle={() => setBothArrived(v => !v)}
          label="Both arrived"
          sub="You and your match are at the spot"
        />
        <Toggle
          on={thirtyMinPassed}
          onToggle={() => setThirtyMinPassed(v => !v)}
          label="30 minutes in"
          sub="At least 30 min since session started"
        />
      </div>

      <div style={{ height: "1px", background: S.border, marginBottom: "28px" }} />

      {/* Upload section */}
      <p style={{ fontSize: "11px", fontWeight: 600, color: S.muted, letterSpacing: "0.08em", textTransform: "uppercase", margin: "0 0 14px" }}>
        Capture the moment
      </p>

      {canCheckIn ? (
        <>
          {/* BeReal-style layout */}
          <div style={{ position: "relative", marginBottom: "20px" }}>
            {/* Back (workspace) — large: Alex */}
            <UploadBox
              label="Your workspace"
              size="large"
              uploaded={backUploaded}
              imageSrc="alex-working.png"
              onUpload={() => setBackUploaded(true)}
            />
            {/* Front (you) — small inset: Tanya */}
            <div
              style={{
                position: "absolute",
                top: "12px",
                left: "12px",
                border: `2px solid ${S.bg}`,
                borderRadius: "10px",
                overflow: "hidden",
                boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
              }}
            >
              <UploadBox
                label="You"
                size="small"
                uploaded={frontUploaded}
                imageSrc="tanya-selfie.png"
                onUpload={() => setFrontUploaded(true)}
              />
            </div>
          </div>

          <p style={{ fontSize: "12px", color: S.muted, margin: "0 0 24px", lineHeight: 1.5 }}>
            Tap each frame to upload. One photo of you, one of where you're working.
          </p>

          <button
            disabled={!bothUploaded}
            onClick={() => setSubmitted(true)}
            style={{
              width: "100%",
              padding: "14px",
              background: bothUploaded ? S.fg : S.surface,
              color: bothUploaded ? S.bg : S.muted,
              border: `1px solid ${bothUploaded ? S.fg : S.border}`,
              borderRadius: "6px",
              fontSize: "13px",
              fontWeight: 700,
              cursor: bothUploaded ? "pointer" : "not-allowed",
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              fontFamily: S.fontSans,
              transition: "all 0.2s",
            }}
          >
            {bothUploaded ? "Submit Check-In" : "Upload both photos to continue"}
          </button>
        </>
      ) : (
        <div
          style={{
            padding: "28px 20px",
            background: S.surface,
            border: `1px solid ${S.border}`,
            borderRadius: "8px",
            textAlign: "center",
          }}
        >
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke={S.muted} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginBottom: "12px" }}>
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
          </svg>
          <p style={{ margin: 0, fontSize: "14px", color: S.muted, lineHeight: 1.6 }}>
            Check-in unlocks once both of you have arrived and 30 minutes have passed.
          </p>
        </div>
      )}
    </div>
  );
}
