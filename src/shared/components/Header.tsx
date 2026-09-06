import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Feather } from '@expo/vector-icons';

interface HeaderProps {
  title?: string;
  showBack?: boolean;
  onBackPress?: () => void;
  rightElement?: React.ReactNode;
  dark?: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  title,
  showBack = true,
  onBackPress,
  rightElement,
  dark = false,
}) => {
  const router = useRouter();

  const handleBack = () => {
    if (onBackPress) {
      onBackPress();
    } else if (router.canGoBack()) {
      router.back();
    } else {
      router.replace('/(tabs)/home');
    }
  };

  return (
    <SafeAreaView edges={['top']} style={[styles.headerSafeArea, dark && styles.darkHeaderSafeArea]}>
      <View style={[styles.headerContainer, dark && styles.darkHeaderContainer]}>
        <View style={styles.leftSlot}>
          {showBack && (
            <TouchableOpacity
              activeOpacity={0.7}
              style={[styles.backButton, dark && styles.darkBackButton]}
              onPress={handleBack}
            >
              <Feather name="chevron-left" size={22} color={dark ? '#FFFFFF' : '#0745E8'} />
            </TouchableOpacity>
          )}
        </View>

        {title && (
          <View style={styles.titleSlot}>
            <Text style={[styles.headerTitle, dark && styles.darkTitle]} numberOfLines={1}>
              {title}
            </Text>
          </View>
        )}

        <View style={styles.rightSlot}>{rightElement}</View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  headerSafeArea: {
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  darkHeaderSafeArea: {
    backgroundColor: '#0745E8',
    borderBottomWidth: 0,
  },
  headerContainer: {
    height: 52,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    backgroundColor: '#FFFFFF',
  },
  darkHeaderContainer: {
    backgroundColor: '#0745E8',
  },
  leftSlot: {
    width: 44,
    alignItems: 'flex-start',
  },
  backButton: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#EEF2FF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  darkBackButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  titleSlot: {
    flex: 1,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#0F172A',
  },
  darkTitle: {
    color: '#FFFFFF',
  },
  rightSlot: {
    width: 44,
    alignItems: 'flex-end',
  },
});
