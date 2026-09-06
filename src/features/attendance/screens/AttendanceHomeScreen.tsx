import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import { useAttendanceStore } from '../store/useAttendanceStore';
import { AttendanceHeroCard } from '../components/AttendanceHeroCard';
import { SubjectAttendanceCard } from '../components/SubjectAttendanceCard';
import { EmptyState } from '../components/EmptyState';
import { AddSubjectModal } from './AddSubjectModal';
import { SubjectAttendance } from '../types/attendance.types';

export const AttendanceHomeScreen: React.FC = () => {
  const router = useRouter();
  const { subjects, globalTarget, getOverallStats, setSelectedSubjectId } = useAttendanceStore();
  const [addModalVisible, setAddModalVisible] = useState(false);

  const stats = getOverallStats();

  const handleSubjectPress = (subject: SubjectAttendance) => {
    setSelectedSubjectId(subject.id);
    router.push({
      pathname: '/calculators/attendance/detail',
      params: { id: subject.id },
    } as any);
  };

  return (
    <View style={styles.root}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      {/* Header Bar */}
      <SafeAreaView edges={['top']} style={styles.headerSafeArea}>
        <View style={styles.headerRow}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
            <Feather name="arrow-left" size={20} color="#0F172A" />
          </TouchableOpacity>

          <View style={styles.headerTitleGroup}>
            <Text style={styles.headerTitle}>Attendance Calculator</Text>
            <Text style={styles.headerSub}>VTU Semester Attendance Tracker</Text>
          </View>

          <View style={styles.headerActions}>
            <TouchableOpacity
              onPress={() => router.push('/calculators/attendance/history' as any)}
              style={styles.actionIconBtn}
            >
              <Feather name="clock" size={18} color="#0F172A" />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => setAddModalVisible(true)}
              style={styles.addHeaderBtn}
            >
              <Feather name="plus" size={18} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Quick Shortcut Pills */}
        <View style={styles.shortcutsRow}>
          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.shortcutCard}
            onPress={() => router.push('/calculators/attendance/calculator' as any)}
          >
            <View style={[styles.shortcutIcon, { backgroundColor: '#EEF2FF' }]}>
              <Feather name="cpu" size={18} color="#0745E8" />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.shortcutTitle}>Target Calculator</Text>
              <Text style={styles.shortcutSub}>Calculate classes to attend/miss</Text>
            </View>
            <Feather name="chevron-right" size={16} color="#94A3B8" />
          </TouchableOpacity>
        </View>

        {/* Hero Card */}
        {subjects.length > 0 && (
          <AttendanceHeroCard
            overallPercentage={stats.overallPercentage}
            totalAttended={stats.totalAttended}
            totalConducted={stats.totalConducted}
            targetAttendance={globalTarget}
            status={stats.overallStatus}
            onAddPress={() => setAddModalVisible(true)}
          />
        )}

        {/* Subject-Wise List Section Header */}
        <View style={styles.sectionHeaderRow}>
          <Text style={styles.sectionTitle}>Enrolled Subjects ({subjects.length})</Text>
          {subjects.length > 0 && (
            <TouchableOpacity onPress={() => setAddModalVisible(true)}>
              <Text style={styles.addTextLink}>+ Add Subject</Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Subjects List or Empty State */}
        {subjects.length === 0 ? (
          <EmptyState onAddPress={() => setAddModalVisible(true)} />
        ) : (
          subjects.map((sub) => (
            <SubjectAttendanceCard
              key={sub.id}
              subject={sub}
              onPress={handleSubjectPress}
            />
          ))
        )}
      </ScrollView>

      {/* Add Subject Modal */}
      <AddSubjectModal
        visible={addModalVisible}
        onClose={() => setAddModalVisible(false)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
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
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  actionIconBtn: {
    width: 36,
    height: 36,
    borderRadius: 12,
    backgroundColor: '#F8FAFC',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  addHeaderBtn: {
    width: 36,
    height: 36,
    borderRadius: 12,
    backgroundColor: '#0745E8',
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 40,
  },
  shortcutsRow: {
    marginBottom: 16,
  },
  shortcutCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    borderRadius: 16,
    padding: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    gap: 12,
  },
  shortcutIcon: {
    width: 38,
    height: 38,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  shortcutTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#0F172A',
  },
  shortcutSub: {
    fontSize: 11,
    color: '#64748B',
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
    marginTop: 4,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: '#0F172A',
  },
  addTextLink: {
    fontSize: 13,
    fontWeight: '700',
    color: '#0745E8',
  },
});
