import React from 'react';
import { View, StyleSheet } from 'react-native';
import { EventCategory } from '../types/calendar.types';

interface EventDotProps {
  category: EventCategory;
  size?: number;
}

export const getCategoryColor = (category: EventCategory): string => {
  switch (category) {
    case 'Exams':
      return '#EF4444'; // Red
    case 'Internals':
      return '#D97706'; // Amber
    case 'Lab Exams':
      return '#9333EA'; // Purple
    case 'Holidays':
      return '#059669'; // Emerald
    case 'Results':
      return '#0284C7'; // Cyan
    case 'Semester Dates':
      return '#0745E8'; // Indigo
    default:
      return '#64748B'; // Slate
  }
};

export const EventDot: React.FC<EventDotProps> = ({ category, size = 6 }) => {
  const color = getCategoryColor(category);

  return (
    <View
      style={[
        styles.dot,
        {
          backgroundColor: color,
          width: size,
          height: size,
          borderRadius: size / 2,
        },
      ]}
    />
  );
};

const styles = StyleSheet.create({
  dot: {
    marginHorizontal: 1,
  },
});
