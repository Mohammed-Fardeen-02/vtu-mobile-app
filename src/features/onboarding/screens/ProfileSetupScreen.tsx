import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Container, Button, Card } from '@/shared/components';
import { colors } from '@/core/theme';
import { VTU_SCHEMES, VTU_BRANCHES, VTU_SEMESTERS } from '@/core/constants';
import { useAuthStore } from '@/store';
import { storageService } from '@/infrastructure/storage/storage.service';

export const ProfileSetupScreen: React.FC = () => {
  const router = useRouter();
  const { user, setAuth } = useAuthStore();

  const [selectedScheme, setSelectedScheme] = useState('2022');
  const [selectedBranch, setSelectedBranch] = useState('CSE');
  const [selectedSemester, setSelectedSemester] = useState(5);
  const [targetCgpa, setTargetCgpa] = useState('8.5');

  const handleSaveProfile = async () => {
    const updatedUser = {
      id: user?.id || '1',
      name: user?.name || 'VTU Student',
      email: user?.email || 'student@vtu.ac.in',
      branch: selectedBranch,
      scheme: selectedScheme,
      semester: selectedSemester,
      targetCgpa: parseFloat(targetCgpa) || 8.5,
    };

    await storageService.setItem('vtu_user_profile', updatedUser);
    setAuth(updatedUser, 'token_123');
    router.replace('/(tabs)/home');
  };

  return (
    <Container safe={false} style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.badge}>STEP 2 OF 2</Text>
          <Text style={styles.title}>Academic Profile Setup</Text>
          <Text style={styles.subtitle}>
            Select your VTU scheme, branch, and current semester to personalize notes & SGPA calculations.
          </Text>
        </View>

        {/* 1. VTU Scheme Selector */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>1. Select VTU Scheme</Text>
          <View style={styles.optionsGrid}>
            {VTU_SCHEMES.map((scheme) => (
              <TouchableOpacity
                key={scheme.id}
                style={[
                  styles.chip,
                  selectedScheme === scheme.id && styles.activeChip,
                ]}
                onPress={() => setSelectedScheme(scheme.id)}
              >
                <Text
                  style={[
                    styles.chipText,
                    selectedScheme === scheme.id && styles.activeChipText,
                  ]}
                >
                  {scheme.name}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* 2. Branch Selector */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>2. Select Engineering Branch</Text>
          <View style={styles.optionsGrid}>
            {VTU_BRANCHES.map((branch) => (
              <TouchableOpacity
                key={branch.code}
                style={[
                  styles.chip,
                  selectedBranch === branch.code && styles.activeChip,
                ]}
                onPress={() => setSelectedBranch(branch.code)}
              >
                <Text
                  style={[
                    styles.chipText,
                    selectedBranch === branch.code && styles.activeChipText,
                  ]}
                >
                  {branch.code}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* 3. Semester Selector */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>3. Current Semester</Text>
          <View style={styles.semGrid}>
            {VTU_SEMESTERS.map((sem) => (
              <TouchableOpacity
                key={sem}
                style={[
                  styles.semCircle,
                  selectedSemester === sem && styles.activeSemCircle,
                ]}
                onPress={() => setSelectedSemester(sem)}
              >
                <Text
                  style={[
                    styles.semText,
                    selectedSemester === sem && styles.activeSemText,
                  ]}
                >
                  Sem {sem}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* 4. Target CGPA Input */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>4. Target CGPA Goal</Text>
          <Card style={styles.targetCard}>
            <Text style={styles.inputLabel}>Target CGPA (e.g. 9.0)</Text>
            <TextInput
              style={styles.input}
              value={targetCgpa}
              onChangeText={setTargetCgpa}
              keyboardType="decimal-pad"
              placeholder="8.5"
              placeholderTextColor={colors.text.darkSecondary}
            />
          </Card>
        </View>

        <Button
          title="Save & Launch Dashboard"
          onPress={handleSaveProfile}
          style={styles.submitBtn}
        />
      </ScrollView>
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 56,
  },
  scrollContent: {
    paddingBottom: 40,
  },
  header: {
    marginBottom: 24,
  },
  badge: {
    fontSize: 11,
    fontWeight: '800',
    color: colors.primary[400],
    letterSpacing: 1.5,
    marginBottom: 8,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: colors.text.darkPrimary,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: colors.text.darkSecondary,
    lineHeight: 22,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.text.darkPrimary,
    marginBottom: 12,
  },
  optionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  chip: {
    backgroundColor: colors.background.darkCard,
    borderColor: colors.background.darkCardBorder,
    borderWidth: 1,
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 12,
  },
  activeChip: {
    backgroundColor: colors.primary[500],
    borderColor: colors.primary[500],
  },
  chipText: {
    fontSize: 14,
    color: colors.text.darkPrimary,
    fontWeight: '600',
  },
  activeChipText: {
    color: '#FFFFFF',
  },
  semGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  semCircle: {
    width: '23%',
    paddingVertical: 12,
    backgroundColor: colors.background.darkCard,
    borderColor: colors.background.darkCardBorder,
    borderWidth: 1,
    borderRadius: 12,
    alignItems: 'center',
  },
  activeSemCircle: {
    backgroundColor: colors.primary[500],
    borderColor: colors.primary[500],
  },
  semText: {
    fontSize: 13,
    color: colors.text.darkPrimary,
    fontWeight: '700',
  },
  activeSemText: {
    color: '#FFFFFF',
  },
  targetCard: {
    gap: 8,
  },
  inputLabel: {
    fontSize: 13,
    color: colors.text.darkSecondary,
  },
  input: {
    backgroundColor: colors.background.dark,
    borderColor: colors.background.darkCardBorder,
    borderWidth: 1,
    borderRadius: 10,
    padding: 12,
    color: colors.text.darkPrimary,
    fontSize: 18,
    fontWeight: '700',
  },
  submitBtn: {
    marginTop: 12,
  },
});
