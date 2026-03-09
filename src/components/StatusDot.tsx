import { useDrishti } from '@/contexts/DrishtiContext';

interface StatusDotProps {
  sensor: 'pH' | 'ec' | 'temperature' | 'humidity' | 'overall';
}

export const StatusDot = ({ sensor }: StatusDotProps) => {
  const { sensors, preset } = useDrishti();

  const getStatus = () => {
    if (sensor === 'overall') {
      const phHealth = calculateHealth(sensors.pH, 5.8, 6.2);
      const ecHealth = calculateHealth(sensors.ec, 1.5, 2.0);
      const tempHealth = calculateHealth(sensors.temperature, 18, 24);
      const score = phHealth * 0.4 + ecHealth * 0.4 + tempHealth * 0.2;
      
      if (score >= 80) return 'healthy';
      if (score >= 60) return 'warning';
      return 'critical';
    }

    switch (sensor) {
      case 'pH':
        if (sensors.pH < preset.phMin || sensors.pH > preset.phMax) return 'critical';
        return 'healthy';
      case 'ec':
        if (sensors.ec < preset.ecMin || sensors.ec > preset.ecMax) return 'critical';
        return 'healthy';
      case 'temperature':
        if (sensors.temperature < preset.tempMin || sensors.temperature > preset.tempMax) return 'critical';
        return 'healthy';
      case 'humidity':
        if (sensors.humidity < 40 || sensors.humidity > 80) return 'warning';
        if (sensors.humidity < 30 || sensors.humidity > 90) return 'critical';
        return 'healthy';
      default:
        return 'healthy';
    }
  };

  const status = getStatus();
  const colorClass = {
    healthy: 'bg-status-healthy-dot',
    warning: 'bg-status-warning-dot',
    critical: 'bg-status-critical-dot',
  }[status];

  return <div className={`w-3 h-3 rounded-full ${colorClass}`} />;
};

function calculateHealth(value: number, min: number, max: number): number {
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
}
