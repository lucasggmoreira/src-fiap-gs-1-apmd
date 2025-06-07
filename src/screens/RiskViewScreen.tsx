import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, RefreshControl, StyleSheet } from 'react-native';
import { globalStyles } from '../styles/global';
import { StorageService } from '../services/storage';
import { RiskAnalyzer } from '../services/riskAnalyzer';
import { SensorData, Alert } from '../types';
import { BottomNavigation } from '../components/BottomNavigation';

export const RiskViewScreen: React.FC = () => {
  const [sensorData, setSensorData] = useState<SensorData[]>([]);
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [refreshing, setRefreshing] = useState(false);

  const loadData = async () => {
    const data = await StorageService.getSensorData();
    const alertsData = await StorageService.getAlerts();
    setSensorData(data);
    setAlerts(alertsData);
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadData();
    setRefreshing(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  const getLatestDataByLocation = () => {
    const locationMap = new Map<string, SensorData>();
    
    sensorData
      .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
      .forEach(data => {
        if (!locationMap.has(data.location)) {
          locationMap.set(data.location, data);
        }
      });
    
    return Array.from(locationMap.values());
  };

  const latestData = getLatestDataByLocation();
  const recentAlerts = alerts
    .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
    .slice(0, 5);

  return (
    <View style={{ flex: 1 }}>
      <ScrollView
        style={globalStyles.container}
        contentContainerStyle={{ paddingBottom: 20 }}
        showsVerticalScrollIndicator={true}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      >
        <Text style={globalStyles.header}>⚠️ Visualização de Riscos</Text>

        {recentAlerts.length > 0 && (
          <View style={globalStyles.card}>
            <Text style={globalStyles.subheader}>🚨 Alertas Recentes</Text>
            {recentAlerts.map((alert) => (
              <View key={alert.id} style={[styles.alertCard, { borderLeftColor: alert.riskLevel.color }]}>
                <Text style={[styles.alertLevel, { color: alert.riskLevel.color }]}>
                  {alert.riskLevel.level.toUpperCase()}
                </Text>
                <Text style={styles.alertLocation}>{alert.location}</Text>
                <Text style={styles.alertTime}>
                  {new Date(alert.timestamp).toLocaleString('pt-BR')}
                </Text>
                <Text style={globalStyles.text}>{alert.message}</Text>
              </View>
            ))}
          </View>
        )}

        <View style={globalStyles.card}>
          <Text style={globalStyles.subheader}>📍 Status por Localização</Text>
          {latestData.length === 0 ? (
            <Text style={globalStyles.centerText}>
              Nenhum dado disponível. Adicione dados na tela de inserção.
            </Text>
          ) : (
            latestData.map((data) => {
              const riskLevel = RiskAnalyzer.calculateRiskLevel(data.soilHumidity, data.inclination);
              return (
                <View key={data.id} style={styles.locationCard}>
                  <View style={styles.locationHeader}>
                    <Text style={styles.locationName}>{data.location}</Text>
                    <View style={[styles.riskBadge, { backgroundColor: riskLevel.color }]}>
                      <Text style={styles.riskBadgeText}>{riskLevel.level.toUpperCase()}</Text>
                    </View>
                  </View>
                  
                  <View style={styles.dataRow}>
                    <Text style={styles.dataLabel}>Umidade do Solo:</Text>
                    <Text style={styles.dataValue}>{data.soilHumidity}%</Text>
                  </View>
                  
                  <View style={styles.dataRow}>
                    <Text style={styles.dataLabel}>Inclinação:</Text>
                    <Text style={styles.dataValue}>{data.inclination}°</Text>
                  </View>
                  
                  <Text style={styles.lastUpdate}>
                    Última atualização: {new Date(data.timestamp).toLocaleString('pt-BR')}
                  </Text>
                  
                  <Text style={[styles.riskDescription, { color: riskLevel.color }]}>
                    {riskLevel.description}
                  </Text>
                </View>
              );
            })
          )}
        </View>

        <View style={globalStyles.card}>
          <Text style={globalStyles.subheader}>📈 Resumo Geral</Text>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Total de Localizações:</Text>
            <Text style={styles.summaryValue}>{latestData.length}</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Alertas Ativos:</Text>
            <Text style={styles.summaryValue}>{recentAlerts.length}</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Última Verificação:</Text>
            <Text style={styles.summaryValue}>{new Date().toLocaleTimeString('pt-BR')}</Text>
          </View>
        </View>
      </ScrollView>
      <BottomNavigation />
    </View>
  );
};

const styles = StyleSheet.create({
  alertCard: {
    borderLeftWidth: 4,
    paddingLeft: 12,
    marginBottom: 12,
    paddingBottom: 8,
  },
  alertLevel: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  alertLocation: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 2,
  },
  alertTime: {
    fontSize: 12,
    color: '#666',
    marginBottom: 6,
  },
  locationCard: {
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
  },
  locationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  locationName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    flex: 1,
  },
  riskBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  riskBadgeText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  dataRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  dataLabel: {
    fontSize: 14,
    color: '#666',
  },
  dataValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
  lastUpdate: {
    fontSize: 12,
    color: '#888',
    marginTop: 6,
    marginBottom: 6,
  },
  riskDescription: {
    fontSize: 13,
    fontWeight: '500',
    marginTop: 4,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  summaryLabel: {
    fontSize: 14,
    color: '#666',
  },
  summaryValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
});
