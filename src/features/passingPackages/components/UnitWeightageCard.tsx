import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { UnitWeightage } from '../types/passingPackages.types';
import { WeightageProgress } from './WeightageProgress';

interface UnitWeightageCardProps {
  unit: UnitWeightage;
  onPressUnit?: (unitNumber: number) => void;
}

export const UnitWeightageCard: React.FC<UnitWeightageCardProps> = ({
  unit,
  onPressUnit,
}) => {
  let badgeBg = '#F3E8FF';
  let badgeTextColor = '#6D28D9';

  if (unit.importanceLevel === 'Must Master') {
    badgeBg = '#FEF2F2';
    badgeTextColor = '#DC2626';
  } else if (unit.importanceLevel === 'Moderate Weightage') {
    badgeBg = '#E0F2FE';
    badgeTextColor = '#0369A1';
  }

  return (
    <TouchableOpacity
      activeOpacity={0.85}
      style={styles.card}
      onPress={() => onPressUnit?.(unit.unitNumber)}
    >
      <View style={styles.headerRow}>
        <View style={styles.unitBadge}>
          <Text style={styles.unitBadgeText}>UNIT {unit.unitNumber}</Text>
        </View>
        <View style={[styles.importanceBadge, { backgroundColor: badgeBg }]}>
          <Text style={[styles.importanceText, { color: badgeTextColor }]}>
            {unit.importanceLevel}
          </Text>
        </View>
      </View>

      <Text style={styles.title}>{unit.unitTitle}</Text>
      <Text style={styles.summary}>{unit.summary}</Text>

      <View style={styles.divider} />

      <WeightageProgress
        expectedMarks={unit.expectedMarks}
        percentage={unit.percentageWeightage}
        importanceLevel={unit.importanceLevel}
      />

      <View style={styles.metaRow}>
        <View style={styles.metaItem}>
          <Feather name="help-circle" size={13} color="#64748B" />
          <Text style={styles.metaText}>{unit.questionsCount} Prepared Qs</Text>
        </View>
        <View style={styles.metaItem}>
          <Feather name="file-text" size={13} color="#64748B" />
          <Text style={styles.metaText}>{unit.revisionResourceCount} Revision Notes</Text>
        </View>
        <Feather name="chevron-right" size={16} color="#94A3B8" />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 16,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 2,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  unitBadge: {
    backgroundColor: '#EEF2FF',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  unitBadgeText: {
    color: '#0745E8',
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  importanceBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  importanceText: {
    fontSize: 11,
    fontWeight: '700',
  },
  title: {
    fontSize: 16,
    fontWeight: '800',
    color: '#0F172A',
    marginBottom: 4,
  },
  summary: {
    fontSize: 13,
    color: '#64748B',
    lineHeight: 18,
  },
  divider: {
    height: 1,
    backgroundColor: '#F1F5F9',
    marginVertical: 12,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 10,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#F8FAFC',
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  metaText: {
    fontSize: 12,
    color: '#64748B',
    fontWeight: '600',
  },
});
