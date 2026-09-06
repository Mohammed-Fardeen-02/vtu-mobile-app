import React from 'react';
import { View, StyleSheet, Animated } from 'react-native';

export const PackageSkeleton: React.FC = () => {
  const opacity = React.useRef(new Animated.Value(0.3)).current;

  React.useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, {
          toValue: 0.8,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 0.3,
          duration: 800,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [opacity]);

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.skeletonHeader, { opacity }]} />
      <Animated.View style={[styles.skeletonCard, { opacity }]} />
      <Animated.View style={[styles.skeletonCard, { opacity }]} />
      <Animated.View style={[styles.skeletonCard, { opacity }]} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    gap: 14,
  },
  skeletonHeader: {
    height: 140,
    backgroundColor: '#E2E8F0',
    borderRadius: 20,
  },
  skeletonCard: {
    height: 110,
    backgroundColor: '#E2E8F0',
    borderRadius: 16,
  },
});
