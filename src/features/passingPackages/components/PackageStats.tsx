import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { PassingPackage } from '../types/passingPackages.types';

interface PackageStatsProps {
  pkg: PassingPackage;
}

export const PackageStats: React.FC<PackageStatsProps> = ({ pkg }) => {
  return (
    <View style={styles.container}>
      <View style={styles.statTile}>
        <View style={[styles.iconBox, { backgroundColor: '#EEF2FF' }]}>
          <Feather name="help-circle" size={18} color="#0745E8" />
        </View>
        <Text style={styles.number}>{pkg.importantQuestionsCount}</Text>
        <Text style={styles.label}>Important Qs</Text>
      </View>

      <View style={styles.statTile}>
        <View style={[styles.iconBox, { backgroundColor: '#F3E8FF' }]}>
          <Feather name="repeat" size={18} color="#7C3AED" />
        </View>
        <Text style={styles.number}>{pkg.repeatedQuestionsCount}</Text>
        <Text style={styles.label}>Repeated Qs</Text>
      </View>

      <View style={styles.statTile}>
        <View style={[styles.iconBox, { backgroundColor: '#FEF2F2' }]}>
          <Feather name="target" size={18} color="#DC2626" />
        </View>
        <Text style={styles.number}>{pkg.expectedQuestionsCount}</Text>
        <Text style={styles.label}>Most Expected</Text>
      </View>

      <View style={styles.statTile}>
        <View style={[styles.iconBox, { backgroundColor: '#FEF3C7' }]}>
          <Feather name="file-text" size={18} color="#D97706" />
        </View>
        <Text style={styles.number}>{pkg.revisionResourceCount}</Text>
        <Text style={styles.label}>Revision PDFs</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 16,
    marginBottom: 18,
    gap: 8,
  },
  statTile: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.03,
    shadowRadius: 3,
    elevation: 1,
  },
  iconBox: {
    width: 34,
    height: 34,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 6,
  },
  number: {
    fontSize: 16,
    fontWeight: '800',
    color: '#0F172A',
  },
  label: {
    fontSize: 10,
    color: '#64748B',
    fontWeight: '600',
    marginTop: 2,
    textAlign: 'center',
  },
});
