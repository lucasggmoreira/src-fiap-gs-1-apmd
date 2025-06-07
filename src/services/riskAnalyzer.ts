import { RiskLevel, SensorData, Alert } from '../types';

export const RiskAnalyzer = {
  // Calcular nível de risco baseado nos dados do sensor
  calculateRiskLevel(soilHumidity: number, inclination: number): RiskLevel {
    let score = 0;
    
    // Análise da umidade do solo (0-100%)
    if (soilHumidity > 80) score += 3;
    else if (soilHumidity > 60) score += 2;
    else if (soilHumidity > 40) score += 1;
    
    // Análise da inclinação (em graus)
    const absInclination = Math.abs(inclination);
    if (absInclination > 30) score += 3;
    else if (absInclination > 20) score += 2;
    else if (absInclination > 10) score += 1;
    
    // Determinar nível de risco
    if (score >= 5) {
      return {
        level: 'crítico',
        color: '#d32f2f',
        description: 'Risco muito alto de deslizamento. Evacuação imediata recomendada.'
      };
    } else if (score >= 3) {
      return {
        level: 'alto',
        color: '#f57c00',
        description: 'Risco alto de deslizamento. Monitoramento constante necessário.'
      };
    } else if (score >= 2) {
      return {
        level: 'moderado',
        color: '#fbc02d',
        description: 'Risco moderado. Atenção redobrada necessária.'
      };
    } else {
      return {
        level: 'baixo',
        color: '#388e3c',
        description: 'Condições normais. Continuar monitoramento.'
      };
    }
  },

  // Gerar alerta baseado no nível de risco
  generateAlert(sensorData: SensorData, riskLevel: RiskLevel): Alert | null {
    if (riskLevel.level === 'baixo') return null;
    
    return {
      id: Date.now().toString(),
      timestamp: new Date(),
      location: sensorData.location,
      riskLevel,
      message: `Alerta de ${riskLevel.level.toUpperCase()} risco em ${sensorData.location}. ${riskLevel.description}`
    };
  }
};
