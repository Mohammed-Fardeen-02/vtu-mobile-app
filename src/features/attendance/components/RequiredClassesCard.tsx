import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';

interface RequiredClassesCardProps {
  requiredCount: number;
  targetPercentage: number;
  projectedPercentage: number;
}

export const RequiredClassesCard: React.FC<RequiredClassesCardProps> = ({
  requiredCount,
  targetPercentage,
  projectedPercentage,
}) => {
  return (
    <View style={styles.card}>
      <View style={styles.topRow}>
        <View style={styles.iconBox}>
          <Feather name="arrow-up-right" size={20} color="#0745E8" />
        </View>
        <Text style={styles.tagText}>REACH TARGET</Text>
      </View>

      <View style={styles.metricGroup}>
        <Text style={styles.countText}>{requiredCount}</Text>
        <Text style={styles.unitText}>
          {requiredCount === 1 ? 'Consecutive Class' : 'Consecutive Classes'}
        </Text>
      </View>

      <View style={styles.infoBox}>
        <Text style={styles.infoText}>
          Attend the next <Text style={styles.bold}>{requiredCount} classes</Text> without missing to raise your attendance to <Text style={styles.bold}>{projectedPercentage}%</Text> (Target: {targetPercentage}%).
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#EEF2FF',
    borderRadius: 20,
    padding: 18,
    borderWidth: 1,
    borderColor: '#C7D2FE',
    marginBottom: 16,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  iconBox: {
    width: 36,
    height: 36,
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  tagText: {
    fontSize: 11,
    fontWeight: '800',
    color: '#0745E8',
    letterSpacing: 0.5,
  },
  metricGroup: {
    marginBottom: 12,
  },
  countText: {
    fontSize: 38,
    fontWeight: '900',
    color: '#0745E8',
  },
  unitText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1E293B',
    marginTop: -2,
  },
  infoBox: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 12,
  },
  infoText: {
    fontSize: 12,
    color: '#475569',
    lineHeight: 18,
  },
  bold: {
    fontWeight: '800',
    color: '#0F172A',
  },
});
