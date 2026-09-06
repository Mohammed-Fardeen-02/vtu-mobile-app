import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import { useAttendanceStore } from '../store/useAttendanceStore';
import { SubjectSelector } from '../components/SubjectSelector';
import { TargetAttendanceSelector } from '../components/TargetAttendanceSelector';
import { AttendanceCalculatorCard } from '../components/AttendanceCalculatorCard';
import { RequiredClassesCard } from '../components/RequiredClassesCard';
import { MissableClassesCard } from '../components/MissableClassesCard';
import { CalculatorMode } from '../types/attendance.types';

export const AttendanceCalculatorScreen: React.FC = () => {
  const router = useRouter();
  const { subjects, selectedSubjectId, calculateAttendanceResult, setSelectedSubjectId } =
    useAttendanceStore();

  const selectedSubject =
    subjects.find((s) => s.id === selectedSubjectId) || subjects[0];

  const [mode, setMode] = useState<CalculatorMode>('REACH_TARGET');
  const [target, setTarget] = useState(selectedSubject?.targetAttendance || 85);
  const [selectorVisible, setSelectorVisible] = useState(false);

  if (!selectedSubject) return null;

  const result = calculateAttendanceResult(
    selectedSubject.attendedClasses,
    selectedSubject.conductedClasses,
    target,
    mode
  );

  return (
    <View style={styles.root}>
      {/* Header */}
      <SafeAreaView edges={['top']} style={styles.headerSafeArea}>
        <View style={styles.headerRow}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
            <Feather name="arrow-left" size={20} color="#0F172A" />
          </TouchableOpacity>
          <View style={styles.headerTitleGroup}>
            <Text style={styles.headerTitle}>Attendance Goal Calculator</Text>
            <Text style={styles.headerSub}>Project Required or Missable Classes</Text>
          </View>
        </View>
      </SafeAreaView>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Subject Selector Trigger */}
        <View style={styles.fieldSection}>
          <Text style={styles.sectionLabel}>Select Subject</Text>
          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.subjectTrigger}
            onPress={() => setSelectorVisible(true)}
          >
            <View style={styles.triggerLeft}>
              <View style={styles.iconBox}>
                <Feather name="book" size={18} color="#0745E8" />
              </View>
              <View>
                <Text style={styles.subjectCode}>{selectedSubject.subjectCode}</Text>
                <Text style={styles.subjectName}>{selectedSubject.subjectName}</Text>
              </View>
            </View>

            <View style={styles.triggerRight}>
              <Text style={styles.currPct}>{result.currentPercentage}%</Text>
              <Feather name="chevron-down" size={18} color="#64748B" />
            </View>
          </TouchableOpacity>
        </View>

        {/* Current Stats Snapshot */}
        <View style={styles.snapshotCard}>
          <View style={styles.snapshotTile}>
            <Text style={styles.snapshotVal}>{selectedSubject.attendedClasses}</Text>
            <Text style={styles.snapshotSub}>Attended</Text>
          </View>

          <View style={styles.snapshotDivider} />

          <View style={styles.snapshotTile}>
            <Text style={styles.snapshotVal}>{selectedSubject.conductedClasses}</Text>
            <Text style={styles.snapshotSub}>Conducted</Text>
          </View>

          <View style={styles.snapshotDivider} />

          <View style={styles.snapshotTile}>
            <Text style={[styles.snapshotVal, { color: '#0745E8' }]}>
              {result.currentPercentage}%
            </Text>
            <Text style={styles.snapshotSub}>Current %</Text>
          </View>
        </View>

        {/* Target Selector */}
        <TargetAttendanceSelector selectedTarget={target} onSelectTarget={setTarget} />

        {/* Segmented Mode Switcher */}
        <AttendanceCalculatorCard mode={mode} onModeChange={setMode} />

        {/* Result Cards based on Mode */}
        {mode === 'REACH_TARGET' ? (
          <RequiredClassesCard
            requiredCount={result.requiredClassesToReachTarget}
            targetPercentage={result.targetPercentage}
            projectedPercentage={result.projectedPercentage}
          />
        ) : (
          <MissableClassesCard
            missableCount={result.missableClassesCount}
            targetPercentage={result.targetPercentage}
            projectedPercentage={result.projectedPercentage}
          />
        )}

        {/* Explanation Card */}
        <View style={styles.explanationCard}>
          <View style={styles.explanationHeader}>
            <Feather name="info" size={16} color="#0745E8" />
            <Text style={styles.explanationTitle}>Calculation Breakdown</Text>
          </View>
          <Text style={styles.explanationText}>{result.explanation}</Text>
        </View>
      </ScrollView>

      {/* Subject Selector Sheet */}
      <SubjectSelector
        visible={selectorVisible}
        subjects={subjects}
        selectedSubjectId={selectedSubject.id}
        onSelect={(sub) => {
          setSelectedSubjectId(sub.id);
          setTarget(sub.targetAttendance);
        }}
        onClose={() => setSelectorVisible(false)}
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
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 40,
  },
  fieldSection: {
    marginBottom: 14,
  },
  sectionLabel: {
    fontSize: 12,
    fontWeight: '800',
    color: '#64748B',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 8,
  },
  subjectTrigger: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#F8FAFC',
    borderRadius: 16,
    padding: 14,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  triggerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    flex: 1,
  },
  iconBox: {
    width: 38,
    height: 38,
    borderRadius: 12,
    backgroundColor: '#EEF2FF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  subjectCode: {
    fontSize: 11,
    fontWeight: '800',
    color: '#0745E8',
  },
  subjectName: {
    fontSize: 14,
    fontWeight: '700',
    color: '#0F172A',
  },
  triggerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  currPct: {
    fontSize: 15,
    fontWeight: '800',
    color: '#0F172A',
  },
  snapshotCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    borderRadius: 16,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    marginBottom: 16,
  },
  snapshotTile: {
    flex: 1,
    alignItems: 'center',
  },
  snapshotVal: {
    fontSize: 18,
    fontWeight: '800',
    color: '#0F172A',
  },
  snapshotSub: {
    fontSize: 11,
    color: '#64748B',
    marginTop: 1,
  },
  snapshotDivider: {
    width: 1,
    height: 24,
    backgroundColor: '#CBD5E1',
  },
  explanationCard: {
    backgroundColor: '#F8FAFC',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  explanationHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 6,
  },
  explanationTitle: {
    fontSize: 13,
    fontWeight: '800',
    color: '#0F172A',
  },
  explanationText: {
    fontSize: 12,
    color: '#475569',
    lineHeight: 18,
  },
});
