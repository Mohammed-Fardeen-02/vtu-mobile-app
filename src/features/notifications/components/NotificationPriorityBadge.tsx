import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { NotificationPriority } from '../types/notifications.types';

interface NotificationPriorityBadgeProps {
  priority: NotificationPriority;
}

export const NotificationPriorityBadge: React.FC<NotificationPriorityBadgeProps> = ({
  priority,
}) => {
  if (priority !== 'High') return null;

  return (
    <View style={styles.badge}>
      <Feather name="alert-circle" size={10} color="#DC2626" />
      <Text style={styles.badgeText}>HIGH PRIORITY</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    backgroundColor: '#FEE2E2',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
  },
  badgeText: {
    fontSize: 9,
    fontWeight: '800',
    color: '#DC2626',
    letterSpacing: 0.5,
  },
});
