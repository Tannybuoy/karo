import { useState } from "react";
import { useLocation } from "wouter";

const S = {
  bg: "#EEEAE3",
  fg: "#1a1a1a",
  muted: "#888",
  border: "rgba(0,0,0,0.1)",
  surface: "rgba(0,0,0,0.04)",
  accent: "#12372A",
  fontSans: "'DM Sans', sans-serif",
  fontDisplay: "'Outfit', sans-serif",
};

function YesNo({
  question,
  value,
  onChange,
}: {
  question: string;
  value: boolean | null;
  onChange: (v: boolean) => void;
}) {
  return (
    <div style={{ marginBottom: "28px" }}>
      <p style={{ fontSize: "17px", fontWeight: 600, margin: "0 0 14px", lineHeight: 1.4 }}>{question}</p>
      <div style={{ display: "flex", gap: "10px" }}>
        {[true, false].map((opt) => {
          const active = value === opt;
          return (
            <button
              key={String(opt)}
              onClick={() => onChange(opt)}
              style={{
                flex: 1,
                padding: "14px 0",
                borderRadius: "6px",
                border: `1px solid ${active ? S.fg : S.border}`,
                background: active ? S.fg : "rgba(255,255,255,0.5)",
                color: active ? S.bg : S.fg,
                fontSize: "15px",
                fontWeight: 700,
                cursor: "pointer",
                fontFamily: S.fontSans,
                transition: "all 0.15s",
              }}
            >
              {opt ? "Yes" : "No"}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default function Feedback() {
  const [theyShowedUp, setTheyShowedUp] = useState<boolean | null>(null);
  const [goodSpot, setGoodSpot] = useState<boolean | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [, setLocation] = useLocation();

  const canSubmit = theyShowedUp !== null && goodSpot !== null;

  if (submitted) {
    return (
      <div style={{ padding: "48px 24px", textAlign: "center", fontFamily: S.fontSans }}>
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
        <p
          style={{
            fontSize: "clamp(1.6rem, 5vw, 2rem)",
            fontWeight: 700,
            letterSpacing: "-0.02em",
            fontFamily: S.fontDisplay,
            margin: "0 0 10px",
          }}
        >
          Thanks for the feedback.
        </p>
        <p style={{ fontSize: "14px", color: S.muted, lineHeight: 1.6, margin: "0 0 40px" }}>
          We'll use this to improve your next match.
        </p>
        <button
          onClick={() => setLocation("/app")}
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
          Back to Match
        </button>
      </div>
    );
  }

  return (
    <div style={{ padding: "32px 24px 40px", fontFamily: S.fontSans, color: S.fg }}>
      <p
        style={{
          fontSize: "11px",
          fontWeight: 600,
          color: S.muted,
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          margin: "0 0 8px",
        }}
      >
        Post-session
      </p>
      <p
        style={{
          fontSize: "clamp(1.6rem, 5vw, 2rem)",
          fontWeight: 700,
          letterSpacing: "-0.02em",
          fontFamily: S.fontDisplay,
          margin: "0 0 36px",
          lineHeight: 1.1,
        }}
      >
        How did it go?
      </p>

      <div style={{ height: "1px", background: S.border, marginBottom: "28px" }} />

      <YesNo
        question="Did they show up?"
        value={theyShowedUp}
        onChange={setTheyShowedUp}
      />

      <YesNo
        question="Was this a good place to work?"
        value={goodSpot}
        onChange={setGoodSpot}
      />

      <div style={{ height: "1px", background: S.border, margin: "4px 0 28px" }} />

      <button
        disabled={!canSubmit}
        onClick={() => setSubmitted(true)}
        style={{
          width: "100%",
          padding: "14px",
          background: canSubmit ? S.fg : S.surface,
          color: canSubmit ? S.bg : S.muted,
          border: `1px solid ${canSubmit ? S.fg : S.border}`,
          borderRadius: "6px",
          fontSize: "13px",
          fontWeight: 700,
          cursor: canSubmit ? "pointer" : "not-allowed",
          letterSpacing: "0.06em",
          textTransform: "uppercase",
          fontFamily: S.fontSans,
          transition: "all 0.2s",
        }}
      >
        Submit Feedback
      </button>
    </div>
  );
}
