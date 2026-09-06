import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { ResourceType } from '../types/community.types';
import { ResourceTypeBadge } from './ResourceTypeBadge';

interface ResourceTypeSelectorProps {
  selectedType: ResourceType;
  onSelectType: (type: ResourceType) => void;
}

export const ResourceTypeSelector: React.FC<ResourceTypeSelectorProps> = ({
  selectedType,
  onSelectType,
}) => {
  const types: ResourceType[] = [
    'Handwritten Notes',
    'Formula Sheet',
    'Solved Question Bank',
    'Typed PDF',
    'Lab Record',
    'Revision Mindmap',
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Select Resource Category</Text>
      <View style={styles.grid}>
        {types.map((t) => {
          const isSelected = selectedType === t;
          return (
            <TouchableOpacity
              key={t}
              activeOpacity={0.8}
              style={[styles.tile, isSelected && styles.tileSelected]}
              onPress={() => onSelectType(t)}
            >
              <ResourceTypeBadge type={t} size="small" />
              <Text style={[styles.text, isSelected && styles.textSelected]}>{t}</Text>
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
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  tile: {
    width: '48%',
    backgroundColor: '#FFFFFF',
    borderColor: '#E2E8F0',
    borderWidth: 1,
    padding: 10,
    borderRadius: 14,
    gap: 6,
  },
  tileSelected: {
    backgroundColor: '#EEF2FF',
    borderColor: '#0745E8',
  },
  text: {
    fontSize: 12,
    fontWeight: '700',
    color: '#334155',
  },
  textSelected: {
    color: '#0745E8',
    fontWeight: '800',
  },
});
