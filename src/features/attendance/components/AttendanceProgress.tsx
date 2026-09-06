import React from 'react';
import { View, StyleSheet } from 'react-native';

interface AttendanceProgressProps {
  percentage: number;
  target?: number;
  height?: number;
}

export const AttendanceProgress: React.FC<AttendanceProgressProps> = ({
  percentage,
  target = 85,
  height = 8,
}) => {
  const getFillColor = () => {
    if (percentage >= target) return '#059669'; // Emerald
    if (percentage >= target - 10) return '#D97706'; // Amber
    return '#EF4444'; // Rose
  };

  const clampedPct = Math.min(Math.max(percentage, 0), 100);

  return (
    <View style={[styles.track, { height, borderRadius: height / 2 }]}>
      <View
        style={[
          styles.fill,
          {
            width: `${clampedPct}%`,
            backgroundColor: getFillColor(),
            borderRadius: height / 2,
          },
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  track: {
    width: '100%',
    backgroundColor: '#F1F5F9',
    overflow: 'hidden',
  },
  fill: {
    height: '100%',
  },
});
