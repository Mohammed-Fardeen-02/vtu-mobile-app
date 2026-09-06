import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { VTUNotification } from '../types/notifications.types';
import { NotificationIcon } from './NotificationIcon';
import { NotificationPriorityBadge } from './NotificationPriorityBadge';
import { DeepLinkButton } from './DeepLinkButton';

interface NotificationDetailsCardProps {
  notification: VTUNotification;
}

export const NotificationDetailsCard: React.FC<NotificationDetailsCardProps> = ({
  notification,
}) => {
  return (
    <View style={styles.card}>
      {/* Category Header Row */}
      <View style={styles.headerRow}>
        <View style={styles.iconTitleRow}>
          <NotificationIcon category={notification.category} size={44} />
          <View>
            <Text style={styles.categoryText}>{notification.category}</Text>
            <Text style={styles.timestampText}>
              {notification.date} • {notification.timestamp}
            </Text>
          </View>
        </View>

        <NotificationPriorityBadge priority={notification.priority} />
      </View>

      {/* Title */}
      <Text style={styles.title}>{notification.title}</Text>

      {/* Message Body */}
      <Text style={styles.fullMessage}>{notification.fullMessage}</Text>

      {/* Related Academic Context */}
      {notification.relatedContext && (
        <View style={styles.contextBox}>
          <Text style={styles.contextHeader}>ACADEMIC METADATA</Text>
          {notification.relatedContext.subjectCode && (
            <Text style={styles.contextItem}>
              <Feather name="book" size={12} color="#0745E8" /> Subject Code: {notification.relatedContext.subjectCode}
            </Text>
          )}
          {notification.relatedContext.semester && (
            <Text style={styles.contextItem}>
              <Feather name="layers" size={12} color="#0745E8" /> Semester: {notification.relatedContext.semester}th Sem
            </Text>
          )}
          {notification.relatedContext.circularRef && (
            <Text style={styles.contextItem}>
              <Feather name="file-text" size={12} color="#0745E8" /> VTU Circular Ref: {notification.relatedContext.circularRef}
            </Text>
          )}
        </View>
      )}

      {/* Deep-Link Button */}
      {notification.targetRoute && notification.targetLabel && (
        <DeepLinkButton
          label={notification.targetLabel}
          targetRoute={notification.targetRoute}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 20,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    marginBottom: 20,
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 3,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  iconTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  categoryText: {
    fontSize: 12,
    fontWeight: '800',
    color: '#0745E8',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  timestampText: {
    fontSize: 11,
    color: '#64748B',
    marginTop: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: '900',
    color: '#0F172A',
    lineHeight: 26,
    marginBottom: 12,
  },
  fullMessage: {
    fontSize: 14,
    color: '#334155',
    lineHeight: 22,
    marginBottom: 16,
  },
  contextBox: {
    backgroundColor: '#F8FAFC',
    borderRadius: 16,
    padding: 14,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    gap: 8,
    marginBottom: 16,
  },
  contextHeader: {
    fontSize: 10,
    fontWeight: '800',
    color: '#64748B',
    letterSpacing: 0.5,
    marginBottom: 2,
  },
  contextItem: {
    fontSize: 12,
    fontWeight: '700',
    color: '#0F172A',
  },
});
