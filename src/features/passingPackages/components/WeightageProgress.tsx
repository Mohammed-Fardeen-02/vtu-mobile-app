import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface WeightageProgressProps {
  expectedMarks: number;
  percentage: number;
  importanceLevel?: 'Must Master' | 'High Weightage' | 'Moderate Weightage';
  totalMarks?: number;
}

export const WeightageProgress: React.FC<WeightageProgressProps> = ({
  expectedMarks,
  percentage,
  importanceLevel = 'High Weightage',
  totalMarks = 100,
}) => {
  let progressColor = '#0745E8';
  let trackColor = '#EEF2FF';

  if (importanceLevel === 'Must Master') {
    progressColor = '#7C3AED';
    trackColor = '#F3E8FF';
  } else if (importanceLevel === 'Moderate Weightage') {
    progressColor = '#0284C7';
    trackColor = '#E0F2FE';
  }

  const clampedPercent = Math.min(Math.max(percentage, 0), 100);

  return (
    <View style={styles.container}>
      <View style={styles.labelRow}>
        <Text style={styles.marksText}>{expectedMarks} Marks Weightage</Text>
        <Text style={[styles.percentText, { color: progressColor }]}>{clampedPercent}%</Text>
      </View>
      <View style={[styles.track, { backgroundColor: trackColor }]}>
        <View
          style={[
            styles.fill,
            { width: `${clampedPercent}%`, backgroundColor: progressColor },
          ]}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 4,
  },
  labelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  marksText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#334155',
  },
  percentText: {
    fontSize: 12,
    fontWeight: '800',
  },
  track: {
    height: 8,
    borderRadius: 4,
    overflow: 'hidden',
    width: '100%',
  },
  fill: {
    height: '100%',
    borderRadius: 4,
  },
});
