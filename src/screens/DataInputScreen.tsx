import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { globalStyles } from '../styles/global';
import { StorageService } from '../services/storage';
import { RiskAnalyzer } from '../services/riskAnalyzer';
import { SensorData } from '../types';
import { BottomNavigation } from '../components/BottomNavigation';
import { ValidatedInput } from '../components/ValidatedInput';

type Props = {
  navigation: StackNavigationProp<any>;
};

export const DataInputScreen: React.FC<Props> = ({ navigation }) => {
  const [location, setLocation] = useState('');
  const [soilHumidity, setSoilHumidity] = useState('');
  const [inclination, setInclination] = useState('');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({
    location: '',
    soilHumidity: '',
    inclination: '',
  });

  const validateLocation = (text: string) => {
    if (!text.trim()) {
      return 'Localização é obrigatória';
    }
    if (text.trim().length < 3) {
      return 'Mínimo de 3 caracteres';
    }
    if (text.trim().length > 50) {
      return 'Máximo de 50 caracteres';
    }
    return '';
  };

  const validateHumidity = (text: string) => {
    if (!text.trim()) {
      return 'Umidade é obrigatória';
    }
    const value = parseFloat(text.replace(',', '.'));
    if (isNaN(value)) {
      return 'Valor inválido';
    }
    if (value < 0 || value > 100) {
      return 'Deve estar entre 0 e 100';
    }
    return '';
  };

  const validateInclination = (text: string) => {
    if (!text.trim()) {
      return 'Inclinação é obrigatória';
    }
    const value = parseFloat(text.replace(',', '.'));
    if (isNaN(value)) {
      return 'Valor inválido';
    }
    if (value < -90 || value > 90) {
      return 'Deve estar entre -90 e 90';
    }
    return '';
  };

  const handleLocationChange = (text: string) => {
    setLocation(text);
    setErrors(prev => ({ ...prev, location: validateLocation(text) }));
  };

  const handleSubmit = async () => {
    // Validar todos os campos
    const locationError = validateLocation(location);
    const humidityError = validateHumidity(soilHumidity);
    const inclinationError = validateInclination(inclination);

    setErrors({
      location: locationError,
      soilHumidity: humidityError,
      inclination: inclinationError,
    });

    // Se há erros, não prosseguir
    if (locationError || humidityError || inclinationError) {
      Alert.alert('Erro', 'Por favor, corrija os erros nos campos destacados');
      return;
    }

    setLoading(true);

    try {
      const humidityValue = parseFloat(soilHumidity.replace(',', '.'));
      const inclinationValue = parseFloat(inclination.replace(',', '.'));

      const sensorData: SensorData = {
        id: Date.now().toString(),
        timestamp: new Date(),
        soilHumidity: humidityValue,
        inclination: inclinationValue,
        location: location.trim(),
      };

      await StorageService.saveSensorData(sensorData);

      // Calcular risco e gerar alerta se necessário
      const riskLevel = RiskAnalyzer.calculateRiskLevel(humidityValue, inclinationValue);
      const alert = RiskAnalyzer.generateAlert(sensorData, riskLevel);
      
      if (alert) {
        await StorageService.saveAlert(alert);
      }

      Alert.alert(
        'Sucesso',
        `Dados salvos com sucesso!\nNível de risco: ${riskLevel.level.toUpperCase()}`,
        [
          { text: 'Ver Riscos', onPress: () => navigation.navigate('RiskView') },
          { text: 'Inserir Novos Dados', onPress: () => clearForm() }
        ]
      );
    } catch (error) {
      Alert.alert('Erro', 'Erro ao salvar dados. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  const handleHumidityChange = (text: string) => {
    // Permitir apenas números, vírgula e ponto
    const cleanText = text.replace(/[^0-9.,]/g, '');
    // Substituir vírgula por ponto
    const normalizedText = cleanText.replace(',', '.');
    // Evitar múltiplos pontos
    const parts = normalizedText.split('.');
    let finalText = normalizedText;
    if (parts.length > 2) {
      finalText = parts[0] + '.' + parts.slice(1).join('');
    }
    setSoilHumidity(finalText);
    setErrors(prev => ({ ...prev, soilHumidity: validateHumidity(finalText) }));
  };

  const handleInclinationChange = (text: string) => {
    // Permitir números, vírgula, ponto e sinal negativo
    const cleanText = text.replace(/[^0-9.,-]/g, '');
    // Substituir vírgula por ponto
    let normalizedText = cleanText.replace(',', '.');
    // Garantir que o sinal negativo só apareça no início
    if (normalizedText.includes('-')) {
      const withoutMinus = normalizedText.replace(/-/g, '');
      normalizedText = cleanText.startsWith('-') ? '-' + withoutMinus : withoutMinus;
    }
    // Evitar múltiplos pontos
    const parts = normalizedText.split('.');
    let finalText = normalizedText;
    if (parts.length > 2) {
      finalText = parts[0] + '.' + parts.slice(1).join('');
    }
    setInclination(finalText);
    setErrors(prev => ({ ...prev, inclination: validateInclination(finalText) }));
  };

  const clearForm = () => {
    setLocation('');
    setSoilHumidity('');
    setInclination('');
    setErrors({
      location: '',
      soilHumidity: '',
      inclination: '',
    });
  };

  return (
    <View style={{ flex: 1 }}>
      <ScrollView 
        style={globalStyles.container}
        contentContainerStyle={{ paddingBottom: 20 }}
        showsVerticalScrollIndicator={true}
      >
        <Text style={globalStyles.header}>📊 Inserção de Dados Ambientais</Text>
        
        <View style={globalStyles.card}>
          <ValidatedInput
            label="Localização"
            value={location}
            onChangeText={handleLocationChange}
            placeholder="Ex: Morro da Glória, Zona Norte"
            error={errors.location}
            maxLength={50}
          />

          <ValidatedInput
            label="Umidade do Solo (%)"
            value={soilHumidity}
            onChangeText={handleHumidityChange}
            placeholder="0 - 100"
            keyboardType="decimal-pad"
            error={errors.soilHumidity}
            maxLength={6}
          />

          <ValidatedInput
            label="Inclinação (graus)"
            value={inclination}
            onChangeText={handleInclinationChange}
            placeholder="-90 a 90"
            keyboardType="decimal-pad"
            error={errors.inclination}
            maxLength={7}
          />

          <TouchableOpacity
            style={[globalStyles.button, loading && { opacity: 0.7 }]}
            onPress={handleSubmit}
            disabled={loading}
          >
            <Text style={globalStyles.buttonText}>
              {loading ? 'Salvando...' : 'Salvar Dados'}
            </Text>
          </TouchableOpacity>
        </View>

        <View style={globalStyles.card}>
          <Text style={globalStyles.subheader}>ℹ️ Informações</Text>
          <Text style={globalStyles.text}>
            • Umidade do Solo: Percentual de água no solo (0-100%)
          </Text>
          <Text style={globalStyles.text}>
            • Inclinação: Ângulo da superfície em graus (-90 a 90)
          </Text>
          <Text style={globalStyles.text}>
            • Valores mais altos indicam maior risco de deslizamento
          </Text>
        </View>
      </ScrollView>
      <BottomNavigation />
    </View>
  );
};
