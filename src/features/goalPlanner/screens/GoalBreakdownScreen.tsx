import React from 'react';
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
import { SemesterBreakdownItem } from '../components/SemesterBreakdownItem';

export const GoalBreakdownScreen: React.FC = () => {
  const router = useRouter();
  const activeGoalResult = useGoalPlannerStore((state) => state.activeGoalResult);

  if (!activeGoalResult) {
    router.replace('/calculators/goal-planner' as any);
    return null;
  }

  return (
    <View style={styles.root}>
      {/* Header */}
      <SafeAreaView edges={['top']} style={styles.headerSafeArea}>
        <View style={styles.headerRow}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
            <Feather name="arrow-left" size={20} color="#0F172A" />
          </TouchableOpacity>
          <View style={styles.headerTitleGroup}>
            <Text style={styles.headerTitle}>Semester Goal Breakdown</Text>
            <Text style={styles.headerSub}>
              Required SGPA per Semester for Target {activeGoalResult.targetCgpa.toFixed(2)}
            </Text>
          </View>
        </View>
      </SafeAreaView>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <Text style={styles.sectionHeader}>Remaining Semester Targets</Text>
        <Text style={styles.sectionSub}>
          Maintain these average SGPA targets in each remaining semester
        </Text>

        {activeGoalResult.semesterTargets.map((st) => (
          <SemesterBreakdownItem key={st.semesterNumber} item={st} />
        ))}
      </ScrollView>
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
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 40,
  },
  sectionHeader: {
    fontSize: 16,
    fontWeight: '800',
    color: '#0F172A',
    marginBottom: 2,
  },
  sectionSub: {
    fontSize: 12,
    color: '#64748B',
    marginBottom: 14,
  },
});
