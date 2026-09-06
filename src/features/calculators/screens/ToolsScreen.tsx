import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import { Header } from '@/shared/components';

export const ToolsScreen: React.FC = () => {
  const router = useRouter();

  return (
    <View style={styles.rootContainer}>
      <Header title="Calculators & Tools" showBack={false} />
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Tools List */}
        <View style={styles.toolsList}>
          {/* CGPA Calculator */}
          <TouchableOpacity
            style={styles.toolCard}
            onPress={() => router.push('/calculators/cgpa')}
          >
            <View style={[styles.iconBox, { backgroundColor: '#EEF2FF' }]}>
              <Feather name="bar-chart-2" size={22} color="#0745E8" />
            </View>
            <View style={styles.toolInfo}>
              <Text style={styles.toolTitle}>CGPA Calculator</Text>
              <Text style={styles.toolSub}>Calculate your GPA easily</Text>
            </View>
            <Feather name="chevron-right" size={20} color="#94A3B8" />
          </TouchableOpacity>

          {/* SGPA Calculator */}
          <TouchableOpacity
            style={styles.toolCard}
            onPress={() => router.push('/calculators/sgpa')}
          >
            <View style={[styles.iconBox, { backgroundColor: '#F3E8FF' }]}>
              <Feather name="cpu" size={22} color="#9333EA" />
            </View>
            <View style={styles.toolInfo}>
              <Text style={styles.toolTitle}>SGPA Calculator</Text>
              <Text style={styles.toolSub}>Calculate your semester GPA</Text>
            </View>
            <Feather name="chevron-right" size={20} color="#94A3B8" />
          </TouchableOpacity>

          {/* Grade Predictor */}
          <TouchableOpacity
            style={styles.toolCard}
            onPress={() => router.push('/calculators/goal-planner')}
          >
            <View style={[styles.iconBox, { backgroundColor: '#FEF3C7' }]}>
              <Feather name="target" size={22} color="#D97706" />
            </View>
            <View style={styles.toolInfo}>
              <Text style={styles.toolTitle}>Grade Predictor</Text>
              <Text style={styles.toolSub}>Predict your final grade</Text>
            </View>
            <Feather name="chevron-right" size={20} color="#94A3B8" />
          </TouchableOpacity>

          {/* Attendance Calculator */}
          <TouchableOpacity
            style={styles.toolCard}
            onPress={() => router.push('/calculators/attendance')}
          >
            <View style={[styles.iconBox, { backgroundColor: '#ECFDF5' }]}>
              <Feather name="calendar" size={22} color="#059669" />
            </View>
            <View style={styles.toolInfo}>
              <Text style={styles.toolTitle}>Attendance Calculator</Text>
              <Text style={styles.toolSub}>Track your attendance</Text>
            </View>
            <Feather name="chevron-right" size={20} color="#94A3B8" />
          </TouchableOpacity>

          {/* Quiz & Practice */}
          <TouchableOpacity
            style={styles.toolCard}
            onPress={() => {}}
          >
            <View style={[styles.iconBox, { backgroundColor: '#E0F2FE' }]}>
              <Feather name="award" size={22} color="#0284C7" />
            </View>
            <View style={styles.toolInfo}>
              <Text style={styles.toolTitle}>Quiz & Practice</Text>
              <Text style={styles.toolSub}>Test your knowledge</Text>
            </View>
            <Feather name="chevron-right" size={20} color="#94A3B8" />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollContent: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingTop: 8,
    paddingBottom: 40,
  },
  toolsList: {
    gap: 14,
  },
  toolCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    borderColor: '#E2E8F0',
    borderWidth: 1,
    borderRadius: 18,
    padding: 16,
  },
  iconBox: {
    width: 46,
    height: 46,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  toolInfo: {
    flex: 1,
  },
  toolTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0F172A',
  },
  toolSub: {
    fontSize: 12,
    color: '#64748B',
    marginTop: 2,
  },
});
