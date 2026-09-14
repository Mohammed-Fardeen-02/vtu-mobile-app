import React, { createContext, useContext, useState, useCallback, useRef } from 'react';
import { View, Text, StyleSheet, Animated, Platform, StatusBar } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Feather } from '@expo/vector-icons';

export type ToastType = 'success' | 'error' | 'info';

interface ToastContextType {
  showToast: (message: string, type?: ToastType, duration?: number) => void;
  hideToast: () => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const insets = useSafeAreaInsets();
  const topInset = Math.max(
    insets.top + 8,
    Platform.OS === 'android' ? (StatusBar.currentHeight || 24) + 8 : 44
  );

  const [toast, setToast] = useState<{ message: string; type: ToastType; visible: boolean }>({
    message: '',
    type: 'success',
    visible: false,
  });

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(-50)).current;
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const hideToast = useCallback(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(translateY, {
        toValue: -50,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start(() => {
      setToast((prev) => ({ ...prev, visible: false }));
    });
  }, [fadeAnim, translateY]);

  const showToast = useCallback(
    (message: string, type: ToastType = 'success', duration: number = 3000) => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }

      setToast({ message, type, visible: true });

      fadeAnim.setValue(0);
      translateY.setValue(-50);

      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 250,
          useNativeDriver: true,
        }),
        Animated.spring(translateY, {
          toValue: 0,
          friction: 8,
          tension: 60,
          useNativeDriver: true,
        }),
      ]).start();

      timerRef.current = setTimeout(() => {
        hideToast();
      }, duration);
    },
    [fadeAnim, translateY, hideToast]
  );

  const getIconAndColors = () => {
    switch (toast.type) {
      case 'error':
        return {
          icon: 'alert-circle',
          iconColor: '#EF4444',
          iconBg: '#FEE2E2',
          borderColor: '#FCA5A5',
        };
      case 'info':
        return {
          icon: 'info',
          iconColor: '#0745E8',
          iconBg: '#EEF2FF',
          borderColor: '#93C5FD',
        };
      case 'success':
      default:
        return {
          icon: 'check',
          iconColor: '#10B981',
          iconBg: '#D1FAE5',
          borderColor: '#6EE7B7',
        };
    }
  };

  const { icon, iconColor, iconBg } = getIconAndColors();

  return (
    <ToastContext.Provider value={{ showToast, hideToast }}>
      {children}
      {toast.visible && (
        <View style={[styles.toastFixedWrapper, { top: topInset }]} pointerEvents="box-none">
          <Animated.View
            style={[
              styles.toastContainer,
              { opacity: fadeAnim, transform: [{ translateY }] },
            ]}
          >
            <View style={styles.toastCard}>
              <View style={[styles.iconCircle, { backgroundColor: iconBg }]}>
                <Feather name={icon as any} size={16} color={iconColor} />
              </View>
              <Text style={styles.toastText} numberOfLines={2}>
                {toast.message}
              </Text>
            </View>
          </Animated.View>
        </View>
      )}
    </ToastContext.Provider>
  );
};

export const useToast = (): ToastContextType => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};
export { ToastContext };

const styles = StyleSheet.create({
  toastFixedWrapper: {
    position: 'absolute',
    left: 0,
    right: 0,
    zIndex: 99999,
    alignItems: 'center',
  },
  toastContainer: {
    paddingHorizontal: 20,
    width: '100%',
    maxWidth: 420,
    alignItems: 'center',
  },
  toastCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#0F172A',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.25,
    shadowRadius: 12,
    elevation: 8,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  iconCircle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  toastText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '700',
    flex: 1,
  },
});

