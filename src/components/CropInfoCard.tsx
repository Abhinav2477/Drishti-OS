import { Card } from '@/components/ui/card';

export const CropInfoCard = () => {
  return (
    <Card className="overflow-hidden shadow-sm">
      <div className="flex h-full">
        <div className="relative w-[40%] bg-primary-light">
          <div className="absolute top-2 right-2 bg-tag-neutral text-white px-2 py-1 rounded text-xs font-medium">
            LTU-001
          </div>
          <img
            src="https://images.unsplash.com/photo-1622206151226-18ca2c9ab4a1?w=400&h=300&fit=crop"
            alt="Lettuce crop"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="w-[60%] p-6 flex flex-col justify-center gap-4">
          <h3 className="text-lg font-medium text-foreground">Lettuce</h3>
          
          <div>
            <p className="text-sm font-medium text-muted-foreground mb-1">Date Planted</p>
            <div className="inline-block bg-tag-neutral text-white px-3 py-1 rounded-md text-sm">
              Oct 15, 2025
            </div>
          </div>

          <div>
            <p className="text-sm font-medium text-muted-foreground mb-1">Est. Harvest</p>
            <div className="inline-block bg-tag-neutral text-white px-3 py-1 rounded-md text-sm">
              Nov 28, 2025
            </div>
          </div>

          <div>
            <p className="text-sm font-medium text-muted-foreground mb-1">Stage</p>
            <div className="inline-block bg-tag-healthy text-white px-3 py-1 rounded-md text-sm">
              Growing
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};
