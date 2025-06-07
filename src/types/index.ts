export interface SensorData {
  id: string;
  timestamp: Date;
  soilHumidity: number; // Percentual 0-100
  inclination: number; // Graus -90 a 90
  location: string;
}

export interface RiskLevel {
  level: 'baixo' | 'moderado' | 'alto' | 'crítico';
  color: string;
  description: string;
}

export interface Alert {
  id: string;
  timestamp: Date;
  location: string;
  riskLevel: RiskLevel;
  message: string;
}

export interface MitigationAction {
  id: string;
  title: string;
  description: string;
  priority: 'baixa' | 'média' | 'alta';
}
