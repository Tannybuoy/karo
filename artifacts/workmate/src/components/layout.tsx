import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";

const S = {
  bg: "#EEEAE3",
  fg: "#1a1a1a",
  muted: "#999",
  border: "rgba(0,0,0,0.1)",
  accent: "#12372A",
  fontSans: "'DM Sans', sans-serif",
  fontDisplay: "'Outfit', sans-serif",
};

const navItems = [
  { href: "/app",     label: "Match",   icon: MatchIcon   },
  { href: "/chat",    label: "Chat",    icon: ChatIcon    },
  { href: "/profile", label: "Profile", icon: ProfileIcon },
];

function MatchIcon({ active }: { active: boolean }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={active ? S.fg : S.muted} strokeWidth={active ? "2.2" : "1.8"} strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
      <circle cx="9" cy="7" r="4"/>
      <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
      <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
    </svg>
  );
}

function ChatIcon({ active }: { active: boolean }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={active ? S.fg : S.muted} strokeWidth={active ? "2.2" : "1.8"} strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
    </svg>
  );
}

function ProfileIcon({ active }: { active: boolean }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={active ? S.fg : S.muted} strokeWidth={active ? "2.2" : "1.8"} strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
      <circle cx="12" cy="7" r="4"/>
    </svg>
  );
}

export function Layout({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();

  return (
    <div
      style={{
        minHeight: "100dvh",
        background: S.bg,
        color: S.fg,
        fontFamily: S.fontSans,
        display: "flex",
        flexDirection: "column",
        maxWidth: "430px",
        margin: "0 auto",
        position: "relative",
        borderLeft: `1px solid ${S.border}`,
        borderRight: `1px solid ${S.border}`,
      }}
    >
      {/* Top bar */}
      <div
        style={{
          height: "52px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderBottom: `1px solid ${S.border}`,
          flexShrink: 0,
          background: S.bg,
          position: "sticky",
          top: 0,
          zIndex: 30,
        }}
      >
        <span
          style={{
            fontSize: "20px",
            fontWeight: 800,
            letterSpacing: "-0.03em",
            fontFamily: S.fontDisplay,
          }}
        >
          karo
        </span>
      </div>

      {/* Page content */}
      <main style={{ flex: 1, overflowY: "auto", paddingBottom: "72px" }}>
        {children}
      </main>

      {/* Bottom nav */}
      <nav
        style={{
          position: "fixed",
          bottom: 0,
          left: "50%",
          transform: "translateX(-50%)",
          width: "100%",
          maxWidth: "430px",
          height: "68px",
          background: S.bg,
          borderTop: `1px solid ${S.border}`,
          display: "flex",
          alignItems: "stretch",
          zIndex: 50,
        }}
      >
        {navItems.map(({ href, label, icon: Icon }) => {
          const active = location === href;
          return (
            <Link
              key={href}
              href={href}
              style={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: "4px",
                textDecoration: "none",
                borderTop: active ? `2px solid ${S.fg}` : "2px solid transparent",
                marginTop: "-1px",
                transition: "border-color 0.15s",
              }}
            >
              <Icon active={active} />
              <span
                style={{
                  fontSize: "10px",
                  fontWeight: active ? 700 : 400,
                  color: active ? S.fg : S.muted,
                  letterSpacing: "0.04em",
                  textTransform: "uppercase",
                }}
              >
                {label}
              </span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
