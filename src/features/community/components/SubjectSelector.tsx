import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MOCK_SUBJECTS } from '@/features/notes/api/notesData';

interface SubjectSelectorProps {
  selectedCode: string;
  onSelectSubject: (code: string, name: string) => void;
}

export const SubjectSelector: React.FC<SubjectSelectorProps> = ({
  selectedCode,
  onSelectSubject,
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Select VTU Subject</Text>
      <View style={styles.grid}>
        {MOCK_SUBJECTS.map((sub) => {
          const isSelected = selectedCode === sub.code;
          return (
            <TouchableOpacity
              key={sub.id}
              activeOpacity={0.8}
              style={[styles.tile, isSelected && styles.tileSelected]}
              onPress={() => onSelectSubject(sub.code, sub.name)}
            >
              <Text style={[styles.code, isSelected && styles.codeSelected]}>{sub.code}</Text>
              <Text style={[styles.name, isSelected && styles.nameSelected]} numberOfLines={1}>
                {sub.name}
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
  grid: {
    gap: 8,
  },
  tile: {
    backgroundColor: '#FFFFFF',
    borderColor: '#E2E8F0',
    borderWidth: 1,
    padding: 12,
    borderRadius: 14,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  tileSelected: {
    backgroundColor: '#EEF2FF',
    borderColor: '#0745E8',
  },
  code: {
    fontSize: 12,
    fontWeight: '800',
    color: '#0745E8',
    backgroundColor: '#EEF2FF',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  codeSelected: {
    backgroundColor: '#0745E8',
    color: '#FFFFFF',
  },
  name: {
    fontSize: 13,
    fontWeight: '600',
    color: '#334155',
    flex: 1,
  },
  nameSelected: {
    color: '#0745E8',
    fontWeight: '800',
  },
});
