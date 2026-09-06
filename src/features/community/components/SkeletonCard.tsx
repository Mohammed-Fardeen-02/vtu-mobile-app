import React from 'react';
import { View, StyleSheet, Animated } from 'react-native';

export const SkeletonCard: React.FC = () => {
  const opacity = React.useRef(new Animated.Value(0.3)).current;

  React.useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, { toValue: 0.8, duration: 800, useNativeDriver: true }),
        Animated.timing(opacity, { toValue: 0.3, duration: 800, useNativeDriver: true }),
      ])
    ).start();
  }, [opacity]);

  return (
    <View style={styles.card}>
      <Animated.View style={[styles.bar, { width: '40%', opacity }]} />
      <Animated.View style={[styles.bar, { width: '90%', height: 20, opacity }]} />
      <Animated.View style={[styles.bar, { width: '60%', opacity }]} />
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    gap: 10,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  bar: {
    height: 14,
    backgroundColor: '#CBD5E1',
    borderRadius: 6,
  },
});
