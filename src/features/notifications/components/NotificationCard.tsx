import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { VTUNotification } from '../types/notifications.types';
import { NotificationIcon } from './NotificationIcon';
import { NotificationPriorityBadge } from './NotificationPriorityBadge';

interface NotificationCardProps {
  notification: VTUNotification;
  onPress: (notification: VTUNotification) => void;
}

export const NotificationCard: React.FC<NotificationCardProps> = ({
  notification,
  onPress,
}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.85}
      style={[styles.card, !notification.isRead && styles.unreadCard]}
      onPress={() => onPress(notification)}
    >
      <NotificationIcon category={notification.category} size={40} />

      <View style={styles.contentCol}>
        <View style={styles.topRow}>
          <View style={styles.categoryBadgeGroup}>
            <Text style={styles.categoryText}>{notification.category}</Text>
            <NotificationPriorityBadge priority={notification.priority} />
          </View>
          <Text style={styles.timestampText}>{notification.timestamp}</Text>
        </View>

        <Text style={styles.titleText} numberOfLines={1}>
          {notification.title}
        </Text>

        <Text style={styles.messageText} numberOfLines={2}>
          {notification.shortMessage}
        </Text>

        {notification.targetLabel && (
          <View style={styles.ctaRow}>
            <Text style={styles.ctaText}>{notification.targetLabel}</Text>
            <Feather name="arrow-right" size={12} color="#0745E8" />
          </View>
        )}
      </View>

      {!notification.isRead && <View style={styles.unreadDot} />}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 14,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    marginBottom: 10,
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 6,
    elevation: 2,
    position: 'relative',
  },
  unreadCard: {
    backgroundColor: '#F8FAFC',
    borderColor: '#C7D2FE',
  },
  contentCol: {
    flex: 1,
    marginLeft: 12,
    marginRight: 8,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 3,
  },
  categoryBadgeGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  categoryText: {
    fontSize: 11,
    fontWeight: '800',
    color: '#0745E8',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  timestampText: {
    fontSize: 11,
    color: '#94A3B8',
  },
  titleText: {
    fontSize: 14,
    fontWeight: '800',
    color: '#0F172A',
    marginBottom: 3,
  },
  messageText: {
    fontSize: 12,
    color: '#64748B',
    lineHeight: 17,
  },
  ctaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 6,
  },
  ctaText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#0745E8',
  },
  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#0745E8',
    position: 'absolute',
    top: 14,
    right: 14,
  },
});
