import { useState, useEffect, useRef } from "react";
import { format } from "date-fns";

const DEMO_MATCH = {
  id: "match-demo-1",
  sessionTimeSlot: "10:00 AM – 4:00 PM",
  status: "confirmed" as const,
  chatEnabled: true,
  matchedUserProfile: { name: "Alex Chen", photoUrl: null as null },
};

const DEMO_CAFES = [
  { id: "c1", name: "Verve Coffee Roasters", neighborhood: "SoHo", address: "72 Spring St", distance: "0.3 mi", vibe: "Quiet, good wifi" },
  { id: "c2", name: "Blue Bottle Coffee", neighborhood: "Nolita", address: "160 Berry St", distance: "0.6 mi", vibe: "Minimal, focused" },
  { id: "c3", name: "Cha Cha Matcha", neighborhood: "West Village", address: "373 Bleecker St", distance: "0.8 mi", vibe: "Cozy, matcha bar" },
];

const BASE_TIME = new Date("2026-05-10T14:00:00.000Z");
const t = (mins: number) => new Date(BASE_TIME.getTime() + mins * 60000).toISOString();

const INITIAL_MESSAGES = [
  { id: "m1", senderId: "user-demo-match", senderName: "Alex Chen", content: "Hey! Saw we got matched this week 👋", sentAt: t(0) },
  { id: "m2", senderId: "user-demo-1",     senderName: "You",        content: "Hi! Saturday 10am works great for me.", sentAt: t(3) },
  { id: "m3", senderId: "user-demo-match", senderName: "Alex Chen", content: "Same. Should we pick a café? Open to SoHo or Nolita.", sentAt: t(5) },
  { id: "m4", senderId: "user-demo-1",     senderName: "You",        content: "Verve on Spring St looks perfect — quiet enough for deep work.", sentAt: t(8) },
  { id: "m5", senderId: "user-demo-match", senderName: "Alex Chen", content: "Love it. See you there!", sentAt: t(10) },
];

interface CafeSuggestion {
  id: string;
  name: string;
  neighborhood: string;
  address: string;
  distance: string;
  vibe: string;
}

const S = {
  bg: "#EEEAE3",
  fg: "#1a1a1a",
  muted: "#888",
  border: "rgba(0,0,0,0.1)",
  surface: "rgba(0,0,0,0.05)",
  accent: "#12372A",
  fontSans: "'DM Sans', sans-serif",
  fontDisplay: "'Outfit', sans-serif",
};

const QUICK_REPLIES = [
  "Does this time still work?",
  "Want to go with this café?",
  "Running 5 mins late",
  "I'm here!",
];

