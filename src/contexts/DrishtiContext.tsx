import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

// --- INTERFACES (Unchanged) ---
export interface SensorData {
  pH: number;
  ec: number;
  temperature: number;
  humidity: number;
}

export interface SensorDataWithTime extends SensorData {
  time: string;
}

export interface ActivityLogEntry {
  time: string;
  status: 'auto' | 'alert' | 'manual';
  action: string;
}

export interface HardwareState {
  waterPump: boolean;
  growLights: boolean;
  aerationPump: boolean;
  airflowFans: boolean;
}

export interface PresetSettings {
  phMin: number;
  phMax: number;
  tempMin: number;
  tempMax: number;
  ecMin: number;
  ecMax: number;
}

// --- CONTEXT TYPE (Updated) ---
interface DrishtiContextType {
  sensors: SensorData;
  updateSensor: (key: keyof SensorData, value: number) => void;
  activityLog: ActivityLogEntry[];
  addLogEntry: (entry: Omit<ActivityLogEntry, 'time'>) => void;
  hardware: HardwareState;
  toggleHardware: (key: keyof HardwareState) => void;
  preset: PresetSettings;
  updatePreset: (newPreset: Partial<PresetSettings>) => void;
  waterLevel: number;
  lastFed: string;
  
  // History for Graph
  sensorHistory: SensorDataWithTime[];
  historyRange: number;
  setHistoryRange: (hours: number) => void;
  filteredSensorHistory: SensorDataWithTime[];

  // --- NEW ---
  // State for Simulator Modal
  isSimulatorOpen: boolean;
  toggleSimulator: () => void;
}

const DrishtiContext = createContext<DrishtiContextType | undefined>(undefined);

export const useDrishti = () => {
  const context = useContext(DrishtiContext);
  if (!context) {
    throw new Error('useDrishti must be used within DrishtiProvider');
  }
  return context;
};

// --- HELPER FUNCTIONS (Unchanged) ---
const generateRealisticData = (prevSensors: SensorData): SensorData => {
  const { pH, ec, temperature, humidity } = prevSensors;
  const newPH = Math.max(5.5, Math.min(6.5, pH + (Math.random() - 0.5) * 0.1));
  const newEc = Math.max(1.5, Math.min(2.5, ec + (Math.random() - 0.5) * 0.1));
  const newTemp = Math.max(18, Math.min(26, temperature + (Math.random() - 0.5) * 0.5));
  const newHumidity = Math.max(55, Math.min(75, humidity + (Math.random() - 0.5) * 1));
  return { pH: newPH, ec: newEc, temperature: newTemp, humidity: newHumidity };
};

const getFormattedTime = (date: Date) => {
  return date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
};


// --- PROVIDER (Updated) ---
export const DrishtiProvider = ({ children }: { children: ReactNode }) => {
  // --- EXISTING STATE (Unchanged) ---
  const [sensors, setSensors] = useState<SensorData>({
    pH: 6.1,
    ec: 1.8,
    temperature: 22,
    humidity: 65,
  });

  const [hardware, setHardware] = useState<HardwareState>({
    waterPump: true,
    growLights: true,
    aerationPump: true,
    airflowFans: false,
  });

  const [preset, setPreset] = useState<PresetSettings>({
    phMin: 5.8,
    phMax: 6.2,
    tempMin: 18,
    tempMax: 24,
    ecMin: 1.5,
    ecMax: 2.0,
  });

  const [activityLog, setActivityLog] = useState<ActivityLogEntry[]>([
    { time: '3:50 PM', status: 'auto', action: 'pH adjusted to 6.1' },
    { time: '2:15 PM', status: 'alert', action: 'Temperature spike detected' },
    { time: '12:30 PM', status: 'manual', action: 'Nutrients dosed (10ml A+B)' },
    { time: '9:00 AM', status: 'auto', action: 'Lights turned on' },
  ]);

  const [waterLevel, setWaterLevel] = useState(78);
  const [lastFed, setLastFed] = useState('3:50 PM (Auto)');

  const [sensorHistory, setSensorHistory] = useState<SensorDataWithTime[]>(() => {
    const data: SensorDataWithTime[] = [];
    const now = new Date();
    for (let i = 24 * 12; i >= 0; i--) { // 24 hours of data, 5 mins apart
      const time = new Date(now.getTime() - i * 5 * 60 * 1000);
      data.push({
        time: getFormattedTime(time),
        pH: 5.8 + Math.random() * 0.6,
        ec: 1.5 + Math.random() * 0.5,
        temperature: 20 + Math.random() * 4,
        humidity: 60 + Math.random() * 10,
      });
    }
    return data;
  });

  const [historyRange, setHistoryRange] = useState(6);

  // --- NEW STATE for Modal ---
  const [isSimulatorOpen, setIsSimulatorOpen] = useState(false);

  // --- EXISTING FUNCTIONS (Unchanged) ---
  useEffect(() => {
    const interval = setInterval(() => {
      setSensors(prevSensors => {
        const newSensors = generateRealisticData(prevSensors);
        setSensorHistory(prevHistory => [
          ...prevHistory.slice(1), // Keep history length manageable
          { ...newSensors, time: getFormattedTime(new Date()) },
        ]);
        return newSensors;
      });
    }, 30000); // Update every 5 seconds
    return () => clearInterval(interval);
  }, []);

  const updateSensor = (key: keyof SensorData, value: number) => {
    const newSensors = { ...sensors, [key]: value };
    setSensors(newSensors);
    setSensorHistory(prevHistory => [
      ...prevHistory.slice(1),
      { ...newSensors, time: getFormattedTime(new Date()) },
    ]);
  };

  const addLogEntry = (entry: Omit<ActivityLogEntry, 'time'>) => {
    const now = new Date();
    const time = now.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
    setActivityLog(prev => [{ ...entry, time }, ...prev.slice(0, 9)]);
    
    if (entry.action.includes('Nutrients dosed')) {
      setLastFed(`${time} (Manual)`);
    }
  };

  const toggleHardware = (key: keyof HardwareState) => {
    setHardware(prev => {
      const newState = !prev[key];
      addLogEntry({
        status: 'manual',
        action: `${key.replace(/([A-Z])/g, ' $1').trim()} turned ${newState ? 'on' : 'off'}`,
      });
      return { ...prev, [key]: newState };
    });
  };

  const updatePreset = (newPreset: Partial<PresetSettings>) => {
    setPreset(prev => ({ ...prev, ...newPreset }));
  };

  // --- NEW FUNCTION for Modal ---
  const toggleSimulator = () => {
    setIsSimulatorOpen(prev => !prev);
  };

  const filteredSensorHistory = sensorHistory.slice(Math.max(sensorHistory.length - historyRange * 12, 0));

  return (
    <DrishtiContext.Provider
      value={{
        sensors,
        updateSensor,
        activityLog,
        addLogEntry,
        hardware,
        toggleHardware,
        preset,
        updatePreset,
        waterLevel,
        lastFed,
        sensorHistory,
        historyRange,
        setHistoryRange,
        filteredSensorHistory,
        
        // --- NEW VALUES ---
        isSimulatorOpen,
        toggleSimulator,
      }}
    >
      {children}
    </DrishtiContext.Provider>
  );
};
