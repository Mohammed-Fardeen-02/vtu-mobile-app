import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { AttendanceStatusBadge } from './AttendanceStatusBadge';
import { AttendanceProgress } from './AttendanceProgress';
import { AttendanceStatus } from '../types/attendance.types';

interface AttendanceHeroCardProps {
  overallPercentage: number;
  totalAttended: number;
  totalConducted: number;
  targetAttendance: number;
  status: AttendanceStatus;
  onAddPress: () => void;
}

export const AttendanceHeroCard: React.FC<AttendanceHeroCardProps> = ({
  overallPercentage,
  totalAttended,
  totalConducted,
  targetAttendance,
  status,
  onAddPress,
}) => {
  return (
    <View style={styles.card}>
      {/* Top Header Row */}
      <View style={styles.headerRow}>
        <View>
          <Text style={styles.titleText}>Overall Attendance</Text>
          <Text style={styles.subText}>Across all enrolled subjects</Text>
        </View>

        <AttendanceStatusBadge status={status} size="large" />
      </View>

      {/* Large Metric Display */}
      <View style={styles.metricContainer}>
        <View style={styles.percentRow}>
          <Text style={styles.percentText}>{overallPercentage.toFixed(1)}%</Text>
          <Text style={styles.targetLabel}>Target: {targetAttendance}%</Text>
        </View>

        <AttendanceProgress percentage={overallPercentage} target={targetAttendance} height={10} />

        <View style={styles.statsRow}>
          <Text style={styles.statDetail}>
            <Text style={styles.statBold}>{totalAttended}</Text> / {totalConducted} Classes Attended
          </Text>
          <Text style={styles.statDetail}>
            Missed: <Text style={styles.statBold}>{totalConducted - totalAttended}</Text>
          </Text>
        </View>
      </View>

      {/* CTA Button Row */}
      <TouchableOpacity
        activeOpacity={0.85}
        style={styles.addCtaBtn}
        onPress={onAddPress}
      >
        <Feather name="plus-circle" size={18} color="#FFFFFF" />
        <Text style={styles.addCtaText}>Add Subject Attendance</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 20,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    marginBottom: 20,
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 3,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  titleText: {
    fontSize: 18,
    fontWeight: '800',
    color: '#0F172A',
  },
  subText: {
    fontSize: 12,
    color: '#64748B',
    marginTop: 1,
  },
  metricContainer: {
    backgroundColor: '#F8FAFC',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    marginBottom: 16,
  },
  percentRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  percentText: {
    fontSize: 34,
    fontWeight: '900',
    color: '#0F172A',
    letterSpacing: -0.5,
  },
  targetLabel: {
    fontSize: 13,
    fontWeight: '700',
    color: '#0745E8',
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },
  statDetail: {
    fontSize: 12,
    color: '#64748B',
  },
  statBold: {
    fontWeight: '800',
    color: '#0F172A',
  },
  addCtaBtn: {
    height: 48,
    borderRadius: 14,
    backgroundColor: '#0745E8',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    shadowColor: '#0745E8',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 3,
  },
  addCtaText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '800',
  },
});
