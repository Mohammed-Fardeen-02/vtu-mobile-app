import React from 'react';
import { View, StyleSheet } from 'react-native';

export const SkeletonProfile: React.FC = () => {
  return (
    <View style={styles.container}>
      {/* Hero Skeleton */}
      <View style={styles.heroSkeleton}>
        <View style={styles.avatarSkeleton} />
        <View style={styles.textSkeletonGroup}>
          <View style={styles.lineLong} />
          <View style={styles.lineShort} />
        </View>
      </View>

      {/* Snapshot Card Skeleton */}
      <View style={styles.cardSkeleton} />
      <View style={styles.rowSkeleton} />
      <View style={styles.rowSkeleton} />
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
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  avatarSkeleton: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: '#F1F5F9',
  },
  textSkeletonGroup: {
    flex: 1,
    gap: 8,
  },
  lineLong: {
    width: '70%',
    height: 20,
    borderRadius: 6,
    backgroundColor: '#E2E8F0',
  },
  lineShort: {
    width: '40%',
    height: 14,
    borderRadius: 4,
    backgroundColor: '#F1F5F9',
  },
  cardSkeleton: {
    width: '100%',
    height: 110,
    borderRadius: 20,
    backgroundColor: '#F1F5F9',
  },
  rowSkeleton: {
    width: '100%',
    height: 54,
    borderRadius: 18,
    backgroundColor: '#F8FAFC',
  },
});
