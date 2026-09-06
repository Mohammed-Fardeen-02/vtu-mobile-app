import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  FlatList,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import { useAuthStore } from '@/store';
import { MOCK_SUBJECTS, MOCK_RESOURCES } from '../api/notesData';

export const NotesListScreen: React.FC = () => {
  const router = useRouter();
  const user = useAuthStore((state) => state.user);
  const [activeFilter, setActiveFilter] = useState('All');

  const filters = ['All', 'Notes', 'Papers', 'Handwritten', 'Revision'];

  return (
    <View style={styles.rootContainer}>
      {/* Top Header */}
      <SafeAreaView edges={['top']} style={styles.headerSafeArea}>
        <View style={styles.headerTopRow}>
          <Text style={styles.headerTitle}>Library</Text>
          <View style={styles.headerRightActions}>
            <TouchableOpacity
              activeOpacity={0.8}
              style={styles.iconCircle}
              onPress={() => router.push('/notifications' as any)}
            >
              <Feather name="bell" size={18} color="#0F172A" />
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.85}
              style={styles.avatarCircle}
              onPress={() => router.push('/(tabs)/profile')}
            >
              <Text style={styles.avatarText}>{user?.name?.charAt(0) || 'F'}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Search Bar */}
        <TouchableOpacity
          activeOpacity={0.9}
          style={styles.searchBox}
          onPress={() => router.push('/notes/search' as any)}
        >
          <Feather name="search" size={18} color="#64748B" style={styles.searchIcon} />
          <Text style={styles.searchPlaceholder}>Search subjects, codes (e.g. 21CS52), notes...</Text>
        </TouchableOpacity>

        {/* Current Semester Card */}
        <View style={styles.semesterCard}>
          <View style={styles.semLeft}>
            <Text style={styles.semBadgeText}>Active Curriculum</Text>
            <Text style={styles.semTitle}>Semester {user?.semester || 5}</Text>
            <Text style={styles.semSub}>{user?.branch || 'CSE'} • {user?.scheme || '2022'} Scheme</Text>
          </View>
          <TouchableOpacity
            activeOpacity={0.85}
            style={styles.changeSemBtn}
            onPress={() => router.push('/notes/semesters' as any)}
          >
            <Text style={styles.changeSemText}>Change</Text>
            <Feather name="chevron-right" size={14} color="#0745E8" />
          </TouchableOpacity>
        </View>

        {/* Quick Access Filter Chips (Horizontally Scrollable) */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filterRow}>
          {filters.map((filter) => (
            <TouchableOpacity
              key={filter}
              style={[styles.filterChip, activeFilter === filter && styles.activeFilterChip]}
              onPress={() => {
                if (filter === 'Papers') {
                  router.push('/papers');
                } else {
                  setActiveFilter(filter);
                }
              }}
            >
              <Text style={[styles.filterChipText, activeFilter === filter && styles.activeFilterChipText]}>
                {filter}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Continue Studying Card */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Continue Studying</Text>
        </View>
        <TouchableOpacity
          activeOpacity={0.85}
          style={styles.continueCard}
          onPress={() => router.push('/notes/r1?view=reader')}
        >
          <View style={styles.continueHeader}>
            <View style={styles.continueIconBox}>
              <Feather name="book-open" size={20} color="#0745E8" />
            </View>
            <View style={styles.continueInfo}>
              <Text style={styles.continueSubject}>Computer Networks (21CS52)</Text>
              <Text style={styles.continueUnit}>Module 1 • Application Layer</Text>
            </View>
            <Text style={styles.continuePercent}>68%</Text>
          </View>
          <View style={styles.progressTrack}>
            <View style={[styles.progressFill, { width: '68%' }]} />
          </View>
        </TouchableOpacity>

        {/* Recent Subjects Section */}
        {activeFilter === 'All' && (
          <>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Sem 5 Subjects ({MOCK_SUBJECTS.length})</Text>
              <TouchableOpacity onPress={() => router.push('/notes/subjects' as any)}>
                <Text style={styles.viewAllText}>View All</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.subjectsList}>
              {MOCK_SUBJECTS.map((subject) => (
                <TouchableOpacity
                  key={subject.id}
                  activeOpacity={0.8}
                  style={styles.subjectCard}
                  onPress={() => router.push(`/notes/subject/${subject.id}` as any)}
                >
                  <View style={[styles.subjectIconBox, { backgroundColor: subject.iconBg }]}>
                    <Feather name={subject.iconName as any} size={22} color={subject.iconColor} />
                  </View>
                  <View style={styles.subjectInfo}>
                    <View style={styles.subjectCodeRow}>
                      <Text style={styles.subjectCode}>{subject.code}</Text>
                      <Text style={styles.resourceMeta}>{subject.resourceCount} Resources</Text>
                    </View>
                    <Text style={styles.subjectName}>{subject.name}</Text>
                    <View style={styles.miniProgressRow}>
                      <View style={styles.miniProgressTrack}>
                        <View style={[styles.miniProgressFill, { width: `${subject.progress}%` }]} />
                      </View>
                      <Text style={styles.progressNum}>{subject.progress}%</Text>
                    </View>
                  </View>
                  <Feather name="chevron-right" size={20} color="#94A3B8" />
                </TouchableOpacity>
              ))}
            </View>
          </>
        )}

        {/* Resources Section (Filtered by activeFilter) */}
        {(() => {
          const filteredResources = MOCK_RESOURCES.filter((res) => {
            if (activeFilter === 'All') return true;
            if (activeFilter === 'Notes') return res.type.includes('Notes') && !res.type.includes('Handwritten');
            if (activeFilter === 'Handwritten') return res.type.includes('Handwritten') || res.title.toLowerCase().includes('handwritten');
            if (activeFilter === 'Revision') return res.type.includes('Revision') || res.type.includes('Short');
            return true;
          });

          const titleText = activeFilter === 'All'
            ? 'Recently Opened Resources'
            : `${activeFilter} Resources (${filteredResources.length})`;

          return (
            <>
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>{titleText}</Text>
              </View>

              <View style={styles.resourcesList}>
                {filteredResources.length === 0 ? (
                  <View style={{ padding: 20, alignItems: 'center' }}>
                    <Text style={{ color: '#64748B', fontSize: 13 }}>No {activeFilter} resources found.</Text>
                  </View>
                ) : (
                  filteredResources.map((resource) => (
                    <TouchableOpacity
                      key={resource.id}
                      activeOpacity={0.8}
                      style={styles.resourceCard}
                      onPress={() => router.push(`/notes/${resource.id}` as any)}
                    >
                      <View style={styles.resourceIconBox}>
                        <Feather name="file-text" size={20} color="#EF4444" />
                      </View>
                      <View style={styles.resourceInfo}>
                        <Text style={styles.resourceSubjectTag}>{resource.subjectCode} • {resource.type}</Text>
                        <Text style={styles.resourceTitle}>{resource.title}</Text>
                        <Text style={styles.resourceMetaText}>{resource.fileSize} • {resource.downloadsCount} downloads</Text>
                      </View>
                      <Feather name="chevron-right" size={18} color="#94A3B8" />
                    </TouchableOpacity>
                  ))
                )}
              </View>
            </>
          );
        })()}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  headerSafeArea: {
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  headerTopRow: {
    height: 52,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: '#0F172A',
  },
  headerRightActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  iconCircle: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#F1F5F9',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarCircle: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#EEF2FF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    color: '#0745E8',
    fontSize: 16,
    fontWeight: '800',
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 40,
  },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    borderColor: '#E2E8F0',
    borderWidth: 1,
    borderRadius: 16,
    paddingHorizontal: 14,
    height: 48,
    marginBottom: 16,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchPlaceholder: {
    flex: 1,
    fontSize: 13,
    color: '#94A3B8',
  },
  semesterCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#0745E8',
    borderRadius: 20,
    padding: 18,
    marginBottom: 20,
    shadowColor: '#0745E8',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.18,
    shadowRadius: 10,
    elevation: 5,
  },
  semLeft: {
    flex: 1,
  },
  semBadgeText: {
    fontSize: 11,
    fontWeight: '700',
    color: 'rgba(255, 255, 255, 0.8)',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  semTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: '#FFFFFF',
    marginTop: 2,
  },
  semSub: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.9)',
    marginTop: 2,
  },
  changeSemBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 14,
    gap: 4,
  },
  changeSemText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#0745E8',
  },
  filterRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 20,
  },
  filterChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#F1F5F9',
  },
  activeFilterChip: {
    backgroundColor: '#0745E8',
  },
  filterChipText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#64748B',
  },
  activeFilterChipText: {
    color: '#FFFFFF',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: '800',
    color: '#0F172A',
  },
  viewAllText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#0745E8',
  },
  continueCard: {
    backgroundColor: '#F8FAFC',
    borderColor: '#E2E8F0',
    borderWidth: 1,
    borderRadius: 18,
    padding: 16,
    marginBottom: 24,
  },
  continueHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  continueIconBox: {
    width: 42,
    height: 42,
    borderRadius: 14,
    backgroundColor: '#EEF2FF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  continueInfo: {
    flex: 1,
  },
  continueSubject: {
    fontSize: 15,
    fontWeight: '700',
    color: '#0F172A',
  },
  continueUnit: {
    fontSize: 12,
    color: '#64748B',
    marginTop: 2,
  },
  continuePercent: {
    fontSize: 13,
    fontWeight: '800',
    color: '#0745E8',
  },
  progressTrack: {
    height: 6,
    backgroundColor: '#E2E8F0',
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#0745E8',
    borderRadius: 3,
  },
  subjectsList: {
    gap: 12,
    marginBottom: 24,
  },
  subjectCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderColor: '#E2E8F0',
    borderWidth: 1,
    borderRadius: 18,
    padding: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 6,
    elevation: 2,
  },
  subjectIconBox: {
    width: 46,
    height: 46,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  subjectInfo: {
    flex: 1,
  },
  subjectCodeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 2,
  },
  subjectCode: {
    fontSize: 12,
    fontWeight: '700',
    color: '#0745E8',
  },
  resourceMeta: {
    fontSize: 11,
    color: '#64748B',
  },
  subjectName: {
    fontSize: 15,
    fontWeight: '700',
    color: '#0F172A',
    marginBottom: 6,
  },
  miniProgressRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  miniProgressTrack: {
    flex: 1,
    height: 4,
    backgroundColor: '#E2E8F0',
    borderRadius: 2,
    overflow: 'hidden',
  },
  miniProgressFill: {
    height: '100%',
    backgroundColor: '#0745E8',
    borderRadius: 2,
  },
  progressNum: {
    fontSize: 11,
    fontWeight: '700',
    color: '#64748B',
  },
  resourcesList: {
    gap: 10,
  },
  resourceCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    borderColor: '#E2E8F0',
    borderWidth: 1,
    borderRadius: 18,
    padding: 14,
  },
  resourceIconBox: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: '#FEE2E2',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  resourceInfo: {
    flex: 1,
  },
  resourceSubjectTag: {
    fontSize: 11,
    fontWeight: '700',
    color: '#0745E8',
  },
  resourceTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#0F172A',
    marginTop: 2,
  },
  resourceMetaText: {
    fontSize: 12,
    color: '#64748B',
    marginTop: 2,
  },
});
