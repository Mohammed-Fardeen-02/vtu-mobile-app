import React from 'react';
import { View, StyleSheet } from 'react-native';

export const SkeletonCalendar: React.FC = () => {
  return (
    <View style={styles.container}>
      <View style={styles.heroSkeleton} />
      <View style={styles.gridSkeleton} />
      <View style={styles.cardSkeleton} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingTop: 16,
    gap: 16,
  },
  heroSkeleton: {
    width: '100%',
    height: 140,
    borderRadius: 24,
    backgroundColor: '#F1F5F9',
  },
  gridSkeleton: {
    width: '100%',
    height: 220,
    borderRadius: 20,
    backgroundColor: '#F8FAFC',
  },
  cardSkeleton: {
    width: '100%',
    height: 72,
    borderRadius: 18,
    backgroundColor: '#F1F5F9',
  },
});
