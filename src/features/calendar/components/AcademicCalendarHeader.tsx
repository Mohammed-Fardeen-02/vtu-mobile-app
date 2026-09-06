import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import { useAuthStore } from '@/store';

interface AcademicCalendarHeaderProps {
  title?: string;
  showBack?: boolean;
  onFilterPress?: () => void;
}

export const AcademicCalendarHeader: React.FC<AcademicCalendarHeaderProps> = ({
  title = 'Academic Calendar',
  showBack = true,
  onFilterPress,
}) => {
  const router = useRouter();
  const user = useAuthStore((state) => state.user);

  const semText = `Sem ${user?.semester || 5} • ${user?.branch || 'CSE'} • ${user?.scheme || '2022'}`;

  return (
    <SafeAreaView edges={['top']} style={styles.headerSafeArea}>
      <View style={styles.headerRow}>
        {showBack && (
          <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
            <Feather name="arrow-left" size={20} color="#0F172A" />
          </TouchableOpacity>
        )}

        <View style={styles.headerTitleGroup}>
          <Text style={styles.headerTitle}>{title}</Text>
          <Text style={styles.headerSub}>{semText}</Text>
        </View>

        {onFilterPress && (
          <TouchableOpacity onPress={onFilterPress} style={styles.filterBtn}>
            <Feather name="sliders" size={18} color="#0745E8" />
          </TouchableOpacity>
        )}
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
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 12,
  },
  backBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#F8FAFC',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  headerTitleGroup: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#0F172A',
  },
  headerSub: {
    fontSize: 12,
    color: '#64748B',
    marginTop: 1,
  },
  filterBtn: {
    width: 36,
    height: 36,
    borderRadius: 12,
    backgroundColor: '#EEF2FF',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
