import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useProfile, useUpdateProfile } from "@/hooks/use-profile";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";

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

const WorkingStyle = { quiet: "quiet", light_chat: "light_chat", brief_social: "brief_social" } as const;
type WorkingStyle = (typeof WorkingStyle)[keyof typeof WorkingStyle];
const WorkIntent = { deep_work: "deep_work", studying: "studying", job_search: "job_search", side_projects: "side_projects" } as const;
type WorkIntent = (typeof WorkIntent)[keyof typeof WorkIntent];

const profileSchema = z.object({
  name: z.string().min(2, "Name is required"),
  photoUrl: z.string().nullable().optional(),
  workingStyle: z.nativeEnum(WorkingStyle),
  preferredNeighborhoods: z.string().min(2, "Add at least one neighborhood"),
  maxTravelMinutes: z.coerce.number().refine(val => [10, 20, 30].includes(val)),
  workIntents: z.array(z.nativeEnum(WorkIntent)).min(1, "Select at least one"),
  linkedinUrl: z.string().nullable().optional(),
  instagramUrl: z.string().nullable().optional(),
  hidesSocialLinks: z.boolean().default(false),
  showsOnlyToMatches: z.boolean().default(false),
});
type ProfileFormValues = z.infer<typeof profileSchema>;

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p style={{ fontSize: "11px", fontWeight: 600, color: S.muted, letterSpacing: "0.08em", textTransform: "uppercase", margin: "0 0 14px" }}>
      {children}
    </p>
  );
}

function Divider() {
  return <div style={{ height: "1px", background: S.border, margin: "28px 0" }} />;
}

