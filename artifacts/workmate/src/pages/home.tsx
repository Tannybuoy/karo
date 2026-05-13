import { useMatch } from "@/hooks/use-match";
import { format } from "date-fns";
import { Loader2 } from "lucide-react";
import { Link, useLocation } from "wouter";

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

const styleChips: Record<string, string> = {
  quiet: "Quiet focus",
  light_chat: "Light chat ok",
  brief_social: "Brief social",
};

const intentLabels: Record<string, string> = {
  deep_work: "Deep Work",
  studying: "Studying",
  job_search: "Job Search",
  side_projects: "Side Projects",
};

export default function Home() {
  const base = import.meta.env.BASE_URL;
  const { data: match, isLoading, isError } = useMatch();

  if (isLoading) {
    return (
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: "60vh" }}>
        <Loader2 style={{ width: 28, height: 28, color: S.fg, animation: "spin 1s linear infinite" }} />
      </div>
    );
  }

  if (isError || !match) {
    return (
      <div style={{ padding: "48px 28px", textAlign: "center" }}>
        <div
          style={{
            width: "64px",
            height: "64px",
            borderRadius: "50%",
            background: S.surface,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto 28px",
          }}
        >
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke={S.muted} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
          </svg>
        </div>
        <p
          style={{
            fontSize: "clamp(1.6rem, 4vw, 2rem)",
            fontWeight: 700,
            letterSpacing: "-0.02em",
            fontFamily: S.fontDisplay,
            margin: "0 0 12px",
          }}
        >
          Looking for your match
        </p>
        <p style={{ fontSize: "14px", color: S.muted, lineHeight: 1.6, maxWidth: "260px", margin: "0 auto" }}>
          Matches are revealed every Saturday at 6 pm. Make sure your profile is up to date.
        </p>
      </div>
    );
  }

  const sessionDate = new Date(match.sessionDate);
  const p = match.matchedUserProfile;

  return (
    <div style={{ padding: "32px 24px 24px" }}>

      {/* Week label */}
      <p style={{ fontSize: "11px", fontWeight: 600, color: S.muted, letterSpacing: "0.08em", textTransform: "uppercase", margin: "0 0 8px" }}>
        This week's match
      </p>

      {/* Session date */}
      <p style={{ fontSize: "clamp(1.8rem, 6vw, 2.4rem)", fontWeight: 700, letterSpacing: "-0.02em", fontFamily: S.fontDisplay, margin: "0 0 28px", lineHeight: 1.1 }}>
        {format(sessionDate, "EEEE, MMMM do")}
      </p>

      {/* Session slot + status */}
      <div style={{ display: "flex", gap: "8px", marginBottom: "32px", flexWrap: "wrap" }}>
        <span
          style={{
            fontSize: "12px",
            fontWeight: 600,
            padding: "6px 14px",
            borderRadius: "4px",
            background: S.surface,
            border: `1px solid ${S.border}`,
            letterSpacing: "0.02em",
          }}
        >
          {match.sessionTimeSlot}
        </span>
        <span
          style={{
            fontSize: "12px",
            fontWeight: 700,
            padding: "6px 14px",
            borderRadius: "4px",
            background: match.status === "confirmed" ? S.accent : S.surface,
            border: `1px solid ${match.status === "confirmed" ? "transparent" : S.border}`,
            color: match.status === "confirmed" ? "#fff" : S.fg,
            letterSpacing: "0.04em",
            textTransform: "uppercase",
          }}
        >
          {match.status === "confirmed" ? "Confirmed" : "Pending"}
        </span>
      </div>

      {/* Divider */}
      <div style={{ height: "1px", background: S.border, marginBottom: "28px" }} />

      {/* Matched person */}
      <p style={{ fontSize: "11px", fontWeight: 600, color: S.muted, letterSpacing: "0.08em", textTransform: "uppercase", margin: "0 0 16px" }}>
        Matched with
      </p>

      <div style={{ display: "flex", alignItems: "flex-start", gap: "16px", marginBottom: "24px" }}>
        {/* Avatar */}
        <div
          style={{
            width: "60px",
            height: "60px",
            borderRadius: "50%",
            background: S.surface,
            border: `1px solid ${S.border}`,
            overflow: "hidden",
            flexShrink: 0,
          }}
        >
          <img
            src={p.photoUrl ?? `${base}alex.png`}
            alt={p.name}
            style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center top" }}
          />
        </div>

        <div style={{ flex: 1 }}>
          <p style={{ margin: "0 0 6px", fontSize: "20px", fontWeight: 700, letterSpacing: "-0.01em", fontFamily: S.fontDisplay }}>
            {p.name}
          </p>
          <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
            {p.workingStyle && (
              <span style={{ fontSize: "11px", padding: "3px 10px", borderRadius: "4px", background: S.surface, border: `1px solid ${S.border}`, color: S.muted, fontWeight: 600 }}>
                {styleChips[p.workingStyle] ?? p.workingStyle}
              </span>
            )}
            {p.workIntents?.map((intent) => (
              <span key={intent} style={{ fontSize: "11px", padding: "3px 10px", borderRadius: "4px", background: S.surface, border: `1px solid ${S.border}`, color: S.muted, fontWeight: 600 }}>
                {intentLabels[intent] ?? intent}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Neighborhoods */}
      {p.preferredNeighborhoods?.length > 0 && (
        <div style={{ marginBottom: "32px" }}>
          <p style={{ fontSize: "11px", fontWeight: 600, color: S.muted, letterSpacing: "0.08em", textTransform: "uppercase", margin: "0 0 8px" }}>
            Neighbourhoods
          </p>
          <p style={{ fontSize: "14px", color: S.fg, margin: 0, lineHeight: 1.6 }}>
            {p.preferredNeighborhoods.join(" · ")}
          </p>
        </div>
      )}

      {/* CTA */}
      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        {match.status === "confirmed" && match.chatEnabled ? (
          <Link href="/chat" style={{ display: "block", textDecoration: "none" }}>
            <button
              style={{
                width: "100%",
                padding: "14px 20px",
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
              Open Coordination Chat
            </button>
          </Link>
        ) : (
          <button
            disabled
            style={{
              width: "100%",
              padding: "14px 20px",
              background: S.surface,
              color: S.muted,
              border: `1px solid ${S.border}`,
              borderRadius: "6px",
              fontSize: "13px",
              fontWeight: 600,
              cursor: "not-allowed",
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              fontFamily: S.fontSans,
            }}
          >
            Waiting for Confirmation
          </button>
        )}

        {/* Session check-in — only visible for confirmed matches */}
        {match.status === "confirmed" && (
          <Link href="/checkin" style={{ display: "block", textDecoration: "none" }}>
            <button
              style={{
                width: "100%",
                padding: "14px 20px",
                background: "transparent",
                color: S.fg,
                border: `1px solid ${S.border}`,
                borderRadius: "6px",
                fontSize: "13px",
                fontWeight: 600,
                cursor: "pointer",
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                fontFamily: S.fontSans,
              }}
            >
              Session Check-In
            </button>
          </Link>
        )}
      </div>
    </div>
  );
}
