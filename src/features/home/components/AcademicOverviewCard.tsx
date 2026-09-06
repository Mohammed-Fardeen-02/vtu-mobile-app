import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { AcademicSummary } from '../types/home.types';

interface AcademicOverviewCardProps {
  summary: AcademicSummary;
}

export const AcademicOverviewCard: React.FC<AcademicOverviewCardProps> = ({ summary }) => {
  const router = useRouter();

  const isEligible = summary.attendancePercentage >= 75;

  return (
    <View style={styles.container}>
      <View style={styles.cardHeader}>
        <Text style={styles.cardTitle}>Academic Overview</Text>
        <View style={styles.semBadge}>
          <Text style={styles.semBadgeText}>Semester {summary.currentSemester}</Text>
        </View>
      </View>

      <View style={styles.metricsRow}>
        {/* CGPA Metric Box */}
        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.metricBox}
          onPress={() => router.push('/calculators/cgpa')}
        >
          <View style={styles.metricHeader}>
            <View style={[styles.iconCircle, { backgroundColor: '#EEF2FF' }]}>
              <Feather name="bar-chart-2" size={18} color="#0745E8" />
            </View>
            <View style={styles.trendBadge}>
              <Feather name="trending-up" size={12} color="#16A34A" />
              <Text style={styles.trendText}>{summary.cgpaTrend}</Text>
            </View>
          </View>
          <Text style={styles.metricValue}>{summary.cgpa.toFixed(2)}</Text>
          <Text style={styles.metricLabel}>Current CGPA</Text>
        </TouchableOpacity>

        {/* Attendance Metric Box */}
        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.metricBox}
          onPress={() => router.push('/calculators/attendance')}
        >
          <View style={styles.metricHeader}>
            <View
              style={[
                styles.iconCircle,
                { backgroundColor: isEligible ? '#ECFDF5' : '#FEF2F2' },
              ]}
            >
              <Feather
                name={isEligible ? 'check-circle' : 'alert-circle'}
                size={18}
                color={isEligible ? '#16A34A' : '#EF4444'}
              />
            </View>
            <View
              style={[
                styles.statusBadge,
                { backgroundColor: isEligible ? '#DCFCE7' : '#FEE2E2' },
              ]}
            >
              <Text
                style={[
                  styles.statusText,
                  { color: isEligible ? '#16A34A' : '#EF4444' },
                ]}
              >
                {summary.attendanceStatus}
              </Text>
            </View>
          </View>
          <Text style={styles.metricValue}>{summary.attendancePercentage}%</Text>
          <Text style={styles.metricLabel}>Attendance Rate</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 18,
    marginHorizontal: 20,
    marginBottom: 20,
    borderColor: '#E2E8F0',
    borderWidth: 1,
    shadowColor: '#0745E8',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 10,
    elevation: 4,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: '#0F172A',
  },
  semBadge: {
    backgroundColor: '#EEF2FF',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  semBadgeText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#0745E8',
  },
  metricsRow: {
    flexDirection: 'row',
    gap: 12,
  },
  metricBox: {
    flex: 1,
    backgroundColor: '#F8FAFC',
    borderRadius: 16,
    padding: 14,
    borderColor: '#F1F5F9',
    borderWidth: 1,
  },
  metricHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  iconCircle: {
    width: 34,
    height: 34,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  trendBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#DCFCE7',
    paddingHorizontal: 6,
    paddingVertical: 3,
    borderRadius: 8,
    gap: 3,
  },
  trendText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#16A34A',
  },
  statusBadge: {
    paddingHorizontal: 6,
    paddingVertical: 3,
    borderRadius: 8,
  },
  statusText: {
    fontSize: 11,
    fontWeight: '700',
  },
  metricValue: {
    fontSize: 22,
    fontWeight: '800',
    color: '#0F172A',
    marginBottom: 2,
  },
  metricLabel: {
    fontSize: 12,
    color: '#64748B',
    fontWeight: '500',
  },
});
