import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Feather } from '@expo/vector-icons';

interface NightBeforeCardProps {
  highYieldCount: number;
  estimatedMinutes?: number;
  onPressStart: () => void;
}

export const NightBeforeCard: React.FC<NightBeforeCardProps> = ({
  highYieldCount,
  estimatedMinutes = 45,
  onPressStart,
}) => {
  return (
    <LinearGradient
      colors={['#0F172A', '#1E1B4B', '#311042']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.card}
    >
      <View style={styles.topBadgeRow}>
        <View style={styles.emergencyBadge}>
          <Feather name="moon" size={12} color="#F472B6" />
          <Text style={styles.emergencyBadgeText}>1-NIGHT-BEFORE-EXAM</Text>
        </View>

        <View style={styles.timerBadge}>
          <Feather name="clock" size={12} color="#A7F3D0" />
          <Text style={styles.timerText}>~{estimatedMinutes} Mins Focus</Text>
        </View>
      </View>

      <Text style={styles.title}>Emergency Revision Sequence</Text>
      <Text style={styles.description}>
        Filter out non-essentials. Focus strictly on the top {highYieldCount} highest-probability questions and mandatory diagrams.
      </Text>

      <View style={styles.featuresStrip}>
        <View style={styles.featureItem}>
          <Feather name="check" size={14} color="#34D399" />
          <Text style={styles.featureText}>Top 3 Must-Master Units</Text>
        </View>
        <View style={styles.featureItem}>
          <Feather name="check" size={14} color="#34D399" />
          <Text style={styles.featureText}>Compulsory Diagrams</Text>
        </View>
        <View style={styles.featureItem}>
          <Feather name="check" size={14} color="#34D399" />
          <Text style={styles.featureText}>Zero Clutter</Text>
        </View>
      </View>

      <TouchableOpacity
        activeOpacity={0.85}
        style={styles.ctaButton}
        onPress={onPressStart}
      >
        <Feather name="zap" size={18} color="#0F172A" />
        <Text style={styles.ctaText}>Start Quick Revision</Text>
        <Feather name="arrow-right" size={18} color="#0F172A" />
      </TouchableOpacity>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 22,
    padding: 20,
    marginHorizontal: 16,
    marginBottom: 18,
    shadowColor: '#1E1B4B',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 5,
  },
  topBadgeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  emergencyBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: 'rgba(244, 114, 182, 0.18)',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 14,
    borderColor: 'rgba(244, 114, 182, 0.3)',
    borderWidth: 1,
  },
  emergencyBadgeText: {
    color: '#F472B6',
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  timerBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    backgroundColor: 'rgba(52, 211, 153, 0.18)',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 14,
  },
  timerText: {
    color: '#34D399',
    fontSize: 11,
    fontWeight: '700',
  },
  title: {
    fontSize: 20,
    fontWeight: '800',
    color: '#FFFFFF',
    marginBottom: 6,
  },
  description: {
    fontSize: 13,
    color: 'rgba(255, 255, 255, 0.82)',
    lineHeight: 19,
    marginBottom: 14,
  },
  featuresStrip: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 18,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  featureText: {
    color: '#E2E8F0',
    fontSize: 12,
    fontWeight: '600',
  },
  ctaButton: {
    backgroundColor: '#34D399',
    borderRadius: 14,
    paddingVertical: 14,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  ctaText: {
    color: '#0F172A',
    fontSize: 15,
    fontWeight: '800',
    letterSpacing: 0.2,
  },
});
