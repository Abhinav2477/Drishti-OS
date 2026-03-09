import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useDrishti } from '@/contexts/DrishtiContext';
import { Plus } from 'lucide-react';

const presetConfigs = {
  growing: { phMin: 5.8, phMax: 6.2, tempMin: 18, tempMax: 24, ecMin: 1.5, ecMax: 2.0 },
  flowering: { phMin: 6.0, phMax: 6.5, tempMin: 20, tempMax: 26, ecMin: 2.0, ecMax: 2.5 },
  seedling: { phMin: 5.5, phMax: 6.0, tempMin: 22, tempMax: 26, ecMin: 0.8, ecMax: 1.2 },
};

export const ControlCenterCard = () => {
  const { hardware, toggleHardware, preset, updatePreset, addLogEntry } = useDrishti();
  const [selectedPreset, setSelectedPreset] = useState('growing');
  const [doseTrigger, setDoseTrigger] = useState('nutrients');
  const [doseAmount, setDoseAmount] = useState('10');

  const handlePresetChange = (value: string) => {
    setSelectedPreset(value);
    const config = presetConfigs[value as keyof typeof presetConfigs];
    updatePreset(config);
  };

  const handleDose = () => {
    addLogEntry({
      status: 'manual',
      action: `Dosed ${doseTrigger} (${doseAmount}ml)`,
    });
  };

  return (
    <Card className="p-6 shadow-sm mt-6">
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-medium mb-4">Manual Controls</h3>
          <Tabs defaultValue="dosing" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="dosing">Dosing Control</TabsTrigger>
              <TabsTrigger value="hardware">Hardware Control</TabsTrigger>
            </TabsList>
            
            <TabsContent value="dosing" className="space-y-4 mt-4">
              <div>
                <Label>Select Trigger</Label>
                <Select value={doseTrigger} onValueChange={setDoseTrigger}>
                  <SelectTrigger className="mt-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="nutrients">Dose Nutrients (A+B)</SelectItem>
                    <SelectItem value="phUp">Dose pH Up</SelectItem>
                    <SelectItem value="phDown">Dose pH Down</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>Amount</Label>
                <Input
                  type="number"
                  value={doseAmount}
                  onChange={(e) => setDoseAmount(e.target.value)}
                  className="mt-1"
                  placeholder="10ml"
                />
              </div>

              <Button onClick={handleDose} className="w-full">
                Administer Dose
              </Button>
            </TabsContent>

            <TabsContent value="hardware" className="space-y-4 mt-4">
              {Object.entries(hardware).map(([key, value]) => (
                <div key={key} className="flex items-center justify-between py-2">
                  <Label className="text-sm font-medium">
                    {key.replace(/([A-Z])/g, ' $1').trim()}
                  </Label>
                  <Switch
                    checked={value}
                    onCheckedChange={() => toggleHardware(key as keyof typeof hardware)}
                  />
                </div>
              ))}
            </TabsContent>
          </Tabs>
        </div>

        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium">Automation Preset</h3>
          </div>

          <div className="flex gap-2 mb-4">
            <Select value={selectedPreset} onValueChange={handlePresetChange}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="growing">Growing Preset</SelectItem>
                <SelectItem value="flowering">Flowering Preset</SelectItem>
                <SelectItem value="seedling">Seedling Preset</SelectItem>
              </SelectContent>
            </Select>
            <Button size="icon" variant="outline">
              <Plus className="w-4 h-4" />
            </Button>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <Label className="text-sm">pH Min</Label>
              <Input
                type="number"
                step="0.1"
                value={preset.phMin}
                onChange={(e) => updatePreset({ phMin: parseFloat(e.target.value) })}
                className="mt-1"
              />
            </div>
            <div>
              <Label className="text-sm">pH Max</Label>
              <Input
                type="number"
                step="0.1"
                value={preset.phMax}
                onChange={(e) => updatePreset({ phMax: parseFloat(e.target.value) })}
                className="mt-1"
              />
            </div>
            <div>
              <Label className="text-sm">Temperature Min</Label>
              <Input
                type="number"
                value={preset.tempMin}
                onChange={(e) => updatePreset({ tempMin: parseFloat(e.target.value) })}
                className="mt-1"
              />
            </div>
            <div>
              <Label className="text-sm">Temperature Max</Label>
              <Input
                type="number"
                value={preset.tempMax}
                onChange={(e) => updatePreset({ tempMax: parseFloat(e.target.value) })}
                className="mt-1"
              />
            </div>
            <div>
              <Label className="text-sm">EC Min</Label>
              <Input
                type="number"
                step="0.1"
                value={preset.ecMin}
                onChange={(e) => updatePreset({ ecMin: parseFloat(e.target.value) })}
                className="mt-1"
              />
            </div>
            <div>
              <Label className="text-sm">EC Max</Label>
              <Input
                type="number"
                step="0.1"
                value={preset.ecMax}
                onChange={(e) => updatePreset({ ecMax: parseFloat(e.target.value) })}
                className="mt-1"
              />
            </div>
          </div>

          <Button className="w-full">Save Settings</Button>
        </div>
      </div>
    </Card>
  );
};
