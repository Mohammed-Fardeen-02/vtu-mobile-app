import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  FlatList,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import { useAuthStore } from '@/store';
import { useToast } from '@/core/providers/ToastProvider';
import { MOCK_SUBJECTS, MOCK_RESOURCES } from '../api/notesData';
import { fetchNotesFromApi, fetchSubjectsFromApi } from '../api/notesApi';
import { Subject, NoteResource } from '../types/notes.types';

export const NotesListScreen: React.FC = () => {
  const router = useRouter();
  const user = useAuthStore((state) => state.user);
  const { showToast } = useToast();
  const [activeFilter, setActiveFilter] = useState('All');
  const [notes, setNotes] = useState<NoteResource[]>([]);
  const [subjects, setSubjects] = useState<Subject[]>(MOCK_SUBJECTS);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const filters = ['All', 'Notes', 'Papers', 'Handwritten', 'Revision'];

  const loadData = useCallback(async (isManualRefresh = false) => {
    try {
      const [fetchedNotes, fetchedSubjects] = await Promise.all([
        fetchNotesFromApi({
          semester: user?.semester || 5,
          branchCode: user?.branch || 'CSE',
          schemeYear: user?.scheme || '2022',
        }),
        fetchSubjectsFromApi({
          semester: user?.semester || 5,
          branchCode: user?.branch || 'CSE',
          schemeYear: user?.scheme || '2022',
        }),
      ]);

      setNotes(fetchedNotes);
      setSubjects(fetchedSubjects.length > 0 ? fetchedSubjects : MOCK_SUBJECTS);
      if (isManualRefresh) {
        showToast('Library resources synced with server', 'success');
      }
    } catch {
      setNotes(MOCK_RESOURCES);
      setSubjects(MOCK_SUBJECTS);
      if (isManualRefresh) {
        showToast('Offline mode: Using cached notes', 'info');
      }
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  }, [user, showToast]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const onRefresh = () => {
    setIsRefreshing(true);
    loadData(true);
  };

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

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} colors={['#0745E8']} />
        }
      >
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

        {isLoading ? (
          <View style={{ padding: 40, alignItems: 'center' }}>
            <ActivityIndicator size="large" color="#0745E8" />
            <Text style={{ marginTop: 12, color: '#64748B', fontSize: 13 }}>Loading notes from server...</Text>
          </View>
        ) : (
          <>
            {/* Continue Studying Card */}
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Continue Studying</Text>
            </View>
            <TouchableOpacity
              activeOpacity={0.85}
              style={styles.continueCard}
              onPress={() => router.push(`/notes/${notes[0]?.id || 'r1'}?view=reader` as any)}
            >
              <View style={styles.continueHeader}>
                <View style={styles.continueIconBox}>
                  <Feather name="book-open" size={20} color="#0745E8" />
                </View>
                <View style={styles.continueInfo}>
                  <Text style={styles.continueSubject}>{notes[0]?.title || 'Computer Networks (21CS52)'}</Text>
                  <Text style={styles.continueUnit}>{notes[0]?.subjectCode || 'Module 1'} • Active Study</Text>
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
                  <Text style={styles.sectionTitle}>Sem {user?.semester || 5} Subjects ({subjects.length})</Text>
                  <TouchableOpacity onPress={() => router.push('/notes/subjects' as any)}>
                    <Text style={styles.viewAllText}>View All</Text>
                  </TouchableOpacity>
                </View>

                <View style={styles.subjectsList}>
                  {subjects.map((subject) => (
                    <TouchableOpacity
                      key={subject.id}
                      activeOpacity={0.8}
                      style={styles.subjectCard}
                      onPress={() => router.push(`/notes/subject/${subject.id}` as any)}
                    >
                      <View style={[styles.subjectIconBox, { backgroundColor: subject.iconBg || '#EEF2FF' }]}>
                        <Feather name={(subject.iconName as any) || 'book-open'} size={22} color={subject.iconColor || '#0745E8'} />
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
              const filteredResources = notes.filter((res) => {
                const titleLower = (res.title || '').toLowerCase();
                const typeStr = res.type || '';
                if (activeFilter === 'All') return true;
                if (activeFilter === 'Notes') return (typeStr.includes('Notes') || typeStr.includes('Typed')) && !typeStr.includes('Handwritten') && !typeStr.includes('Revision') && !typeStr.includes('Short');
                if (activeFilter === 'Papers') return typeStr.includes('Paper') || titleLower.includes('paper') || titleLower.includes('question') || titleLower.includes('qp');
                if (activeFilter === 'Handwritten') return typeStr.includes('Handwritten') || titleLower.includes('handwritten');
                if (activeFilter === 'Revision') return typeStr.includes('Revision') || typeStr.includes('Short') || titleLower.includes('revision') || titleLower.includes('formula');
                return true;
              });

              const titleText = activeFilter === 'All'
                ? 'Recently Uploaded Resources'
                : `${activeFilter} Resources (${filteredResources.length})`;

              return (
                <>
                  <View style={styles.sectionHeader}>
                    <Text style={styles.sectionTitle}>{titleText}</Text>
                  </View>

                  <View style={styles.resourcesList}>
                    {filteredResources.length === 0 ? (
                      <View style={{ padding: 20, alignItems: 'center' }}>
                        <Text style={{ color: '#64748B', fontSize: 13 }}>No {activeFilter} resources available yet.</Text>
                      </View>
                    ) : (
                      filteredResources.map((resource) => (
                        <TouchableOpacity
                          key={resource.id}
                          activeOpacity={0.8}
                          style={styles.resourceCard}
                          onPress={() => router.push(`/notes/${resource.id}?view=reader` as any)}
                        >
                          <View style={styles.resourceIconBox}>
                            <Feather name="file-text" size={20} color="#EF4444" />
                          </View>
                          <View style={styles.resourceInfo}>
                            <View style={styles.resourceHeaderRow}>
                              <Text style={styles.resourceSubjectTag}>
                                {resource.subjectCode} • {resource.type}
                              </Text>
                              {resource.isPaid ? (
                                <View style={styles.listPaidBadge}>
                                  <Feather name="lock" size={10} color="#D97706" />
                                  <Text style={styles.listPaidBadgeText}>Paid • ₹{resource.price || 19}</Text>
                                </View>
                              ) : (
                                <View style={styles.listFreeBadge}>
                                  <Feather name="gift" size={10} color="#059669" />
                                  <Text style={styles.listFreeBadgeText}>Free</Text>
                                </View>
                              )}
                            </View>
                            <Text style={styles.resourceTitle}>{resource.title}</Text>
                            <Text style={styles.resourceMetaText}>
                              {resource.fileSize} • {resource.downloadsCount} downloads {resource.totalPages ? `• ${resource.totalPages} Pgs` : ''}
                            </Text>
                          </View>
                          <Feather name="chevron-right" size={18} color="#94A3B8" />
                        </TouchableOpacity>
                      ))
                    )}
                  </View>
                </>
              );
            })()}
          </>
        )}
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
  resourceHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 2,
  },
  listPaidBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FEF3C7',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 8,
    gap: 3,
  },
  listPaidBadgeText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#D97706',
  },
  listFreeBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#D1FAE5',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 8,
    gap: 3,
  },
  listFreeBadgeText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#059669',
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
