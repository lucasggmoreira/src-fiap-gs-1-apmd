import AsyncStorage from '@react-native-async-storage/async-storage';
import { SensorData, Alert } from '../types';

const SENSOR_DATA_KEY = '@sensor_data';
const ALERTS_KEY = '@alerts';

export const StorageService = {
  // Salvar dados de sensores
  async saveSensorData(data: SensorData): Promise<void> {
    try {
      const existingData = await this.getSensorData();
      const updatedData = [...existingData, data];
      await AsyncStorage.setItem(SENSOR_DATA_KEY, JSON.stringify(updatedData));
    } catch (error) {
      console.error('Erro ao salvar dados do sensor:', error);
    }
  },

  // Buscar dados de sensores
  async getSensorData(): Promise<SensorData[]> {
    try {
      const data = await AsyncStorage.getItem(SENSOR_DATA_KEY);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error('Erro ao buscar dados do sensor:', error);
      return [];
    }
  },

  // Salvar alerta
  async saveAlert(alert: Alert): Promise<void> {
    try {
      const existingAlerts = await this.getAlerts();
      const updatedAlerts = [...existingAlerts, alert];
      await AsyncStorage.setItem(ALERTS_KEY, JSON.stringify(updatedAlerts));
    } catch (error) {
      console.error('Erro ao salvar alerta:', error);
    }
  },

  // Buscar alertas
  async getAlerts(): Promise<Alert[]> {
    try {
      const data = await AsyncStorage.getItem(ALERTS_KEY);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error('Erro ao buscar alertas:', error);
      return [];
    }
  },

  // Limpar todos os dados
  async clearAllData(): Promise<void> {
    try {
      await AsyncStorage.multiRemove([SENSOR_DATA_KEY, ALERTS_KEY]);
    } catch (error) {
      console.error('Erro ao limpar dados:', error);
    }
  }
};
