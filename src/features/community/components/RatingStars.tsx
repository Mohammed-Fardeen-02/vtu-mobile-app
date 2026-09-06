import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';

interface RatingStarsProps {
  rating: number;
  count?: number;
  size?: number;
}

export const RatingStars: React.FC<RatingStarsProps> = ({
  rating,
  count,
  size = 13,
}) => {
  return (
    <View style={styles.container}>
      <Feather name="star" size={size} color="#F59E0B" style={styles.icon} />
      <Text style={styles.ratingText}>{rating.toFixed(1)}</Text>
      {count !== undefined && <Text style={styles.countText}>({count})</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
  },
  icon: {
    marginTop: -1,
  },
  ratingText: {
    fontSize: 12,
    fontWeight: '800',
    color: '#0F172A',
  },
  countText: {
    fontSize: 11,
    color: '#64748B',
  },
});
