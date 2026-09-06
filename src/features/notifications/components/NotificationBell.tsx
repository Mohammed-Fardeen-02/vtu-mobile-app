import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useNotificationsStore } from '../store/useNotificationsStore';

interface NotificationBellProps {
  color?: string;
  size?: number;
}

export const NotificationBell: React.FC<NotificationBellProps> = ({
  color = '#0F172A',
  size = 22,
}) => {
  const router = useRouter();
  const getUnreadCount = useNotificationsStore((state) => state.getUnreadCount);
  const unreadCount = getUnreadCount();

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={styles.bellBtn}
      onPress={() => router.push('/notifications' as any)}
    >
      <Feather name="bell" size={size} color={color} />
      {unreadCount > 0 && <View style={styles.unreadDot} />}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  bellBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#F8FAFC',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#0745E8',
    position: 'absolute',
    top: 6,
    right: 6,
  },
});
