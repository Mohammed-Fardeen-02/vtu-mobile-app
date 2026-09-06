import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

interface SchemeSelectorProps {
  selectedScheme: string;
  onSelectScheme: (scheme: string) => void;
}

export const SchemeSelector: React.FC<SchemeSelectorProps> = ({
  selectedScheme,
  onSelectScheme,
}) => {
  const schemes = ['2022', '2021', '2018'];

  return (
    <View style={styles.container}>
      <Text style={styles.label}>VTU Scheme</Text>
      <View style={styles.row}>
        {schemes.map((sch) => {
          const isSelected = selectedScheme === sch;
          return (
            <TouchableOpacity
              key={sch}
              activeOpacity={0.8}
              style={[styles.pill, isSelected && styles.pillSelected]}
              onPress={() => onSelectScheme(sch)}
            >
              <Text style={[styles.text, isSelected && styles.textSelected]}>
                {sch} Scheme
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
    backgroundColor: '#EEF2FF',
    borderColor: '#0745E8',
  },
  text: {
    fontSize: 12,
    fontWeight: '700',
    color: '#475569',
  },
  textSelected: {
    color: '#0745E8',
    fontWeight: '800',
  },
});