export default function Profile() {
  const { data: profile, isLoading } = useProfile();
  const updateProfile = useUpdateProfile();
  const { toast } = useToast();

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: "",
      photoUrl: null,
      workingStyle: WorkingStyle.quiet,
      preferredNeighborhoods: "",
      maxTravelMinutes: 20,
      workIntents: [],
      linkedinUrl: "",
      instagramUrl: "",
      hidesSocialLinks: false,
      showsOnlyToMatches: false,
    },
  });

  useEffect(() => {
    if (profile) {
      form.reset({
        name: profile.name,
        photoUrl: profile.photoUrl,
        workingStyle: profile.workingStyle,
        preferredNeighborhoods: profile.preferredNeighborhoods.join(", "),
        maxTravelMinutes: profile.maxTravelMinutes,
        workIntents: profile.workIntents,
        linkedinUrl: profile.linkedinUrl,
        instagramUrl: profile.instagramUrl,
        hidesSocialLinks: profile.hidesSocialLinks,
        showsOnlyToMatches: profile.showsOnlyToMatches,
      });
    }
  }, [profile, form]);

  if (isLoading) {
    return (
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "60vh" }}>
        <Loader2 style={{ width: 24, height: 24, animation: "spin 1s linear infinite", color: S.fg }} />
      </div>
    );
  }

  const onSubmit = async (data: ProfileFormValues) => {
    try {
      await updateProfile.mutateAsync({
        data: {
          ...data,
          preferredNeighborhoods: data.preferredNeighborhoods.split(",").map(s => s.trim()).filter(Boolean),
          maxTravelMinutes: data.maxTravelMinutes as any,
        }
      });
      toast({ title: "Saved", description: "Your profile has been updated." });
    } catch {
      toast({ variant: "destructive", title: "Error", description: "Could not save profile." });
    }
  };

  const watchIntents = form.watch("workIntents");
  const watchWorkingStyle = form.watch("workingStyle");
  const watchTravelTime = form.watch("maxTravelMinutes");

  const toggleIntent = (intent: WorkIntent) => {
    const current = new Set(watchIntents);
    if (current.has(intent)) current.delete(intent); else current.add(intent);
    form.setValue("workIntents", Array.from(current), { shouldValidate: true });
  };

  const inputStyle: React.CSSProperties = {
    width: "100%",
    padding: "11px 14px",
    background: "rgba(255,255,255,0.6)",
    border: `1px solid ${S.border}`,
    borderRadius: "6px",
    fontSize: "14px",
    outline: "none",
    fontFamily: S.fontSans,
    color: S.fg,
    boxSizing: "border-box",
  };

  const base = import.meta.env.BASE_URL;

  return (
    <div style={{ padding: "32px 24px 40px" }}>
      {/* Profile photo + header */}
      <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "32px" }}>
        <div
          style={{
            width: "64px",
            height: "64px",
            borderRadius: "50%",
            overflow: "hidden",
            border: `2px solid ${S.border}`,
            flexShrink: 0,
          }}
        >
          <img
            src={`${base}tanya.jpg`}
            alt="Tanya"
            style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center top" }}
          />
        </div>
        <div>
          <p style={{ fontSize: "11px", fontWeight: 600, color: S.muted, letterSpacing: "0.08em", textTransform: "uppercase", margin: "0 0 4px" }}>
            Your profile
          </p>
          <p style={{ fontSize: "clamp(1.3rem, 4vw, 1.6rem)", fontWeight: 700, letterSpacing: "-0.02em", fontFamily: S.fontDisplay, margin: 0, lineHeight: 1.1 }}>
            Work preferences
          </p>
        </div>
      </div>

      <form onSubmit={form.handleSubmit(onSubmit)}>

        {/* Name */}
        <SectionLabel>Name</SectionLabel>
        <input {...form.register("name")} placeholder="Your name" style={inputStyle} />
        {form.formState.errors.name && <p style={{ fontSize: "12px", color: "#c0392b", marginTop: "6px" }}>{form.formState.errors.name.message}</p>}

        <Divider />

        {/* Working style */}
        <SectionLabel>Working style</SectionLabel>
        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          {[
            { id: WorkingStyle.quiet, label: "Quiet", desc: "Headphones on, deep focus" },
            { id: WorkingStyle.light_chat, label: "Light chat ok", desc: "Occasional quick questions fine" },
            { id: WorkingStyle.brief_social, label: "Brief social", desc: "Happy to chat during coffee breaks" },
          ].map((style) => {
            const active = watchWorkingStyle === style.id;
            return (
              <div
                key={style.id}
                onClick={() => form.setValue("workingStyle", style.id)}
                style={{
                  padding: "14px 16px",
                  border: `1px solid ${active ? S.fg : S.border}`,
                  borderRadius: "6px",
                  cursor: "pointer",
                  background: active ? S.fg : "rgba(255,255,255,0.5)",
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  transition: "all 0.15s",
                }}
              >
                <div
                  style={{
                    width: "18px",
                    height: "18px",
                    borderRadius: "50%",
                    border: `2px solid ${active ? S.accent : S.border}`,
                    background: active ? S.accent : "transparent",
                    flexShrink: 0,
                  }}
                />
                <div>
                  <p style={{ margin: 0, fontSize: "14px", fontWeight: 600, color: active ? S.bg : S.fg }}>
                    {style.label}
                  </p>
                  <p style={{ margin: 0, fontSize: "12px", color: active ? "rgba(238,234,227,0.7)" : S.muted, marginTop: "2px" }}>
                    {style.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        <Divider />

        {/* Focus areas */}
        <SectionLabel>Focus areas</SectionLabel>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
          {[
            { id: WorkIntent.deep_work, label: "Deep Work" },
            { id: WorkIntent.studying, label: "Studying" },
            { id: WorkIntent.job_search, label: "Job Search" },
            { id: WorkIntent.side_projects, label: "Side Projects" },
          ].map(intent => {
            const active = watchIntents.includes(intent.id);
            return (
              <button
                type="button"
                key={intent.id}
                onClick={() => toggleIntent(intent.id)}
                style={{
                  padding: "8px 18px",
                  borderRadius: "4px",
                  border: `1px solid ${active ? S.fg : S.border}`,
                  background: active ? S.fg : "rgba(255,255,255,0.5)",
                  color: active ? S.bg : S.fg,
                  fontSize: "13px",
                  fontWeight: 600,
                  cursor: "pointer",
                  fontFamily: S.fontSans,
                  transition: "all 0.15s",
                }}
              >
                {intent.label}
              </button>
            );
          })}
        </div>
        {form.formState.errors.workIntents && <p style={{ fontSize: "12px", color: "#c0392b", marginTop: "8px" }}>{form.formState.errors.workIntents.message}</p>}

        <Divider />

        {/* Location */}
        <SectionLabel>Preferred neighbourhoods</SectionLabel>
        <input
          {...form.register("preferredNeighborhoods")}
          placeholder="e.g. Williamsburg, East Village, SoHo"
          style={inputStyle}
        />
        {form.formState.errors.preferredNeighborhoods && <p style={{ fontSize: "12px", color: "#c0392b", marginTop: "6px" }}>{form.formState.errors.preferredNeighborhoods.message}</p>}

        <div style={{ marginTop: "20px" }}>
          <SectionLabel>Max travel time</SectionLabel>
          <div style={{ display: "flex", gap: "8px" }}>
            {[10, 20, 30].map(time => {
              const active = watchTravelTime === time;
              return (
                <button
                  type="button"
                  key={time}
                  onClick={() => form.setValue("maxTravelMinutes", time)}
                  style={{
                    flex: 1,
                    padding: "10px 0",
                    border: `1px solid ${active ? S.fg : S.border}`,
                    borderRadius: "6px",
                    background: active ? S.fg : "rgba(255,255,255,0.5)",
                    color: active ? S.bg : S.fg,
                    fontSize: "13px",
                    fontWeight: 600,
                    cursor: "pointer",
                    fontFamily: S.fontSans,
                    transition: "all 0.15s",
                  }}
                >
                  {time} min
                </button>
              );
            })}
          </div>
        </div>

        <Divider />

        {/* Privacy */}
        <SectionLabel>Privacy</SectionLabel>
        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          {[
            { field: "hidesSocialLinks" as const, label: "Hide social links", desc: "Don't show LinkedIn / Instagram to your match" },
            { field: "showsOnlyToMatches" as const, label: "Matches only", desc: "Hide profile from public discovery" },
          ].map(({ field, label, desc }) => (
            <label
              key={field}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "14px 16px",
                background: "rgba(255,255,255,0.5)",
                border: `1px solid ${S.border}`,
                borderRadius: "6px",
                cursor: "pointer",
              }}
            >
              <div>
                <p style={{ margin: 0, fontSize: "14px", fontWeight: 600 }}>{label}</p>
                <p style={{ margin: "3px 0 0", fontSize: "12px", color: S.muted }}>{desc}</p>
              </div>
              <input
                type="checkbox"
                {...form.register(field)}
                style={{ width: "18px", height: "18px", accentColor: S.fg, cursor: "pointer", flexShrink: 0, marginLeft: "16px" }}
              />
            </label>
          ))}
        </div>

        <div style={{ marginTop: "36px" }}>
          <button
            type="submit"
            disabled={updateProfile.isPending}
            style={{
              width: "100%",
              padding: "14px",
              background: S.fg,
              color: S.bg,
              border: "none",
              borderRadius: "6px",
              fontSize: "13px",
              fontWeight: 700,
              cursor: updateProfile.isPending ? "not-allowed" : "pointer",
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              fontFamily: S.fontSans,
              opacity: updateProfile.isPending ? 0.6 : 1,
            }}
          >
            {updateProfile.isPending ? "Saving..." : "Save Preferences"}
          </button>
        </div>

      </form>
    </div>
  );
}
