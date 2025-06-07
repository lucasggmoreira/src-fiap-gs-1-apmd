import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { WelcomeScreen } from '../screens/WelcomeScreen';
import { DataInputScreen } from '../screens/DataInputScreen';
import { RiskViewScreen } from '../screens/RiskViewScreen';
import { HistoryScreen } from '../screens/HistoryScreen';
import { MitigationScreen } from '../screens/MitigationScreen';

const Stack = createStackNavigator();

export const AppNavigator: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Welcome"
        screenOptions={{
          headerStyle: {
            backgroundColor: '#4facfe',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      >
        <Stack.Screen
          name="Welcome"
          component={WelcomeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="DataInput"
          component={DataInputScreen}
          options={{
            title: 'Inserção de Dados',
            headerBackTitle: 'Voltar',
          }}
        />
        <Stack.Screen
          name="RiskView"
          component={RiskViewScreen}
          options={{
            title: 'Visualização de Riscos',
            headerBackTitle: 'Voltar',
          }}
        />
        <Stack.Screen
          name="History"
          component={HistoryScreen}
          options={{
            title: 'Histórico',
            headerBackTitle: 'Voltar',
          }}
        />
        <Stack.Screen
          name="Mitigation"
          component={MitigationScreen}
          options={{
            title: 'Ações de Mitigação',
            headerBackTitle: 'Voltar',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
