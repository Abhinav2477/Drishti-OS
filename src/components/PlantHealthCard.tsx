import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { StatusDot } from '@/components/StatusDot'; // Reverting to aliased path
import { useDrishti } from '@/contexts/DrishtiContext'; // Reverting to aliased path
import { Sprout, Sparkles } from 'lucide-react';

export const PlantHealthCard = () => {
  const { sensors, preset, addLogEntry } = useDrishti();

  const calculateHealth = (value: number, min: number, max: number): number => {
    // ... (Your existing logic)
    const center = (min + max) / 2;
    const range = max - min;
    const distance = Math.abs(value - center);
    const maxDistance = range / 2;

    if (distance <= maxDistance) {
      return 100 - (distance / maxDistance) * 20;
    } else {
      const excessDistance = distance - maxDistance;
      const penalty = Math.min(80, (excessDistance / maxDistance) * 80);
      return Math.max(0, 80 - penalty);
    }
  };

  const phHealth = calculateHealth(sensors.pH, preset.phMin, preset.phMax);
  const ecHealth = calculateHealth(sensors.ec, preset.ecMin, preset.ecMax);
  const tempHealth = calculateHealth(sensors.temperature, preset.tempMin, preset.tempMax);
  
  const finalScore = Math.round(phHealth * 0.4 + ecHealth * 0.4 + tempHealth * 0.2);

  const getSuggestion = () => {
    // ... (Your existing logic)
    if (finalScore >= 80) return null;

    const issues = [];
    if (sensors.pH < preset.phMin) issues.push('pH too low');
    if (sensors.pH > preset.phMax) issues.push('pH too high');
    if (sensors.ec < preset.ecMin) issues.push('EC too low');
    if (sensors.ec > preset.ecMax) issues.push('EC too high');
    if (sensors.temperature < preset.tempMin) issues.push('temperature too low');
    if (sensors.temperature > preset.tempMax) issues.push('temperature too high');

    if (issues.length === 0) return 'System parameters are suboptimal but not critical.';
    return `System detected ${issues.join(', ')}. Automated adjustment recommended.`;
  };

  const suggestion = getSuggestion();
  const isHealthy = finalScore >= 80;
  
  // --- GAUGE & COLOR LOGIC ---
  // Using the 180-degree arc calculation (approx. PI * 80)
  const arcLength = 251.3; 
  const scoreDash = (finalScore / 100) * arcLength;

  // Dynamic color for the ARC based on score
  const getArcColorClass = (score: number): string => {
    if (score >= 80) return 'stroke-emerald-500'; // Green for healthy
    if (score >= 60) return 'stroke-yellow-500'; // Yellow for warning
    return 'stroke-red-500'; // Red for critical
  };
  
  const arcColorClass = getArcColorClass(finalScore);
  // --- END OF LOGIC ---

  const handleImplementSuggestion = () => {
    addLogEntry({
      status: 'auto',
      action: 'AI suggestion implemented - system parameters adjusted',
    });
  };

  return (
    <Card className="p-6 shadow-sm">
      <div className="flex items-start justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-lg bg-primary-light flex items-center justify-center">
            <Sprout className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h3 className="text-lg font-medium">Plant Health</h3>
            <p className="text-sm text-muted-foreground">Est. Health Index</p>
          </div>
        </div>
        <StatusDot sensor="overall" />
      </div>

      {/* === REVERTED GAUGE BLOCK (WITH FIXES) === */}
      <div className="flex flex-col items-center justify-center">
        <div className="relative w-64 h-36">
          <svg viewBox="0 0 200 100" className="w-full h-full">
            
            {/* 1. The "inner dotted" track (from your design) */}
            <path
              d="M 30 90 A 60 60 0 0 1 170 90" // Inner arc (r=60)
              fill="none"
              stroke="hsl(var(--muted))"
              strokeWidth="2"
              strokeDasharray="2 6" // This creates the "dotted" effect
              strokeLinecap="round"
            />
            
            {/* 2. The "outer" track (REPLACED ticks with solid gray) */}
            <path
              d="M 10 90 A 80 80 0 0 1 190 90" // Outer arc (r=80)
              fill="none"
              stroke="hsl(var(--muted))"
              strokeWidth="10"
              strokeLinecap="butt"
            />
            
            {/* 3. The "Value" Arc (Dynamic Color) */}
            <path
              d="M 10 90 A 80 80 0 0 1 190 90" // Must be same path as above
              fill="none"
              className={`stroke-current ${arcColorClass}`} // Arc color changes here
              strokeWidth="10"
              strokeLinecap="butt"
              strokeDasharray={`${scoreDash} ${arcLength}`}
            />
          </svg>
          
          {/* Text in the middle (FIXED: color is always text-foreground) */}
          <div className="absolute inset-0 flex flex-col items-center justify-end">
            <span className="text-5xl font-bold text-foreground">{finalScore}</span>
            <span className="text-sm text-muted-foreground mt-1">Health Score</span>
          </div>

          {/* REMOVED the 0, 50, 100 labels */}
        </div>
      </div>
      {/* === END OF GAUGE BLOCK === */}


      {/* === SUGGESTION BLOCK === */}
      <div className="mt-4 p-4 bg-muted/50 rounded-lg">
        <h4 className="text-sm font-medium mb-2 flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-primary" />
          AI Suggestion
        </h4>
        <p className="text-sm text-muted-foreground mb-3">
          {isHealthy
            ? 'All systems are operating in the optimal range. Follow schedule.'
            : suggestion}
        </p>
        {!isHealthy && (
          <Button
            onClick={handleImplementSuggestion}
            className="w-full bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70"
          >
            <Sparkles className="w-4 h-4 mr-2" />
            Implement Suggestion
          </Button>
        )}
      </div>
    </Card>
  );
};
