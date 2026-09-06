import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { VTUNotification } from '../types/notifications.types';
import { NotificationIcon } from './NotificationIcon';

interface InAppNotificationBannerProps {
  notification: VTUNotification | null;
  onDismiss: () => void;
}

export const InAppNotificationBanner: React.FC<InAppNotificationBannerProps> = ({
  notification,
  onDismiss,
}) => {
  const router = useRouter();

  if (!notification) return null;

  const handlePress = () => {
    onDismiss();
    if (notification.targetRoute) {
      router.push(notification.targetRoute as any);
    } else {
      router.push({
        pathname: '/notifications/detail',
        params: { id: notification.id },
      } as any);
    }
  };

  return (
    <View style={styles.bannerContainer}>
      <TouchableOpacity activeOpacity={0.9} style={styles.card} onPress={handlePress}>
        <NotificationIcon category={notification.category} size={36} />

        <View style={styles.textCol}>
          <Text style={styles.categoryText}>{notification.category} • Just Now</Text>
          <Text style={styles.titleText} numberOfLines={1}>
            {notification.title}
          </Text>
          <Text style={styles.messageText} numberOfLines={1}>
            {notification.shortMessage}
          </Text>
        </View>

        <TouchableOpacity style={styles.closeBtn} onPress={onDismiss}>
          <Feather name="x" size={16} color="#64748B" />
        </TouchableOpacity>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  bannerContainer: {
    position: 'absolute',
    top: 50,
    left: 16,
    right: 16,
    zIndex: 999,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 12,
    borderWidth: 1,
    borderColor: '#C7D2FE',
    shadowColor: '#0745E8',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 6,
  },
  textCol: {
    flex: 1,
    marginLeft: 10,
    marginRight: 8,
  },
  categoryText: {
    fontSize: 10,
    fontWeight: '800',
    color: '#0745E8',
    textTransform: 'uppercase',
  },
  titleText: {
    fontSize: 13,
    fontWeight: '800',
    color: '#0F172A',
  },
  messageText: {
    fontSize: 11,
    color: '#64748B',
  },
  closeBtn: {
    padding: 4,
  },
});
