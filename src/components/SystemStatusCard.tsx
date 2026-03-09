import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { useDrishti } from '@/contexts/DrishtiContext';

export const SystemStatusCard = () => {
  const { waterLevel, lastFed } = useDrishti();

  return (
    <Card className="p-6 shadow-sm">
      <h3 className="text-lg font-medium mb-4">System Status</h3>
      
      <div className="space-y-4">
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-muted-foreground">Last Fed</span>
            <span className="text-base font-medium">{lastFed}</span>
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-muted-foreground">Water Reservoir</span>
            <span className="text-base font-medium">{waterLevel}%</span>
          </div>
          <Progress value={waterLevel} className="h-2" />
        </div>
      </div>
    </Card>
  );
};
