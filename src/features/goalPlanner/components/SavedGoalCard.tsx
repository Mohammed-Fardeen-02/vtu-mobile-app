import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { SavedGoal } from '../types/goalPlanner.types';
import { FeasibilityBadge } from './FeasibilityBadge';

interface SavedGoalCardProps {
  goal: SavedGoal;
  onPress: (goal: SavedGoal) => void;
  onDelete: (id: string) => void;
}

export const SavedGoalCard: React.FC<SavedGoalCardProps> = ({
  goal,
  onPress,
  onDelete,
}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.85}
      style={styles.card}
      onPress={() => onPress(goal)}
    >
      <View style={styles.topRow}>
        <View style={styles.titleGroup}>
          <Text style={styles.goalTitle}>{goal.title}</Text>
          <Text style={styles.dateSub}>Saved on {goal.createdAt}</Text>
        </View>

        <FeasibilityBadge status={goal.feasibilityStatus} size="small" />
      </View>

      <View style={styles.metricsRow}>
        <View style={styles.metricTile}>
          <Text style={styles.metricVal}>{goal.startingCgpa.toFixed(2)}</Text>
          <Text style={styles.metricLbl}>Starting CGPA</Text>
        </View>

        <Feather name="arrow-right" size={16} color="#94A3B8" />

        <View style={styles.metricTile}>
          <Text style={[styles.metricVal, { color: '#0745E8' }]}>
            {goal.targetCgpa.toFixed(2)}
          </Text>
          <Text style={styles.metricLbl}>Target CGPA</Text>
        </View>

        <View style={styles.divider} />

        <View style={styles.metricTile}>
          <Text style={[styles.metricVal, { color: '#059669' }]}>
            {goal.requiredSgpa.toFixed(2)}
          </Text>
          <Text style={styles.metricLbl}>Req. SGPA</Text>
        </View>
      </View>

      <View style={styles.footerRow}>
        <TouchableOpacity
          onPress={() => onDelete(goal.id)}
          style={styles.deleteBtn}
        >
          <Feather name="trash-2" size={14} color="#EF4444" />
          <Text style={styles.deleteText}>Remove</Text>
        </TouchableOpacity>

        <View style={styles.viewRow}>
          <Text style={styles.viewText}>View Roadmap</Text>
          <Feather name="chevron-right" size={16} color="#0745E8" />
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    marginBottom: 12,
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 6,
    elevation: 2,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  titleGroup: {
    flex: 1,
    marginRight: 8,
  },
  goalTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: '#0F172A',
  },
  dateSub: {
    fontSize: 11,
    color: '#64748B',
    marginTop: 1,
  },
  metricsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#F8FAFC',
    borderRadius: 14,
    padding: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    marginBottom: 12,
  },
  metricTile: {
    alignItems: 'center',
  },
  metricVal: {
    fontSize: 16,
    fontWeight: '800',
    color: '#0F172A',
  },
  metricLbl: {
    fontSize: 10,
    color: '#64748B',
    marginTop: 2,
  },
  divider: {
    width: 1,
    height: 20,
    backgroundColor: '#CBD5E1',
  },
  footerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  deleteBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  deleteText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#EF4444',
  },
  viewRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  },
  viewText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#0745E8',
  },
});
