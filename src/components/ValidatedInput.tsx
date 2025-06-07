import React from 'react';
import { View, Text, TextInput, StyleSheet, TextInputProps } from 'react-native';
import { globalStyles } from '../styles/global';

interface ValidatedInputProps extends TextInputProps {
  label: string;
  error?: string;
  isValid?: boolean;
}

export const ValidatedInput: React.FC<ValidatedInputProps> = ({
  label,
  error,
  isValid = true,
  style,
  ...props
}) => {
  return (
    <View style={styles.container}>
      <Text style={globalStyles.label}>{label}</Text>
      <TextInput
        style={[
          globalStyles.input,
          !isValid && styles.errorInput,
          style
        ]}
        {...props}
      />
      {error && (
        <Text style={styles.errorText}>{error}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 15,
  },
  errorInput: {
    borderColor: '#d32f2f',
    borderWidth: 2,
  },
  errorText: {
    color: '#d32f2f',
    fontSize: 12,
    marginTop: 4,
    marginLeft: 4,
  },
});
