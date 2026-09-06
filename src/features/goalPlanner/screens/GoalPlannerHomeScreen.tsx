import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import { useGoalPlannerStore } from '../store/useGoalPlannerStore';
import { GoalHeroCard } from '../components/GoalHeroCard';
import { AcademicDataCard } from '../components/AcademicDataCard';
import { SavedGoalCard } from '../components/SavedGoalCard';
import { SetGoalModal } from './SetGoalModal';
import { SavedGoal } from '../types/goalPlanner.types';

export const GoalPlannerHomeScreen: React.FC = () => {
  const router = useRouter();
  const {
    academicData,
    savedGoals,
    syncProfileData,
    calculateGoal,
    deleteGoal,
  } = useGoalPlannerStore();

  const [setGoalVisible, setSetGoalVisible] = useState(false);

  useEffect(() => {
    syncProfileData();
  }, []);

  const handleGoalPress = (goal: SavedGoal) => {
    calculateGoal(goal.targetCgpa);
    router.push('/calculators/goal-planner/result' as any);
  };

  return (
    <View style={styles.root}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      {/* Header */}
      <SafeAreaView edges={['top']} style={styles.headerSafeArea}>
        <View style={styles.headerRow}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
            <Feather name="arrow-left" size={20} color="#0F172A" />
          </TouchableOpacity>

          <View style={styles.headerTitleGroup}>
            <Text style={styles.headerTitle}>GPA Goal Planner</Text>
            <Text style={styles.headerSub}>VTU Target CGPA Roadmap</Text>
          </View>

          <TouchableOpacity
            onPress={() => router.push('/calculators/goal-planner/saved' as any)}
            style={styles.savedHeaderBtn}
          >
            <Feather name="bookmark" size={18} color="#0745E8" />
          </TouchableOpacity>
        </View>
      </SafeAreaView>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Goal Hero Card */}
        <GoalHeroCard
          currentCgpa={academicData.currentCgpa}
          completedSemesters={academicData.completedSemesters}
          onCreateGoalPress={() => setSetGoalVisible(true)}
        />

        {/* Academic Profile Snapshot */}
        <AcademicDataCard
          data={academicData}
          onSyncPress={syncProfileData}
          onEditPress={() => setSetGoalVisible(true)}
        />

        {/* Saved Goal Roadmaps Section */}
        <View style={styles.sectionHeaderRow}>
          <Text style={styles.sectionTitle}>Saved Target Roadmaps ({savedGoals.length})</Text>
          <TouchableOpacity onPress={() => router.push('/calculators/goal-planner/saved' as any)}>
            <Text style={styles.viewAllText}>View All</Text>
          </TouchableOpacity>
        </View>

        {savedGoals.length === 0 ? (
          <View style={styles.emptySavedBox}>
            <Text style={styles.emptySavedText}>No saved target roadmaps yet.</Text>
            <TouchableOpacity onPress={() => setSetGoalVisible(true)}>
              <Text style={styles.createLinkText}>+ Plan your target goal</Text>
            </TouchableOpacity>
          </View>
        ) : (
          savedGoals.slice(0, 2).map((g) => (
            <SavedGoalCard
              key={g.id}
              goal={g}
              onPress={handleGoalPress}
              onDelete={deleteGoal}
            />
          ))
        )}
      </ScrollView>

      {/* Set Academic Goal Modal */}
      <SetGoalModal
        visible={setGoalVisible}
        onClose={() => setSetGoalVisible(false)}
      />
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
  savedHeaderBtn: {
    width: 36,
    height: 36,
    borderRadius: 12,
    backgroundColor: '#EEF2FF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 40,
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: '#0F172A',
  },
  viewAllText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#0745E8',
  },
  emptySavedBox: {
    backgroundColor: '#F8FAFC',
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  emptySavedText: {
    fontSize: 13,
    color: '#64748B',
    marginBottom: 4,
  },
  createLinkText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#0745E8',
  },
});
