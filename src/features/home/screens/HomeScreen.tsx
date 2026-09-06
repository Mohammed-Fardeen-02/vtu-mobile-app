import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
  StatusBar,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import { useAuthStore } from '@/store';
import { AcademicOverviewCard } from '../components/AcademicOverviewCard';
import { ContinueStudyingCard } from '../components/ContinueStudyingCard';
import { QuickAccessGrid } from '../components/QuickAccessGrid';
import { UpcomingEventsSection } from '../components/UpcomingEventsSection';
import { LatestNotificationsSection } from '../components/LatestNotificationsSection';
import { RecentlyAddedSection } from '../components/RecentlyAddedSection';
import {
  AcademicSummary,
  StudyHistory,
  AcademicEvent,
  NotificationItem,
  ResourceItem,
} from '../types/home.types';

export const HomeScreen: React.FC = () => {
  const router = useRouter();
  const user = useAuthStore((state) => state.user);

  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isOffline, setIsOffline] = useState(false);

  // Time-aware greeting
  const getTimeAwareGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning 👋';
    if (hour < 17) return 'Good Afternoon ☀️';
    return 'Good Evening 🌙';
  };

  // Mock State Data
  const [academicSummary] = useState<AcademicSummary>({
    cgpa: 8.74,
    cgpaTrend: '+0.25',
    attendancePercentage: 88,
    attendanceStatus: 'Eligible',
    currentSemester: user?.semester || 5,
    totalCreditsEarned: 112,
  });

  const [studyHistory] = useState<StudyHistory | null>({
    id: '1',
    subject: 'Data Structures & Algorithms',
    unit: 'Unit 3',
    resourceTitle: 'Stacks & Queues Notes',
    progress: 68,
    lastOpenedTime: '2 hours ago',
    resourceId: '1',
  });

  const [events] = useState<AcademicEvent[]>([
    {
      id: 'e1',
      type: 'Internal Test',
      subject: 'Computer Networks (21CS52)',
      date: '15th Oct 2026',
      time: '10:30 AM',
      venue: 'LH-302',
      targetRoute: '/calculators/calendar',
    },
    {
      id: 'e2',
      type: 'Lab Exam',
      subject: 'DBMS Laboratory (21CSL54)',
      date: '18th Oct 2026',
      time: '02:00 PM',
      venue: 'Lab-4',
      targetRoute: '/calculators/calendar',
    },
  ]);

  const [notifications] = useState<NotificationItem[]>([
    {
      id: 'n1',
      category: 'VTU Circular',
      title: 'Revised 5th Sem Exam Timetable',
      description: 'VTU has released the final timetable for 2021 & 2022 Scheme B.E exams.',
      timestamp: '10m ago',
      isRead: false,
      targetRoute: '/(tabs)/community',
    },
    {
      id: 'n2',
      category: 'Assignment',
      title: 'Automata Theory Assignment 2',
      description: 'Submission deadline extended to Friday 5:00 PM.',
      timestamp: '2h ago',
      isRead: true,
      targetRoute: '/(tabs)/library',
    },
  ]);

  const [recentResources] = useState<ResourceItem[]>([
    {
      id: 'r1',
      title: 'Module 3: Paging & Memory Management',
      subject: 'Operating Systems',
      type: 'PDF Notes',
      fileSize: '2.4 MB',
      uploadDate: 'Yesterday',
      downloadsCount: 142,
      branch: 'CSE',
      semester: 5,
      scheme: '2022',
    },
    {
      id: 'r2',
      title: 'Dec 2024 VTU Question Paper + Solutions',
      subject: 'Database Management Systems',
      type: 'Question Paper',
      fileSize: '4.1 MB',
      uploadDate: '3 days ago',
      downloadsCount: 389,
      branch: 'CSE',
      semester: 5,
      scheme: '2022',
    },
  ]);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 1200);
  }, []);

  return (
    <View style={styles.rootContainer}>
      <StatusBar barStyle="light-content" backgroundColor="#0745E8" translucent />

      {/* Offline Banner */}
      {isOffline && (
        <View style={styles.offlineBanner}>
          <Feather name="wifi-off" size={14} color="#FFFFFF" />
          <Text style={styles.offlineText}>You are currently offline. Showing cached dashboard data.</Text>
        </View>
      )}

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={['#0745E8']} />
        }
      >
        {/* 1. Header Section */}
        <View style={styles.headerBackground}>
          <SafeAreaView edges={['top']}>
            <View style={styles.headerTopRow}>
              {/* Left Aligned Greeting & Academic Details Pill */}
              <View style={styles.greetingWrapper}>
                <Text style={styles.greetingSub}>{getTimeAwareGreeting()}</Text>
                <Text style={styles.userName}>{user?.name || 'Fardeen'}</Text>
                <View style={styles.branchPill}>
                  <Text style={styles.branchPillText}>
                    {user?.branch || 'CSE'} • Sem {user?.semester || 5} • {user?.scheme || '2022'} Scheme
                  </Text>
                </View>
              </View>

              {/* Right Aligned Bell & Avatar */}
              <View style={styles.rightIcons}>
                <TouchableOpacity
                  activeOpacity={0.8}
                  style={styles.iconCircle}
                  onPress={() => router.push('/(tabs)/community')}
                >
                  <Feather name="bell" size={18} color="#FFFFFF" />
                  <View style={styles.unreadBadge} />
                </TouchableOpacity>

                <TouchableOpacity
                  activeOpacity={0.85}
                  style={styles.avatarCircle}
                  onPress={() => router.push('/(tabs)/profile')}
                >
                  <Text style={styles.avatarText}>{user?.name?.charAt(0) || 'F'}</Text>
                </TouchableOpacity>
              </View>
            </View>
          </SafeAreaView>
        </View>

        {/* Error State Banner */}
        {error && (
          <View style={styles.errorCard}>
            <Feather name="alert-triangle" size={18} color="#EF4444" />
            <Text style={styles.errorText}>{error}</Text>
            <TouchableOpacity onPress={() => setError(null)}>
              <Text style={styles.retryText}>Retry</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Loading State Spinner */}
        {loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#0745E8" />
            <Text style={styles.loadingText}>Updating Student Dashboard...</Text>
          </View>
        ) : (
          <View style={styles.bodyContent}>
            {/* 2. Academic Overview */}
            <AcademicOverviewCard summary={academicSummary} />

            {/* 3. Continue Studying */}
            <ContinueStudyingCard history={studyHistory} />

            {/* 4. Quick Access Grid */}
            <QuickAccessGrid />

            {/* 5. Upcoming Academic Events */}
            <UpcomingEventsSection events={events} />

            {/* 6. Latest Notifications */}
            <LatestNotificationsSection notifications={notifications} />

            {/* 7. Recently Added Resources */}
            <RecentlyAddedSection resources={recentResources} />
          </View>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  offlineBanner: {
    backgroundColor: '#EF4444',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 6,
    paddingHorizontal: 16,
    gap: 8,
  },
  offlineText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },
  scrollContent: {
    backgroundColor: '#FFFFFF',
  },
  headerBackground: {
    backgroundColor: '#0745E8',
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 24,
    borderBottomLeftRadius: 28,
    borderBottomRightRadius: 28,
  },
  headerTopRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginTop: 6,
  },
  greetingWrapper: {
    flex: 1,
  },
  greetingSub: {
    color: 'rgba(255, 255, 255, 0.85)',
    fontSize: 13,
  },
  userName: {
    color: '#FFFFFF',
    fontSize: 22,
    fontWeight: '800',
    marginTop: 2,
  },
  branchPill: {
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(255, 255, 255, 0.18)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    marginTop: 6,
  },
  branchPillText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 0.2,
  },
  rightIcons: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginTop: 4,
  },
  iconCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  unreadBadge: {
    position: 'absolute',
    top: 9,
    right: 9,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#EF4444',
    borderWidth: 1.5,
    borderColor: '#0745E8',
  },
  avatarCircle: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    color: '#0745E8',
    fontSize: 18,
    fontWeight: '800',
  },
  bodyContent: {
    paddingTop: 16,
  },
  loadingContainer: {
    paddingVertical: 60,
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 14,
    color: '#64748B',
    marginTop: 12,
  },
  errorCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FEE2E2',
    marginHorizontal: 20,
    marginTop: 16,
    padding: 14,
    borderRadius: 14,
    gap: 10,
  },
  errorText: {
    flex: 1,
    color: '#991B1B',
    fontSize: 13,
  },
  retryText: {
    color: '#0745E8',
    fontWeight: '700',
    fontSize: 13,
  },
});
