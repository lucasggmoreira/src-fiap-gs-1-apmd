import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Linking, Alert } from 'react-native';
import { globalStyles } from '../styles/global';
import { MitigationAction } from '../types';
import { BottomNavigation } from '../components/BottomNavigation';

export const MitigationScreen: React.FC = () => {
  const mitigationActions: MitigationAction[] = [
    {
      id: '1',
      title: 'Evacuação Imediata',
      description: 'Em caso de risco crítico, evacue imediatamente a área e procure local seguro. Acione autoridades locais.',
      priority: 'alta'
    },
    {
      id: '2',
      title: 'Sistema de Drenagem',
      description: 'Implementar ou melhorar sistemas de drenagem para reduzir a saturação do solo.',
      priority: 'alta'
    },
    {
      id: '3',
      title: 'Contenção com Muros',
      description: 'Construir muros de contenção em áreas com alta inclinação para estabilizar o terreno.',
      priority: 'alta'
    },
    {
      id: '4',
      title: 'Plantio de Vegetação',
      description: 'Plantar vegetação com raízes profundas para estabilizar o solo e reduzir a erosão.',
      priority: 'média'
    },
    {
      id: '5',
      title: 'Monitoramento Contínuo',
      description: 'Manter sensores ativos e verificar regularmente os indicadores de risco.',
      priority: 'média'
    },
    {
      id: '6',
      title: 'Educação da Comunidade',
      description: 'Treinar moradores locais para identificar sinais de risco e ações de emergência.',
      priority: 'média'
    },
    {
      id: '7',
      title: 'Limpeza de Canais',
      description: 'Manter canais de escoamento livres de entulho e detritos para facilitar o fluxo da água.',
      priority: 'baixa'
    },
    {
      id: '8',
      title: 'Inspeção Regular',
      description: 'Realizar inspeções visuais periódicas em áreas de risco para identificar mudanças.',
      priority: 'baixa'
    }
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'alta': return '#d32f2f';
      case 'média': return '#f57c00';
      case 'baixa': return '#388e3c';
      default: return '#666';
    }
  };

  const callEmergency = () => {
    Alert.alert(
      'Emergência',
      'Selecione o serviço de emergência:',
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Bombeiros (193)', onPress: () => Linking.openURL('tel:193') },
        { text: 'Defesa Civil (199)', onPress: () => Linking.openURL('tel:199') },
        { text: 'SAMU (192)', onPress: () => Linking.openURL('tel:192') }
      ]
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <ScrollView 
        style={globalStyles.container}
        contentContainerStyle={{ paddingBottom: 20 }}
        showsVerticalScrollIndicator={true}
      >
      <Text style={globalStyles.header}>🛠️ Ações de Mitigação</Text>
      
      <View style={globalStyles.card}>
        <Text style={globalStyles.subheader}>🚨 Emergência</Text>
        <Text style={globalStyles.text}>
          Em situações de risco crítico ou iminente, acione imediatamente os serviços de emergência:
        </Text>
        <TouchableOpacity
          style={[globalStyles.button, { backgroundColor: '#d32f2f', marginTop: 15 }]}
          onPress={callEmergency}
        >
          <Text style={globalStyles.buttonText}>🚨 Ligar para Emergência</Text>
        </TouchableOpacity>
      </View>

      <View style={globalStyles.card}>
        <Text style={globalStyles.subheader}>📋 Ações Recomendadas</Text>
        <Text style={globalStyles.text}>
          Medidas preventivas e corretivas organizadas por prioridade:
        </Text>
      </View>
      
      {mitigationActions.map((action) => (
        <View key={action.id} style={globalStyles.card}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10 }}>
            <Text style={[globalStyles.subheader, { flex: 1, marginBottom: 0 }]}>
              {action.title}
            </Text>
            <View style={{
              backgroundColor: getPriorityColor(action.priority),
              paddingHorizontal: 8,
              paddingVertical: 4,
              borderRadius: 12,
              marginLeft: 10,
            }}>
              <Text style={{ color: '#fff', fontSize: 12, fontWeight: 'bold' }}>
                {action.priority.toUpperCase()}
              </Text>
            </View>
          </View>
          
          <Text style={globalStyles.text}>{action.description}</Text>
          
          {action.priority === 'alta' && (
            <View style={{
              backgroundColor: '#ffebee',
              padding: 10,
              borderRadius: 8,
              marginTop: 10,
              borderLeftWidth: 4,
              borderLeftColor: '#d32f2f',
            }}>
              <Text style={{ color: '#d32f2f', fontWeight: '600', fontSize: 12 }}>
                ⚠️ PRIORIDADE ALTA - Ação imediata recomendada
              </Text>
            </View>
          )}
        </View>
      ))}

      <View style={globalStyles.card}>
        <Text style={globalStyles.subheader}>📞 Contatos Úteis</Text>
        <Text style={globalStyles.text}>• Bombeiros: 193</Text>
        <Text style={globalStyles.text}>• Defesa Civil: 199</Text>
        <Text style={globalStyles.text}>• SAMU: 192</Text>
        <Text style={globalStyles.text}>• Polícia Militar: 190</Text>
        <Text style={globalStyles.text}>• Polícia Civil: 197</Text>
      </View>

      <View style={globalStyles.card}>
        <Text style={globalStyles.subheader}>ℹ️ Sinais de Alerta</Text>
        <Text style={globalStyles.text}>Fique atento aos seguintes sinais:</Text>
        <Text style={globalStyles.text}>• Rachaduras em paredes ou no solo</Text>
        <Text style={globalStyles.text}>• Árvores ou postes inclinados</Text>
        <Text style={globalStyles.text}>• Água turva em nascentes</Text>
        <Text style={globalStyles.text}>• Ruídos estranhos no solo</Text>
        <Text style={globalStyles.text}>• Inclinação de muros ou construções</Text>
      </View>
      </ScrollView>
      <BottomNavigation />
    </View>
  );
};
