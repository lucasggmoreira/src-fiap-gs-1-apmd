import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { StackNavigationProp } from '@react-navigation/stack';

type Props = {
  navigation: StackNavigationProp<any>;
};

export const WelcomeScreen: React.FC<Props> = ({ navigation }) => {
  return (
    <LinearGradient
      colors={['#4facfe', '#00f2fe']}
      style={styles.container}
    >
      <View style={styles.content}>
        <Text style={styles.title}>🛡️ AlertaSlide</Text>
        <Text style={styles.subtitle}>Sistema de Monitoramento de Deslizamentos</Text>
        
        <View style={styles.description}>
          <Text style={styles.descriptionText}>
            Monitore indicadores ambientais e receba alertas sobre riscos de deslizamentos em tempo real.
          </Text>
        </View>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('DataInput')}
        >
          <Text style={styles.buttonText}>Começar Monitoramento</Text>
        </TouchableOpacity>

        <View style={styles.features}>
          <Text style={styles.featureItem}>📊 Inserção de dados ambientais</Text>
          <Text style={styles.featureItem}>⚠️ Análise de riscos em tempo real</Text>
          <Text style={styles.featureItem}>📈 Histórico de monitoramento</Text>
          <Text style={styles.featureItem}>🛠️ Ações de mitigação</Text>
        </View>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    color: '#fff',
    marginBottom: 30,
    textAlign: 'center',
    opacity: 0.9,
  },
  description: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 15,
    padding: 20,
    marginBottom: 40,
  },
  descriptionText: {
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',
    lineHeight: 24,
  },
  button: {
    backgroundColor: '#fff',
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 25,
    marginBottom: 40,
  },
  buttonText: {
    color: '#4facfe',
    fontSize: 18,
    fontWeight: 'bold',
  },
  features: {
    alignItems: 'flex-start',
  },
  featureItem: {
    fontSize: 14,
    color: '#fff',
    marginBottom: 8,
    opacity: 0.9,
  },
});
