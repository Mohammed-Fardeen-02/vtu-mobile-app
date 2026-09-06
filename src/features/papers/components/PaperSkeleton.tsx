import React from 'react';
import { View, StyleSheet } from 'react-native';

export const PaperSkeleton: React.FC = () => {
  return (
    <View style={styles.card}>
      <View style={styles.topRow}>
        <View style={styles.thumbnailSkeleton} />
        <View style={styles.infoSkeleton}>
          <View style={styles.tagSkeleton} />
          <View style={styles.titleSkeleton} />
          <View style={styles.subtitleSkeleton} />
          <View style={styles.statsSkeleton} />
        </View>
      </View>
      <View style={styles.footerSkeleton}>
        <View style={styles.btnSkeleton} />
        <View style={styles.btnSkeleton} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 16,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: '#F1F5F9',
  },
  topRow: {
    flexDirection: 'row',
    gap: 14,
  },
  thumbnailSkeleton: {
    width: 84,
    height: 110,
    borderRadius: 12,
    backgroundColor: '#F1F5F9',
  },
  infoSkeleton: {
    flex: 1,
    gap: 10,
  },
  tagSkeleton: {
    width: 90,
    height: 18,
    borderRadius: 6,
    backgroundColor: '#F1F5F9',
  },
  titleSkeleton: {
    width: '80%',
    height: 20,
    borderRadius: 6,
    backgroundColor: '#E2E8F0',
  },
  subtitleSkeleton: {
    width: '60%',
    height: 14,
    borderRadius: 4,
    backgroundColor: '#F1F5F9',
  },
  statsSkeleton: {
    width: '90%',
    height: 14,
    borderRadius: 4,
    backgroundColor: '#F1F5F9',
    marginTop: 4,
  },
  footerSkeleton: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 16,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#F8FAFC',
  },
  btnSkeleton: {
    flex: 1,
    height: 40,
    borderRadius: 12,
    backgroundColor: '#F1F5F9',
  },
});
