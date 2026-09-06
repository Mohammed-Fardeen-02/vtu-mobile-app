import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';

interface GoalHeroCardProps {
  currentCgpa: number;
  completedSemesters: number;
  onCreateGoalPress: () => void;
}

export const GoalHeroCard: React.FC<GoalHeroCardProps> = ({
  currentCgpa,
  completedSemesters,
  onCreateGoalPress,
}) => {
  return (
    <View style={styles.card}>
      {/* Top Banner */}
      <View style={styles.heroTop}>
        <View style={styles.targetVisualCircle}>
          <Feather name="target" size={32} color="#0745E8" />
        </View>

        <View style={styles.textGroup}>
          <Text style={styles.title}>GPA Goal Planner</Text>
          <Text style={styles.subtitle}>VTU Semester Academic Roadmap</Text>
        </View>
      </View>

      {/* Explanation */}
      <Text style={styles.explanation}>
        Determine the exact average SGPA you need in your remaining semesters to hit your graduation target CGPA (e.g. 8.50 Distinction or 9.00 Honors).
      </Text>

      {/* Academic Snapshot Tile */}
      <View style={styles.snapshotRow}>
        <View style={styles.snapTile}>
          <Text style={styles.snapVal}>{currentCgpa.toFixed(2)}</Text>
          <Text style={styles.snapSub}>Current CGPA</Text>
        </View>

        <View style={styles.snapDivider} />

        <View style={styles.snapTile}>
          <Text style={styles.snapVal}>Sem {completedSemesters + 1}</Text>
          <Text style={styles.snapSub}>Current Semester</Text>
        </View>

        <View style={styles.snapDivider} />

        <View style={styles.snapTile}>
          <Text style={[styles.snapVal, { color: '#0745E8' }]}>
            {8 - completedSemesters}
          </Text>
          <Text style={styles.snapSub}>Remaining Sems</Text>
        </View>
      </View>

      {/* CTA Button */}
      <TouchableOpacity
        activeOpacity={0.85}
        style={styles.ctaBtn}
        onPress={onCreateGoalPress}
      >
        <Feather name="plus-circle" size={18} color="#FFFFFF" />
        <Text style={styles.ctaBtnText}>Plan New Target CGPA Goal</Text>
      </TouchableOpacity>

      {/* Feature Highlights Grid */}
      <View style={styles.highlightsContainer}>
        <View style={styles.highlightItem}>
          <Feather name="check-circle" size={14} color="#059669" />
          <Text style={styles.highlightText}>Required SGPA Calculations</Text>
        </View>

        <View style={styles.highlightItem}>
          <Feather name="bar-chart-2" size={14} color="#0745E8" />
          <Text style={styles.highlightText}>3-Scenario Projections</Text>
        </View>

        <View style={styles.highlightItem}>
          <Feather name="layers" size={14} color="#D97706" />
          <Text style={styles.highlightText}>Semester-by-Semester Roadmaps</Text>
        </View>
      </View>
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
  heroTop: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    marginBottom: 12,
  },
  targetVisualCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#EEF2FF',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#C7D2FE',
  },
  textGroup: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: '800',
    color: '#0F172A',
  },
  subtitle: {
    fontSize: 12,
    color: '#64748B',
    marginTop: 2,
  },
  explanation: {
    fontSize: 13,
    color: '#475569',
    lineHeight: 19,
    marginBottom: 16,
  },
  snapshotRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    borderRadius: 16,
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    marginBottom: 16,
  },
  snapTile: {
    flex: 1,
    alignItems: 'center',
  },
  snapVal: {
    fontSize: 18,
    fontWeight: '800',
    color: '#0F172A',
  },
  snapSub: {
    fontSize: 11,
    color: '#64748B',
    marginTop: 2,
  },
  snapDivider: {
    width: 1,
    height: 24,
    backgroundColor: '#CBD5E1',
  },
  ctaBtn: {
    height: 48,
    borderRadius: 16,
    backgroundColor: '#0745E8',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginBottom: 14,
    shadowColor: '#0745E8',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 3,
  },
  ctaBtnText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '800',
  },
  highlightsContainer: {
    gap: 6,
    backgroundColor: '#F8FAFC',
    borderRadius: 14,
    padding: 10,
  },
  highlightItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  highlightText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#334155',
  },
});
