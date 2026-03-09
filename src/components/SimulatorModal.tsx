import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogPortal,
} from '@/components/ui/dialog';
import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { useDrishti } from '../contexts/DrishtiContext'; // Fixed path
import React, { CSSProperties } from 'react';
// Note: DialogOverlay is REMOVED from the list above

export const SimulatorModal = () => {
  const { sensors, updateSensor, isSimulatorOpen, toggleSimulator } = useDrishti();

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      toggleSimulator();
    }
  };

  // The DialogContent style object to override shadcn's default centering.
  // Sidebar width is 16rem (w-64). We position the left edge at 18rem (16rem + 2rem margin).
  const modalStyle: CSSProperties = {
    // Overrides default centering and positioning
    position: 'fixed',
    top: 'unset',
    right: 'unset',
    
    // Calculated Left: Sidebar (16rem) + Margin (2rem) = 18rem (288px)
    left: 'calc(16rem + 2rem)', 
    
    // Set vertical position to 2rem from the bottom
    bottom: '2rem',
    
    // IMPORTANT: These two lines ensure SHADCN does not try to center or animate it
    transform: 'none', 
    transition: 'none',
    width: '400px', // Explicit width
    zIndex: 9999, // Ensure it's on top of everything
  };

  return (
    <Dialog open={isSimulatorOpen} onOpenChange={handleOpenChange}>
      <DialogPortal>
        {/* REMOVED DialogOverlay ENTIRELY to ensure NO dark background. */}
        
        <DialogContent
          className="p-0 border-none shadow-2xl"
          // Apply the custom style object for positioning
          style={modalStyle}
        >
          <Card className="p-0 border-none">
            <DialogHeader className="bg-muted p-4 rounded-t-lg">
              <DialogTitle>Drishti Simulator</DialogTitle>
            </DialogHeader>

            <div className="p-6 space-y-6">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <Label className="text-base font-medium">pH Level</Label>
                  <span className="text-xl font-bold text-primary">{sensors.pH.toFixed(1)}</span>
                </div>
                <Slider
                  value={[sensors.pH]}
                  onValueChange={([value]) => updateSensor('pH', value)}
                  min={3.0}
                  max={14.0}
                  step={0.1}
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <Label className="text-base font-medium">EC (mS/cm)</Label>
                  <span className="text-xl font-bold text-primary">{sensors.ec.toFixed(1)}</span>
                </div>
                <Slider
                  value={[sensors.ec]}
                  onValueChange={([value]) => updateSensor('ec', value)}
                  min={0.5}
                  max={3.5}
                  step={0.1}
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <Label className="text-base font-medium">Temp (°C)</Label>
                  <span className="text-xl font-bold text-primary">{sensors.temperature.toFixed(0)}</span>
                </div>
                <Slider
                  value={[sensors.temperature]}
                  onValueChange={([value]) => updateSensor('temperature', value)}
                  min={10}
                  max={35}
                  step={1}
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <Label className="text-base font-medium">Humidity (%)</Label>
                  <span className="text-xl font-bold text-primary">{sensors.humidity.toFixed(0)}</span>
                </div>
                <Slider
                  value={[sensors.humidity]}
                  onValueChange={([value]) => updateSensor('humidity', value)}
                  min={20}
                  max={100}
                  step={1}
                />
              </div>
            </div>
          </Card>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  );
};