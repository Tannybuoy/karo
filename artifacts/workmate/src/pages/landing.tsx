import { useState, useEffect, useRef } from "react";
import { useLocation } from "wouter";

const S = {
  bg: "#EEEAE3",
  fg: "#1a1a1a",
  muted: "#888",
  border: "rgba(0,0,0,0.1)",
  accent: "#12372A",
  fontSans: "'DM Sans', sans-serif",
  fontDisplay: "'Outfit', sans-serif",
};

const SCREENSHOTS = [
  "screenshots/screen-match.jpg",
  "screenshots/screen-profile.jpg",
  "screenshots/screen-chat.jpg",
  "screenshots/screen-checkin.jpg",
  "screenshots/screen-feedback.jpg",
];

/* ─── Desktop: crossfading phone mockup ─── */
function PhoneMockup({ activeIndex }: { activeIndex: number }) {
  const base = import.meta.env.BASE_URL;
  return (
    <div
      style={{
        width: "260px",
        height: "520px",
        borderRadius: "36px",
        background: "#1a1a1a",
        padding: "10px",
        boxShadow: "0 40px 80px rgba(0,0,0,0.25), 0 0 0 1px rgba(255,255,255,0.06) inset",
        position: "relative",
        flexShrink: 0,
      }}
    >
      <div
        style={{
          position: "absolute",
          top: "14px",
          left: "50%",
          transform: "translateX(-50%)",
          width: "80px",
          height: "22px",
          background: "#1a1a1a",
          borderRadius: "12px",
          zIndex: 10,
        }}
      />
      <div style={{ width: "100%", height: "100%", borderRadius: "28px", background: S.bg, overflow: "hidden", position: "relative" }}>
        {SCREENSHOTS.map((src, i) => (
          <img
            key={src + i}
            src={`${base}${src}`}
            alt={`Screen ${i + 1}`}
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "top",
              opacity: i === activeIndex ? 1 : 0,
              transition: "opacity 0.5s ease",
              borderRadius: "28px",
            }}
          />
        ))}
      </div>
    </div>
  );
}

/* ─── Bottom bar (shared) ─── */
function BottomBar({ onSignIn, onJoin }: { onSignIn: () => void; onJoin: () => void }) {
  return (
    <div
      style={{
        borderTop: `1px solid ${S.border}`,
        padding: "0 24px",
        height: "60px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        background: S.bg,
        width: "100%",
        boxSizing: "border-box",
      }}
    >
      <span style={{ fontSize: "11px", color: "#999", letterSpacing: "0.05em", textTransform: "uppercase" }}>
        Private beta · NYC
      </span>
      <span style={{ fontSize: "18px", fontWeight: 700, letterSpacing: "-0.02em", fontFamily: S.fontDisplay }}>
        karo
      </span>
      <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
        <button
          onClick={onSignIn}
          style={{ background: "none", border: "none", fontSize: "12px", fontWeight: 500, color: "#555", cursor: "pointer", letterSpacing: "0.06em", textTransform: "uppercase", fontFamily: S.fontSans }}
        >
          Sign In
        </button>
        <button
          onClick={onJoin}
          style={{ background: S.accent, border: "none", borderRadius: "4px", padding: "8px 14px", fontSize: "11px", fontWeight: 700, cursor: "pointer", letterSpacing: "0.06em", textTransform: "uppercase", fontFamily: S.fontSans, color: "#fff" }}
        >JOIN KARO</button>
      </div>
    </div>
  );
}

