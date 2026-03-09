import { CropInfoCard } from '@/components/CropInfoCard';
import { ControlCenterCard } from '@/components/ControlCenterCard';
import { StatCard } from '@/components/StatCard';
import { PlantHealthCard } from '@/components/PlantHealthCard';
import { SensorTrendsCard } from '@/components/SensorTrendsCard';
import { SystemStatusCard } from '@/components/SystemStatusCard';
import { ActivityLogCard } from '@/components/ActivityLogCard';

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-[#F7F7F7] p-8"> {/* Page Background Color */}
      <h1 className="text-4xl font-medium text-foreground mb-8">Dashboard</h1>
      
      {/* This is the main 2-column grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* === LEFT COLUMN === */}
        <div className="col-span-1 space-y-6">
          <CropInfoCard />
          <ControlCenterCard />
        </div>

        {/* === RIGHT COLUMN === */}
        {/* We set a max-width here to match your design's 740px */}
        <div className="col-span-1 lg:col-span-2 space-y-6 max-w-[740px]">
          
          {/* This new FLEXBOX div holds your stats and plant health */}
          {/* We use flexbox for precise control, not grid */}
          <div className="flex flex-row gap-[20px]">
            
            {/* This is the 2x2 grid for your 4 StatCards */}
            {/* We use 'gap-[30px]' to match your design */}
            {/* We set an explicit width: (164px * 2) + 30px = 358px */}
            <div className="stat_wrapper">
              <div className="stat_row">
              <StatCard type="pH" />
              <StatCard type="ec" />
              </div>
              <div className="stat_row">
              <StatCard type="temperature" />
              <StatCard type="humidity" />
              </div>
            </div>

            {/* This is your PlantHealthCard */}
            {/* 'flex-1' makes it take up all "the rest" of the space */}
            <div className="flex-1">
              <PlantHealthCard />
            </div>
          </div>

          {/* Sensor Trends (full width of the right column) */}
          <SensorTrendsCard />
          
          {/* System Status & Activity Log (side-by-side) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <SystemStatusCard />
            <ActivityLogCard />
          </div>

        </div>
      </div>
    </div>
  );
};

export default Dashboard;