export default function Chat() {
  const base = import.meta.env.BASE_URL;
  const match = DEMO_MATCH;
  const cafes = DEMO_CAFES;
  const [messages, setMessages] = useState(INITIAL_MESSAGES);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = (content: string) => {
    if (!content.trim()) return;
    setMessages((prev) => [
      ...prev,
      { id: `m${Date.now()}`, senderId: "user-demo-1", senderName: "You", content, sentAt: new Date().toISOString() },
    ]);
    setInput("");
  };

  const handleSuggestCafe = (cafe: CafeSuggestion) => {
    handleSend(`Want to meet at ${cafe.name} in ${cafe.neighborhood}?`);
  };

  const myId = "user-demo-1";

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "calc(100dvh - 52px - 68px)", background: S.bg }}>

      {/* Chat partner header */}
      <div
        style={{
          padding: "14px 20px",
          borderBottom: `1px solid ${S.border}`,
          display: "flex",
          alignItems: "center",
          gap: "12px",
          background: S.bg,
          flexShrink: 0,
        }}
      >
        <div
          style={{
            width: "36px",
            height: "36px",
            borderRadius: "50%",
            background: S.surface,
            border: `1px solid ${S.border}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            overflow: "hidden",
            flexShrink: 0,
          }}
        >
          <img
            src={match.matchedUserProfile.photoUrl ?? `${base}alex.png`}
            alt={match.matchedUserProfile.name ?? "Alex"}
            style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center top" }}
          />
        </div>
        <div>
          <p style={{ margin: 0, fontSize: "14px", fontWeight: 700, letterSpacing: "-0.01em" }}>
            {match.matchedUserProfile.name}
          </p>
          <p style={{ margin: 0, fontSize: "11px", color: S.muted, letterSpacing: "0.02em" }}>
            {match.sessionTimeSlot}
          </p>
        </div>
      </div>

      {/* Messages */}
      <div style={{ flex: 1, overflowY: "auto", padding: "20px 16px", display: "flex", flexDirection: "column", gap: "6px" }}>

        {/* Café suggestions */}
        {cafes.length > 0 && messages.length < 5 && (
          <div style={{ marginBottom: "20px" }}>
            <p style={{ fontSize: "11px", color: S.muted, letterSpacing: "0.06em", textTransform: "uppercase", fontWeight: 600, margin: "0 0 10px", textAlign: "center" }}>
              Suggested spots
            </p>
            <div style={{ display: "flex", gap: "10px", overflowX: "auto", paddingBottom: "6px" }}>
              {cafes.map((cafe: CafeSuggestion) => (
                <div
                  key={cafe.id}
                  style={{
                    flexShrink: 0,
                    width: "180px",
                    padding: "14px",
                    background: "rgba(255,255,255,0.7)",
                    border: `1px solid ${S.border}`,
                    borderRadius: "6px",
                  }}
                >
                  <p style={{ margin: "0 0 4px", fontSize: "13px", fontWeight: 700, letterSpacing: "-0.01em" }}>{cafe.name}</p>
                  <p style={{ margin: "0 0 10px", fontSize: "11px", color: S.muted }}>{cafe.neighborhood} · {cafe.distance}</p>
                  <p style={{ margin: "0 0 12px", fontSize: "11px", color: S.muted, fontStyle: "italic" }}>{cafe.vibe}</p>
                  <button
                    onClick={() => handleSuggestCafe(cafe)}
                    style={{
                      width: "100%",
                      padding: "7px",
                      background: S.accent,
                      border: "none",
                      borderRadius: "4px",
                      fontSize: "10px",
                      fontWeight: 700,
                      cursor: "pointer",
                      letterSpacing: "0.05em",
                      textTransform: "uppercase",
                      fontFamily: S.fontSans,
                      color: "#fff",
                    }}
                  >
                    Suggest this
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Messages list */}
        {messages.map((msg: any, i: number) => {
          const isMe = msg.senderId === myId;
          const showTime = i === 0 || new Date(msg.sentAt).getTime() - new Date(messages[i - 1].sentAt).getTime() > 300000;

          return (
            <div key={msg.id} style={{ display: "flex", flexDirection: "column", alignItems: isMe ? "flex-end" : "flex-start", maxWidth: "78%", alignSelf: isMe ? "flex-end" : "flex-start" }}>
              {showTime && (
                <span style={{ fontSize: "10px", color: S.muted, marginBottom: "4px", letterSpacing: "0.02em" }}>
                  {format(new Date(msg.sentAt), "h:mm a")}
                </span>
              )}
              <div
                style={{
                  padding: "10px 14px",
                  borderRadius: isMe ? "14px 14px 2px 14px" : "14px 14px 14px 2px",
                  fontSize: "14px",
                  lineHeight: 1.5,
                  background: isMe ? S.fg : "rgba(255,255,255,0.75)",
                  color: isMe ? S.bg : S.fg,
                  border: isMe ? "none" : `1px solid ${S.border}`,
                }}
              >
                {msg.content}
              </div>
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>

      {/* Quick replies + input */}
      <div
        style={{
          borderTop: `1px solid ${S.border}`,
          background: S.bg,
          padding: "10px 16px 14px",
          flexShrink: 0,
        }}
      >
        {/* Quick replies */}
        <div style={{ display: "flex", gap: "8px", overflowX: "auto", paddingBottom: "10px", marginBottom: "4px" }}>
          {QUICK_REPLIES.map((qr) => (
            <button
              key={qr}
              onClick={() => handleSend(qr)}
              style={{
                flexShrink: 0,
                padding: "6px 14px",
                background: S.surface,
                border: `1px solid ${S.border}`,
                borderRadius: "20px",
                fontSize: "12px",
                fontWeight: 500,
                color: S.fg,
                cursor: "pointer",
                whiteSpace: "nowrap",
                fontFamily: S.fontSans,
              }}
            >
              {qr}
            </button>
          ))}
        </div>

        {/* Text input */}
        <form
          onSubmit={(e) => { e.preventDefault(); handleSend(input); }}
          style={{ display: "flex", gap: "8px", alignItems: "center" }}
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Message..."
            style={{
              flex: 1,
              padding: "11px 16px",
              background: "rgba(255,255,255,0.7)",
              border: `1px solid ${S.border}`,
              borderRadius: "6px",
              fontSize: "14px",
              outline: "none",
              fontFamily: S.fontSans,
              color: S.fg,
            }}
          />
          <button
            type="submit"
            disabled={!input.trim() || sendMessage.isPending}
            style={{
              width: "42px",
              height: "42px",
              background: input.trim() ? S.fg : S.surface,
              border: `1px solid ${S.border}`,
              borderRadius: "6px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: input.trim() ? "pointer" : "not-allowed",
              flexShrink: 0,
              transition: "background 0.15s",
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={input.trim() ? S.bg : S.muted} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/>
            </svg>
          </button>
        </form>
      </div>
    </div>
  );
}
