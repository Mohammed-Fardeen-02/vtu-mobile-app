import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';

interface EmptyStateProps {
  title?: string;
  subTitle?: string;
  onAddPress: () => void;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  title = 'No Subjects Tracked Yet',
  subTitle = 'Add your enrolled VTU semester subjects to calculate attendance, target goals, and missable classes.',
  onAddPress,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.iconCircle}>
        <Feather name="calendar" size={32} color="#0745E8" />
      </View>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.subTitle}>{subTitle}</Text>

      <TouchableOpacity activeOpacity={0.85} style={styles.addBtn} onPress={onAddPress}>
        <Feather name="plus" size={16} color="#FFFFFF" />
        <Text style={styles.addBtnText}>Add Your First Subject</Text>
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
  addBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 20,
    paddingVertical: 12,
    backgroundColor: '#0745E8',
    borderRadius: 14,
  },
  addBtnText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
  },
});
