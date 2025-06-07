import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export const BottomNavigation: React.FC = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const insets = useSafeAreaInsets();

  const navItems = [
    { name: 'DataInput', label: 'Dados', icon: '📊' },
    { name: 'RiskView', label: 'Riscos', icon: '⚠️' },
    { name: 'History', label: 'Histórico', icon: '📈' },
    { name: 'Mitigation', label: 'Ações', icon: '🛠️' },
  ];

  return (
    <View style={[styles.container, { paddingBottom: insets.bottom + 10 }]}>
      {navItems.map((item) => (
        <TouchableOpacity
          key={item.name}
          style={[
            styles.navItem,
            route.name === item.name && styles.activeNavItem
          ]}
          onPress={() => navigation.navigate(item.name as never)}
        >
          <Text style={styles.icon}>{item.icon}</Text>
          <Text style={[
            styles.label,
            route.name === item.name && styles.activeLabel
          ]}>
            {item.label}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
    paddingTop: 10,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 8,
  },
  activeNavItem: {
    backgroundColor: '#f0f8ff',
    borderRadius: 12,
    marginHorizontal: 4,
  },
  icon: {
    fontSize: 20,
    marginBottom: 4,
  },
  label: {
    fontSize: 12,
    color: '#666',
    fontWeight: '500',
  },
  activeLabel: {
    color: '#4facfe',
    fontWeight: '600',
  },
});
