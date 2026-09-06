import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import { usePassingPackageStore } from '../store/usePassingPackageStore';
import { PackageStats } from '../components/PackageStats';
import { PackageSectionCard } from '../components/PackageSectionCard';
import { SubjectSelector } from '../components/SubjectSelector';

export const PackageOverviewScreen: React.FC = () => {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const { getPackageById, getPackagesForCurrentStudent } = usePassingPackageStore();

  const currentPackages = getPackagesForCurrentStudent();
  const pkg = getPackageById(id || '') || currentPackages[0];

  if (!pkg) {
    return (
      <View style={styles.errorRoot}>
        <Text style={styles.errorText}>Package Not Found</Text>
        <TouchableOpacity style={styles.iconBtn} onPress={() => router.back()}>
          <Text style={styles.backBtnText}>Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.root}>
      <StatusBar barStyle="light-content" backgroundColor="#0745E8" />

      {/* Header Bar */}
      <View style={styles.header}>
        <SafeAreaView edges={['top']}>
          <View style={styles.headerRow}>
            <TouchableOpacity style={styles.iconBtn} onPress={() => router.back()}>
              <Feather name="arrow-left" size={20} color="#FFFFFF" />
            </TouchableOpacity>

            <View style={styles.headerTitleBox}>
              <View style={styles.codePill}>
                <Text style={styles.codeText}>{pkg.subjectCode}</Text>
              </View>

              <Text style={styles.headerSubject} numberOfLines={1}>
                {pkg.subjectName}
              </Text>
            </View>

            <TouchableOpacity
              style={styles.iconBtn}
              onPress={() => router.push('/passing-packages/saved' as any)}
            >
              <Feather name="bookmark" size={20} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </View>

      {/* Subject Switcher Bar */}
      {currentPackages.length > 1 && (
        <SubjectSelector
          packages={currentPackages}
          selectedId={pkg.id}
          onSelectPackage={(p) => router.replace(`/passing-packages/overview/${p.id}` as any)}
        />
      )}

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Subject Info Strip */}
        <View style={styles.subjectInfoCard}>
          <View style={styles.subjectInfoTop}>
            <View>
              <Text style={styles.subjectTitle}>{pkg.subjectName}</Text>
              <Text style={styles.subjectMeta}>
                VTU {pkg.branch} • Sem {pkg.semester} • {pkg.scheme} Scheme
              </Text>
            </View>
            <View style={styles.verifiedBadge}>
              <Feather name="shield" size={14} color="#059669" />
              <Text style={styles.verifiedText}>Verified</Text>
            </View>
          </View>
        </View>

        {/* Package Statistics */}
        <PackageStats pkg={pkg} />

        {/* 6 Primary Package Feature Sections */}
        <View style={styles.sectionsContainer}>
          <Text style={styles.sectionHeaderTitle}>Passing Package Modules</Text>

          {/* 1. Emergency 1-Night-Before (Special Dark Tile) */}
          <PackageSectionCard
            title="1-Night-Before-Exam Mode"
            subtitle="Rapid 45-min sequence covering top-priority units & compulsory questions"
            iconName="moon"
            iconColor="#F472B6"
            iconBg="rgba(244, 114, 182, 0.15)"
            badgeCount="RECOMMENDED"
            badgeColor="#7C3AED"
            badgeTextColor="#FFFFFF"
            isSpecial
            onPress={() => router.push(`/passing-packages/night-before/${pkg.id}` as any)}
          />

          {/* 2. Important Questions */}
          <PackageSectionCard
            title="Important Questions"
            subtitle="High-yield questions with marks breakdown and solution hints"
            iconName="help-circle"
            iconColor="#0745E8"
            iconBg="#EEF2FF"
            badgeCount={pkg.importantQuestionsCount}
            onPress={() => router.push(`/passing-packages/important-questions/${pkg.id}` as any)}
          />

          {/* 3. Repeated Questions */}
          <PackageSectionCard
            title="Repeated Questions"
            subtitle="Sorted by frequency of appearance across past 5 VTU exam cycles"
            iconName="repeat"
            iconColor="#7C3AED"
            iconBg="#F3E8FF"
            badgeCount={pkg.repeatedQuestionsCount}
            badgeColor="#F3E8FF"
            badgeTextColor="#7C3AED"
            onPress={() => router.push(`/passing-packages/repeated-questions/${pkg.id}` as any)}
          />

          {/* 4. Most Expected Questions */}
          <PackageSectionCard
            title="Most Expected Questions"
            subtitle="Categorized into Very High, High, and Medium Priority focus areas"
            iconName="target"
            iconColor="#DC2626"
            iconBg="#FEF2F2"
            badgeCount={pkg.expectedQuestionsCount}
            badgeColor="#FEF2F2"
            badgeTextColor="#DC2626"
            onPress={() => router.push(`/passing-packages/expected-questions/${pkg.id}` as any)}
          />

          {/* 5. Unit Weightage Visualizer */}
          <PackageSectionCard
            title="Unit Weightage & Progress"
            subtitle="Visual progress indicators comparing expected marks weightage per unit"
            iconName="bar-chart-2"
            iconColor="#0284C7"
            iconBg="#E0F2FE"
            badgeCount={`${pkg.unitCount} Units`}
            badgeColor="#E0F2FE"
            badgeTextColor="#0284C7"
            onPress={() => router.push(`/passing-packages/unit-weightage/${pkg.id}` as any)}
          />

          {/* 6. Last-Minute Revision */}
          <PackageSectionCard
            title="Last-Minute Revision PDFs"
            subtitle="Formula cheat-sheets, key concepts, and 15 compulsory exam diagrams"
            iconName="file-text"
            iconColor="#D97706"
            iconBg="#FEF3C7"
            badgeCount={pkg.revisionResourceCount}
            badgeColor="#FEF3C7"
            badgeTextColor="#D97706"
            onPress={() => router.push(`/passing-packages/revision/${pkg.id}` as any)}
          />
        </View>

        {/* Disclaimer Bar */}
        <View style={styles.disclaimerBox}>
          <Feather name="info" size={14} color="#64748B" />
          <Text style={styles.disclaimerText}>
            Passing packages are exam preparation tools based on historical VTU question patterns and syllabus weightage. Questions are not guaranteed to appear.
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  errorRoot: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  errorText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0F172A',
  },
  backBtnText: {
    color: '#0745E8',
    fontWeight: '700',
    marginTop: 10,
  },
  header: {
    backgroundColor: '#0745E8',
    paddingHorizontal: 16,
    paddingBottom: 14,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 6,
  },
  iconBtn: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitleBox: {
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 12,
  },
  codePill: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
    marginBottom: 2,
  },
  codeText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '800',
  },
  headerSubject: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '800',
  },
  scrollContent: {
    paddingBottom: 30,
  },
  subjectInfoCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 16,
    marginHorizontal: 16,
    marginTop: 12,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  subjectInfoTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  subjectTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#0F172A',
    lineHeight: 24,
  },
  subjectMeta: {
    fontSize: 12,
    color: '#64748B',
    marginTop: 4,
  },
  verifiedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#ECFDF5',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 10,
  },
  verifiedText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#059669',
  },
  sectionsContainer: {
    paddingHorizontal: 16,
    marginTop: 6,
  },
  sectionHeaderTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: '#0F172A',
    marginBottom: 12,
  },
  disclaimerBox: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
    backgroundColor: '#F1F5F9',
    borderRadius: 12,
    padding: 12,
    marginHorizontal: 16,
    marginTop: 12,
  },
  disclaimerText: {
    flex: 1,
    fontSize: 11,
    color: '#64748B',
    lineHeight: 16,
  },
});
