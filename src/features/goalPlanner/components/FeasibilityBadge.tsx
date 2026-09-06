import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { FeasibilityStatus } from '../types/goalPlanner.types';

interface FeasibilityBadgeProps {
  status: FeasibilityStatus;
  size?: 'small' | 'medium' | 'large';
}

export const FeasibilityBadge: React.FC<FeasibilityBadgeProps> = ({
  status,
  size = 'medium',
}) => {
  const getConfig = () => {
    switch (status) {
      case 'Achievable':
        return { bg: '#D1FAE5', text: '#059669', icon: 'check-circle' as const, label: 'Achievable Target' };
      case 'Challenging':
        return { bg: '#FEF3C7', text: '#D97706', icon: 'alert-circle' as const, label: 'Challenging Target' };
      case 'Unrealistic':
        return { bg: '#FEF2F2', text: '#EF4444', icon: 'alert-triangle' as const, label: 'Unrealistic Goal' };
      case 'Already Achieved':
        return { bg: '#EEF2FF', text: '#0745E8', icon: 'award' as const, label: 'Already Achieved!' };
      default:
        return { bg: '#F1F5F9', text: '#64748B', icon: 'info' as const, label: 'Status' };
    }
  };

  const config = getConfig();
  const isSmall = size === 'small';
  const isLarge = size === 'large';

  return (
    <View
      style={[
        styles.badge,
        { backgroundColor: config.bg },
        isSmall && styles.badgeSmall,
        isLarge && styles.badgeLarge,
      ]}
    >
      <Feather
        name={config.icon}
        size={isSmall ? 10 : isLarge ? 14 : 12}
        color={config.text}
      />
      <Text
        style={[
          styles.badgeText,
          { color: config.text },
          isSmall && styles.badgeTextSmall,
          isLarge && styles.badgeTextLarge,
        ]}
      >
        {config.label}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
  },
  badgeSmall: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
  },
  badgeLarge: {
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 10,
  },
  badgeText: {
    fontSize: 11,
    fontWeight: '800',
  },
  badgeTextSmall: {
    fontSize: 9,
  },
  badgeTextLarge: {
    fontSize: 13,
  },
});
