import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';

interface MissableClassesCardProps {
  missableCount: number;
  targetPercentage: number;
  projectedPercentage: number;
}

export const MissableClassesCard: React.FC<MissableClassesCardProps> = ({
  missableCount,
  targetPercentage,
  projectedPercentage,
}) => {
  const isZero = missableCount === 0;

  return (
    <View style={[styles.card, isZero && styles.cardWarning]}>
      <View style={styles.topRow}>
        <View style={[styles.iconBox, isZero && styles.iconBoxWarning]}>
          <Feather
            name={isZero ? 'alert-triangle' : 'check-circle'}
            size={20}
            color={isZero ? '#D97706' : '#059669'}
          />
        </View>
        <Text style={[styles.tagText, isZero && styles.tagTextWarning]}>
          CLASSES YOU CAN MISS
        </Text>
      </View>

      <View style={styles.metricGroup}>
        <Text style={[styles.countText, isZero && styles.countTextWarning]}>
          {missableCount}
        </Text>
        <Text style={styles.unitText}>
          {missableCount === 1 ? 'Class Can Be Missed' : 'Classes Can Be Missed'}
        </Text>
      </View>

      <View style={styles.infoBox}>
        <Text style={styles.infoText}>
          {isZero ? (
            <>
              You cannot miss any upcoming classes without dropping below your target of{' '}
              <Text style={styles.bold}>{targetPercentage}%</Text>.
            </>
          ) : (
            <>
              You can safely miss the next <Text style={styles.bold}>{missableCount} classes</Text>.
              Your attendance will remain at <Text style={styles.bold}>{projectedPercentage}%</Text>{' '}
              (Target: {targetPercentage}%).
            </>
          )}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#D1FAE5',
    borderRadius: 20,
    padding: 18,
    borderWidth: 1,
    borderColor: '#6EE7B7',
    marginBottom: 16,
  },
  cardWarning: {
    backgroundColor: '#FEF3C7',
    borderColor: '#FCD34D',
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
  iconBoxWarning: {
    backgroundColor: '#FFFFFF',
  },
  tagText: {
    fontSize: 11,
    fontWeight: '800',
    color: '#059669',
    letterSpacing: 0.5,
  },
  tagTextWarning: {
    color: '#D97706',
  },
  metricGroup: {
    marginBottom: 12,
  },
  countText: {
    fontSize: 38,
    fontWeight: '900',
    color: '#059669',
  },
  countTextWarning: {
    color: '#D97706',
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