/* ─── Section text content definitions ─── */
function HeroText({ submitted, email, setEmail, onSubmit }: { submitted: boolean; email: string; setEmail: (v: string) => void; onSubmit: (e: React.FormEvent) => void }) {
  return (
    <div style={{ maxWidth: "680px" }}>
      <p style={{ fontSize: "clamp(3.6rem, 6vw, 6rem)", fontWeight: 700, lineHeight: 1.08, letterSpacing: "-0.02em", fontFamily: S.fontDisplay, margin: "0 0 30px" }}>
        One person.
        <br />One café.
        <br />Once a week.
      </p>
      <p
        style={{ fontSize: "22px", color: S.muted, lineHeight: 1.6, margin: "0 0 48px", maxWidth: "510px" }}
        className="text-[#4f4f4f] border-t-[#888888] border-r-[#888888] border-b-[#888888] border-l-[#888888]">Work in your neighbourhood, with someone who works like you. Scroll to see more, meanwhile sign up for the waitlist.</p>
      {!submitted ? (
        <form onSubmit={onSubmit} style={{ display: "flex", gap: "14px", flexWrap: "wrap", maxWidth: "560px" }}>
          <input
            type="email"
            required
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="your@email.com"
            style={{ flex: 1, minWidth: "220px", background: "rgba(0,0,0,0.06)", border: `1px solid ${S.border}`, borderRadius: "8px", padding: "16px 22px", fontSize: "21px", outline: "none", fontFamily: S.fontSans, color: S.fg }}
          />
          <button
            type="submit"
            style={{ background: S.accent, color: "#fff", border: "none", borderRadius: "8px", padding: "16px 30px", fontSize: "19px", fontWeight: 700, cursor: "pointer", letterSpacing: "0.04em", textTransform: "uppercase", fontFamily: S.fontSans, whiteSpace: "nowrap" }}
          >JOIN KARO</button>
        </form>
      ) : (
        <div style={{ background: "rgba(0,0,0,0.06)", borderRadius: "8px", padding: "16px 22px", display: "inline-block" }}>
          <p style={{ margin: 0, fontSize: "15px", fontWeight: 600 }}>You're on the list.</p>
          <p style={{ margin: "4px 0 0", fontSize: "13px", color: S.muted }}>We'll reach out when New York opens.</p>
        </div>
      )}
    </div>
  );
}

const SECTION_TEXT = [
  null, // hero handled separately
  {
    heading: "Are you a student or a professional who enjoys working in coffee shops?",
    size: "clamp(2rem, 3.6vw, 3.6rem)",
  },
  {
    heading: "Every Saturday at 6 pm. Upload your availability and get your match for the week!",
    size: "clamp(1.8rem, 3vw, 3rem)",
  },
  {
    heading: "Coordinate to meet at a recommended coffee spot. Once you have met, let's get to work!",
    size: "clamp(1.8rem, 3vw, 3rem)",
  },
  {
    heading: "karo",
    size: "clamp(5rem, 12vw, 11rem)",
    weight: 800,
    tracking: "-0.04em",
  },
];

