import { MapPin, MessageSquare, Briefcase, Star, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface UserProfile {
  id: string;
  userId: string;
  name: string;
  photoUrl?: string | null;
  workingStyle: string;
  preferredNeighborhoods: string[];
  maxTravelMinutes: number;
  workIntents: string[];
  linkedinUrl?: string | null;
  instagramUrl?: string | null;
  hidesSocialLinks: boolean;
  showsOnlyToMatches: boolean;
  reliabilityScore: number;
  checkInCount: number;
  createdAt: string | Date;
  updatedAt: string | Date;
}

interface ProfileCardProps {
  profile: UserProfile;
  className?: string;
}

export function ProfileCard({ profile, className }: ProfileCardProps) {
  const getWorkingStyleDisplay = (style: string) => {
    switch (style) {
      case "quiet": return "Quiet / Focused";
      case "light_chat": return "Light Chat";
      case "brief_social": return "Brief Socializing";
      default: return style;
    }
  };

  const getIntentDisplay = (intent: string) => {
    return intent.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  };

  return (
    <div className={cn("bg-card rounded-2xl p-6 shadow-sm border border-border/60 overflow-hidden relative", className)}>
      {/* Decorative top gradient */}
      <div className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-br from-primary/10 to-transparent" />
      
      <div className="relative z-10">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-16 h-16 rounded-full overflow-hidden bg-muted border-2 border-background shadow-md shrink-0">
            {profile.photoUrl ? (
              <img src={profile.photoUrl} alt={profile.name} className="w-full h-full object-cover" />
            ) : (
              <img src={`${import.meta.env.BASE_URL}images/avatar-placeholder.png`} alt="Placeholder" className="w-full h-full object-cover" />
            )}
          </div>
          <div>
            <h2 className="text-xl font-bold text-foreground">{profile.name}</h2>
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground mt-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-primary" />
              <span>{profile.checkInCount} Check-ins</span>
              <span className="mx-1">•</span>
              <Star className="w-3.5 h-3.5 text-accent" />
              <span>{(profile.reliabilityScore * 10).toFixed(1)} Reliability</span>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex flex-col gap-1.5">
            <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider flex items-center gap-1.5">
              <MessageSquare className="w-3.5 h-3.5" /> Working Style
            </span>
            <div className="bg-muted/50 text-foreground px-3 py-1.5 rounded-lg text-sm font-medium w-fit border border-border/50">
              {getWorkingStyleDisplay(profile.workingStyle)}
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider flex items-center gap-1.5">
              <Briefcase className="w-3.5 h-3.5" /> Focus Areas
            </span>
            <div className="flex flex-wrap gap-2">
              {profile.workIntents.map(intent => (
                <span key={intent} className="bg-primary/10 text-primary-foreground text-primary px-2.5 py-1 rounded-md text-xs font-medium">
                  {getIntentDisplay(intent)}
                </span>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5" /> Preferred Areas
            </span>
            <p className="text-sm text-foreground">
              {profile.preferredNeighborhoods.join(', ')} <span className="text-muted-foreground">(Max {profile.maxTravelMinutes}m travel)</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
