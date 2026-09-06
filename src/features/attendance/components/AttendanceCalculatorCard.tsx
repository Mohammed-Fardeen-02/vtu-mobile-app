import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { CalculatorMode } from '../types/attendance.types';

interface AttendanceCalculatorCardProps {
  mode: CalculatorMode;
  onModeChange: (mode: CalculatorMode) => void;
}

export const AttendanceCalculatorCard: React.FC<AttendanceCalculatorCardProps> = ({
  mode,
  onModeChange,
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.sectionLabel}>Calculation Mode</Text>

      <View style={styles.segmentedControl}>
        <TouchableOpacity
          activeOpacity={0.8}
          style={[styles.segmentBtn, mode === 'REACH_TARGET' && styles.segmentBtnActive]}
          onPress={() => onModeChange('REACH_TARGET')}
        >
          <Text style={[styles.segmentText, mode === 'REACH_TARGET' && styles.segmentTextActive]}>
            Reach Target
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.8}
          style={[styles.segmentBtn, mode === 'CAN_MISS' && styles.segmentBtnActive]}
          onPress={() => onModeChange('CAN_MISS')}
        >
          <Text style={[styles.segmentText, mode === 'CAN_MISS' && styles.segmentTextActive]}>
            Classes I Can Miss
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  sectionLabel: {
    fontSize: 12,
    fontWeight: '800',
    color: '#64748B',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 8,
  },
  segmentedControl: {
    flexDirection: 'row',
    backgroundColor: '#F8FAFC',
    borderRadius: 14,
    padding: 4,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  segmentBtn: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 10,
  },
  segmentBtnActive: {
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  segmentText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#64748B',
  },
  segmentTextActive: {
    color: '#0745E8',
    fontWeight: '800',
  },
});