export default function Landing() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [barFixed, setBarFixed] = useState(false);
  const [activeSection, setActiveSection] = useState(0);
  const [isMobile, setIsMobile] = useState(() => typeof window !== "undefined" && window.innerWidth < 768);
  const [, setLocation] = useLocation();
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);

  /* Detect mobile */
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    setIsMobile(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  /* IntersectionObserver for active section + bar trigger */
  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    sectionRefs.current.forEach((el, i) => {
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveSection(i);
            if (i >= 1) setBarFixed(true);
          }
        },
        { threshold: 0.4 }
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach(o => o.disconnect());
  }, [isMobile]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) setSubmitted(true);
  };

  const scrollToWaitlist = () => window.scrollTo({ top: 0, behavior: "smooth" });
  const base = import.meta.env.BASE_URL;

  /* ─── MOBILE LAYOUT ─── */
  if (isMobile) {
    return (
      <div style={{ background: S.bg, color: S.fg, fontFamily: S.fontSans, paddingBottom: barFixed ? "60px" : 0 }}>
        {SCREENSHOTS.map((src, i) => (
          <div
            key={i}
            ref={el => { sectionRefs.current[i] = el; }}
            style={{ position: "relative", minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "flex-end" }}
          >
            {/* Full-bleed screenshot background */}
            <img
              src={`${base}${src}`}
              alt=""
              style={{
                position: "absolute",
                inset: 0,
                width: "100%",
                height: "100%",
                objectFit: "cover",
                objectPosition: "top center",
                zIndex: 0,
              }}
            />

            {/* Gradient fade — transparent top, cream bottom */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                background: "linear-gradient(to bottom, rgba(238,234,227,0) 20%, rgba(238,234,227,0.75) 50%, rgba(238,234,227,1) 65%)",
                zIndex: 1,
              }}
            />

            {/* Text content card — sits at bottom, scrolls over image */}
            <div
              style={{
                position: "relative",
                zIndex: 2,
                padding: "28px 28px 52px",
                background: S.bg,
              }}
            >
              {i === 0 ? (
                <HeroText submitted={submitted} email={email} setEmail={setEmail} onSubmit={handleSubmit} />
              ) : i === 4 ? (
                /* Brand finale — just "karo" huge */
                (<p style={{ fontSize: "clamp(5rem, 20vw, 9rem)", fontWeight: 800, lineHeight: 0.9, letterSpacing: "-0.04em", fontFamily: S.fontDisplay, margin: 0 }}>karo
                                  </p>)
              ) : (
                <p
                  style={{
                    fontSize: "clamp(1.7rem, 6vw, 2.4rem)",
                    fontWeight: 700,
                    lineHeight: 1.12,
                    letterSpacing: "-0.02em",
                    fontFamily: S.fontDisplay,
                    margin: 0,
                  }}
                >
                  {SECTION_TEXT[i]?.heading}
                </p>
              )}
            </div>

            {/* Thin border between sections */}
            {i < SCREENSHOTS.length - 1 && (
              <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "1px", background: S.border, zIndex: 3 }} />
            )}
          </div>
        ))}
        {/* Fixed bottom bar */}
        <div
          style={{
            position: "fixed",
            bottom: 0,
            left: 0,
            right: 0,
            zIndex: 100,
            transform: barFixed ? "translateY(0)" : "translateY(100%)",
            transition: "transform 0.35s cubic-bezier(0.4, 0, 0.2, 1)",
          }}
        >
          <BottomBar onSignIn={() => setLocation("/app")} onJoin={scrollToWaitlist} />
        </div>
      </div>
    );
  }

  /* ─── DESKTOP LAYOUT ─── */
  return (
    <div style={{ background: S.bg, color: S.fg, fontFamily: S.fontSans, minHeight: "100vh", paddingBottom: barFixed ? "60px" : 0 }}>
      <div style={{ display: "flex", alignItems: "flex-start" }}>

        {/* Left — scrolling sections */}
        <div style={{ flex: 1, minWidth: 0 }}>
          {[null, ...SECTION_TEXT.slice(1)].map((_, i) => (
            <div
              key={i}
              ref={el => { sectionRefs.current[i] = el; }}
              style={{
                minHeight: "100vh",
                display: "flex",
                alignItems: "center",
                padding: "80px 10%",
                borderBottom: i < SECTION_TEXT.length - 1 ? `1px solid ${S.border}` : "none",
              }}
            >
              {i === 0 ? (
                <HeroText submitted={submitted} email={email} setEmail={setEmail} onSubmit={handleSubmit} />
              ) : i === 4 ? (
                <p style={{ fontSize: "clamp(5rem, 12vw, 11rem)", fontWeight: 800, lineHeight: 0.95, letterSpacing: "-0.04em", fontFamily: S.fontDisplay, margin: 0 }}>
                  karo
                </p>
              ) : (
                <p style={{ fontSize: SECTION_TEXT[i]?.size, fontWeight: 700, lineHeight: 1.12, letterSpacing: "-0.02em", fontFamily: S.fontDisplay, margin: 0, maxWidth: "520px" }}>
                  {SECTION_TEXT[i]?.heading}
                </p>
              )}
            </div>
          ))}
        </div>

        {/* Right — sticky phone mockup */}
        <div
          style={{
            width: "46%",
            position: "sticky",
            top: 0,
            height: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            alignSelf: "flex-start",
            padding: "40px 0",
            flexShrink: 0,
          }}
        >
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "radial-gradient(ellipse 80% 70% at 60% 50%, rgba(197,226,82,0.07), transparent 70%)",
              pointerEvents: "none",
            }}
          />
          <PhoneMockup activeIndex={activeSection} />
        </div>
      </div>

      {/* Fixed bottom bar */}
      <div
        style={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          transform: barFixed ? "translateY(0)" : "translateY(100%)",
          transition: "transform 0.35s cubic-bezier(0.4, 0, 0.2, 1)",
        }}
      >
        <BottomBar onSignIn={() => setLocation("/app")} onJoin={scrollToWaitlist} />
      </div>
    </div>
  );
}
