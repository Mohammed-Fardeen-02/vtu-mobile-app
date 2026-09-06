import React from 'react';
import { ScrollView, TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import { PassingPackage } from '../types/passingPackages.types';

interface SubjectSelectorProps {
  packages: PassingPackage[];
  selectedId: string;
  onSelectPackage: (pkg: PassingPackage) => void;
}

export const SubjectSelector: React.FC<SubjectSelectorProps> = ({
  packages,
  selectedId,
  onSelectPackage,
}) => {
  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {packages.map((pkg) => {
          const isSelected = pkg.id === selectedId;
          return (
            <TouchableOpacity
              key={pkg.id}
              activeOpacity={0.8}
              style={[styles.pill, isSelected && styles.pillSelected]}
              onPress={() => onSelectPackage(pkg)}
            >
              <Text style={[styles.codeText, isSelected && styles.codeTextSelected]}>
                {pkg.subjectCode}
              </Text>
              <Text
                style={[styles.nameText, isSelected && styles.nameTextSelected]}
                numberOfLines={1}
              >
                {pkg.subjectName}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
  scrollContent: {
    paddingHorizontal: 16,
    gap: 8,
  },
  pill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    borderColor: '#E2E8F0',
    borderWidth: 1,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    gap: 6,
    maxWidth: 200,
  },
  pillSelected: {
    backgroundColor: '#EEF2FF',
    borderColor: '#0745E8',
  },
  codeText: {
    fontSize: 11,
    fontWeight: '800',
    color: '#64748B',
  },
  codeTextSelected: {
    color: '#0745E8',
  },
  nameText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#334155',
  },
  nameTextSelected: {
    color: '#0745E8',
    fontWeight: '800',
  },
});
