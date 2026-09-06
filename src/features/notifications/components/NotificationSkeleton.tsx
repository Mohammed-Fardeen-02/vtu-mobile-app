import React from 'react';
import { View, StyleSheet } from 'react-native';

export const NotificationSkeleton: React.FC = () => {
  return (
    <View style={styles.container}>
      <View style={styles.cardSkeleton} />
      <View style={styles.cardSkeleton} />
      <View style={styles.cardSkeleton} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingTop: 16,
    gap: 12,
  },
  cardSkeleton: {
    width: '100%',
    height: 80,
    borderRadius: 20,
    backgroundColor: '#F1F5F9',
  },
});
