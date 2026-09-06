import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SemesterTarget } from '../types/goalPlanner.types';

interface SemesterBreakdownItemProps {
  item: SemesterTarget;
}

export const SemesterBreakdownItem: React.FC<SemesterBreakdownItemProps> = ({
  item,
}) => {
  const pct = Math.min(100, (item.requiredSgpa / 10.0) * 100);

  return (
    <View style={styles.card}>
      <View style={styles.topRow}>
        <Text style={styles.semLabel}>{item.label}</Text>
        <Text style={styles.sgpaValue}>
          Required SGPA: <Text style={styles.bold}>{item.requiredSgpa.toFixed(2)}</Text> / 10.00
        </Text>
      </View>

      <View style={styles.track}>
        <View style={[styles.fill, { width: `${pct}%` }]} />
      </View>

      <View style={styles.subRow}>
        <Text style={styles.subText}>Target Grade: {item.requiredSgpa >= 9.0 ? 'S Grade (Excellence)' : item.requiredSgpa >= 8.0 ? 'A+ Grade (Distinction)' : 'A Grade'}</Text>
        <Text style={styles.weightText}>~20 Credits</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 14,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    marginBottom: 10,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  semLabel: {
    fontSize: 14,
    fontWeight: '800',
    color: '#0F172A',
  },
  sgpaValue: {
    fontSize: 12,
    color: '#64748B',
  },
  bold: {
    fontWeight: '800',
    color: '#0745E8',
  },
  track: {
    height: 8,
    borderRadius: 4,
    backgroundColor: '#F1F5F9',
    overflow: 'hidden',
    marginBottom: 6,
  },
  fill: {
    height: '100%',
    backgroundColor: '#0745E8',
    borderRadius: 4,
  },
  subRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  subText: {
    fontSize: 11,
    color: '#64748B',
  },
  weightText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#94A3B8',
  },
});
