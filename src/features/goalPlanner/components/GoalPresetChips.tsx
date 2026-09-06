import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

interface GoalPresetChipsProps {
  selectedTarget: number;
  onSelectTarget: (target: number) => void;
}

const PRESETS = [
  { val: 8.00, label: '8.00 (FC)' },
  { val: 8.50, label: '8.50 (FCD)' },
  { val: 9.00, label: '9.00 (Honors)' },
  { val: 9.50, label: '9.50 (Top 1%)' },
];

export const GoalPresetChips: React.FC<GoalPresetChipsProps> = ({
  selectedTarget,
  onSelectTarget,
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Target CGPA Presets</Text>
      <View style={styles.chipsRow}>
        {PRESETS.map((p) => {
          const isSelected = selectedTarget === p.val;
          return (
            <TouchableOpacity
              key={p.val}
              activeOpacity={0.8}
              style={[styles.chip, isSelected && styles.chipActive]}
              onPress={() => onSelectTarget(p.val)}
            >
              <Text style={[styles.chipText, isSelected && styles.chipTextActive]}>
                {p.label}
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
    flexWrap: 'wrap',
    gap: 8,
  },
  chip: {
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 12,
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    alignItems: 'center',
    minWidth: '47%',
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
