import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useDrishti } from '@/contexts/DrishtiContext'; // 1. IMPORT THE CONTEXT (reverting to aliased path)

export const SensorTrendsCard = () => {
  // 2. GET THE LIVE DATA AND FUNCTIONS FROM CONTEXT
  // We no longer need the local useState or generateData
  const { filteredSensorHistory, historyRange, setHistoryRange } = useDrishti();

  return (
    <Card className="p-6 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-medium">Sensor Trends</h3>
        <div className="flex gap-2">
          {/* 3. WIRE UP THE BUTTONS to the context function */}
          <Button
            size="sm"
            variant={historyRange === 6 ? 'default' : 'outline'}
            onClick={() => setHistoryRange(6)}
          >
            Last 6h
          </Button>
          <Button
            size="sm"
            variant={historyRange === 12 ? 'default' : 'outline'}
            onClick={() => setHistoryRange(12)}
          >
            Last 12h
          </Button>
          <Button
            size="sm"
            variant={historyRange === 24 ? 'default' : 'outline'}
            onClick={() => setHistoryRange(24)}
          >
            Last 24h
          </Button>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={300}>
        {/* 4. PASS THE LIVE 'filteredSensorHistory' DATA TO THE CHART */}
        <LineChart data={filteredSensorHistory}>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
          <XAxis
            dataKey="time"
            stroke="hsl(var(--muted-foreground))"
            tick={{ fontSize: 12 }}
          />
          <YAxis stroke="hsl(var(--muted-foreground))" tick={{ fontSize: 12 }} />
          <Tooltip
            contentStyle={{
              backgroundColor: 'hsl(var(--card))',
              border: '1px solid hsl(var(--border))',
              borderRadius: '8px',
            }}
          />
          <Legend />
          <Line
            type="monotone"
            dataKey="pH"
            stroke="hsl(var(--primary))" // Your brand teal
            strokeWidth={2}
            dot={false}
          />
          <Line
            type="monotone"
            dataKey="ec"
            stroke="#82ca9d" // A nice green
            strokeWidth={2}
            dot={false}
          />
          <Line
            type="monotone"
            dataKey="temperature" // Changed from "temp" to "temperature" to match context
            stroke="#ffc658" // A nice yellow
            strokeWidth={2}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </Card>
  );
};
