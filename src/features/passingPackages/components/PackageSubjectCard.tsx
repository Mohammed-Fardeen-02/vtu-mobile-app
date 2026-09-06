import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { PassingPackage } from '../types/passingPackages.types';

interface PackageSubjectCardProps {
  pkg: PassingPackage;
  onPress: () => void;
}

export const PackageSubjectCard: React.FC<PackageSubjectCardProps> = ({
  pkg,
  onPress,
}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.88}
      style={styles.card}
      onPress={onPress}
    >
      <View style={styles.topRow}>
        <View style={styles.codePill}>
          <Text style={styles.codeText}>{pkg.subjectCode}</Text>
        </View>
        <View style={styles.readyBadge}>
          <Feather name="check-circle" size={12} color="#059669" />
          <Text style={styles.readyText}>Passing Pack Ready</Text>
        </View>
      </View>

      <Text style={styles.title} numberOfLines={2}>
        {pkg.subjectName}
      </Text>

      <View style={styles.metaGrid}>
        <View style={styles.metaChip}>
          <Feather name="help-circle" size={12} color="#0745E8" />
          <Text style={styles.metaText}>{pkg.importantQuestionsCount} Important Qs</Text>
        </View>

        <View style={styles.metaChip}>
          <Feather name="repeat" size={12} color="#7C3AED" />
          <Text style={styles.metaText}>{pkg.repeatedQuestionsCount} Repeated</Text>
        </View>

        <View style={styles.metaChip}>
          <Feather name="bar-chart-2" size={12} color="#0284C7" />
          <Text style={styles.metaText}>{pkg.unitCount} Units Weightage</Text>
        </View>

        <View style={styles.metaChip}>
          <Feather name="file-text" size={12} color="#D97706" />
          <Text style={styles.metaText}>{pkg.revisionResourceCount} Revision PDFs</Text>
        </View>
      </View>

      <View style={styles.footer}>
        <View style={styles.nightModePill}>
          <Feather name="moon" size={11} color="#6D28D9" />
          <Text style={styles.nightModeText}>1-Night Mode Included</Text>
        </View>
        <View style={styles.actionBtn}>
          <Text style={styles.actionBtnText}>Open Package</Text>
          <Feather name="arrow-right" size={14} color="#0745E8" />
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 18,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  codePill: {
    backgroundColor: '#EEF2FF',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  codeText: {
    color: '#0745E8',
    fontSize: 12,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  readyBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#ECFDF5',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  readyText: {
    color: '#059669',
    fontSize: 11,
    fontWeight: '700',
  },
  title: {
    fontSize: 18,
    fontWeight: '800',
    color: '#0F172A',
    marginBottom: 12,
    lineHeight: 24,
  },
  metaGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 14,
  },
  metaChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    backgroundColor: '#F8FAFC',
    borderColor: '#E2E8F0',
    borderWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
  },
  metaText: {
    fontSize: 11,
    color: '#475569',
    fontWeight: '600',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
  },
  nightModePill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#F3E8FF',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  nightModeText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#6D28D9',
  },
  actionBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  actionBtnText: {
    fontSize: 13,
    fontWeight: '800',
    color: '#0745E8',
  },
});
