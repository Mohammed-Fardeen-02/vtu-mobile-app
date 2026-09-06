import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import { useGoalPlannerStore } from '../store/useGoalPlannerStore';
import { SavedGoalCard } from '../components/SavedGoalCard';
import { EmptyState } from '../components/EmptyState';
import { SetGoalModal } from './SetGoalModal';
import { SavedGoal } from '../types/goalPlanner.types';

export const SavedGoalsScreen: React.FC = () => {
  const router = useRouter();
  const { savedGoals, calculateGoal, deleteGoal } = useGoalPlannerStore();
  const [modalVisible, setModalVisible] = useState(false);

  const handleGoalPress = (goal: SavedGoal) => {
    calculateGoal(goal.targetCgpa);
    router.push('/calculators/goal-planner/result' as any);
  };

  return (
    <View style={styles.root}>
      {/* Header */}
      <SafeAreaView edges={['top']} style={styles.headerSafeArea}>
        <View style={styles.headerRow}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
            <Feather name="arrow-left" size={20} color="#0F172A" />
          </TouchableOpacity>
          <View style={styles.headerTitleGroup}>
            <Text style={styles.headerTitle}>Saved Target Roadmaps</Text>
            <Text style={styles.headerSub}>Tracked Target CGPA Milestones</Text>
          </View>

          <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.addBtn}>
            <Feather name="plus" size={18} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
      </SafeAreaView>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {savedGoals.length === 0 ? (
          <EmptyState onCreatePress={() => setModalVisible(true)} />
        ) : (
          savedGoals.map((g) => (
            <SavedGoalCard
              key={g.id}
              goal={g}
              onPress={handleGoalPress}
              onDelete={deleteGoal}
            />
          ))
        )}
      </ScrollView>

      {/* Set Goal Modal */}
      <SetGoalModal visible={modalVisible} onClose={() => setModalVisible(false)} />
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  headerSafeArea: {
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 12,
  },
  backBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#F8FAFC',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  headerTitleGroup: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#0F172A',
  },
  headerSub: {
    fontSize: 12,
    color: '#64748B',
  },
  addBtn: {
    width: 36,
    height: 36,
    borderRadius: 12,
    backgroundColor: '#0745E8',
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 40,
  },
});
