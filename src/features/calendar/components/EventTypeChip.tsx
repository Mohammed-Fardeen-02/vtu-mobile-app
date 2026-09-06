import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { EventCategory } from '../types/calendar.types';
import { getCategoryColor } from './EventDot';

interface EventTypeChipProps {
  category: EventCategory | 'All';
  selected?: boolean;
  onPress?: () => void;
  count?: number;
}

export const EventTypeChip: React.FC<EventTypeChipProps> = ({
  category,
  selected = false,
  onPress,
  count,
}) => {
  const isAll = category === 'All';
  const color = isAll ? '#0745E8' : getCategoryColor(category as EventCategory);

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      disabled={!onPress}
      style={[
        styles.chip,
        selected && { backgroundColor: color, borderColor: color },
      ]}
      onPress={onPress}
    >
      <View
        style={[
          styles.dotCircle,
          { backgroundColor: selected ? '#FFFFFF' : color },
        ]}
      />
      <Text style={[styles.chipText, selected && styles.chipTextSelected]}>
        {category} {count !== undefined ? `(${count})` : ''}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  dotCircle: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  chipText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#475569',
  },
  chipTextSelected: {
    color: '#FFFFFF',
  },
});
