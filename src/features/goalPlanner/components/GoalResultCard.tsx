import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { FeasibilityBadge } from './FeasibilityBadge';
import { GoalResult } from '../types/goalPlanner.types';

interface GoalResultCardProps {
  result: GoalResult;
}

export const GoalResultCard: React.FC<GoalResultCardProps> = ({ result }) => {
  return (
    <View style={styles.card}>
      {/* Top Status Header */}
      <View style={styles.topRow}>
        <Text style={styles.cardTag}>GOAL CALCULATION RESULT</Text>
        <FeasibilityBadge status={result.feasibilityStatus} size="large" />
      </View>

      {/* Main Required Metric */}
      <View style={styles.metricContainer}>
        <Text style={styles.requiredLabel}>Required Average SGPA</Text>
        <Text style={styles.requiredValue}>
          {result.requiredAverageSgpa > 10.0
            ? '> 10.00'
            : result.requiredAverageSgpa.toFixed(2)}
        </Text>
        <Text style={styles.requiredSub}>
          Needed in each of remaining {result.remainingSemesters} semesters
        </Text>
      </View>

      {/* Target vs Current Comparison Tiles */}
      <View style={styles.compareRow}>
        <View style={styles.compareTile}>
          <Text style={styles.compareVal}>{result.currentCgpa.toFixed(2)}</Text>
          <Text style={styles.compareLabel}>Current CGPA</Text>
        </View>

        <View style={styles.arrowBox}>
          <Text style={styles.arrowText}>→</Text>
        </View>

        <View style={styles.compareTile}>
          <Text style={[styles.compareVal, { color: '#0745E8' }]}>
            {result.targetCgpa.toFixed(2)}
          </Text>
          <Text style={styles.compareLabel}>Target Goal CGPA</Text>
        </View>
      </View>

      {/* Progress Bar Visualization */}
      <View style={styles.progressSection}>
        <View style={styles.progressTextRow}>
          <Text style={styles.progressLabel}>Goal Completion Progress</Text>
          <Text style={styles.progressPct}>{result.progressPercentage}%</Text>
        </View>

        <View style={styles.progressTrack}>
          <View
            style={[
              styles.progressFill,
              { width: `${result.progressPercentage}%` },
            ]}
          />
        </View>
      </View>

      {/* Explanation Box */}
      <View style={styles.explanationBox}>
        <Text style={styles.explanationText}>{result.explanation}</Text>
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
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  cardTag: {
    fontSize: 11,
    fontWeight: '800',
    color: '#64748B',
    letterSpacing: 0.5,
  },
  metricContainer: {
    alignItems: 'center',
    backgroundColor: '#EEF2FF',
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: '#C7D2FE',
    marginBottom: 16,
  },
  requiredLabel: {
    fontSize: 12,
    fontWeight: '800',
    color: '#0745E8',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  requiredValue: {
    fontSize: 48,
    fontWeight: '900',
    color: '#0745E8',
    letterSpacing: -1,
    marginVertical: 4,
  },
  requiredSub: {
    fontSize: 12,
    fontWeight: '600',
    color: '#475569',
  },
  compareRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#F8FAFC',
    borderRadius: 16,
    padding: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    marginBottom: 16,
  },
  compareTile: {
    flex: 1,
    alignItems: 'center',
  },
  compareVal: {
    fontSize: 20,
    fontWeight: '800',
    color: '#0F172A',
  },
  compareLabel: {
    fontSize: 11,
    color: '#64748B',
    marginTop: 2,
  },
  arrowBox: {
    paddingHorizontal: 8,
  },
  arrowText: {
    fontSize: 18,
    fontWeight: '800',
    color: '#94A3B8',
  },
  progressSection: {
    marginBottom: 16,
  },
  progressTextRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  progressLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: '#475569',
  },
  progressPct: {
    fontSize: 12,
    fontWeight: '800',
    color: '#0745E8',
  },
  progressTrack: {
    height: 8,
    borderRadius: 4,
    backgroundColor: '#F1F5F9',
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#0745E8',
    borderRadius: 4,
  },
  explanationBox: {
    backgroundColor: '#F8FAFC',
    borderRadius: 14,
    padding: 14,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  explanationText: {
    fontSize: 13,
    color: '#334155',
    lineHeight: 19,
  },
});
