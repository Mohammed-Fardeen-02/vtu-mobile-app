import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';

interface EmptyStateProps {
  title?: string;
  subTitle?: string;
  onCreatePress: () => void;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  title = 'No Saved Goals Yet',
  subTitle = 'Create and save target CGPA milestones to track required semester SGPAs throughout your VTU engineering degree.',
  onCreatePress,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.iconCircle}>
        <Feather name="target" size={32} color="#0745E8" />
      </View>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.subTitle}>{subTitle}</Text>

      <TouchableOpacity activeOpacity={0.85} style={styles.createBtn} onPress={onCreatePress}>
        <Feather name="plus" size={16} color="#FFFFFF" />
        <Text style={styles.createBtnText}>Plan Your First Goal</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingVertical: 44,
    paddingHorizontal: 24,
    backgroundColor: '#F8FAFC',
    borderRadius: 24,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    marginVertical: 12,
  },
  iconCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#EEF2FF',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 14,
  },
  title: {
    fontSize: 17,
    fontWeight: '800',
    color: '#0F172A',
    marginBottom: 4,
  },
  subTitle: {
    fontSize: 13,
    color: '#64748B',
    textAlign: 'center',
    lineHeight: 18,
    marginBottom: 20,
  },
  createBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 20,
    paddingVertical: 12,
    backgroundColor: '#0745E8',
    borderRadius: 14,
  },
  createBtnText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
  },
});
