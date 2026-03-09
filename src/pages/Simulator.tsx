import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { useDrishti } from '@/contexts/DrishtiContext';

const Simulator = () => {
  const { sensors, updateSensor } = useDrishti();

  return (
    <div className="min-h-screen bg-background">
      <div className="p-8">
        <h1 className="text-4xl font-medium text-foreground mb-8">Simulator</h1>
        
        <Card className="p-8 max-w-2xl mx-auto">
          <div className="space-y-8">
            <div>
              <div className="flex items-center justify-between mb-4">
                <Label className="text-lg font-medium">pH Level</Label>
                <span className="text-2xl font-bold text-primary">{sensors.pH.toFixed(1)}</span>
              </div>
              <Slider
                value={[sensors.pH]}
                onValueChange={([value]) => updateSensor('pH', value)}
                min={3.0}
                max={14.0}
                step={0.1}
              />
              <div className="flex justify-between text-xs text-muted-foreground mt-1">
                <span>3.0</span>
                <span>14.0</span>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-4">
                <Label className="text-lg font-medium">EC Level (mS/cm)</Label>
                <span className="text-2xl font-bold text-primary">{sensors.ec.toFixed(1)}</span>
              </div>
              <Slider
                value={[sensors.ec]}
                onValueChange={([value]) => updateSensor('ec', value)}
                min={0.5}
                max={3.5}
                step={0.1}
              />
              <div className="flex justify-between text-xs text-muted-foreground mt-1">
                <span>0.5</span>
                <span>3.5</span>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-4">
                <Label className="text-lg font-medium">Temperature (°C)</Label>
                <span className="text-2xl font-bold text-primary">{sensors.temperature.toFixed(0)}</span>
              </div>
              <Slider
                value={[sensors.temperature]}
                onValueChange={([value]) => updateSensor('temperature', value)}
                min={10}
                max={35}
                step={1}
              />
              <div className="flex justify-between text-xs text-muted-foreground mt-1">
                <span>10°C</span>
                <span>35°C</span>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-4">
                <Label className="text-lg font-medium">Humidity (%)</Label>
                <span className="text-2xl font-bold text-primary">{sensors.humidity.toFixed(0)}</span>
              </div>
              <Slider
                value={[sensors.humidity]}
                onValueChange={([value]) => updateSensor('humidity', value)}
                min={20}
                max={100}
                step={1}
              />
              <div className="flex justify-between text-xs text-muted-foreground mt-1">
                <span>20%</span>
                <span>100%</span>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Simulator;
