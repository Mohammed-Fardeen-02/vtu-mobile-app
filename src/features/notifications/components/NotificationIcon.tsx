import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { NotificationCategory } from '../types/notifications.types';

interface NotificationIconProps {
  category: NotificationCategory;
  size?: number;
}

export const getCategoryIconStyle = (category: NotificationCategory) => {
  switch (category) {
    case 'Exams':
      return { iconName: 'clock' as const, bg: '#FEF3C7', color: '#D97706' };
    case 'Results':
      return { iconName: 'award' as const, bg: '#D1FAE5', color: '#059669' };
    case 'Study':
      return { iconName: 'book-open' as const, bg: '#F3E8FF', color: '#9333EA' };
    case 'Academic':
      return { iconName: 'calendar' as const, bg: '#EFF6FF', color: '#2563EB' };
    case 'App':
    default:
      return { iconName: 'bell' as const, bg: '#EEF2FF', color: '#0745E8' };
  }
};

export const NotificationIcon: React.FC<NotificationIconProps> = ({
  category,
  size = 38,
}) => {
  const { iconName, bg, color } = getCategoryIconStyle(category);

  return (
    <View style={[styles.box, { width: size, height: size, backgroundColor: bg }]}>
      <Feather name={iconName} size={size * 0.48} color={color} />
    </View>
  );
};

const styles = StyleSheet.create({
  box: {
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
