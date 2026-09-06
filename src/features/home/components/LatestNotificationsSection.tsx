import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { NotificationItem } from '../types/home.types';

interface LatestNotificationsSectionProps {
  notifications: NotificationItem[];
}

export const LatestNotificationsSection: React.FC<LatestNotificationsSectionProps> = ({
  notifications,
}) => {
  const router = useRouter();

  if (notifications.length === 0) return null;

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <Text style={styles.sectionTitle}>Latest Notifications</Text>
        <TouchableOpacity onPress={() => router.push('/notifications' as any)}>
          <Text style={styles.viewAllText}>View All</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.notificationsList}>
        {notifications.map((item) => (
          <TouchableOpacity
            key={item.id}
            activeOpacity={0.8}
            style={[styles.notificationCard, !item.isRead && styles.unreadCard]}
            onPress={() => item.targetRoute && router.push(item.targetRoute as any)}
          >
            <View style={styles.iconBox}>
              <Feather name="bell" size={18} color="#0745E8" />
            </View>

            <View style={styles.infoWrapper}>
              <View style={styles.categoryRow}>
                <Text style={styles.categoryText}>{item.category}</Text>
                <Text style={styles.timestampText}>{item.timestamp}</Text>
              </View>
              <Text style={styles.titleText}>{item.title}</Text>
              <Text style={styles.descriptionText} numberOfLines={2}>
                {item.description}
              </Text>
            </View>

            {!item.isRead && <View style={styles.unreadDot} />}
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    marginBottom: 24,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: '800',
    color: '#0F172A',
  },
  viewAllText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#0745E8',
  },
  notificationsList: {
    gap: 10,
  },
  notificationCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 14,
    borderColor: '#E2E8F0',
    borderWidth: 1,
  },
  unreadCard: {
    backgroundColor: '#F8FAFC',
    borderColor: '#CBD5E1',
  },
  iconBox: {
    width: 38,
    height: 38,
    borderRadius: 12,
    backgroundColor: '#EEF2FF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
    marginTop: 2,
  },
  infoWrapper: {
    flex: 1,
  },
  categoryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 2,
  },
  categoryText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#0745E8',
  },
  timestampText: {
    fontSize: 11,
    color: '#94A3B8',
  },
  titleText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#0F172A',
    marginBottom: 2,
  },
  descriptionText: {
    fontSize: 12,
    color: '#64748B',
    lineHeight: 16,
  },
  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#0745E8',
    marginLeft: 8,
    marginTop: 4,
  },
});
