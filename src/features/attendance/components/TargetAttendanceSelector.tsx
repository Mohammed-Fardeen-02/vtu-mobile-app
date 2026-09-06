import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

interface TargetAttendanceSelectorProps {
  selectedTarget: number;
  onSelectTarget: (target: number) => void;
}

const TARGET_OPTIONS = [75, 80, 85, 90];

export const TargetAttendanceSelector: React.FC<TargetAttendanceSelectorProps> = ({
  selectedTarget,
  onSelectTarget,
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Target Attendance Goal</Text>
      <View style={styles.chipsRow}>
        {TARGET_OPTIONS.map((t) => {
          const isSelected = selectedTarget === t;
          return (
            <TouchableOpacity
              key={t}
              activeOpacity={0.8}
              style={[styles.chip, isSelected && styles.chipActive]}
              onPress={() => onSelectTarget(t)}
            >
              <Text style={[styles.chipText, isSelected && styles.chipTextActive]}>
                {t}% {t === 75 ? '(VTU Min)' : t === 85 ? '(Rec)' : ''}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  label: {
    fontSize: 12,
    fontWeight: '800',
    color: '#64748B',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 8,
  },
  chipsRow: {
    flexDirection: 'row',
    gap: 8,
  },
  chip: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 12,
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    alignItems: 'center',
  },
  chipActive: {
    backgroundColor: '#0745E8',
    borderColor: '#0745E8',
  },
  chipText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#475569',
  },
  chipTextActive: {
    color: '#FFFFFF',
  },
});
