import { create } from 'zustand';
import {
  VTUNotification,
  NotificationCategory,
  NotificationPreferencesState,
} from '../types/notifications.types';
import { MOCK_NOTIFICATIONS } from '../api/mockNotifications';

interface NotificationsStoreState {
  notifications: VTUNotification[];
  activeCategory: NotificationCategory | 'All';
  permissionGranted: boolean;
  activeInAppBanner: VTUNotification | null;
  preferences: NotificationPreferencesState;

  // Actions
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  setActiveCategory: (cat: NotificationCategory | 'All') => void;
  togglePreference: (key: keyof NotificationPreferencesState) => void;
  setPermissionGranted: (granted: boolean) => void;
  showInAppBanner: (notification: VTUNotification) => void;
  dismissInAppBanner: () => void;
  getUnreadCount: () => number;
  getFilteredNotifications: () => VTUNotification[];
}

export const useNotificationsStore = create<NotificationsStoreState>((set, get) => ({
  notifications: MOCK_NOTIFICATIONS,
  activeCategory: 'All',
  permissionGranted: false,
  activeInAppBanner: null,
  preferences: {
    examReminders: true,
    academicUpdates: true,
    resultUpdates: true,
    calendarUpdates: true,
    newNotes: true,
    newQuestionPapers: true,
    appUpdates: true,
    importantAnnouncements: true,
  },

  markAsRead: (id) =>
    set((state) => ({
      notifications: state.notifications.map((n) =>
        n.id === id ? { ...n, isRead: true } : n
      ),
    })),

  markAllAsRead: () =>
    set((state) => ({
      notifications: state.notifications.map((n) => ({ ...n, isRead: true })),
    })),

  setActiveCategory: (cat) => set({ activeCategory: cat }),

  togglePreference: (key) =>
    set((state) => ({
      preferences: {
        ...state.preferences,
        [key]: !state.preferences[key],
      },
    })),

  setPermissionGranted: (granted) => set({ permissionGranted: granted }),

  showInAppBanner: (notif) => set({ activeInAppBanner: notif }),

  dismissInAppBanner: () => set({ activeInAppBanner: null }),

  getUnreadCount: () => {
    return get().notifications.filter((n) => !n.isRead).length;
  },

  getFilteredNotifications: () => {
    const { notifications, activeCategory } = get();
    if (activeCategory === 'All') return notifications;
    return notifications.filter((n) => n.category === activeCategory);
  },
}));
