import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';

interface PackageEmptyStateProps {
  title?: string;
  description?: string;
  actionText?: string;
  onPressAction?: () => void;
  onPressSecondary?: () => void;
}

export const PackageEmptyState: React.FC<PackageEmptyStateProps> = ({
  title = 'No Passing Packages Available',
  description = 'Passing packages for your selected branch or semester are currently being curated by VTU toppers.',
  actionText = 'Select Different Semester / Branch',
  onPressAction,
  onPressSecondary,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.iconCircle}>
        <Feather name="book-open" size={32} color="#0745E8" />
      </View>

      <Text style={styles.title}>{title}</Text>
      <Text style={styles.description}>{description}</Text>

      {onPressAction && (
        <TouchableOpacity
          activeOpacity={0.85}
          style={styles.primaryBtn}
          onPress={onPressAction}
        >
          <Feather name="sliders" size={16} color="#FFFFFF" />
          <Text style={styles.primaryBtnText}>{actionText}</Text>
        </TouchableOpacity>
      )}

      {onPressSecondary && (
        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.secondaryBtn}
          onPress={onPressSecondary}
        >
          <Feather name="send" size={14} color="#0745E8" />
          <Text style={styles.secondaryBtnText}>Request Passing Package for my Subject</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    marginHorizontal: 16,
    marginVertical: 20,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  iconCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#EEF2FF',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: '800',
    color: '#0F172A',
    textAlign: 'center',
    marginBottom: 8,
  },
  description: {
    fontSize: 13,
    color: '#64748B',
    textAlign: 'center',
    lineHeight: 19,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  primaryBtn: {
    backgroundColor: '#0745E8',
    borderRadius: 14,
    paddingVertical: 12,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 10,
  },
  primaryBtnText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '800',
  },
  secondaryBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  secondaryBtnText: {
    color: '#0745E8',
    fontSize: 13,
    fontWeight: '700',
  },
});
