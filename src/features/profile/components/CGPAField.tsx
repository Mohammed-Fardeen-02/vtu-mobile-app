import React from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';

interface CGPAFieldProps {
  value: string;
  onChangeText: (text: string) => void;
  error?: string | null;
}

export const CGPAField: React.FC<CGPAFieldProps> = ({
  value,
  onChangeText,
  error,
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Cumulative Grade Point Average (CGPA)</Text>
      <View style={[styles.inputWrapper, !!error && styles.inputError]}>
        <TextInput
          style={styles.input}
          value={value}
          onChangeText={onChangeText}
          keyboardType="decimal-pad"
          placeholder="e.g. 8.74"
          placeholderTextColor="#94A3B8"
          maxLength={5}
        />
        <Text style={styles.maxScaleText}>/ 10.00</Text>
      </View>
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  label: {
    fontSize: 12,
    fontWeight: '700',
    color: '#334155',
    marginBottom: 6,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 48,
    borderRadius: 14,
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    paddingHorizontal: 14,
  },
  inputError: {
    borderColor: '#EF4444',
    backgroundColor: '#FEF2F2',
  },
  input: {
    flex: 1,
    fontSize: 16,
    fontWeight: '700',
    color: '#0F172A',
  },
  maxScaleText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#64748B',
  },
  errorText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#EF4444',
    marginTop: 4,
  },
});
