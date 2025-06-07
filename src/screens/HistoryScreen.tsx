import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, RefreshControl, TouchableOpacity, Alert } from 'react-native';
import { globalStyles } from '../styles/global';
import { StorageService } from '../services/storage';
import { RiskAnalyzer } from '../services/riskAnalyzer';
import { SensorData } from '../types';
import { BottomNavigation } from '../components/BottomNavigation';

export const HistoryScreen: React.FC = () => {
  const [sensorData, setSensorData] = useState<SensorData[]>([]);
  const [refreshing, setRefreshing] = useState(false);

  const loadData = async () => {
    const data = await StorageService.getSensorData();
    // Ordenar por data mais recente primeiro
    data.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
    setSensorData(data);
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadData();
    setRefreshing(false);
  };

  const clearHistory = () => {
    Alert.alert(
      'Limpar Histórico',
      'Tem certeza que deseja apagar todos os dados? Esta ação não pode ser desfeita.',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Limpar',
          style: 'destructive',
          onPress: async () => {
            try {
              await StorageService.clearAllData();
              setSensorData([]);
              await loadData(); // Recarregar dados
              Alert.alert('Sucesso', 'Histórico limpo com sucesso!');
            } catch (error) {
              Alert.alert('Erro', 'Erro ao limpar histórico. Tente novamente.');
            }
          }
        }
      ]
    );
  };

  useEffect(() => {
    loadData();
  }, []);

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getDataByDate = () => {
    const dateMap = new Map<string, SensorData[]>();
    
    sensorData.forEach(data => {
      const dateKey = new Date(data.timestamp).toLocaleDateString('pt-BR');
      if (!dateMap.has(dateKey)) {
        dateMap.set(dateKey, []);
      }
      dateMap.get(dateKey)!.push(data);
    });
    
    return Array.from(dateMap.entries()).sort((a, b) => {
      return new Date(b[0].split('/').reverse().join('-')).getTime() - 
             new Date(a[0].split('/').reverse().join('-')).getTime();
    });
  };

  const dataByDate = getDataByDate();

  return (
    <View style={{ flex: 1 }}>
      <ScrollView
        style={globalStyles.container}
        contentContainerStyle={{ paddingBottom: 20 }}
        showsVerticalScrollIndicator={true}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      >
      <Text style={globalStyles.header}>📈 Histórico de Monitoramento</Text>
      
      <View style={globalStyles.card}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <Text style={globalStyles.subheader}>📊 Estatísticas</Text>
          <TouchableOpacity
            onPress={clearHistory}
            style={[globalStyles.button, { backgroundColor: '#f44336', marginTop: 0, paddingHorizontal: 15, paddingVertical: 8 }]}
          >
            <Text style={[globalStyles.buttonText, { fontSize: 14 }]}>Limpar Histórico</Text>
          </TouchableOpacity>
        </View>
        
        <Text style={globalStyles.text}>Total de registros: {sensorData.length}</Text>
        <Text style={globalStyles.text}>
          Localizações monitoradas: {new Set(sensorData.map(d => d.location)).size}
        </Text>
        {sensorData.length > 0 && (
          <Text style={globalStyles.text}>
            Primeiro registro: {formatDate(new Date(sensorData[sensorData.length - 1].timestamp))}
          </Text>
        )}
      </View>

      {dataByDate.length === 0 ? (
        <Text style={globalStyles.centerText}>
          Nenhum dado disponível no histórico.
        </Text>
      ) : (
        dataByDate.map(([date, records]) => (
          <View key={date} style={globalStyles.card}>
            <Text style={globalStyles.subheader}>📅 {date}</Text>
            {records.map((data) => {
              const riskLevel = RiskAnalyzer.calculateRiskLevel(data.soilHumidity, data.inclination);
              return (
                <View
                  key={data.id}
                  style={{
                    borderWidth: 1,
                    borderColor: '#e0e0e0',
                    borderRadius: 8,
                    padding: 12,
                    marginBottom: 8,
                    borderLeftWidth: 4,
                    borderLeftColor: riskLevel.color,
                  }}
                >
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                    <Text style={{ fontSize: 16, fontWeight: '600', color: '#333' }}>
                      {data.location}
                    </Text>
                    <View style={{
                      backgroundColor: riskLevel.color,
                      paddingHorizontal: 8,
                      paddingVertical: 4,
                      borderRadius: 12,
                    }}>
                      <Text style={{ color: '#fff', fontSize: 12, fontWeight: 'bold' }}>
                        {riskLevel.level.toUpperCase()}
                      </Text>
                    </View>
                  </View>
                  
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 4 }}>
                    <Text style={{ fontSize: 14, color: '#666' }}>Umidade:</Text>
                    <Text style={{ fontSize: 14, fontWeight: '600', color: '#333' }}>
                      {data.soilHumidity}%
                    </Text>
                  </View>
                  
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 }}>
                    <Text style={{ fontSize: 14, color: '#666' }}>Inclinação:</Text>
                    <Text style={{ fontSize: 14, fontWeight: '600', color: '#333' }}>
                      {data.inclination}°
                    </Text>
                  </View>
                  
                  <Text style={{ fontSize: 12, color: '#888' }}>
                    {formatDate(new Date(data.timestamp))}
                  </Text>
                  
                  <Text style={{ fontSize: 13, color: riskLevel.color, marginTop: 4, fontWeight: '500' }}>
                    {riskLevel.description}
                  </Text>
                </View>
              );
            })}
          </View>
        ))
      )}
      </ScrollView>
      <BottomNavigation />
    </View>
  );
};
