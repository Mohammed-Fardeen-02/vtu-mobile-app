import React from 'react';
import { ScrollView, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { ResourceType } from '../types/community.types';

interface CommunityFilterChipsProps {
  selectedResourceType: ResourceType | 'All';
  onSelectType: (type: ResourceType | 'All') => void;
}

export const CommunityFilterChips: React.FC<CommunityFilterChipsProps> = ({
  selectedResourceType,
  onSelectType,
}) => {
  const types: (ResourceType | 'All')[] = [
    'All',
    'Handwritten Notes',
    'Formula Sheet',
    'Solved Question Bank',
    'Typed PDF',
    'Lab Record',
    'Revision Mindmap',
  ];

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.container}
    >
      {types.map((type) => {
        const isSelected = selectedResourceType === type;
        return (
          <TouchableOpacity
            key={type}
            activeOpacity={0.8}
            style={[styles.chip, isSelected && styles.chipSelected]}
            onPress={() => onSelectType(type)}
          >
            <Text style={[styles.text, isSelected && styles.textSelected]}>
              {type}
            </Text>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    gap: 8,
    paddingBottom: 10,
  },
  chip: {
    backgroundColor: '#FFFFFF',
    borderColor: '#E2E8F0',
    borderWidth: 1,
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: 20,
  },
  chipSelected: {
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
