import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { Feather } from '@expo/vector-icons';

interface AttendanceInputProps {
  label: string;
  value: number;
  onChangeValue: (val: number) => void;
  subText?: string;
  min?: number;
}

export const AttendanceInput: React.FC<AttendanceInputProps> = ({
  label,
  value,
  onChangeValue,
  subText,
  min = 0,
}) => {
  const handleDecrement = () => {
    if (value > min) onChangeValue(value - 1);
  };

  const handleIncrement = () => {
    onChangeValue(value + 1);
  };

  return (
    <View style={styles.container}>
      <View style={styles.labelCol}>
        <Text style={styles.label}>{label}</Text>
        {subText && <Text style={styles.subText}>{subText}</Text>}
      </View>

      <View style={styles.stepperContainer}>
        <TouchableOpacity
          activeOpacity={0.8}
          disabled={value <= min}
          style={[styles.stepBtn, value <= min && styles.stepBtnDisabled]}
          onPress={handleDecrement}
        >
          <Feather name="minus" size={16} color={value <= min ? '#94A3B8' : '#0F172A'} />
        </TouchableOpacity>

        <TextInput
          style={styles.input}
          keyboardType="number-pad"
          value={String(value)}
          onChangeText={(text) => {
            const parsed = parseInt(text, 10);
            onChangeValue(isNaN(parsed) ? 0 : Math.max(min, parsed));
          }}
        />

        <TouchableOpacity activeOpacity={0.8} style={styles.stepBtn} onPress={handleIncrement}>
          <Feather name="plus" size={16} color="#0F172A" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#F8FAFC',
    borderRadius: 16,
    padding: 14,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    marginBottom: 12,
  },
  labelCol: {
    flex: 1,
    marginRight: 10,
  },
  label: {
    fontSize: 14,
    fontWeight: '700',
    color: '#0F172A',
  },
  subText: {
    fontSize: 11,
    color: '#64748B',
    marginTop: 1,
  },
  stepperContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    padding: 3,
  },
  stepBtn: {
    width: 34,
    height: 34,
    borderRadius: 9,
    backgroundColor: '#F8FAFC',
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepBtnDisabled: {
    opacity: 0.5,
  },
  input: {
    width: 48,
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '800',
    color: '#0F172A',
  },
});
