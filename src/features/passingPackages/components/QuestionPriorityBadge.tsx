import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { QuestionPriority } from '../types/passingPackages.types';

interface QuestionPriorityBadgeProps {
  priority: QuestionPriority;
  size?: 'small' | 'medium';
}

export const QuestionPriorityBadge: React.FC<QuestionPriorityBadgeProps> = ({
  priority,
  size = 'medium',
}) => {
  let bgColor = '#EEF2FF';
  let textColor = '#0745E8';
  let dotColor = '#0745E8';

  switch (priority) {
    case 'Very High Priority':
      bgColor = '#FEF2F2';
      textColor = '#DC2626';
      dotColor = '#EF4444';
      break;
    case 'High Priority':
      bgColor = '#FFF7ED';
      textColor = '#C2410C';
      dotColor = '#F97316';
      break;
    case 'Medium Priority':
      bgColor = '#FEFCE8';
      textColor = '#A16207';
      dotColor = '#EAB308';
      break;
    case 'Suggested Focus':
      bgColor = '#F0FDF4';
      textColor = '#15803D';
      dotColor = '#22C55E';
      break;
  }

  const isSmall = size === 'small';

  return (
    <View style={[styles.badge, { backgroundColor: bgColor }, isSmall && styles.badgeSmall]}>
      <View style={[styles.dot, { backgroundColor: dotColor }, isSmall && styles.dotSmall]} />
      <Text style={[styles.text, { color: textColor }, isSmall && styles.textSmall]}>
        {priority}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
    gap: 6,
    alignSelf: 'flex-start',
  },
  badgeSmall: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    gap: 4,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  dotSmall: {
    width: 5,
    height: 5,
    borderRadius: 2.5,
  },
  text: {
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 0.1,
  },
  textSmall: {
    fontSize: 10,
  },
});
