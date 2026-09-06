import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { QuestionFrequency } from '../types/passingPackages.types';

interface QuestionFrequencyBadgeProps {
  frequency?: QuestionFrequency | string;
  size?: 'small' | 'medium';
}

export const QuestionFrequencyBadge: React.FC<QuestionFrequencyBadgeProps> = ({
  frequency,
  size = 'medium',
}) => {
  if (!frequency) return null;

  const isSmall = size === 'small';

  return (
    <View style={[styles.badge, isSmall && styles.badgeSmall]}>
      <Feather name="repeat" size={isSmall ? 10 : 12} color="#7C3AED" />
      <Text style={[styles.text, isSmall && styles.textSmall]}>{frequency}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3E8FF',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
    gap: 5,
    alignSelf: 'flex-start',
  },
  badgeSmall: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    gap: 4,
  },
  text: {
    color: '#6D28D9',
    fontSize: 12,
    fontWeight: '700',
  },
  textSmall: {
    fontSize: 10,
  },
});
