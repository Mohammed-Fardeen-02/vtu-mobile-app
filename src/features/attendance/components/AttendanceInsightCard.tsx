import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { SubjectAttendance } from '../types/attendance.types';
import { calculateStatus } from '../store/useAttendanceStore';

interface AttendanceInsightCardProps {
  subject: SubjectAttendance;
}

export const AttendanceInsightCard: React.FC<AttendanceInsightCardProps> = ({
  subject,
}) => {
  const percentage =
    subject.conductedClasses > 0
      ? (subject.attendedClasses / subject.conductedClasses) * 100
      : 0;
  const status = calculateStatus(percentage, subject.targetAttendance);

  const req = Math.ceil(
    (subject.targetAttendance * subject.conductedClasses - 100 * subject.attendedClasses) /
      (100 - subject.targetAttendance)
  );

  const miss = Math.floor(
    (100 * subject.attendedClasses - subject.targetAttendance * subject.conductedClasses) /
      subject.targetAttendance
  );

  return (
    <View style={styles.card}>
      <View style={styles.headerRow}>
        <View style={styles.iconCircle}>
          <Feather name="zap" size={16} color="#0745E8" />
        </View>
        <Text style={styles.headerTitle}>Smart Attendance Insight</Text>
      </View>

      <Text style={styles.bodyText}>
        {status === 'Safe' ? (
          miss > 0 ? (
            <>
              Your attendance is in the <Text style={styles.safeText}>Safe Zone</Text>. You can
              miss the next <Text style={styles.boldText}>{miss} classes</Text> without falling
              below your {subject.targetAttendance}% target.
            </>
          ) : (
            <>
              Your attendance is right on target at{' '}
              <Text style={styles.boldText}>{percentage.toFixed(1)}%</Text>. Missing the very next
              class will drop your status to Near Target.
            </>
          )
        ) : (
          <>
            Your attendance is <Text style={styles.warningText}>{percentage.toFixed(1)}%</Text>.
            Attend the next <Text style={styles.boldText}>{Math.max(1, req)} consecutive classes</Text>{' '}
            to achieve your {subject.targetAttendance}% requirement.
          </>
        )}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#F8FAFC',
    borderRadius: 18,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    marginBottom: 20,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  iconCircle: {
    width: 28,
    height: 28,
    borderRadius: 8,
    backgroundColor: '#EEF2FF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: '#0F172A',
  },
  bodyText: {
    fontSize: 13,
    color: '#475569',
    lineHeight: 19,
  },
  safeText: {
    fontWeight: '800',
    color: '#059669',
  },
  warningText: {
    fontWeight: '800',
    color: '#D97706',
  },
  boldText: {
    fontWeight: '800',
    color: '#0F172A',
  },
});
