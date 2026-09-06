import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Feather } from '@expo/vector-icons';

interface PassingPackageHeroProps {
  branch: string;
  semester: number;
  scheme: string;
  packagesCount: number;
  onPressChangeBranch?: () => void;
  onPressNightBeforeMode?: () => void;
}

export const PassingPackageHero: React.FC<PassingPackageHeroProps> = ({
  branch,
  semester,
  scheme,
  packagesCount,
  onPressChangeBranch,
  onPressNightBeforeMode,
}) => {
  return (
    <LinearGradient
      colors={['#0745E8', '#1D4ED8', '#1E40AF']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.heroContainer}
    >
      <View style={styles.topRow}>
        <View style={styles.tagBadge}>
          <Feather name="zap" size={12} color="#F59E0B" />
          <Text style={styles.tagText}>EXAM PASSING SYSTEM</Text>
        </View>

        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.branchSelector}
          onPress={onPressChangeBranch}
        >
          <Text style={styles.branchSelectorText}>
            {branch} • Sem {semester}
          </Text>
          <Feather name="chevron-down" size={14} color="#FFFFFF" />
        </TouchableOpacity>
      </View>

      <Text style={styles.title}>VTU Passing Packages</Text>
      <Text style={styles.subtitle}>
        Curated high-yield questions, unit weightage & last-minute exam revision.
      </Text>

      <View style={styles.statsStrip}>
        <View style={styles.statBox}>
          <Text style={styles.statNumber}>{packagesCount}</Text>
          <Text style={styles.statLabel}>Available Packages</Text>
        </View>

        <View style={styles.verticalDivider} />

        <View style={styles.statBox}>
          <Text style={styles.statNumber}>{scheme}</Text>
          <Text style={styles.statLabel}>Scheme Format</Text>
        </View>

        <View style={styles.verticalDivider} />

        <View style={styles.statBox}>
          <Text style={styles.statNumber}>100%</Text>
          <Text style={styles.statLabel}>Verified Syllabus</Text>
        </View>
      </View>

      {/* Emergency 1-Night-Before Banner Trigger */}
      <TouchableOpacity
        activeOpacity={0.85}
        style={styles.emergencyBanner}
        onPress={onPressNightBeforeMode}
      >
        <View style={styles.emergencyIconBox}>
          <Feather name="moon" size={16} color="#FFFFFF" />
        </View>
        <View style={styles.emergencyTextWrapper}>
          <Text style={styles.emergencyTitle}>1-Night-Before Exam Mode</Text>
          <Text style={styles.emergencySub}>Rapid 45-min sequence for top priority units</Text>
        </View>
        <Feather name="arrow-right" size={18} color="#FFFFFF" />
      </TouchableOpacity>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  heroContainer: {
    borderRadius: 24,
    padding: 20,
    marginHorizontal: 16,
    marginTop: 12,
    marginBottom: 16,
    shadowColor: '#0745E8',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.25,
    shadowRadius: 12,
    elevation: 6,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  tagBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: 'rgba(255, 255, 255, 0.16)',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 14,
  },
  tagText: {
    color: '#FDE68A',
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  branchSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.22)',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 12,
  },
  branchSelectorText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '700',
  },
  title: {
    fontSize: 24,
    fontWeight: '800',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 13,
    color: 'rgba(255, 255, 255, 0.88)',
    lineHeight: 18,
    marginBottom: 16,
  },
  statsStrip: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255, 255, 255, 0.12)',
    borderRadius: 16,
    paddingVertical: 12,
    paddingHorizontal: 8,
    alignItems: 'center',
    justifyContent: 'space-around',
    marginBottom: 14,
  },
  statBox: {
    alignItems: 'center',
    flex: 1,
  },
  statNumber: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '800',
  },
  statLabel: {
    color: 'rgba(255, 255, 255, 0.78)',
    fontSize: 10,
    marginTop: 2,
    fontWeight: '600',
  },
  verticalDivider: {
    width: 1,
    height: 24,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  emergencyBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(15, 23, 42, 0.45)',
    borderColor: 'rgba(255, 255, 255, 0.25)',
    borderWidth: 1,
    borderRadius: 16,
    padding: 12,
    gap: 10,
  },
  emergencyIconBox: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: '#7C3AED',
    alignItems: 'center',
    justifyContent: 'center',
  },
  emergencyTextWrapper: {
    flex: 1,
  },
  emergencyTitle: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '800',
  },
  emergencySub: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 11,
    marginTop: 1,
  },
});
