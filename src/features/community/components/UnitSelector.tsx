import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

interface UnitSelectorProps {
  selectedUnit: number;
  onSelectUnit: (unit: number) => void;
}

export const UnitSelector: React.FC<UnitSelectorProps> = ({
  selectedUnit,
  onSelectUnit,
}) => {
  const units = [1, 2, 3, 4, 5];

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Select Syllabus Unit</Text>
      <View style={styles.row}>
        {units.map((u) => {
          const isSelected = selectedUnit === u;
          return (
            <TouchableOpacity
              key={u}
              activeOpacity={0.8}
              style={[styles.pill, isSelected && styles.pillSelected]}
              onPress={() => onSelectUnit(u)}
            >
              <Text style={[styles.text, isSelected && styles.textSelected]}>
                Unit {u}
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
    marginVertical: 10,
  },
  label: {
    fontSize: 12,
    fontWeight: '800',
    color: '#475569',
    marginBottom: 8,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  pill: {
    backgroundColor: '#FFFFFF',
    borderColor: '#E2E8F0',
    borderWidth: 1,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 14,
  },
  pillSelected: {
    backgroundColor: '#0745E8',
    borderColor: '#0745E8',
  },
  text: {
    fontSize: 12,
    fontWeight: '700',
    color: '#475569',
  },
  textSelected: {
    color: '#FFFFFF',
  },
});
