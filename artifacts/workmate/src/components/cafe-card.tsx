import { Coffee, MapPin, Navigation } from "lucide-react";

interface CafeSuggestion {
  id: string;
  name: string;
  neighborhood: string;
  address: string;
  distance: string;
  vibe: string;
}

interface CafeCardProps {
  cafe: CafeSuggestion;
  onSuggest: (cafe: CafeSuggestion) => void;
}

export function CafeCard({ cafe, onSuggest }: CafeCardProps) {
  return (
    <div className="min-w-[200px] w-[200px] bg-card rounded-xl p-4 shadow-sm border border-border/60 shrink-0 snap-center hover:border-primary/50 transition-colors cursor-pointer" onClick={() => onSuggest(cafe)}>
      <div className="flex items-start justify-between mb-2">
        <div className="bg-secondary/10 p-2 rounded-lg text-secondary">
          <Coffee className="w-4 h-4" />
        </div>
        <span className="text-[10px] font-medium bg-muted px-2 py-0.5 rounded-full text-muted-foreground">
          {cafe.vibe}
        </span>
      </div>
      
      <h4 className="font-semibold text-sm text-foreground mb-1 truncate" title={cafe.name}>{cafe.name}</h4>
      
      <div className="flex items-center gap-1 text-xs text-muted-foreground mb-1">
        <MapPin className="w-3 h-3 shrink-0" />
        <span className="truncate">{cafe.neighborhood}</span>
      </div>
      
      <div className="flex items-center gap-1 text-xs text-muted-foreground mb-3">
        <Navigation className="w-3 h-3 shrink-0" />
        <span>{cafe.distance} away</span>
      </div>
      
      <button 
        className="w-full py-1.5 bg-primary/10 hover:bg-primary/20 text-primary text-xs font-semibold rounded-lg transition-colors"
        onClick={(e) => {
          e.stopPropagation();
          onSuggest(cafe);
        }}
      >
        Suggest Cafe
      </button>
    </div>
  );
}
