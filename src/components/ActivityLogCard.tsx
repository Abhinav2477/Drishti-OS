import { Card } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { useDrishti } from '@/contexts/DrishtiContext';

const statusVariantMap = {
  auto: 'default' as const,
  alert: 'destructive' as const,
  manual: 'secondary' as const,
};

const statusColorMap = {
  auto: 'bg-tag-healthy',
  alert: 'bg-tag-critical',
  manual: 'bg-tag-info',
};

export const ActivityLogCard = () => {
  const { activityLog } = useDrishti();

  return (
    <Card className="p-6 shadow-sm">
      <h3 className="text-lg font-medium mb-4">Activity Log</h3>
      
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Time</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {activityLog.map((entry, index) => (
            <TableRow key={index}>
              <TableCell className="text-sm">{entry.time}</TableCell>
              <TableCell>
                <div className={`inline-block ${statusColorMap[entry.status]} text-white px-3 py-1 rounded-md text-xs font-medium uppercase`}>
                  {entry.status}
                </div>
              </TableCell>
              <TableCell className="text-sm">{entry.action}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  );
};
