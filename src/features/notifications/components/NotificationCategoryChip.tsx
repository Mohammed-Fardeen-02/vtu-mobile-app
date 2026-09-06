import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { NotificationCategory } from '../types/notifications.types';

interface NotificationCategoryChipProps {
  category: NotificationCategory | 'All';
  selected?: boolean;
  onPress?: () => void;
  count?: number;
}

export const NotificationCategoryChip: React.FC<NotificationCategoryChipProps> = ({
  category,
  selected = false,
  onPress,
  count,
}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      disabled={!onPress}
      style={[styles.chip, selected && styles.chipSelected]}
      onPress={onPress}
    >
      <Text style={[styles.chipText, selected && styles.chipTextSelected]}>
        {category} {count !== undefined ? `(${count})` : ''}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  chip: {
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: 20,
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  chipSelected: {
    backgroundColor: '#0745E8',
    borderColor: '#0745E8',
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
