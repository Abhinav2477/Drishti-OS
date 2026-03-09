import { Card } from '@/components/ui/card';
import { StatusDot } from './StatusDot';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { useDrishti } from '../contexts/DrishtiContext'; // Changed to relative path
import { Droplets, Zap, Thermometer, Wind } from 'lucide-react';

interface StatCardProps {
  type: 'pH' | 'ec' | 'temperature' | 'humidity';
}

const iconMap = {
  pH: Droplets,
  ec: Zap,
  temperature: Thermometer,
  humidity: Wind,
};

const labelMap = {
  pH: 'pH Level',
  ec: 'EC Level',
  temperature: 'Temperature',
  humidity: 'Humidity',
};

const unitMap = {
  pH: '',
  ec: 'mS/cm',
  temperature: '°C',
  humidity: '%',
};

// === THIS IS THE FIX ===
// We delete the static 'rangeMap' object.
// const rangeMap = { ... };

export const StatCard = ({ type }: StatCardProps) => {
  const { sensors, preset } = useDrishti(); // 'preset' is already here!
  const Icon = iconMap[type];
  const value = sensors[type];

  const getStatus = () => {
    switch (type) {
      case 'pH':
        if (value < preset.phMin || value > preset.phMax) return 'Critical';
        return 'Healthy';
      case 'ec':
        if (value < preset.ecMin || value > preset.ecMax) return 'Critical';
        return 'Healthy';
      case 'temperature':
        if (value < preset.tempMin || value > preset.tempMax) return 'Critical';
        return 'Healthy';
      case 'humidity':
        // This humidity logic is static, as it's not in your preset object.
        // This is fine for the MVP.
        if (value < 40 || value > 80) return 'Warning';
        if (value < 30 || value > 90) return 'Critical';
        return 'Healthy';
      default:
        return 'Healthy';
    }
  };

  // === AND HERE IS THE FIX ===
  // We create a function to dynamically get the range text
  // directly from the 'preset' object in our state.
  const getDynamicRangeText = () => {
    switch (type) {
      case 'pH':
        return `${preset.phMin} - ${preset.phMax}`;
      case 'ec':
        return `${preset.ecMin} - ${preset.ecMax} mS/cm`;
      case 'temperature':
        return `${preset.tempMin} - ${preset.tempMax}°C`;
      case 'humidity':
        return '40 - 80%'; // This one is still static, as it's not in the preset.
      default:
        return 'N/A';
    }
  };

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Card className="w-[164px] h-[168px] p-4 shadow-sm cursor-pointer hover:shadow-md transition-shadow flex-shrink-0">
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 rounded-lg bg-primary-light flex items-center justify-center">
                <Icon className="w-6 h-6 text-primary" />
              </div>
              <StatusDot sensor={type} />
            </div>
            <p className="text-sm text-muted-foreground mb-2">{labelMap[type]}</p>
            <div className="flex items-baseline gap-1">
              <span className="text-5xl font-bold text-foreground">
                {value.toFixed(1)}
              </span>
              {unitMap[type] && (
                <span className="text-xs text-muted-foreground ml-1">
                  {unitMap[type]}
                </span>
              )}
            </div>
          </Card>
        </TooltipTrigger>
        <TooltipContent>
          <div className="text-sm">
            <p className="font-medium">{getStatus()}</p>
            {/* We now call our new dynamic function here */}
            <p className="text-muted-foreground">Ideal Range: {getDynamicRangeText()}</p>
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
